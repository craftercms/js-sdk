import { allEngineEpics } from './engine';
import { allSearchEpics } from './search';

export const allEpics = [].concat(
  allEngineEpics,
  allSearchEpics
);

