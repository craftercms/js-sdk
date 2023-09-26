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

crafterConf.configure({
  baseUrl: 'http://localhost:8080',
  site: 'editorial'
})

describe('Engine Client', () => {
  describe('Content Store Service', () => {
    describe('getItem', () => {
      it('return the index item', done => {
        ContentStoreService.getItem("/site/website/index.xml", crafterConf.getConfig())
          .subscribe((respItem) => {
            expect(respItem.descriptorDom.page.objectId).to.equal(item.descriptorDom.page.objectId);
            done();
          })
      });
    });

    describe('getDescriptor', () => {
      it('return the index descriptor', done => {
        ContentStoreService.getDescriptor("/site/website/index.xml", crafterConf.getConfig())
          .subscribe((respDescriptor) => {
            expect(respDescriptor.page.objectId).to.equal(descriptor.page.objectId);
            done();
          })
      });
    });

    describe('getChildren', () => {
      it('return the child pages', done => {
        ContentStoreService.getChildren("/site/website/", crafterConf.getConfig())
          .subscribe((respChildren) => {
            expect(respChildren, `index should have ${children.length} child pages`).to.have.lengthOf(children.length);
            done();
          })
      });
    });

    describe('getTree', () => {
      it('return the page tree', done => {
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
        UrlTransformationService.transform("storeUrlToRenderUrl", "/site/website/style/index.xml", crafterConf.getConfig())
          .subscribe((url) => {
            expect(url).to.equal(renderUrl);
            done();
          })
      });

      it('return the store url', done => {
        UrlTransformationService.transform("renderUrlToStoreUrl", "/technology", crafterConf.getConfig())
          .subscribe((url) => {
            expect(url).to.equal(storeUrl);
            done();
          })
      });
    });
  });
});
