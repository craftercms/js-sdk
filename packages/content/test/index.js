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

import assert from 'assert';
import { ContentStoreService, NavigationService, UrlTransformationService } from '@craftercms/content';

const config = {
  baseUrl: "http://localhost:8080",
  site: "editorial"
};

describe('Engine Client', () => {

  describe('Content Store Service', () => {

    describe('getItem', () => {
      it('should return the index item', done => {
        ContentStoreService.getItem("/site/website/index.xml", config).toPromise().then(item => {
          assert.equal(item.descriptorDom.page.objectId, '8d7f21fa-5e09-00aa-8340-853b7db302da');
          done();
        }).catch(error => {
          done(error);
        });
      });
    });

    describe('getDescriptor', () => {
      it('should return the index descriptor', done => {
        ContentStoreService.getDescriptor("/site/website/index.xml", config).toPromise().then(descriptor => {
          assert(descriptor.page.hero_text, 'hero_text field should not be empty');
          done();
        }).catch(error => {
          done(error);
        });
      });
    });

    describe('getChildren', () => {
      it('should return the child pages', done => {
        ContentStoreService.getChildren("/site/website/", config).toPromise().then(children => {
          assert.equal(children.length, 8, 'index should have 8 child pages');
          done();
        }).catch(error => {
          done(error);
        });
      });
    });

    describe('getTree', () => {
      it('should return the page tree', done => {
        contentStoreService.getTree("/site/website/", config).toPromise().then(tree => {
          assert.equal(tree.children.length, 8, 'tree should have 8 child pages');
          done();
        }).catch(error => {
          done(error);
        });
      });
    });

  });

  describe('Navigation Service', () => {

    describe('getNavTree', () => {
      it('should return the nav tree', done => {
        NavigationService.getNavTree("/site/website", config, 3, null).toPromise().then(tree => {
          assert.equal(tree.label, "Home", 'tree should start at the index');
          assert(tree.subItems, 'tree should have subItems');
          done();
        }).catch(error => {
          done(error);
        });
      });
    });

    describe('getNavBreadcrumb', () => {
      it('should return the nav breadcrumb', done => {
        NavigationService.getNavBreadcrumb("/site/website/style/index.xml", config, null).toPromise().then(breadcrumb => {
          assert.equal(breadcrumb.length, 2, 'breadcrumb should have 2 items');
          assert.equal(breadcrumb[1].label, 'Style', 'last item should be Style');
          done();
        }).catch(error => {
          done(error);
        });
      });
    });

  });

  describe('URL Service', () => {

    describe('transform', () => {

      it('should return the render url', done => {
        UrlTransformationService.transform("storeUrlToRenderUrl", "/site/website/style/index.xml", config).toPromise().then(url => {
          assert.equal(url, '/style');
          done();
        }).catch(error => {
          done(error);
        });
      });

      it('should return the store url', done => {
        UrlTransformationService.transform("renderUrlToStoreUrl", "/technology", config).toPromise().then(url => {
          assert.equal(url, '/site/website/technology/index.xml');
          done();
        }).catch(error => {
          done(error);
        });
      });

    });

  });
});
