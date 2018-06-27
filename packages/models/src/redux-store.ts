import { Item, LookupTable } from '@craftercms/models';

export interface StateContainer<T> {
  entries: LookupTable<T>;
  loading: LookupTable<boolean>;
  childIds?: LookupTable<string | number>;
}

export interface CrafterState {
  items?: StateContainer<Item>;
  [prop: string]: any;
}

export interface CrafterNamespacedState extends CrafterState {
  craftercms?: CrafterState;
  [prop: string]: any;
}
