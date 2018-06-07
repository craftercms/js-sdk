import { composeUrl } from '@craftercms/utils';
import { SDKService, StudioConfig } from '@craftercms/models';
import { Query } from './query';
import { SolrQuery } from '@craftercms/search';
import { ElasticQuery } from '@craftercms/search';

export const SEARCH_ENDPOINT = '/crafter-search/api/2/search/search.json';

// TODO add return types

let solrService: SearchService;

/**
 * Implementation of Search Service for Solr
 */
export class SearchService extends SDKService {

  static search(query: Query, config: StudioConfig);
  static search(params: Object, config: StudioConfig);
  static search(queryOrParams: Query | Object, config: StudioConfig) {
    const requestURL = composeUrl(config, SEARCH_ENDPOINT);
    // TODO test if instances of classes that inherit from Query fulfil this condition
    const params = (queryOrParams instanceof Query)
      ? queryOrParams.params
      : queryOrParams;
    return SDKService.httpGet(requestURL, {
      ...params,
      index_id: config.site
    });
  }

  static getInstance(config: StudioConfig): SearchService {
    if (solrService == null) {
      solrService = new SearchService(config);
    }
    return solrService;
  }

  /**
   * Returns a new Query object
   */
  static createQuery(searchEngine: 'solr' | 'elastic' = 'solr', params: Object = {}): Query {
    let query;
    switch (searchEngine) {
      case 'solr':
        query = new SolrQuery();
        break;
      case 'elastic':
        query = new ElasticQuery();
        break;
    }
    Object.assign(query.params, params);
    return query;
  }

  /**
   * Does a full-text search and returns a Map model.
   * @param {Query} query - the query object
   */
  search(query: Query);
  search(params: Object);
  search(queryOrParams: Query | Object) {
    return SearchService.search(queryOrParams, this.config);
  }

}
