export const SEARCH = 'CRAFTERCMS_SEARCH';
export const SEARCH_COMPLETE = 'CRAFTERCMS_SEARCH_COMPLETE';


export function search(payload) {
  return {
    type: SEARCH,
    payload
  }
}

export function searchComplete(payload) {
  return {
    type: SEARCH_COMPLETE,
    payload
  }
}
