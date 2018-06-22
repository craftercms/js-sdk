import { Query } from '@craftercms/search';

export const SEARCH = 'CRAFTERCMS_SEARCH';
export const SEARCH_COMPLETE = 'CRAFTERCMS_SEARCH_COMPLETE';

//TODO: query type
export function search(query: Query) {
  return {
    type: SEARCH,
    payload: query
  }
}

export function searchComplete(searchResponseObj: {
  response,
  queryId: string
}) {
  return {
    type: SEARCH_COMPLETE,
    payload: searchResponseObj
  }
}