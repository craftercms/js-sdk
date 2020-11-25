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
import { AnyAction } from 'redux';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { ContentStoreService, NavigationService } from '@craftercms/content';
import {
  GET_ITEM,
  getItemComplete,
  GET_DESCRIPTOR,
  getDescriptorComplete,
  GET_CHILDREN,
  getChildrenComplete,
  GET_TREE,
  getTreeComplete,
  GET_NAV,
  getNavComplete,
  GET_NAV_BREADCRUMB,
  getNavBreadcrumbComplete
} from '../actions/content';

export const getItemEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
    ofType(GET_ITEM),
    mergeMap(({ payload }) =>
      ContentStoreService.getItem(payload)
        .pipe(
          map(item => getItemComplete({
            item,
            url: payload
          })),
          catchError(() => of(getItemComplete({
            url: payload
          })))
        ))
  );

export const getDescriptorEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_DESCRIPTOR),
      mergeMap(({ payload }) =>
        ContentStoreService.getDescriptor(payload)
          .pipe(
              map(descriptor => getDescriptorComplete({
                descriptor,
                url: payload
              })),
              catchError(() => of(getDescriptorComplete({
                url: payload
              })))
          ))

  );

export const getChildrenEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_CHILDREN),
      mergeMap(({ payload }) =>
      ContentStoreService.getChildren(payload)
          .pipe(
              map(children => getChildrenComplete({
                children,
                url: payload
              })),
              catchError(() => of(getChildrenComplete({
                url: payload
              })))
          ))
  );

export const getTreeEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_TREE),
      mergeMap(({ payload }) =>
      ContentStoreService.getTree(payload.url, payload.depth)
          .pipe(
              map(tree => getTreeComplete({
                tree,
                url: payload.url
              })),
              catchError(() => of(getTreeComplete({
                url: payload.url
              })))
          ))
  );

export const getNavEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_NAV),
      mergeMap(({ payload }) =>
      NavigationService.getNavTree(payload.url, payload.depth, payload.currentPageUrl)
          .pipe(
              map(nav => getNavComplete({
                nav,
                url: payload.url
              })),
              catchError(() => of(getNavComplete({
                url: payload.url
              })))
          ))
  );

export const getNavBreadcrumbEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_NAV_BREADCRUMB),
      mergeMap(({ payload }) =>
      NavigationService.getNavBreadcrumb(payload.url, payload.root)
          .pipe(
              map(breadcrumb => getNavBreadcrumbComplete({
                breadcrumb,
                url: payload.url
              })),
              catchError(() => of(getNavBreadcrumbComplete({
                url: payload.url
              })))
          ))
  );

  export const allContentEpics = [
    getItemEpic,
    getDescriptorEpic,
    getChildrenEpic,
    getTreeEpic,
    getNavEpic,
    getNavBreadcrumbEpic
  ];
