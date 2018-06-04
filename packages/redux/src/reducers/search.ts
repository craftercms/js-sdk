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

export function searchReducer(state = DEFAULT, action) {
  switch (action.type) {
    case SEARCH: {
      return { ...state, fetching: true }
    }
    case SEARCH_COMPLETE: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        nav: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
