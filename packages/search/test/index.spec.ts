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

import { SearchService } from '@craftercms/search';
import { crafterConf } from '@craftercms/classes';
import 'url-search-params-polyfill';
import { Query } from "../src/query";
import { searchResponse } from './mock-responses';
import * as xhr2 from 'xhr2';
import * as nock from 'nock';
import { expect } from 'chai';

// @ts-ignore
global.XMLHttpRequest = xhr2.XMLHttpRequest;

crafterConf.configure({
  baseUrl: 'http://localhost:8080',
  site: 'editorial'
})

describe('Search Client', () => {
  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => {
    if (!nock.isActive()) {
      nock.activate();
    }
  });

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => {
    nock.cleanAll();
  });

  describe('search', () => {
    it('should find all documents', done => {
      nock('http://localhost:8080')
        .post('/api/1/site/search/search.json')
        .query({
          crafterSite: 'editorial',
        })
        .reply(200, { hits: searchResponse });

      const query = SearchService.createQuery<Query>({ 'uuid': '12345' });
      query.query = {
        "query" : {
          "match_all" : {}
        }
      };
      SearchService.search(query, crafterConf.getConfig()).subscribe({
        next: result => {
          expect(result.total.value).to.equal(searchResponse.total.value);
          done();
        },
        error: (error) => {
          done(error);
        }
      });
    });

    it('should apply all filters', done => {
      nock('http://localhost:8080')
        .post('/api/1/site/search/search.json')
        .query({
          crafterSite: 'editorial'
        })
        .reply(200, { hits: searchResponse });

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
      SearchService.search(query, crafterConf.getConfig()).subscribe({
        next: (result) => {
          expect(result.total.value).to.equal(searchResponse.total.value);
          done();
        },
        error: (error) => {
          done(error);
        }
      });
    });
  });

});
