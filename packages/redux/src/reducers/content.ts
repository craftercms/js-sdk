/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

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
      const { item, url } = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: false
        },
        entries: {
          ...state.entries,
          [url]: item
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
      const { descriptor, url } = action.payload;
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
      const { children, url } = action.payload;
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
      const { url } = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: true
        }
      }
    }
    case GET_TREE_COMPLETE: {
      const { tree, url } = action.payload;
      const flatEntries = typeof(tree) === "undefined" ? null : flattenEntries(tree);

      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: false
        },
        entries: flatEntries ? { ...state.entries, ...flatEntries.entries } : { ...state.entries },
        childIds: flatEntries ? { ...state.childIds, ...flatEntries.childIds } : { ...state.childIds }
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
      const { url } = action.payload;

      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: true
        }
      }
    }
    case GET_NAV_BREADCRUMB_COMPLETE: {
      const { breadcrumb, url } = action.payload;
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
      const { nav, url } = action.payload;
      const flatEntries = typeof(nav) === "undefined" ? null : flattenEntries(nav, 'subItems');

      return {
        ...state,
        loading: {
          ...state.loading,
          [url]: false
        },
        entries: flatEntries ? { ...state.entries, ...flatEntries.entries } : { ...state.entries },
        childIds: flatEntries ? { ...state.childIds, ...flatEntries.childIds } : { ...state.childIds }
      }
    }
    default:
      return state
  }
}
