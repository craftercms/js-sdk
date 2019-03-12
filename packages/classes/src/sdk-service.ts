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
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import 'url-search-params-polyfill';

export class SDKService {

  static httpGet(requestURL: string, params: Object = {}): Observable<any> {
    const searchParams = new URLSearchParams(params as URLSearchParams);
      
    return ajax.get(`${requestURL}?${searchParams.toString()}`)
      .pipe(
        map((ajaxResponse: AjaxResponse) => ajaxResponse.response)
      );
  }

  static httpPost(requestURL: string, body: Object = {}): Observable<any> {
    return ajax.post(requestURL, body, { 'Content-Type': 'application/json' })
      .pipe(map((ajaxResponse: AjaxResponse) => ajaxResponse.response));
  }
}
