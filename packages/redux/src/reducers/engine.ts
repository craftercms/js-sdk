import { AnyAction } from 'redux';

import { GET_ITEM_COMPLETE, GET_ITEM } from '../actions/engine';
import { CrafterReduxState, Item } from '@craftercms/models';

export function itemsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): CrafterReduxState<Item> {
  switch (action.type) {
    case GET_ITEM: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: true
        }
      }
    }
    case GET_ITEM_COMPLETE: {
      const item: Item = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: false
        },
        entries: {
          ...state.entries,
          [item.url]: item
        }
      }
    }
    default:
      return state
  }
}

export function navigationReducer(state = {
  loading: {},
  entries: {}
}, action: AnyAction) {
  switch (action.type) {
    default:
      return state
  }
}
