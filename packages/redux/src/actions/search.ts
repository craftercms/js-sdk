import { Query } from '@craftercms/search';

export const SEARCH = 'CRAFTERCMS_SEARCH';
export const SEARCH_COMPLETE = 'CRAFTERCMS_SEARCH_COMPLETE';

export function search(query: Query) {
  return {
    type: SEARCH,
    payload: query
  }
}

export function searchComplete(searchResponseData: {
  queryId: string,
  response?
}) {
  return {
    type: SEARCH_COMPLETE,
    payload: searchResponseData
  }
}