import { composeUrl } from '@craftercms/utils';
import { SDKService, StudioConfig } from '@craftercms/models';
import { SolrQuery } from './solr-query';
import { Query } from './query';

export const SEARCH_ENDPOINT = '/crafter-search/api/2/search/search.json';

// TODO add return types

let solrService: SearchService;

/**
 * Implementation of Search Service for Solr
 */
export class SearchService extends SDKService {

  static search(query: Query, config: StudioConfig) {
    const requestURL = composeUrl(config, SEARCH_ENDPOINT);
    return SDKService.httpGet(requestURL, {
      ...query.params,
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
  createQuery(params: Object = {}): SolrQuery {
    // TODO create factory or elsehow abstract other non-solr search engines. Based on "config", perhaps?
    const solrQuery = new SolrQuery();
    Object.assign(solrQuery.params, params);
    return solrQuery;
  }

  /**
   * Does a full-text search and returns a Map model.
   * @param {Query} query - the query object
   */
  search(query: Query) {
    return SearchService.search(query, this.config);
  }

}
