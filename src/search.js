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

class Query {

    constructor() {
        this.params = {};
    }

    setParam(name, value) {
        this.params[name] = value;
    }

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

class SolrQuery extends Query {

    // Synonym of start, added for consistency with Java Search Client
    set offset(offset) {
        this.start = offset;
    }

    // Synonym of rows, added for consistency with Java Search Client
    set numResults(numResults) {
        this.rows = numResults;
    }

    set start(start) {
        super.setParam("start", start);
    }

    set rows(rows) {
        super.setParam("rows", rows);
    }

    set query(query) {
        super.setParam("q", query);
    }

    set sort(sort) {
        super.setParam("sort", sort);
    }

    set fieldsToReturn(fields) {
        super.setParam("fl", fields);
    }

    set highlight(highlight) {
        super.setParam("hl", highlight);
    }

    set highlightFields(fields) {
        this.highlight = true;

        super.setParam("hl.fl", fields);
    }

    set highlightSnippets(snippets) {
        super.setParam("hl.snippets", snippets);
    }

    set highlightSnippetSize(size) {
        super.setParam("hl.fragsize", size);
    }

    set filterQueries(queries) {
        super.addParam("fq", queries);
    }

    set disableAdditionalFilters(disableAdditionalFilters) {
        super.setParam("disable_additional_filters", disableAdditionalFilters)
    }

}

class SearchService {

    constructor(baseUrl, site) {
        this.baseUrl = baseUrl;
        this.site = site;
    }

}

class SolrSearchService extends SearchService {

    createQuery() {
        return new SolrQuery();
    }

    search(query) {
        var params = {};
        params.index_id = this.site;
        for(var param in query.params) {
            params[param] = query.params[param];
        }
        return httpGet(this.baseUrl, '/crafter-search/api/2/search/search.json', params);
    }
}

export class SearchClient {

    constructor(baseUrl, site) {
        this.searchService = new SolrSearchService(baseUrl, site);
    }

}
