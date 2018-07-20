import { Observable } from 'rxjs';
import { AnyAction, Store } from 'redux';
import { mergeMap, map } from 'rxjs/operators';
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
          map(item => getItemComplete(item))
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
              }))
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
              }))
          ))
  );

export const getTreeEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_TREE),
      mergeMap(({ payload }) =>
      ContentStoreService.getTree(payload.url, payload.depth)
          .pipe(
              map(tree => getTreeComplete(tree))
          ))
  );

export const getNavEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_NAV),
      mergeMap(({ payload }) =>
      NavigationService.getNavTree(payload.url, payload.depth, payload.currentPageUrl)
          .pipe(
              map(nav => getNavComplete(nav))
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
              }))
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