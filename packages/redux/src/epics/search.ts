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

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';

import { crafterConf } from '@craftercms/classes';
import { SearchService } from '@craftercms/search';
import {
  SEARCH,
  searchComplete
} from '../actions/search';

export const searchEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
    ofType(SEARCH),
    mergeMap(({ payload }) =>
      SearchService.search(payload, crafterConf.getConfig())
        .pipe(
          map(response => searchComplete({
            response: response.response ? response.response : response,
            queryId: payload.uuid
          })),
          catchError(() => of(searchComplete({
            queryId: payload.uuid
          })))
        ))
  );

export const allSearchEpics = [
  searchEpic
];
