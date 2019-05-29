/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All rights reserved.
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

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { composeUrl, SearchEngines } from '@craftercms/utils';
import { crafterConf, SDKService } from '@craftercms/classes';
import { CrafterConfig } from '@craftercms/models';
import { Query } from './query';
import { SolrQuery } from '@craftercms/search';
import { ElasticQuery } from '@craftercms/search';

import uuid from 'uuid';
import 'url-search-params-polyfill';

// TODO: Add correct return types
type TodoSearchReturnType = Observable<any>;

/**
 * Implementation of Search Service for Solr
 */
export class SearchService extends SDKService {

  /**
   * Does a full-text search and returns a Map model.
   * @param {Query} query - the query object
   */
  static search(query: Query, config: CrafterConfig): TodoSearchReturnType;
  static search(params: Object, config: CrafterConfig): TodoSearchReturnType;
  static search(queryOrParams: Query | Object, config: CrafterConfig): TodoSearchReturnType {
    let requestURL;
    const params = (queryOrParams instanceof Query)
            ? queryOrParams.params
            : queryOrParams,
          searchParams = new URLSearchParams();

    if (queryOrParams instanceof ElasticQuery) {
      requestURL = composeUrl(config, crafterConf.getConfig().endpoints.ELASTICSEARCH) + '?crafterSite=' + config.site;

      return SDKService.httpPost(requestURL, params)
        .pipe(map((response: any) => {
          return response.hits;
        }));
    } else {
      requestURL = composeUrl(config, crafterConf.getConfig().endpoints.SEARCH);

      for (let param in params) {
        if (params.hasOwnProperty(param)) {
          if (Array.isArray(params[param])) {
            for (let x = 0; x < params[param].length; x++) {
              searchParams.append(param, params[param][x]);
            }
          } else {
            searchParams.append(param, params[param]);
          }
        }
      }

      searchParams.append('index_id', config.searchId ? config.searchId : config.site);

      return SDKService.httpGet(requestURL, searchParams);  
    }

  }

  /**
   * Returns a new Query object
   */
  static createQuery(): SolrQuery;
  static createQuery<T extends Query>(searchEngine: SearchEngines): T;
  static createQuery<T extends Query>(searchEngine: SearchEngines, params: Object): T;
  static createQuery<T extends Query>(searchEngineOrParams: SearchEngines | Object = 'solr', params: Object = {}): T {
    let
      query,
      queryId = (params && params['uuid'])
        ? params['uuid']
        : uuid(),
      engine = (typeof searchEngineOrParams === 'string')
        ? (<string>searchEngineOrParams).toLowerCase()
        : 'solr';

    if (typeof searchEngineOrParams !== 'string') {
      params = searchEngineOrParams;
    }

    switch (engine) {
      case 'elastic':
      case 'elasticsearch':
        query = new ElasticQuery();
        break;
      case 'solr':
      default:
        query = new SolrQuery();
        break;
    }

    Object.assign(query.params, params);

    query.uuid = queryId;

    return query;
  }

}
