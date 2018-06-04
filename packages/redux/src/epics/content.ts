import { Observable } from 'rxjs';
import { AnyAction, Store } from 'redux';
import { switchMap, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { ContentStoreService } from '@craftercms/content';
import { CrafterReduxStore } from '@craftercms/models';
import {
  GET_ITEM,
  getItemComplete
} from '../actions/content';
import { getState } from '../utils';

export const getItemEpic =
  (action$: Observable<AnyAction>, store: Store<CrafterReduxStore>) => action$.pipe(
    ofType(GET_ITEM),
    switchMap(({ payload }) =>
      ContentStoreService.getItem(payload, getState(store).studioConfig)
        .pipe(
          tap(item => console.log(item)), // TODO remove tap once no longer needed
          map(item => getItemComplete(item))
        ))
  );

export const allContentEpics = [
  getItemEpic
];
