import { applyMiddleware, compose, Store, createStore, combineReducers, AnyAction } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { log } from '@craftercms/utils';
import { CrafterState, CrafterNamespacedState } from '@craftercms/models';
import { allEpics, allReducers } from '@craftercms/redux';

export function createReduxStore(config: {
  namespaceCrafterState?: boolean, // TODO implement...
  reducerMixin?: { [statePropName: string]: Function },
  epicsArray?: Epic<AnyAction, Store<any>>[],
  reduxDevTools?: boolean
} = {}) {

  config = Object.assign({}, {
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

  return createStore(
    config.reducerMixin
      ? combineReducers({ ...allReducers, ...config.reducerMixin })
      : combineReducers(allReducers),
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
