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
