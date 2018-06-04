
// This shows the option where we create a wrapper class that converts every observable
// response into a promise. All methods need to be re-declared & re-implemented
// as shown by the sample `getItem` method.

// Alternatively, the main observable based class could receive a constructor
// flag named `promiseBased` that would make the *instance* methods return promises
// when set to true.

// This is just a convenience for people whom may prefer promises due to lack of
// familiarity with observable or simply preference; so that they don't have to manually
// invoke the .toPromise() on every response they get from the main service. Worth?

import { Item, StudioConfig, SDKService } from '@craftercms/models';
import { ContentStoreService as ContentStoreService$ } from '../content-store-service';

let contentStoreService;

export class ContentStoreService extends SDKService {

  static getItem(url: string, config: StudioConfig): Promise<Item> {
    return ContentStoreService$.getItem(url, config).toPromise();
  }

  getItem(url): Promise<Item> {
    return ContentStoreService$.getItem(url, this.config).toPromise();
  }

  static getInstance(config: StudioConfig): ContentStoreService {
    if (contentStoreService == null) {
      contentStoreService = new ContentStoreService(config);
    }
    return contentStoreService;
  }

}
