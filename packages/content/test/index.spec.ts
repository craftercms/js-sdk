/*
 * Copyright (C) 2007-2018 Crafter Software Corporation. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import * as assert from 'assert';
import { ContentStoreService, NavigationService, UrlTransformationService } from '@craftercms/content';
import { crafterConf } from '@craftercms/classes';
import 'url-search-params-polyfill';

import mock from 'xhr-mock';
import MockRequest from "xhr-mock/lib/MockRequest";
import MockResponse from "xhr-mock/lib/MockResponse";

import { 
  item,
  descriptor,
  children,
  tree,
  navTree,
  navBreadcrumb,
  renderUrl,
  storeUrl
} from './mock-responses';

crafterConf.configure({
  site: 'editorial'
})

describe('Engine Client', () => {

  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => mock.setup());

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => mock.teardown());

  describe('Content Store Service', () => {

    describe('getItem', () => {
      it('should return the index item', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/item.json?url=%2Fsite%2Fwebsite%2Findex.xml&crafterSite=editorial", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(item));
          return res;
        });

        ContentStoreService.getItem("/site/website/index.xml", crafterConf.getConfig())
          .subscribe((item) => {
            assert.equal(item.descriptorDom.page.objectId, '8d7f21fa-5e09-00aa-8340-853b7db302da');
            done();
          })
      });
    });

    describe('getDescriptor', () => {
      it('should return the index descriptor', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/descriptor.json?url=%2Fsite%2Fwebsite%2Findex.xml&crafterSite=editorial", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(descriptor));
          return res;
        });

        ContentStoreService.getDescriptor("/site/website/index.xml", crafterConf.getConfig())
          .subscribe((descriptor) => {
            assert.equal(descriptor.page.objectId, '8d7f21fa-5e09-00aa-8340-853b7db302da');
            done();
          })
      });
    });

    describe('getChildren', () => {
      it('should return the child pages', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/children.json?url=%2Fsite%2Fwebsite%2F&crafterSite=editorial", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(children));
          return res;
        });

        ContentStoreService.getChildren("/site/website/", crafterConf.getConfig())
          .subscribe((children) => {
            assert.equal(children.length, 9, 'index should have 9 child pages');
            done();
          })
      });
    });

    describe('getTree', () => {
      it('should return the page tree', done => {

        mock.get("http://localhost:8080/api/1/site/content_store/tree.json?url=%2Fsite%2Fwebsite%2F&depth=3&crafterSite=editorial", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(tree));
          return res;
        });

        ContentStoreService.getTree("/site/website/", 3, crafterConf.getConfig())
          .subscribe((tree) => {
            assert.equal(tree.children.length, 3, 'tree should have 3 child pages');
            done();
          })
      });
    });

  });

  describe('Navigation Service', () => {

    describe('getNavTree', () => {
      it('should return the nav tree', done => {

        mock.get("http://localhost:8080/api/1/site/navigation/tree.json?crafterSite=editorial&url=%2Fsite%2Fwebsite&depth=3&currentPageUrl=null", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(navTree));
          return res;
        });

        NavigationService.getNavTree("/site/website", 3,  null, crafterConf.getConfig())
          .subscribe((tree) => {
            assert.equal(tree.label, "Home", 'tree should start at the index');
            assert(tree.subItems, 'tree should have subItems');
            done();
          })
      });
    });

    describe('getNavBreadcrumb', () => {
      it('should return the nav breadcrumb', done => {
        
        mock.get("http://localhost:8080/api/1/site/navigation/breadcrumb.json?crafterSite=editorial&url=%2Fsite%2Fwebsite%2Fstyle%2Findex.xml&root=null", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(navBreadcrumb));
          return res;
        });

        NavigationService.getNavBreadcrumb("/site/website/style/index.xml", null, crafterConf.getConfig())
          .subscribe((navBreadcrumb) => {
            assert.equal(navBreadcrumb.length, 2, 'breadcrumb should have 2 items');
            assert.equal(navBreadcrumb[1].label, 'Style', 'last item should be Style');
            done();
          })
      });
    });

  });

  describe('URL Service', () => {

    describe('transform', () => {

      it('should return the render url', done => {

        mock.get("http://localhost:8080/api/1/site/url/transform.json?crafterSite=editorial&transformerName=storeUrlToRenderUrl&url=%2Fsite%2Fwebsite%2Fstyle%2Findex.xml", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(renderUrl));
          return res;
        });

        UrlTransformationService.transform("storeUrlToRenderUrl", "/site/website/style/index.xml", crafterConf.getConfig())
          .subscribe((url) => {
            assert.equal(url, '/style');
            done();
          })
      });

      it('should return the store url', done => {
        
        mock.get("http://localhost:8080/api/1/site/url/transform.json?crafterSite=editorial&transformerName=renderUrlToStoreUrl&url=%2Ftechnology", 
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(storeUrl));
          return res;
        });

        UrlTransformationService.transform("renderUrlToStoreUrl", "/technology", crafterConf.getConfig())
          .subscribe((url) => {
            assert.equal(url, '/site/website/technology/index.xml');
            done();
          })
      });

    });

  });
});
