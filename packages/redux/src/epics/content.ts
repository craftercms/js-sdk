import { Observable } from 'rxjs';
import { AnyAction, Store } from 'redux';
import { switchMap, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { Item, Descriptor } from '@craftercms/models';
import { crafterConf } from '@craftercms/classes';
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
    switchMap(({ payload }) =>
      ContentStoreService.getItem(payload, crafterConf.getConfig())
        .pipe(
          tap(item => console.log("GET_ITEM_EPIC", item)),
          map(item => getItemComplete(item))
        ))
  );

export const getDescriptorEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_DESCRIPTOR),
      switchMap(({ payload }) =>
      ContentStoreService.getDescriptor(payload, crafterConf.getConfig())
          .pipe(
              map(descriptor => getDescriptorComplete(descriptor))
          ))
  );

export const getChildrenEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_CHILDREN),
      switchMap(({ payload }) =>
      ContentStoreService.getChildren(payload, crafterConf.getConfig())
          .pipe(
              map(children => getChildrenComplete(children))
          ))
  );

export const getTreeEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_TREE),
      switchMap(({ payload }) =>
      ContentStoreService.getTree(payload.url, payload.depth, crafterConf.getConfig())
          .pipe(
              map(tree => getTreeComplete(tree))
          ))
  );

export const getNavEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_NAV),
      switchMap(({ payload }) =>
      NavigationService.getNavTree(payload.url, payload.depth, payload.currentPageUrl, crafterConf.getConfig())
          .pipe(
              map(nav => getNavComplete(nav))
          ))
  );

export const getNavBreadcrumbEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
      ofType(GET_NAV_BREADCRUMB),
      switchMap(({ payload }) =>
      NavigationService.getNavBreadcrumb(payload.url, payload.root, crafterConf.getConfig())
          .pipe(
              map(breadcrumb => getNavBreadcrumbComplete(breadcrumb))
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