import { allContentEpics } from './content';
import { allSearchEpics } from './search';

export const allEpics = [].concat(
  allContentEpics,
  allSearchEpics
);
