import { combineReducers } from 'redux';
import { itemsReducer, navigationReducer } from './engine';

export const allReducers = {
  items: itemsReducer,
  navigation: navigationReducer
  /*...etc*/
};

export const rootReducer = combineReducers(allReducers);

export const namespacedReducer = (state, action) => {
  // TODO...
};
