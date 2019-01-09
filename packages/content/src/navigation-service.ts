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

import { Observable } from 'rxjs';

import { crafterConf, SDKService } from '@craftercms/classes';
import { CrafterConfig } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';

// TODO: Add correct return types
type ToDoGetNavTreeReturnType = Observable<any>;
type ToDoGetNavBreadcrumbReturnType = Observable<any>;

/**
 * Navigation Service API
 */
export class NavigationService extends SDKService {

  /**
   * Returns the navigation tree with the specified depth for the specified store URL.
   * @param {string} url - the root folder of the tree
   * @param {int} depth - the depth of the tree
   * @param {string} currentPageUrl - the URL of the current page
   */
  static getNavTree(url: string): ToDoGetNavTreeReturnType;
  static getNavTree(url: string, depth: number): ToDoGetNavTreeReturnType;
  static getNavTree(url: string, depth: number, currentPageUrl: string): ToDoGetNavTreeReturnType;
  static getNavTree(url: string, depth: number, currentPageUrl: string, config: CrafterConfig): ToDoGetNavTreeReturnType;
  static getNavTree(url: string, depth: number = 1, currentPageUrl: string = '', config: CrafterConfig = crafterConf.getConfig()): ToDoGetNavTreeReturnType {
    const requestURL = composeUrl(config, config.endpoints.GET_NAV_TREE);
    return SDKService.httpGet(requestURL, {
      crafterSite: config.site, url, depth, currentPageUrl
    });
  }

  /**
   * Returns the navigation items that form the breadcrumb for the specified store URL.
   * @param {string} url - the current URL used to build the breadcrumb
   * @param {string} root - the root URL, basically the starting point of the breadcrumb
   */
  static getNavBreadcrumb(url: string): ToDoGetNavBreadcrumbReturnType;
  static getNavBreadcrumb(url: string, root: string): ToDoGetNavBreadcrumbReturnType;
  static getNavBreadcrumb(url: string, root: string, config: CrafterConfig): ToDoGetNavBreadcrumbReturnType;
  static getNavBreadcrumb(url: string, root: string = '', config: CrafterConfig = crafterConf.getConfig()): ToDoGetNavBreadcrumbReturnType {
    const requestURL = composeUrl(config, config.endpoints.GET_BREADCRUMB);
    return SDKService.httpGet(requestURL, {
      crafterSite: config.site, url, root
    });
  }

}
