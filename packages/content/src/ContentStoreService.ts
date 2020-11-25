/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
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

import { Observable } from 'rxjs';

import { crafterConf, SDKService } from '@craftercms/classes';
import { CrafterConfig, Descriptor, Item } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';

/**
 * Returns an Item from the content store.
 * @param {string} path - The item’s path
 */
export function getItem(path: string): Observable<Item>;
export function getItem(path: string, config: CrafterConfig): Observable<Item>;
export function getItem(path: string, config?: CrafterConfig): Observable<Item> {
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.GET_ITEM_URL);
  return SDKService.httpGet(requestURL, { url: path, crafterSite: config.site });
}

export interface GetDescriptorConfig {
  flatten: boolean;
}

/**
 * Returns the descriptor data of an Item in the content store.
 * @param {string} path - The item’s path
 * @param {CrafterConfig & GetDescriptorConfig} config? - The config override options to use
 */
export function getDescriptor(path: string): Observable<Descriptor>;
export function getDescriptor(path: string, config: Partial<CrafterConfig & GetDescriptorConfig>): Observable<Descriptor>;
export function getDescriptor(path: string, config?: Partial<CrafterConfig & GetDescriptorConfig>): Observable<Descriptor> {
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.GET_DESCRIPTOR);
  return SDKService.httpGet(requestURL, {
    url: path,
    crafterSite: config.site,
    flatten: Boolean(config.flatten)
  });
}

/**
 * Returns the list of Items directly under a folder in the content store.
 * @param {string} path - the folder’s path
 */
export function getChildren(path: string): Observable<Item[]>;
export function getChildren(path: string, config: CrafterConfig): Observable<Item[]>;
export function getChildren(path: string, config?: CrafterConfig): Observable<Item[]> {
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.GET_CHILDREN);
  return SDKService.httpGet(requestURL, { url: path, crafterSite: config.site });
}

/**
 * Returns the complete Item hierarchy under the specified folder in the content store.
 * @param {string} path - the folder’s path
 * @param {int} depth - Amount of levels to include
 */
export function getTree(path: string): Observable<Item>;
export function getTree(path: string, depth: number): Observable<Item>;
export function getTree(path: string, depth: number, config: CrafterConfig): Observable<Item>;
export function getTree(path: string, config: CrafterConfig): Observable<Item>;
export function getTree(path: string, depth: number | CrafterConfig = 1, config?: CrafterConfig): Observable<Item> {
  if (typeof depth === 'object') {
    config = depth;
    depth = 1;
  }
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.GET_TREE);
  return SDKService.httpGet(requestURL, { url: path, depth, crafterSite: config.site });
}

export const ContentStoreService = {
  getItem,
  getDescriptor,
  getChildren,
  getTree
};

export default ContentStoreService;
