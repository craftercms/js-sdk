import assert from 'assert';
import { SearchClient } from './../lib/craftercms';

var searchClient = new SearchClient("http://localhost:8080", "editorial");
var searchService = searchClient.searchService;

describe('Search Client', () => {

    describe('search', () => {

        it('should find all documents', done => {
            var query = searchService.createQuery();
            query.setQuery("*:*");
            searchService.search(query).then(result => {
                assert.equal(result.response.numFound, 31);
                done();
            }).catch(error => {
                done(error);
            });
        });

        it('should apply all filters', done => {
            var query = searchService.createQuery();
            query.setQuery("*:*");
            query.setFilterQueries(["content-type:/page/article", "featured_b:true"]);
            searchService.search(query).then(result => {
                assert.equal(result.response.numFound, 6);
                done();
            }).catch(error => {
                done(error);
            });
        });

    });

});
