import { Observable } from 'rxjs';

import { StudioConfig, SDKService } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';
import { TRANSFORM_URL_ENDPOINT } from './api-endpoints';

let urlTransformService: UrlTransformationService;

/**
 * URL Transformation Service API
 */
export class UrlTransformationService extends SDKService {

  static transform(transformerName: string, url: string, config: StudioConfig): Observable<any> {
    const requestURL = composeUrl(config, TRANSFORM_URL_ENDPOINT);
    return SDKService.httpGet(requestURL, {
      crafterSite: config.site,
      transformerName,
      url
    });
  }

  static getInstance(config?: StudioConfig): UrlTransformationService {
    if (urlTransformService == null) {
      if (config == null) {
        throw new Error('First call to UrlTransformationService.getInstance requires the StudioConfig to be supplied.');
      }
      urlTransformService = new UrlTransformationService(config);
    }
    return urlTransformService;
  }

  /**
   * Transforms a URL, based on the current site's UrlTransformationEngine.
   * @param {string} transformerName - Name of the transformer to apply
   * @param {string} url - URL that will be transformed
   */
  transform(transformerName, url): Observable<any> {
    return UrlTransformationService.transform(transformerName, url, this.config);
  }

}
