/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import 'mocha';
import 'url-search-params-polyfill';
import { expect } from 'chai';

import { SearchService } from '@craftercms/search';
import { crafterConf } from '@craftercms/classes';

import {
  createReduxStore,
  getItem,
  getItemComplete,
  itemsReducer,
  getItemEpic,
  getDescriptor,
  getDescriptorComplete,
  descriptorsReducer,
  getDescriptorEpic,
  getChildren,
  getChildrenComplete,
  childrenReducer,
  getChildrenEpic,
  getTree,
  getTreeComplete,
  treeReducer,
  getTreeEpic,
  getNav,
  getNavComplete,
  navigationReducer,
  getNavEpic,
  getNavBreadcrumb,
  getNavBreadcrumbComplete,
  breadcrumbsReducer,
  getNavBreadcrumbEpic,
  search,
  searchComplete
} from '@craftercms/redux';

import {
  item,
  descriptor,
  children,
  navItem,
  navBreadcrumb,
  tree
} from './mock-responses';


import mock from 'xhr-mock';
import MockRequest from "xhr-mock/lib/MockRequest";
import MockResponse from "xhr-mock/lib/MockResponse";
import { ActionsObservable } from 'redux-observable';

crafterConf.configure({
  site: 'editorial'
})

describe('Crafter CMS Redux', () => {
  let store;

  beforeEach(() => {
    store = createReduxStore();

    // replace the real XHR object with the mock XHR object before each test
    mock.setup();
  });

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => mock.teardown());

  describe('ACTIONS', () => {

    describe('getItem Action', () => {
      it('should return the expected GET_ITEM action', done => {
        let url = '/site/website/index.xml',
            expectedAction = {
              type: 'CRAFTERCMS_GET_ITEM',
              payload: url
            };

        const action = getItem(url);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getItemComplete Action', () => {
      it('should return the expected GET_ITEM_COMPLETE action', done => {
        let expectedAction = {
              type: "CRAFTERCMS_GET_ITEM_COMPLETE",
              payload: item
            };

        const action = getItemComplete(item);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getDescriptor Action', () => {
      it('should return the expected GET_DESCRIPTOR action', done => {
        let url = '/site/website/index.xml',
            expectedAction = {
              type: 'CRAFTERCMS_GET_DESCRIPTOR',
              payload: url
            };

        const action = getDescriptor(url);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getDescriptorComplete Action', () => {
      it('should return the expected GET_DESCRIPTOR_COMPLETE action', done => {
        let url: '/site/website/index.xml',
            expectedAction = {
              type: "CRAFTERCMS_GET_DESCRIPTOR_COMPLETE",
              payload: {descriptor, url}
            };

        const action = getDescriptorComplete({descriptor, url});

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getChildren Action', () => {
      it('should return the expected GET_CHILDREN action', done => {
        let url = '/site/website/',
            expectedAction = {
              type: 'CRAFTERCMS_GET_CHILDREN',
              payload: url
            };

        const action = getChildren(url);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getChildrenComplete Action', () => {
      it('should return the expected GET_CHILDREN_COMPLETE action', done => {
        let url: '/site/website/index.xml',
            expectedAction = {
              type: "CRAFTERCMS_GET_CHILDREN_COMPLETE",
              payload: {
                url,
                children
              }
            };

        const action = getChildrenComplete({children, url});

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getTree Action', () => {
      it('should return the expected GET_TREE action', done => {
        let url = '/site/website/',
            expectedAction = {
              type: 'CRAFTERCMS_GET_TREE',
              payload: {
                depth: 1,
                url: url
              }
            };

        const action = getTree(url);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getTreeComplete Action', () => {
      it('should return the expected GET_TREE_COMPLETE action', done => {
        let expectedAction = {
              type: "CRAFTERCMS_GET_TREE_COMPLETE",
              payload: item
            };

        const action = getTreeComplete(item);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getNavTree Action', () => {
      it('should return the expected GET_NAV action', done => {
        let url = '/site/website/',
            expectedAction =  {
              type: "CRAFTERCMS_GET_NAV",
              payload: {
                url,
                depth: 1,
                currentPageUrl: ""
              }
            };

        const action = getNav(url);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getNavTreeComplete Action', () => {
      it('should return the expected GET_NAV_TREE_COMPLETE action', done => {
        let url: '/site/website/index.xml',
            expectedAction = {
              type: "CRAFTERCMS_GET_NAV_COMPLETE",
              payload: navItem
            };

        const action = getNavComplete(navItem);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getNavBreadcrumb Action', () => {
      it('should return the expected GET_NAV_BREADCRUMB action', done => {
        let url = '/site/website/',
            expectedAction =  {
              type: "CRAFTERCMS_GET_NAV_BREADCRUMB",
              payload: {
                url,
                root: ""
              }
            };

        const action = getNavBreadcrumb(url);

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

    describe('getNavBreadcrumbComplete Action', () => {
      it('should return the expected GET_NAV_BREADCRUMB_COMPLETE action', done => {
        let url: '/site/website/index.xml',
            expectedAction = {
              type: "CRAFTERCMS_GET_NAV_BREADCRUMB_COMPLETE",
              payload: {
                breadcrumb: navBreadcrumb,
                url
              }
            };

        const action = getNavBreadcrumbComplete({
          breadcrumb: navBreadcrumb,
          url
        });

        expect(action).to.deep.equal(expectedAction);
        done();
      });
    });

  });

  describe('REDUCERS', () => {

    describe('getItem Reducer', () => {
      it('should return the expected GET_ITEM reducer', done => {
        let url = '/site/website/index.xml',
            action = {
              type: 'CRAFTERCMS_GET_ITEM',
              payload: url
            },
            expectedState = {
              loading: {
                [url]: true
              },
              entries: {}
            };

        let newState = itemsReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getItemComplete Reducer', () => {
      it('should return the expected GET_ITEM_COMPLETE reducer', done => {
        let action = {
              type: 'CRAFTERCMS_GET_ITEM_COMPLETE',
              payload: item
            },
            expectedState = {
              loading: {
                [item.url]: false
              },
              entries: {
                [item.url]: item
              }
            };

        let newState = itemsReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getDescriptor Reducer', () => {
      it('should return the expected GET_DESCRIPTOR reducer', done => {
        let url = '/site/website/index.xml',
            action = {
              type: 'CRAFTERCMS_GET_DESCRIPTOR',
              payload: url
            },
            expectedState = {
              loading: {
                [url]: true
              },
              entries: {}
            };

        let newState = descriptorsReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getDescriptorComplete Reducer', () => {
      it('should return the expected GET_DESCRIPTOR_COMPLETE reducer', done => {
        let url = '/site/website',
            action = {
              type: 'CRAFTERCMS_GET_DESCRIPTOR_COMPLETE',
              payload: { descriptor, url }
            },
            expectedState = {
              loading: {
                [url]: false
              },
              entries: {
                [url]: descriptor
              }
            };

        let newState = descriptorsReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getChildren Reducer', () => {
      it('should return the expected GET_CHILDREN reducer', done => {
        let url = '/site/website',
            action = {
              type: 'CRAFTERCMS_GET_CHILDREN',
              payload: url
            },
            expectedState = {
              loading: {
                [url]: true
              },
              entries: {}
            };

        let newState = childrenReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getChildrenComplete Reducer', () => {
      it('should return the expected GET_CHIDREN_COMPLETE reducer', done => {
        let url = '/site/website',
            action = {
              type: 'CRAFTERCMS_GET_CHILDREN_COMPLETE',
              payload: { children, url }
            },
            expectedState = {
              loading: {
                [url]: false
              },
              entries: {
                [url]: children
              }
            };

        let newState = childrenReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getTree Reducer', () => {
      it('should return the expected GET_TREE reducer', done => {
        let url = '/site/website',
            action = {
              type: 'CRAFTERCMS_GET_TREE',
              payload: {url}
            },
            expectedState = {
              loading: {
                [url]: true
              },
              entries: {},
              childIds: {}
            };

        let newState = treeReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getTreeComplete Reducer', () => {
      it('should return the expected GET_TREE_COMPLETE reducer', done => {
        let action = {
              type: 'CRAFTERCMS_GET_TREE_COMPLETE',
              payload: tree
            },
            expectedState = {
              loading: {
                [item.url]: false
              },
              entries: {
                [item.url]: { ...tree, children: null }
              },
              childIds: {
                [item.url]: []
              }
            };

        let newState = treeReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getNavTree Reducer', () => {
      it('should return the expected GET_NAV reducer', done => {
        let url = '/site/website',
            action = {
              type: 'CRAFTERCMS_GET_NAV',
              payload: {url}
            },
            expectedState = {
              loading: {
                [url]: true
              },
              entries: {},
              childIds: {}
            };

        let newState = navigationReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getNavTreeComplete Reducer', () => {
      it('should return the expected GET_NAV_COMPLETE reducer', done => {
        let action = {
              type: 'CRAFTERCMS_GET_NAV_COMPLETE',
              payload: navItem
            },
            expectedState = {
              loading: {
                [navItem.url]: false
              },
              entries: {
                [navItem.url]: { ...navItem, subItems: null }
              },
              childIds: {
                [navItem.url]: []
              }
            };

        let newState = navigationReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getNavBreadcrumb Reducer', () => {
      it('should return the expected GET_NAV_BREADCRUMB reducer', done => {
        let url = '/site/website',
            action = {
              type: 'CRAFTERCMS_GET_NAV_BREADCRUMB',
              payload: {url}
            },
            expectedState = {
              loading: {
                [url]: true
              },
              entries: {}
            };

        let newState = breadcrumbsReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

    describe('getNavBreadcrumbComplete Reducer', () => {
      it('should return the expected GET_NAV_BREADCRUMB_COMPLETE reducer', done => {
        let url:string = '/',
            action = {
              type: 'CRAFTERCMS_GET_NAV_BREADCRUMB_COMPLETE',
              payload: { breadcrumb: navBreadcrumb, url }
            },
            expectedState = {
              loading: {
                [url]: false
              },
              entries: {
                [url]: navBreadcrumb
              }
            };

        let newState = breadcrumbsReducer(undefined, action);
        expect(newState).to.deep.equal(expectedState);
        done();
      });
    });

  });

  describe('EPICS', () => {

    describe('getItem Epic', () => {
      it('should return the expected GET_ITEM epic', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/item.json?url=%2Fsite%2Fwebsite%2Findex.xml&crafterSite=editorial",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(item));
          return res;
        });

        let url = '/site/website/index.xml',
            actionObs = ActionsObservable.of({
              type: 'CRAFTERCMS_GET_ITEM',
              payload: url
            }),
            expectedResponse = {
              payload: item,
              type: 'CRAFTERCMS_GET_ITEM_COMPLETE'
            }

        getItemEpic(actionObs)
        .subscribe((response) => {
          expect(response).to.deep.equal(expectedResponse);
          done();
        })
      });
    });

    describe('getDescriptor Epic', () => {
      it('should return the expected GET_DESCRIPTOR epic', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/descriptor.json?url=%2Fsite%2Fwebsite%2Findex.xml&crafterSite=editorial",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(descriptor));
          return res;
        });

        let url = '/site/website/index.xml',
            actionObs = ActionsObservable.of({
              type: 'CRAFTERCMS_GET_DESCRIPTOR',
              payload: url
            }),
            expectedResponse = {
              payload: {descriptor, url},
              type: 'CRAFTERCMS_GET_DESCRIPTOR_COMPLETE'
            }

        getDescriptorEpic(actionObs)
        .subscribe((response) => {
          expect(response).to.deep.equal(expectedResponse);
          done();
        })
      });
    });

    describe('getChildren Epic', () => {
      it('should return the expected GET_CHILDREN epic', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/children.json?url=%2Fsite%2Fwebsite&crafterSite=editorial",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(children));
          return res;
        });

        let url = '/site/website',
            actionObs = ActionsObservable.of({
              type: 'CRAFTERCMS_GET_CHILDREN',
              payload: url
            }),
            expectedResponse = {
              payload: {children, url},
              type: 'CRAFTERCMS_GET_CHILDREN_COMPLETE'
            }

        getChildrenEpic(actionObs)
        .subscribe((response) => {
          expect(response).to.deep.equal(expectedResponse);
          done();
        })
      });
    });

    describe('getTree Epic', () => {
      it('should return the expected GET_TREE epic', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/tree.json?url=%2Fsite%2Fwebsite&depth=1&crafterSite=editorial",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(tree));
          return res;
        });

        let url = '/site/website',
            actionObs = ActionsObservable.of({
              type: 'CRAFTERCMS_GET_TREE',
              payload: { url, depth: 1 }
            }),
            expectedResponse = {
              payload: tree,
              type: 'CRAFTERCMS_GET_TREE_COMPLETE'
            }

        getTreeEpic(actionObs)
        .subscribe((response) => {
          expect(response).to.deep.equal(expectedResponse);
          done();
        })
      });
    });

    describe('getNavTree Epic', () => {
      it('should return the expected GET_NAV epic', done => {

        mock.get("http://localhost:8080/api/1/site/navigation/tree.json?crafterSite=editorial&url=%2Fsite%2Fwebsite&depth=1&currentPageUrl=",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(navItem));
          return res;
        });

        let url = '/site/website',
            actionObs = ActionsObservable.of({
              type: 'CRAFTERCMS_GET_NAV',
              payload: { url, depth: 1 }
            }),
            expectedResponse = {
              payload: navItem,
              type: 'CRAFTERCMS_GET_NAV_COMPLETE'
            }

        getNavEpic(actionObs)
        .subscribe((response) => {
          expect(response).to.deep.equal(expectedResponse);
          done();
        })
      });
    });

    describe('getNavBreadcrumb Epic', () => {
      it('should return the expected GET_NAV_BREADCRUMB epic', done => {

        mock.get("http://localhost:8080/api/1/site/navigation/breadcrumb.json?crafterSite=editorial&url=%2Fsite%2Fwebsite%2Findex.xml&root=",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(navBreadcrumb));
          return res;
        });

        let url = '/site/website/index.xml',
            actionObs = ActionsObservable.of({
              type: 'CRAFTERCMS_GET_NAV_BREADCRUMB',
              payload: { url }
            }),
            expectedResponse = {
              payload: { breadcrumb: navBreadcrumb, url },
              type: 'CRAFTERCMS_GET_NAV_BREADCRUMB_COMPLETE'
            }

        getNavBreadcrumbEpic(actionObs)
        .subscribe((response) => {
          expect(response).to.deep.equal(expectedResponse);
          done();
        })
      });
    });

  });

});
