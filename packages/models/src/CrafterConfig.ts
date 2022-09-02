/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import { LookupTable } from '@craftercms/models';

export interface CrafterConfig {
  site: string;
  cors: boolean | RequestInit['mode'];
  baseUrl: string;
  searchId?: string;
  endpoints?: Endpoints;
  contentTypeRegistry?: LookupTable;
  headers: LookupTable;
}

export interface Endpoints {
  GET_ITEM_URL: string;
  GET_DESCRIPTOR: string;
  GET_CHILDREN: string;
  GET_TREE: string;
  GET_NAV_TREE: string;
  GET_BREADCRUMB: string;
  TRANSFORM_URL: string;
  ELASTICSEARCH: string;
}

export default CrafterConfig;
