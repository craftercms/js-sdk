import { Item, LookupTable, StudioConfig } from '@craftercms/models';

export interface CrafterReduxState<T> {
  loading: LookupTable<boolean>;
  entries: LookupTable<T>;
}

export interface CrafterReduxProps {
  studioConfig: StudioConfig;
  items?: CrafterReduxState<Item>;
  [prop: string]: any;
}

export interface CrafterReduxStore extends CrafterReduxProps {
  craftercms?: CrafterReduxProps;
  [prop: string]: any;
}
