import { applyMiddleware, compose, Store, createStore, combineReducers, AnyAction, ReducersMapObject } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { log } from '@craftercms/utils';
import { CrafterState, CrafterNamespacedState, LookupTable } from '@craftercms/models';
import { allEpics, allReducers } from '@craftercms/redux';

export function createReduxStore(config: {
  namespace?: string,
  namespaceCrafterState?: boolean, // TODO implement...
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


function processObj(obj, subItemProp){
  const objNoChildren = { ...obj },
        childIds = [],
        children = obj[subItemProp];

  objNoChildren[subItemProp] = null;

  if(children && children.length > 0){
    for (const child of children) {
      childIds.push(child.url);
    }
  }

  return {
    objNoChildren: objNoChildren,
    childIds
  }
}

/**
 * TODO: description
 * @param {T[]} collection
 * @param {string} childrenProperty
 * @returns 
 */

export function flattenEntries<T>(collection: {}, childrenProperty:string = 'children'): LookupTable<any>{
  var state = {
    entries: {},
    childIds: {}
  };
  var entriesObj = {};

  for (var property in collection) {
      if (collection.hasOwnProperty(property)) {
        if (childrenProperty === property && collection[property]){
          for (const child of collection[property]) {
            var newState = flattenEntries(child, childrenProperty);
            state = {
              entries: Object.assign(state.entries, newState.entries),
              childIds: Object.assign(state.childIds, newState.childIds)
            }

          }
        } else {
          if("url" === property){
            var processedObj = processObj(collection, childrenProperty);
            state.entries[collection[property]] = processedObj.objNoChildren;
            state.childIds[collection[property]] = processedObj.childIds;
          }
        }
      }
  }
  
  return state;
  
}