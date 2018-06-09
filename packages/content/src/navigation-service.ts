import { Observable } from 'rxjs';

import { StudioConfig, SDKService } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';
import { GET_NAV_TREE_ENDPOINT, GET_BREADCRUMB_ENDPOINT } from './api-endpoints';

let navigationService: NavigationService;

/**
 * Navigation Service API
 */
export class NavigationService extends SDKService {

  static getNavTree(url: string, config: StudioConfig, depth: number = 1, currentPageUrl: string = ''): Observable<any> {
    const requestURL = composeUrl(config, GET_NAV_TREE_ENDPOINT);
    return SDKService.httpGet(requestURL, {
      crafterSite: config.site, url, depth, currentPageUrl
    });
  }

  static getNavBreadcrumb(url: string, config: StudioConfig, root: string = ''): Observable<any> {
    const requestURL = composeUrl(config, GET_BREADCRUMB_ENDPOINT);
    return SDKService.httpGet(requestURL, {
      crafterSite: config.site, url, root
    });
  }

  static getInstance(config?: StudioConfig): NavigationService {
    if (navigationService == null) {
      if (config == null) {
        throw new Error('First call to NavigationService.getInstance requires the StudioConfig to be supplied.');
      }
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
  getNavTree(url: string, depth: number = 1, currentPageUrl: string = ''): Observable<any> {
    return NavigationService.getNavTree(url, this.config, depth, currentPageUrl);
  }

  /**
   * Returns the navigation items that form the breadcrumb for the specified store URL.
   * @param {string} url - the current URL used to build the breadcrumb
   * @param {string} root - the root URL, basically the starting point of the breadcrumb
   */
  getNavBreadcrumb(url: string, root: string = ''): Observable<any> {
    return NavigationService.getNavBreadcrumb(url, this.config, root);
  }

}
