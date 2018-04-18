import assert from 'assert';
import { EngineClient } from './../lib/craftercms';

var engineClient = new EngineClient("http://localhost:8080", "editorial");
var contentStoreService = engineClient.contentStoreService;

describe('EngineClient', () => {

    describe('contentStoreService', () => {

        describe('getItem', () => {
            it('should return the index item', done => {
                contentStoreService.getItem("/site/website/index.xml").then(response => {
                    assert.equal(response.data.descriptorDom.page.objectId, '8d7f21fa-5e09-00aa-8340-853b7db302da');
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

        describe('getDescriptor', () => {
            it('should return the index descriptor', done => {
                contentStoreService.getDescriptor("/site/website/index.xml").then(response => {
                    assert(response.data.page.hero_text);
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

        describe('getChildren', () => {
            it('should return the child pages', done => {
                contentStoreService.getChildren("/site/website/").then(response => {
                    assert.equal(response.data.length, 8);
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

        describe('getTree', () => {
            it('should return the page tree', done => {
                contentStoreService.getTree("/site/website/").then(response => {
                    assert.equal(response.data.children.length, 8);
                    done();
                }).catch(error => {
                    done(error);
                });
            });
        });

    });
});
