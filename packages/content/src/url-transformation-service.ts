/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All rights reserved.
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
