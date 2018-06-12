import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { AnyAction, Store } from 'redux';
import { ofType } from 'redux-observable';

import { crafterConf } from '@craftercms/classes';
import { SearchService } from '@craftercms/search';
import {
  SEARCH,
  searchComplete
} from '../actions/search';
import { CrafterNamespacedState } from '@craftercms/models';

export const searchEpic =
  (action$: Observable<AnyAction>) => action$.pipe(
    ofType(SEARCH),
    switchMap(({ payload }) =>
      SearchService.search(payload, crafterConf.getConfig())
        .pipe(
          map(response => searchComplete(response))
        ))
  );

export const allSearchEpics = [
  searchEpic
];
