import { Observable } from 'rxjs';

import { crafterConf, SDKService } from '@craftercms/classes';
import { CrafterConfig } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';

/**
 * URL Transformation Service API
 */
export class UrlTransformationService extends SDKService {

  /**
   * Transforms a URL, based on the current site's UrlTransformationEngine.
   * @param {string} transformerName - Name of the transformer to apply
   * @param {string} url - URL that will be transformed
   */
  static transform(transformerName: string, url: string): Observable<any>;
  static transform(transformerName: string, url: string, config: CrafterConfig): Observable<any>;
  static transform(transformerName: string, url: string, config: CrafterConfig = crafterConf.getConfig()): Observable<any> {
    const requestURL = composeUrl(config, config.endpoints.TRANSFORM_URL);
    return SDKService.httpGet(requestURL, {
      crafterSite: config.site,
      transformerName,
      url
    });
  }

}
