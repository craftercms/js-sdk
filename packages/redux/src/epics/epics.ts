import { combineEpics } from 'redux-observable';

import { allEngineEpics } from './engine';
import { allSearchEpics } from './search';

export const allEpics = [].concat(
  allEngineEpics,
  allSearchEpics
);

export const rootEpic = combineEpics(...allEpics);
