import {
  SEARCH,
  SEARCH_COMPLETE
} from '../actions/search';

const DEFAULT = {
  search: {
    loading: true,
    query: '',
    response: {}
  }
};

// TODO
// What is it that this searches?
// What's the model?
// What's a better name?

export function searchReducer(state = {
  //loading: {}, // { all: boolean, [id: string]: boolean }
  //entries: {}
  loading: false
}, action) {
  switch (action.type) {
    case SEARCH: {
      return { ...state, loading: true }
    }
    case SEARCH_COMPLETE: {
      return {
        ...state,
        loading: false
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}