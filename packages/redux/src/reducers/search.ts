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
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action) {
  switch (action.type) {
    case SEARCH: {
      const queryId: string = action.payload.uuid;

      return {
        ...state,
        loading: {
          ...state.loading,
          [queryId]: false
        }
      }
    }
    case SEARCH_COMPLETE: {
      const response = action.payload.response,
            queryId = action.payload.queryId;

      return {
        ...state,
        loading: {
          ...state.loading,
          [queryId]: false
        },
        entries: {
          ...state.entries,
          [queryId]: response
        }
      }
    }
    default: {
      return {
        state
      }
    }
  }
}