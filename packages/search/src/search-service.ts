import { Observable } from 'rxjs';
import { composeUrl, SearchEngines } from '@craftercms/utils';
import { crafterConf, SDKService } from '@craftercms/classes';
import { CrafterConfig } from '@craftercms/models';
import { Query } from './query';
import { SolrQuery } from '@craftercms/search';
import { ElasticQuery } from '@craftercms/search';

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
    const requestURL = composeUrl(config, crafterConf.getConfig().endpoints.SEARCH);
    // TODO test if instances of classes that inherit from Query fulfil this condition
    const params = (queryOrParams instanceof Query)
      ? queryOrParams.params
      : queryOrParams;
    return SDKService.httpGet(requestURL, {
      ...params,
      index_id: config.site
    });
  }

  /**
   * Returns a new Query object
   */
  static createQuery(): SolrQuery;
  static createQuery<T extends Query>(searchEngine: SearchEngines): T;
  static createQuery<T extends Query>(searchEngine: SearchEngines, params: Object): T;
  static createQuery<T extends Query>(searchEngineOrParams: SearchEngines | Object = 'solr', params: Object = {}): T {
    let engine = searchEngineOrParams;
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
    return query;
  }

}
