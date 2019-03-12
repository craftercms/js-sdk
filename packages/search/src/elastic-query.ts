import { Query } from './query';

/**
 * Query implementation for Solr
 */
export class ElasticQuery extends Query {

  /**
   * Sets the actual query.
   * @param {string} query - Query string
   */
  set query(query) {
    this.params = query;
  }

}
