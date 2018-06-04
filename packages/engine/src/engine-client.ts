import { Observable } from 'rxjs/internal/Observable';

import { Descriptor, Item, StudioConfig, SDKService } from '@craftercms/models';
import { UrlTransformationService } from '@craftercms/engine';
import { NavigationService } from '@craftercms/engine';
import { ContentStoreService } from '@craftercms/engine';

let engineClient: EngineClient;

/**
 * Wrapper class for engine-related services.
 */
export class EngineClient extends SDKService {

  // TODO doesn't make that much sense to have a getInstance with the `config` param
  static getInstance(config: StudioConfig): EngineClient {
    if (engineClient == null) {
      engineClient = new EngineClient(config);
    }
    return engineClient;
  }

  static transformUrl(transformerName: string, url: string, config: StudioConfig): Observable<any> {
    return UrlTransformationService.transform(transformerName, url, config);
  }

  static getNavigationTree(url: string, config: StudioConfig, depth: number = 1, currentPageUrl: string = ''): Observable<any> {
    return NavigationService.getNavTree(url, config, depth, currentPageUrl);
  }

  static getNavBreadcrumb(url: string, config: StudioConfig, root: string = ''): Observable<any> {
    return NavigationService.getNavBreadcrumb(url, config, root);
  }

  static getItem(url: string, config: StudioConfig): Observable<Item> {
    return ContentStoreService.getItem(url, config);
  }

  static getDescriptor(url: string, config: StudioConfig): Observable<Descriptor> {
    return ContentStoreService.getDescriptor(url, config);
  }

  static getChildren(url: string, config: StudioConfig): Observable<Item[]> {
    return ContentStoreService.getChildren(url, config);
  }

  static getTree(url: string, config: StudioConfig, depth: number = 1): Observable<Item> {
    return ContentStoreService.getTree(url, config, depth);
  }

  // Instead of a dedicated promise-based client, we could have this
  // class be configured to return promises too
  // constructor(config: StudioConfig, public promiseAPI: boolean = false) {
  //   super(config);
  // }

  transformUrl(transformerName: string, url: string): Observable<any> {
    return UrlTransformationService.transform(transformerName, url, this.config);
  }

  getNavigationTree(url: string, depth: number = 1, currentPageUrl: string = ''): Observable<any> {
    return NavigationService.getNavTree(url, this.config, depth, currentPageUrl);
  }

  getNavBreadcrumb(url: string, root: string = ''): Observable<any> {
    return NavigationService.getNavBreadcrumb(url, this.config, root);
  }

  getItem(url: string): Observable<Item> {
    return ContentStoreService.getItem(url, this.config);
  }

  getDescriptor(url: string): Observable<Descriptor> {
    return ContentStoreService.getDescriptor(url, this.config);
  }

  getChildren(url: string): Observable<Item[]> {
    return ContentStoreService.getChildren(url, this.config);
  }

  getTree(url: string, depth: number = 1): Observable<Item> {
    return ContentStoreService.getTree(url, this.config, depth);
  }

}
