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
      document.cookie = `crafterSite=${ config.site }`;
      requestURL = composeUrl(config, crafterConf.getConfig().endpoints.ENGINE_SEARCH) + '?crafterSite=' + config.site;

      return SDKService.httpPost(requestURL, params)
        .pipe(map((res: any) => {
          return res.response.hits;
        }));
    } else {
      requestURL = composeUrl(config, crafterConf.getConfig().endpoints.SEARCH);

      for (let param in params) {
        if (Array.isArray(params[param])) {
          for (let x = 0; x < params[param].length; x++) {
            searchParams.append(param, params[param][x]);
          }
        } else {
          searchParams.append(param, params[param]);
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
    let engine = searchEngineOrParams,
        queryId = params && params['uuid'] ? params['uuid'] : uuid();
    if (typeof searchEngineOrParams !== 'string') {
      engine = 'solr';
      params = searchEngineOrParams;
    }
    let query;
    switch (searchEngineOrParams) {
      case 'solr':
        query = new SolrQuery();
        break;
      case 'elastic':
        query = new ElasticQuery();
        break;
    }
    Object.assign(query.params, params);

    query.uuid = queryId;

    return query;
  }

}
