/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
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
 * Transforms a URL, based on the current site's UrlTransformationEngine.
 * @param {string} transformerName - Name of the transformer to apply
 * @param {string} url - URL that will be transformed
 */
export function urlTransform(transformerName: string, url: string): Observable<any>;
export function urlTransform(transformerName: string, url: string, config: CrafterConfig): Observable<any>;
export function urlTransform(transformerName: string, url: string, config?: CrafterConfig): Observable<any> {
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.TRANSFORM_URL);
  return SDKService.httpGet(requestURL, {
    crafterSite: config.site,
    transformerName,
    url
  });
}

/**
 * URL Transformation Service API
 */
export const UrlTransformationService = {
  transform: urlTransform,
  urlTransform
};

export default UrlTransformationService;
