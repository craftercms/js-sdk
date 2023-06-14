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

import * as assert from 'assert';
import { SearchService } from '@craftercms/search';
import { crafterConf } from '@craftercms/classes';
import 'mocha';
import 'url-search-params-polyfill';
import { Query } from "../src/query";

import mock from 'xhr-mock';
import MockRequest from "xhr-mock/lib/MockRequest";
import MockResponse from "xhr-mock/lib/MockResponse";
import { searchResponse } from './mock-responses';

crafterConf.configure({
  site: 'editorial'
})

describe('Search Client', () => {

  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => mock.setup());

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => mock.teardown());


  describe('search', () => {

    it('should find all documents', done => {
      mock.post("http://localhost:8080/api/1/site/search/search.json",
      (req: MockRequest, res: MockResponse) => {
        res.body(JSON.stringify(searchResponse));
        return res;
      });

      const query = SearchService.createQuery<Query>({ 'uuid': '12345' });
      query.query = {
        "query" : {
          "match_all" : {}
        }
      };
      SearchService.search(query, crafterConf.getConfig()).toPromise().then(result => {
        assert.equal(result.response.numFound, searchResponse.response.numFound);
        done();
      }).catch(error => {
        done(error);
      });
    });

    it('should apply all filters', done => {
      mock.post("http://localhost:8080/api/1/site/search/search.json",
        (req: MockRequest, res: MockResponse) => {
          res.body(JSON.stringify(searchResponse));
          return res;
        });

      var query = SearchService.createQuery<Query>({ 'uuid': '12345' });
      query.query = {
        "query" : {
          "bool": {
            "filter": [
              {
                "bool": {
                  "should": [
                    {
                      "match": {
                        "content-type": "/page/article"
                      }
                    }
                  ],
                }
              },
              {
                "match": {
                  "featured_b": true
                }
              }
            ]
          }
        }
      };
      SearchService.search(query, crafterConf.getConfig()).toPromise().then(result => {
        assert.equal(result.response.numFound, searchResponse.response.numFound);
        done();
      }).catch(error => {
        done(error);
      });
    });

  });

});
