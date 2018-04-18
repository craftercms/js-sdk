import assert from 'assert';
import { EngineClient } from './../lib/craftercms';

var engineClient = new EngineClient("http://localhost:8080", "editorial");
var contentStoreService = engineClient.contentStoreService;
var navService = engineClient.navigationService;
var urlService = engineClient.urlTransformationService;

describe('Engine Client', () => {

    describe('Content Store Service', () => {

        describe('getItem', () => {
            it('should return the index item', done => {
                contentStoreService.getItem("/site/website/index.xml").then(item => {
                    assert.equal(item.descriptorDom.page.objectId, '8d7f21fa-5e09-00aa-8340-853b7db302da');
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

        describe('getDescriptor', () => {
            it('should return the index descriptor', done => {
                contentStoreService.getDescriptor("/site/website/index.xml").then(descriptor => {
                    assert(descriptor.page.hero_text, 'hero_text field should not be empty');
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

        describe('getChildren', () => {
            it('should return the child pages', done => {
                contentStoreService.getChildren("/site/website/").then(children => {
                    assert.equal(children.length, 8, 'index should have 8 child pages');
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

        describe('getTree', () => {
            it('should return the page tree', done => {
                contentStoreService.getTree("/site/website/").then(tree => {
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
                navService.getNavTree("/site/website", 3, null).then(tree => {
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
                navService.getNavBreadcrumb("/site/website/style/index.xml", null).then(breadcrumb => {
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
                urlService.transform("storeUrlToRenderUrl", "/site/website/style/index.xml").then(url => {
                    assert.equal(url, '/style');
                    done();
                }).catch(error => {
                    done(error);
                });
            });

            it('should return the store url', done => {
                urlService.transform("renderUrlToStoreUrl", "/technology").then(url => {
                    assert.equal(url, '/site/website/technology/index.xml');
                    done();
                }).catch(error => {
                    done(error);
                });
            });

        });

    });
});
