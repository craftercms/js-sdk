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
