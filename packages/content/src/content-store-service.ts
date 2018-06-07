import { Observable } from 'rxjs/internal/Observable';

import { SDKService, StudioConfig, Descriptor, Item } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';
import {
  GET_CHILDREN_ENDPOINT,
  GET_DESCRIPTOR_ENDPOINT,
  GET_ITEM_URL_ENDPOINT,
  GET_TREE_ENDPOINT
} from './api-endpoints';

let contentStoreService: ContentStoreService;

/**
 * Content Store Service API
 */
export class ContentStoreService extends SDKService {

  static getItem(url: string, config: StudioConfig): Observable<Item> {
    const requestURL = composeUrl(config, GET_ITEM_URL_ENDPOINT);
    return SDKService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  static getDescriptor(url: string, config: StudioConfig): Observable<Descriptor> {
    const requestURL = composeUrl(config, GET_DESCRIPTOR_ENDPOINT);
    return SDKService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  static getChildren(url: string, config: StudioConfig): Observable<Item[]> {
    const requestURL = composeUrl(config, GET_CHILDREN_ENDPOINT);
    return SDKService.httpGet(requestURL, { url, crafterSite: config.site });
  }

  static getTree(url: string, config: StudioConfig, depth: number = 1): Observable<Item> {
    const requestURL = composeUrl(config, GET_TREE_ENDPOINT);
    return SDKService.httpGet(requestURL, { url, depth, crafterSite: config.site });
  }

  static getInstance(config?: StudioConfig): ContentStoreService {
    if (contentStoreService == null) {
      if (config == null) {
        throw new Error('First call to ContentStoreService.getInstance requires the StudioConfig to be supplied.');
      }
      contentStoreService = new ContentStoreService(config);
    }
    return contentStoreService;
  }

  /**
   * Returns an Item from the content store.
   * @param {string} url - The item’s url
   */
  getItem(url: string): Observable<Item> {
    return ContentStoreService.getItem(url, this.config);
  }

  /**
   * Returns the descriptor data of an Item in the content store.
   * @param {string} url - The item’s url
   */
  getDescriptor(url: string): Observable<Descriptor> {
    return ContentStoreService.getDescriptor(url, this.config);
  }

  /**
   * Returns the list of Items directly under a folder in the content store.
   * @param {string} url - the folder’s url
   */
  getChildren(url: string): Observable<Item[]> {
    return ContentStoreService.getChildren(url, this.config);
  }

  /**
   * Returns the complete Item hierarchy under the specified folder in the content store.
   * @param {string} url - the folder’s url
   * @param {int} depth - Amount of levels to include
   */
  getTree(url: string, depth: number = 1): Observable<Item> {
    return ContentStoreService.getTree(url, this.config);
  }

}
