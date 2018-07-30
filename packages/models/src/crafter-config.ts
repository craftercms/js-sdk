import { LookupTable } from '@craftercms/models';

export interface CrafterConfig {
  site: string;
  baseUrl: string;
  endpoints?: Endpoints;
  contentTypeRegistry?: LookupTable<any>;
  // actions?
}

export interface Endpoints {
  GET_ITEM_URL: string;
  GET_DESCRIPTOR: string;
  GET_CHILDREN: string;
  GET_TREE: string;
  GET_NAV_TREE: string;
  GET_BREADCRUMB: string;
  TRANSFORM_URL: string;
  SEARCH: string;
}
