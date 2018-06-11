import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnyAction, Store } from 'redux';
import { ofType } from 'redux-observable';

import {
  SEARCH,
  searchComplete
} from '../actions/search';
import { CrafterNamespacedState } from '@craftercms/models';

export const searchEpic =
  (action$: Observable<AnyAction>, store: Store<CrafterNamespacedState>) => action$.pipe(
    ofType(SEARCH),
    switchMap(({ payload }) =>
      // TODO: implement properly
      of(searchComplete([]))
    )
  );

export const allSearchEpics = [
  searchEpic
];
