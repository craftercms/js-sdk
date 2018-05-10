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

'use strict';

import { httpGet } from './utils.js'

// Search Client classes

/**
 * Query Object
 */
class Query {

    /**
     * Creates an empty query
     * @constructor
     */
    constructor() {
        this.params = {};
    }

    /**
     * Sets a single value parameter in the query object
     * @param {string} name - Name of the parameter
     * @param {object} value - Value of the parameter
     */
    setParam(name, value) {
        this.params[name] = value;
    }

    /**
     * Adds a value for a parameter in the query object
     * @param {string} name - Name of the parameter
     * @param {object} value - Value of the parameter
     */
    addParam(name, value) {
        if(this.params[name]) {
            if(Array.isArray(this.params[name])) {
                this.params[name].push(value);
            } else {
                this.params[name] = [ this.params[name], value ];
            }
        } else {
            this.params[name] = value;
        }
    }

}

/**
 * Query implementation for Solr
 */
class SolrQuery extends Query {

    // Synonym of start, added for consistency with Java Search Client
    /**
     * Sets the offset of the results.
     * @param {int} offset - Number of results to skip
     */
    set offset(offset) {
        this.start = offset;
    }

    // Synonym of rows, added for consistency with Java Search Client
    /**
     * Sets the number of results to return.
     * @param {int} numResults - Number of results to return
     */
    set numResults(numResults) {
        this.rows = numResults;
    }

    /**
     * Sets the offset of the results.
     * @param {int} start - Number of results to skip
     */
    set start(start) {
        super.setParam("start", start);
    }

    /**
     * Sets the number of results to return.
     * @param {int} rows - Number of results to return
     */
    set rows(rows) {
        super.setParam("rows", rows);
    }

    /**
     * Sets the actual query.
     * @param {string} query - Solr query string
     */
    set query(query) {
        super.setParam("q", query);
    }

    /**
     * Sets the sort order.
     * @param {string} sort - Sort order
     */
    set sort(sort) {
        super.setParam("sort", sort);
    }

    /**
     * Sets the fields that should be returned.
     * @param {Array} fields - List of field names
     */
    set fieldsToReturn(fields) {
        super.setParam("fl", fields);
    }

    /**
     * Enables or disables highlighting in the results
     * @param {string} highlight - Indicates if highlighting should be used
     */
    set highlight(highlight) {
        super.setParam("hl", highlight);
    }

    /**
     * Sets the field to apply highlighting in the results
     * @param {string} fields - List of field names to use for highlighting
     */
    set highlightFields(fields) {
        this.highlight = true;

        super.setParam("hl.fl", fields);
    }

    /**
     * Sets the number of snippets to generate per field in highlighting
     * @param {int} snippets - Number of snippets
     */
    set highlightSnippets(snippets) {
        super.setParam("hl.snippets", snippets);
    }

    /**
     * Sets the size of snippets to generate per field in highlighting
     * @param {int} size - Size of snippets
     */
    set highlightSnippetSize(size) {
        super.setParam("hl.fragsize", size);
    }

    /**
     * Sets the filter queries used to reduce the search results
     * @param {Array} queries - List of filter queries
     */
    set filterQueries(queries) {
        super.addParam("fq", queries);
    }

    /**
     * Sets if the additional Crafter Search filters should be disabled on query execution.
     * @param {bool} disableAdditionalFilters - Indicates if additional filters should be used
     */
    set disableAdditionalFilters(disableAdditionalFilters) {
        super.setParam("disable_additional_filters", disableAdditionalFilters)
    }

}

/**
 * Base class for Search Services
 */
class SearchService {

    /**
     * @constructor
     * @param {string} baseUrl - Crafter Searcg URL
     * @param {string} site - Site name used to resolve all API calls
     */
    constructor(baseUrl, site) {
        this.baseUrl = baseUrl;
        this.site = site;
    }

}

/**
 * Implementation of Search Service for Solr
 */
class SolrSearchService extends SearchService {

    /**
     * Returns a new Query object
     */
    createQuery() {
        return new SolrQuery();
    }

    /**
     * Does a full-text search and returns a Map model.
     * @param {Query} query - the query object
     */
    search(query) {
        var params = {};
        params.index_id = this.site;
        for(var param in query.params) {
            params[param] = query.params[param];
        }
        return httpGet(this.baseUrl, '/crafter-search/api/2/search/search.json', params);
    }
}

/**
 * Wrapper class for Search Service
 */
export class SearchClient {

    constructor(baseUrl, site) {
        this.searchService = new SolrSearchService(baseUrl, site);
    }

}
