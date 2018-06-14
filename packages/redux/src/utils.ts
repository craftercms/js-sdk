import { applyMiddleware, compose, Store, createStore, combineReducers, AnyAction, ReducersMapObject } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { log } from '@craftercms/utils';
import { CrafterState, CrafterNamespacedState, LookupTable } from '@craftercms/models';
import { allEpics, allReducers } from '@craftercms/redux';

/**
 * Retrieves a crafter-redux store based on a config, combining craftercms states/epics with 
 * optional extra states/epics from config
 */
export function createReduxStore(config: {
  namespace?: string,
  namespaceCrafterState?: boolean,
  reducerMixin?: ReducersMapObject<any, any>,
  epicsArray?: Epic<AnyAction, Store<any>>[],
  reduxDevTools?: boolean
} = {}) {

  config = Object.assign({}, {
    namespace: 'craftercms',
    reduxDevTools: true,
    namespaceCrafterState: false
  }, config);

  const epicMiddleware = createEpicMiddleware(
    config.epicsArray
      ? combineEpics(...allEpics.concat(config.epicsArray))
      : combineEpics(...allEpics));

  const enhancers = config.reduxDevTools
    ? (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose)
    : compose;

  // if config has namespaceCrafterState set to true, combines crafter reducers into namespace, plus config reducers
  // (if available), otherwise, combines crafter reducers directly on root of state.
  const reducer = (config.namespaceCrafterState)
    ? <ReducersMapObject<CrafterNamespacedState, AnyAction>>{ [config.namespace]: combineReducers(allReducers) }
    : <ReducersMapObject<CrafterState, AnyAction>>allReducers;

  return createStore(
    config.reducerMixin
      ? combineReducers({ ...reducer, ...config.reducerMixin })
      : combineReducers(reducer),
    enhancers(applyMiddleware(epicMiddleware))
  );

}

/**
 * Retrieves the crafter-redux state container whether it is namespaced or on the root
 * @param {Store<CrafterNamespacedState>} store
 * @returns {CrafterState}
 */
export function getState(store: Store<CrafterNamespacedState>): CrafterState {
  const state = store.getState();
  if ('craftercms' in state) {
    validateCrafterStore(state.craftercms);
    return state.craftercms;
  } else {
    validateCrafterStore(store);
    return state;
  }
}

function validateCrafterStore(store: Object) {
  if (!('studioConfig' in store)) {
    // TODO
    // * Link to right page when we have it.
    // * Improve copy
    log(
      'Missing craftercms store properties on the app store. ' +
      'Make sure you\'ve configured the state and reducers appropriately. ' +
      'See http://docs.craftercms.com/ for more',
      log.ERROR
    );
  }
}

/**
 * Flattens a collection, returning its entries and childIds per entry
 * @param {Store<CrafterNamespacedState>} collection
 * @param {string} childrenProperty
 * @returns {LookupTable}
 */
export function flattenEntries(collection: LookupTable<any>, childrenProperty:string = 'children'): LookupTable<any>{
  let entries: LookupTable<any> = {},
      childIds: LookupTable<any> = {};

  for (let property in collection) {
      if (collection.hasOwnProperty(property)) {
        if (childrenProperty === property && collection[property]){
          for (const child of collection[property]) {
            let newState = flattenEntries(child, childrenProperty);
           
            entries = Object.assign(entries, newState.entries),
            childIds = Object.assign(childIds, newState.childIds)
    
          }
        } else {
          if("url" === property){            
            let children = collection[childrenProperty],
                ids = [];
            let noChildren = { ...collection };
            noChildren[childrenProperty] = null;
            
            if(children && children.length > 0){
              for (const child of children) {
                ids.push(child.url);
              }
            }

            entries[collection[property]] = noChildren;
            childIds[collection[property]] = ids;
          }
        }
      }
  }
  
  return {
    entries,
    childIds
  };
  
}