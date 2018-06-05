export function createLookupTable<T>(list: T[], idProp: string = 'id') {
  return list.reduce(
    (table, item: T) => {
      const id = item[idProp];
      table[id] = item;
      return table;
    }, {});
}


export function composeUrl(baseUrl: string, endpoint: string): string;
export function composeUrl(studioConfig: { baseUrl }, endpoint: string): string;
export function composeUrl(studioConfigOrBaseUrl: string | { baseUrl }, endpoint: string): String {
  return `${typeof studioConfigOrBaseUrl === 'string' ? studioConfigOrBaseUrl : studioConfigOrBaseUrl.baseUrl}/${endpoint}`;
}
