import { AnyAction } from 'redux';
import { flattenEntries } from '../utils';

import { 
  GET_ITEM,
  GET_ITEM_COMPLETE, 
  GET_DESCRIPTOR,
  GET_DESCRIPTOR_COMPLETE,
  GET_CHILDREN,
  GET_CHILDREN_COMPLETE,
  GET_TREE,
  GET_TREE_COMPLETE,
  GET_NAV_BREADCRUMB,
  GET_NAV_BREADCRUMB_COMPLETE,
  GET_NAV,
  GET_NAV_COMPLETE
} from '../actions/content';
import { StateContainer, Item, Descriptor } from '@craftercms/models';

export function itemsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
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
          [item.url]: false
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

export function descriptorsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_DESCRIPTOR: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: true
        }
      }
    }
    case GET_DESCRIPTOR_COMPLETE: {
      const descriptor = action.payload.descriptor,
            url = action.payload.url;
      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: false
        },
        entries: {
          ...state.entries,
          [url]: descriptor
        }
      }
    }
    default:
      return state
  }
}

export function childrenReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_CHILDREN: {
      const url = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: true
        }
      }
    }
    case GET_CHILDREN_COMPLETE: {
      const children: Array<Item> = action.payload.children,
            url: string = action.payload.url;
      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: false
        },
        entries: {
          ...state.entries,
          [url]: children
        }
      }
    }
    default:
      return state
  }
}

export function treeReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {},
  childIds: {}
}, action: AnyAction): StateContainer<any> {
  switch (action.type) {
    case GET_TREE: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.url]: true
        }
      }
    }
    case GET_TREE_COMPLETE: {
      const flatEntries = flattenEntries(action.payload);

      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.url]: false
        },
        entries: { ...state.entries, ...flatEntries.entries },
        childIds: { ...state.childIds, ...flatEntries.childIds }
      }
    }
    default:
      return state
  }
}

export function breadcrumbsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_NAV_BREADCRUMB: {
      const url = action.payload.url

      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: true
        }
      }
    }
    case GET_NAV_BREADCRUMB_COMPLETE: {
      const breadcrumb: Array<Item> = action.payload.breadcrumb,
            url: string = action.payload.url;
      console.log("GET_NAV_BREADCRUMB_PAYLOAD", action.payload);
      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: false
        },
        entries: {
          ...state.entries,
          [url]: breadcrumb
        }
      }
    }
    default:
      return state
  }
}

export function navigationReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {},
  childIds: {}
}, action: AnyAction): StateContainer<any> {
  switch (action.type) {
    case GET_NAV: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.url]: true
        }
      }
    }
    case GET_NAV_COMPLETE: {
      const item: Item = action.payload;
      const flatEntries = flattenEntries(action.payload, 'subItems');

      return {
        ...state,
        loading: {
          ...state.loading,
          [item.url]: false
        },
        entries: { ...state.entries, ...flatEntries.entries },
        childIds: { ...state.childIds, ...flatEntries.childIds }
      }
    }
    default:
      return state
  }
}
