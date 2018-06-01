
// This shows the option where we create a wrapper class that converts everything
// observable response into a promise. All methods need to be re-declared & re-implemented
// as shown by the sample `getItem` method.

// Alternatively, the main observable based class could receive a constructor
// flag named `promiseBased` that would make the *instance* methods return promises
// when set to true.

// This is just a convenience for people whom may prefer promises due to lack of
// familiarity with observable or simply preference; so that they don't have to manually
// invoke the .toPromise() on every response they get from the main service. Worth?

import { BaseService } from '../base-service';
import { StudioConfig } from '../studio-config';
import { ContentStoreService as ObservableContentStoreService, Item } from '../engine';

// Singleton service instance keepers.
let contentStoreService, navigationService, urlTransformService, engineClient;

export class ContentStoreService extends BaseService {

  static getItem(url: string, config: StudioConfig): Promise<Item> {
    return ObservableContentStoreService.getItem(url, config).toPromise();
  }

  getItem(url) {
    return ContentStoreService.getItem(url, this.config);
  }

  static getInstance(config: StudioConfig) {
    if (contentStoreService == null) {
      contentStoreService = new ContentStoreService(config);
    }
    return contentStoreService;
  }

}
