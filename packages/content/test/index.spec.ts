/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
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

import { ContentStoreService, NavigationService, UrlTransformationService } from '@craftercms/content';
import { crafterConf } from '@craftercms/classes';
import 'url-search-params-polyfill';
import { expect } from 'chai';
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
import * as nock from "nock";

// https://github.com/nock/nock/issues/2397
import fetch, { Headers, Request, Response } from 'node-fetch';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
  (globalThis as any).Request = Request;
  (globalThis as any).Response = Response;
}

crafterConf.configure({
  baseUrl: 'http://localhost:8080',
  site: 'editorial'
})

describe('Engine Client', () => {
  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => {
    if (!nock.isActive()) {
      nock.activate();
    }
  });

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => nock.cleanAll());

  describe('Content Store Service', () => {
    describe('getItem', () => {
      it('return the index item', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/content_store/item.json')
          .query({
            crafterSite: 'editorial',
            url: '/site/website/index.xml'
          })
          .reply(200, item);

        ContentStoreService.getItem("/site/website/index.xml", crafterConf.getConfig())
          .subscribe((respItem) => {
            expect(respItem.descriptorDom.page.objectId).to.equal(item.descriptorDom.page.objectId);
            done();
          })
      });
    });

    describe('getDescriptor', () => {
      it('return the index descriptor', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/content_store/descriptor.json')
          .query({
            crafterSite: 'editorial',
            flatten: false,
            url: '/site/website/index.xml'
          })
          .reply(200, descriptor);

        ContentStoreService.getDescriptor("/site/website/index.xml", crafterConf.getConfig())
          .subscribe((respDescriptor) => {
            expect(respDescriptor.page.objectId).to.equal(descriptor.page.objectId);
            done();
          })
      });
    });

    describe('getChildren', () => {
      it('return the child pages', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/content_store/children.json')
          .query({
            crafterSite: 'editorial',
            url: '/site/website/'
          })
          .reply(200, children);

        ContentStoreService.getChildren("/site/website/", crafterConf.getConfig())
          .subscribe((respChildren) => {
            expect(respChildren, `index should have ${children.length} child pages`).to.have.lengthOf(children.length);
            done();
          })
      });
    });

    describe('getTree', () => {
      it('return the page tree', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/content_store/tree.json')
          .query({
            crafterSite: 'editorial',
            depth: 3,
            url: '/site/website/articles/2021'
          })
          .reply(200, tree);

        ContentStoreService.getTree("/site/website/articles/2021", 3, crafterConf.getConfig())
          .subscribe((respTree) => {
            expect(respTree.name).to.equal(tree.name);
            expect(respTree.children, `tree should have ${tree.children.length} child pages`).to.have.lengthOf(tree.children.length);
            done();
          })
      });
    });
  });

  describe('Navigation Service', () => {
    describe('getNavTree', () => {
      it('return the nav tree', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/navigation/tree.json')
          .query({
            crafterSite: 'editorial',
            currentPageUrl: null,
            depth: 3,
            url: '/site/website'
          })
          .reply(200, navTree);

        NavigationService.getNavTree("/site/website", 3,  null, crafterConf.getConfig())
          .subscribe((respTree) => {
            expect(respTree.label, 'tree should start at the index').to.equal(navTree.label);
            expect(respTree.subItems, 'tree should have subItems').to.exist;
            done();
          })
      });
    });
    describe('getNavBreadcrumb', () => {
      it('return the nav breadcrumb', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/navigation/breadcrumb.json')
          .query({
            crafterSite: 'editorial',
            root: null,
            url: '/site/website/style/index.xml'
          })
          .reply(200, navBreadcrumb);

        NavigationService.getNavBreadcrumb("/site/website/style/index.xml", null, crafterConf.getConfig())
          .subscribe((respNavBreadcrumb) => {
            expect(respNavBreadcrumb, `breadcrumb should have ${navBreadcrumb.length} items`).to.have.lengthOf(navBreadcrumb.length);
            expect(respNavBreadcrumb[0].label, `last item should be ${navBreadcrumb[0].label}`).to.equal(navBreadcrumb[0].label);
            done();
          })
      });
    });

  });

  describe('URL Service', () => {
    describe('transform', () => {
      it('return the render url', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/url/transform.json')
          .query({
            crafterSite: 'editorial',
            transformerName: 'storeUrlToRenderUrl',
            url: '/site/website/style/index.xml'
          })
          .reply(200, `"${renderUrl}"`);

        UrlTransformationService.transform("storeUrlToRenderUrl", "/site/website/style/index.xml", crafterConf.getConfig())
          .subscribe((url) => {
            expect(url).to.equal(renderUrl);
            done();
          })
      });

      it('return the store url', done => {
        nock('http://localhost:8080')
          .get('/api/1/site/url/transform.json')
          .query({
            crafterSite: 'editorial',
            transformerName: 'renderUrlToStoreUrl',
            url: '/technology'
          })
          .reply(200, `"${storeUrl}"`);

        UrlTransformationService.transform("renderUrlToStoreUrl", "/technology", crafterConf.getConfig())
          .subscribe((url) => {
            expect(url).to.equal(storeUrl);
            done();
          })
      });
    });
  });
});
