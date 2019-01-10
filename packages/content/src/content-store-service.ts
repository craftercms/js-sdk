/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
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
 * Content Store Service API
 */
export class ContentStoreService extends SDKService {

  /**
   * Returns an Item from the content store.
   * @param {string} url - The item’s url
   */
  static getItem(url: string): Observable<Item>;
  static getItem(url: string, config: CrafterConfig): Observable<Item>;
  static getItem(url: string, config: CrafterConfig = crafterConf.getConfig()): Observable<Item> {
    const requestURL = composeUrl(config, config.endpoints.GET_ITEM_URL);
    return SDKService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  /**
   * Returns the descriptor data of an Item in the content store.
   * @param {string} url - The item’s url
   */
  static getDescriptor(url: string): Observable<Descriptor>;
  static getDescriptor(url: string, config: CrafterConfig): Observable<Descriptor>;
  static getDescriptor(url: string, config: CrafterConfig = crafterConf.getConfig()): Observable<Descriptor> {
    const requestURL = composeUrl(config, config.endpoints.GET_DESCRIPTOR);
    return SDKService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  /**
   * Returns the list of Items directly under a folder in the content store.
   * @param {string} url - the folder’s url
   */
  static getChildren(url: string): Observable<Item[]>;
  static getChildren(url: string, config: CrafterConfig): Observable<Item[]>;
  static getChildren(url: string, config: CrafterConfig = crafterConf.getConfig()): Observable<Item[]> {
    const requestURL = composeUrl(config, config.endpoints.GET_CHILDREN);
    return SDKService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  /**
   * Returns the complete Item hierarchy under the specified folder in the content store.
   * @param {string} url - the folder’s url
   * @param {int} depth - Amount of levels to include
   */
  static getTree(url: string): Observable<Item>;
  static getTree(url: string, depth: number): Observable<Item>
  static getTree(url: string, depth: number, config: CrafterConfig): Observable<Item>;
  static getTree(url: string, depth: number = 1, config: CrafterConfig = crafterConf.getConfig()): Observable<Item> {
    const requestURL = composeUrl(config, config.endpoints.GET_TREE);
    return SDKService.httpGet(requestURL, { url, depth, crafterSite: config.site });
  }

}
