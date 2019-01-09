/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

export class SDKService {

  static httpGet(requestURL: string, params: Object = {}): Observable<any> {
    const searchParams = new URLSearchParams(params as URLSearchParams);
      
    return ajax.get(`${requestURL}?${searchParams.toString()}`)
      .pipe(
        map((ajaxResponse: AjaxResponse) => ajaxResponse.response)
      );
  }

  static httpPost(requestURL: string, body: Object = {}): Observable<any> {
    return ajax.post(requestURL, body)
      .pipe(map((ajaxResponse: AjaxResponse) => ajaxResponse.response));
  }

}
