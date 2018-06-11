import { Observable } from 'rxjs';
import { AnyAction, Store } from 'redux';
import { switchMap, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { crafterConf } from '@craftercms/classes';
import { ContentStoreService } from '@craftercms/content';
import {
  GET_ITEM,
  getItemComplete
} from '../actions/content';

export const getItemEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
    ofType(GET_ITEM),
    switchMap(({ payload }) =>
      ContentStoreService.getItem(payload, crafterConf.getConfig())
        .pipe(
          tap(item => console.log(item)), // TODO remove tap once no longer needed
          map(item => getItemComplete(item))
        ))
  );

export const allContentEpics = [
  getItemEpic
];
