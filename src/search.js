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

    toString(value) {
        return Array.isArray(value)? value.join(",") : value
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

    setOffset(offset) {
        super.addParam("start", offset);
    }

    setNumResults(numResults) {
        super.addParam("rows", numResults);
    }

    setQuery(query) {
        super.addParam("q", query);
    }

    setFieldsToReturn(fields) {
        super.addParam("fl", super.toString(fields));
    }

    setHighlight(highlight) {
        super.addParam("hl", highlight);
    }

    setHighlightFields(fields) {
        super.addParam("hl.fl", super.toString(fields));
    }

    setHighlightSnippets(snippets) {
        super.addParam("hl.snippets", snippets);
    }

    setHighlightSnippetSize(size) {
        super.addParam("hl.fragsize", size);
    }

    setFilterQueries(queries) {
        for(var query of queries) {
            super.addParam("fq", query);
        }
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
