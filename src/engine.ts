/*
 * Copyright (C) 2007-2018 Crafter Software Corporation. All rights reserved.
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

import { Observable } from 'rxjs/internal/Observable';

import { BaseService } from './base-service';
import { StudioConfig } from './studio-config';
import { composeUrl } from './utils';

export const GET_ITEM_URL = '/api/1/site/content_store/item.json';
export const GET_DESCRIPTOR = '/api/1/site/content_store/descriptor.json';
export const GET_CHILDREN = '/api/1/site/content_store/children.json';
export const GET_TREE = '/api/1/site/content_store/tree.json';
export const GET_NAV_TREE = '/api/1/site/navigation/tree.json';
export const GET_BREADCRUMB = '/api/1/site/navigation/breadcrumb.json';
export const TRANSFORM_URL = '/api/1/site/url/transform.json';

// TODO move out to a craftercms-models package
export interface Item {}
export interface Descriptor {}

// Singleton service instance keepers.
let
  contentStoreService: ContentStoreService,
  navigationService: NavigationService,
  urlTransformService: UrlTransformationService,
  engineClient: EngineClient;

/**
 * Content Store Service API
 */
export class ContentStoreService extends BaseService {

  static getItem(url: string, config: StudioConfig): Observable<Item> {
    const requestURL = composeUrl(config, GET_ITEM_URL);
    return BaseService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  static getDescriptor(url: string, config: StudioConfig): Observable<Descriptor> {
    const requestURL = composeUrl(config, GET_DESCRIPTOR);
    return BaseService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  static getChildren(url: string, config: StudioConfig): Observable<Item[]> {
    const requestURL = composeUrl(config, GET_CHILDREN);
    return BaseService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  static getTree(url: string, config: StudioConfig, depth: number = 1): Observable<Item> {
    const requestURL = composeUrl(config, GET_TREE);
    return BaseService.httpGet(requestURL, { url, depth, crafterSite: config.site });
  }

  static getInstance(config: StudioConfig): ContentStoreService {
    if (contentStoreService == null) {
      contentStoreService = new ContentStoreService(config);
    }
    return contentStoreService;
  }

  /**
   * Returns an Item from the content store.
   * @param {string} url - The item’s url
   */
  getItem(url): Observable<Item> {
    return ContentStoreService.getItem(url, this.config);
  }

  /**
   * Returns the descriptor data of an Item in the content store.
   * @param {string} url - The item’s url
   */
  getDescriptor(url): Observable<Descriptor> {
    return ContentStoreService.getDescriptor(url, this.config);
  }

  /**
   * Returns the list of Items directly under a folder in the content store.
   * @param {string} url - the folder’s url
   */
  getChildren(url): Observable<Item[]> {
    return ContentStoreService.getChildren(url, this.config);
  }

  /**
   * Returns the complete Item hierarchy under the specified folder in the content store.
   * @param {string} url - the folder’s url
   * @param {int} depth - Amount of levels to include
   */
  getTree(url, depth): Observable<Item> {
    return ContentStoreService.getTree(url, this.config);
  }

}

/**
 * Navigation Service API
 */
export class NavigationService extends BaseService {

  static getNavTree(url: string, config: StudioConfig, depth: number = 1, currentPageUrl: string = ''): Observable {
    const requestURL = composeUrl(config, GET_NAV_TREE);
    return BaseService.httpGet(requestURL, {
      crafterSite: config.site, url, depth, currentPageUrl
    });
  }

  static getNavBreadcrumb(url: string, config: StudioConfig, root: string = ''): Observable {
    const requestURL = composeUrl(config, GET_BREADCRUMB);
    return BaseService.httpGet(requestURL, {
      crafterSite: config.site, url, root
    });
  }

  static getInstance(config: StudioConfig): NavigationService {
    if (navigationService == null) {
      navigationService = new NavigationService(config);
    }
    return navigationService;
  }

  /**
   * Returns the navigation tree with the specified depth for the specified store URL.
   * @param {string} url - the root folder of the tree
   * @param {int} depth - the depth of the tree
   * @param {string} currentPageUrl - the URL of the current page
   */
  getNavTree(url: string, depth: number = 1, currentPageUrl: string = ''): Observable {
    return NavigationService.getNavTree(url, this.config, depth, currentPageUrl);
  }

  /**
   * Returns the navigation items that form the breadcrumb for the specified store URL.
   * @param {string} url - the current URL used to build the breadcrumb
   * @param {string} root - the root URL, basically the starting point of the breadcrumb
   */
  getNavBreadcrumb(url: string, root: string = ''): Observable {
    return NavigationService.getNavBreadcrumb(url, this.config, root);
  }

}

/**
 * URL Transformation Service API
 */
export class UrlTransformationService extends BaseService {

  static transform(transformerName: string, url: string, config: StudioConfig): Observable {
    const requestURL = composeUrl(config, TRANSFORM_URL);
    return BaseService.httpGet(requestURL, {
      crafterSite: config.site,
      transformerName,
      url
    });
  }

  static getInstance(config: StudioConfig): UrlTransformationService {
    if (urlTransformService == null) {
      urlTransformService = new UrlTransformationService(config);
    }
    return urlTransformService;
  }

  /**
   * Transforms a URL, based on the current site's UrlTransformationEngine.
   * @param {string} transformerName - Name of the transformer to apply
   * @param {string} url - URL that will be transformed
   */
  transform(transformerName, url): Observable {
    return UrlTransformationService.transform(transformerName, url, this.config);
  }

}

/**
 * Wrapper class for engine-related services.
 */
export class EngineClient extends UrlTransformationService, NavigationService, ContentStoreService {
  static getInstance(config: StudioConfig): EngineClient {
    if (engineClient == null) {
      engineClient = new EngineClient(config);
    }
    return engineClient;
  }
}
