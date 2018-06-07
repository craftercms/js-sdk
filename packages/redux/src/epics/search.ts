import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnyAction, Store } from 'redux';
import { ofType } from 'redux-observable';

import {
  SEARCH,
  searchComplete
} from '../actions/search';
import { CrafterReduxStore } from '@craftercms/models';

export const searchEpic =
  (action$: Observable<AnyAction>, store: Store<CrafterReduxStore>) => action$.pipe(
    ofType(SEARCH),
    switchMap(({ payload }) =>
      // TODO: implement properly
      of(searchComplete([]))
    )
  );

export const allSearchEpics = [
  searchEpic
];
