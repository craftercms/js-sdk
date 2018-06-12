export const SEARCH = 'CRAFTERCMS_SEARCH';
export const SEARCH_COMPLETE = 'CRAFTERCMS_SEARCH_COMPLETE';

//TODO: query type
export function search(query) {
  return {
    type: SEARCH,
    payload: query
  }
}

export function searchComplete(searchResponse) {
  return {
    type: SEARCH_COMPLETE,
    payload: searchResponse
  }
}