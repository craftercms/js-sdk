import { LookupTable } from '@craftercms/models';

export function createLookupTable<T>(list: T[], idProp: string = 'id'): LookupTable<T> {
  return list.reduce((table: Object, item: T) => {
    const id = item[idProp];
    table[id] = item;
    return table;
  }, {});
}
