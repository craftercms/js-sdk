/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
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
import { pluck } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import 'url-search-params-polyfill';
import { LookupTable } from '@craftercms/models';

export function httpGet<T extends any = any>(requestURL: string, params: Object = {}, headers?: LookupTable): Observable<T> {
  const searchParams = new URLSearchParams(params as URLSearchParams);
  return ajax.get(`${requestURL}?${searchParams.toString()}`, headers).pipe(
    pluck<AjaxResponse, T>('response')
  );
}

export function httpPost<T extends any = any>(requestURL: string, body: Object = {}, headers?: LookupTable): Observable<T> {
  return ajax.post(requestURL, body, { 'Content-Type': 'application/json', ...headers }).pipe(
    pluck<AjaxResponse, T>('response')
  );
}

export const SDKService = {
  httpGet,
  httpPost
};

export default SDKService;
