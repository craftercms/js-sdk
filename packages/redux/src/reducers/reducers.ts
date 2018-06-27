import { 
  itemsReducer, 
  navigationReducer, 
  breadcrumbsReducer, 
  descriptorsReducer,
  childrenReducer,
  treeReducer
} from './content';
import { searchReducer } from './search'

export const allReducers = {
  items: itemsReducer,
  descriptors: descriptorsReducer,
  children: childrenReducer,
  trees: treeReducer,
  navigation: navigationReducer,
  breadcrumbs: breadcrumbsReducer,
  search: searchReducer
};
