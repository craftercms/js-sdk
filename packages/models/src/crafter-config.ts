/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
