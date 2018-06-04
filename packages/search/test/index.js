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
import { SearchClient } from './../lib/craftercms';

var searchClient = new SearchClient("http://localhost:8080", "editorial");
var searchService = searchClient.searchService;

describe('Search Client', () => {

  describe('search', () => {

    it('should find all documents', done => {
      var query = searchService.createQuery();
      query.query = "*:*";
      searchService.search(query).then(result => {
        assert.equal(result.response.numFound, 31);
        done();
      }).catch(error => {
        done(error);
      });
    });

    it('should apply all filters', done => {
      var query = searchService.createQuery();
      query.query = "*:*";
      query.filterQueries = ["content-type:/page/article", "featured_b:true"];
      searchService.search(query).then(result => {
        assert.equal(result.response.numFound, 6);
        done();
      }).catch(error => {
        done(error);
      });
    });

  });

});
