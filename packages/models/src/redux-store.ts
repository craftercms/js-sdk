import { Item, LookupTable, CrafterConfig } from '@craftercms/models';

export interface StateContainer<T> {
  entries: LookupTable<T>;
  loading: LookupTable<boolean>;
  children?: LookupTable<string | number>;
}

export interface CrafterState {
  studioConfig: CrafterConfig;
  items?: StateContainer<Item>;
  [prop: string]: any;
}

export interface CrafterNamespacedState extends CrafterState {
  craftercms?: CrafterState;
  [prop: string]: any;
}
