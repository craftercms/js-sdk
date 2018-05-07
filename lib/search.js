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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchClient = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Search Client classes

/**
 * Query Object
 */
var Query = function () {

    /**
     * Creates an empty query
     * @constructor
     */
    function Query() {
        _classCallCheck(this, Query);

        this.params = {};
    }

    /**
     * Sets a single value parameter in the query object
     * @param {string} name - Name of the parameter
     * @param {object} value - Value of the parameter
     */


    _createClass(Query, [{
        key: 'setParam',
        value: function setParam(name, value) {
            this.params[name] = value;
        }

        /**
         * Adds a value for a parameter in the query object
         * @param {string} name - Name of the parameter
         * @param {object} value - Value of the parameter
         */

    }, {
        key: 'addParam',
        value: function addParam(name, value) {
            if (this.params[name]) {
                if (Array.isArray(this.params[name])) {
                    this.params[name].push(value);
                } else {
                    this.params[name] = [this.params[name], value];
                }
            } else {
                this.params[name] = value;
            }
        }
    }]);

    return Query;
}();

/**
 * Query implementation for Solr
 */


var SolrQuery = function (_Query) {
    _inherits(SolrQuery, _Query);

    function SolrQuery() {
        _classCallCheck(this, SolrQuery);

        return _possibleConstructorReturn(this, (SolrQuery.__proto__ || Object.getPrototypeOf(SolrQuery)).apply(this, arguments));
    }

    _createClass(SolrQuery, [{
        key: 'offset',


        // Synonym of start, added for consistency with Java Search Client
        /**
         * Sets the offset of the results.
         * @param {int} offset - Number of results to skip
         */
        set: function set(offset) {
            this.start = offset;
        }

        // Synonym of rows, added for consistency with Java Search Client
        /**
         * Sets the number of results to return.
         * @param {int} numResults - Number of results to return
         */

    }, {
        key: 'numResults',
        set: function set(numResults) {
            this.rows = numResults;
        }

        /**
         * Sets the offset of the results.
         * @param {int} start - Number of results to skip
         */

    }, {
        key: 'start',
        set: function set(start) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "start", start);
        }

        /**
         * Sets the number of results to return.
         * @param {int} rows - Number of results to return
         */

    }, {
        key: 'rows',
        set: function set(rows) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "rows", rows);
        }

        /**
         * Sets the actual query.
         * @param {string} query - Solr query string
         */

    }, {
        key: 'query',
        set: function set(query) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "q", query);
        }

        /**
         * Sets the sort order.
         * @param {string} sort - Sort order
         */

    }, {
        key: 'sort',
        set: function set(sort) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "sort", sort);
        }

        /**
         * Sets the fields that should be returned.
         * @param {Array} fields - List of field names
         */

    }, {
        key: 'fieldsToReturn',
        set: function set(fields) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "fl", fields);
        }

        /**
         * Enables or disables highlighting in the results
         * @param {string} highlight - Indicates if highlighting should be used
         */

    }, {
        key: 'highlight',
        set: function set(highlight) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl", highlight);
        }

        /**
         * Sets the field to apply highlighting in the results
         * @param {string} fields - List of field names to use for highlighting
         */

    }, {
        key: 'highlightFields',
        set: function set(fields) {
            this.highlight = true;

            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl.fl", fields);
        }

        /**
         * Sets the number of snippets to generate per field in highlighting
         * @param {int} snippets - Number of snippets
         */

    }, {
        key: 'highlightSnippets',
        set: function set(snippets) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl.snippets", snippets);
        }

        /**
         * Sets the size of snippets to generate per field in highlighting
         * @param {int} size - Size of snippets
         */

    }, {
        key: 'highlightSnippetSize',
        set: function set(size) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl.fragsize", size);
        }

        /**
         * Sets the filter queries used to reduce the search results
         * @param {Array} queries - List of filter queries
         */

    }, {
        key: 'filterQueries',
        set: function set(queries) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "fq", queries);
        }

        /**
         * Sets if the additional Crafter Search filters should be disabled on query execution.
         * @param {bool} disableAdditionalFilters - Indicates if additional filters should be used
         */

    }, {
        key: 'disableAdditionalFilters',
        set: function set(disableAdditionalFilters) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "disable_additional_filters", disableAdditionalFilters);
        }
    }]);

    return SolrQuery;
}(Query);

/**
 * Base class for Search Services
 */


var SearchService =

/**
 * @constructor
 * @param {string} baseUrl - Crafter Searcg URL
 * @param {string} site - Site name used to resolve all API calls
 */
function SearchService(baseUrl, site) {
    _classCallCheck(this, SearchService);

    this.baseUrl = baseUrl;
    this.site = site;
};

/**
 * Implementation of Search Service for Solr
 */


var SolrSearchService = function (_SearchService) {
    _inherits(SolrSearchService, _SearchService);

    function SolrSearchService() {
        _classCallCheck(this, SolrSearchService);

        return _possibleConstructorReturn(this, (SolrSearchService.__proto__ || Object.getPrototypeOf(SolrSearchService)).apply(this, arguments));
    }

    _createClass(SolrSearchService, [{
        key: 'createQuery',


        /**
         * Returns a new Query object
         */
        value: function createQuery() {
            return new SolrQuery();
        }

        /**
         * Does a full-text search and returns a Map model.
         * @param {Query} query - the query object
         */

    }, {
        key: 'search',
        value: function search(query) {
            var params = {};
            params.index_id = this.site;
            for (var param in query.params) {
                params[param] = query.params[param];
            }
            return (0, _utils.httpGet)(this.baseUrl, '/crafter-search/api/2/search/search.json', params);
        }
    }]);

    return SolrSearchService;
}(SearchService);

/**
 * Wrapper class for Search Service
 */


var SearchClient = exports.SearchClient = function SearchClient(baseUrl, site) {
    _classCallCheck(this, SearchClient);

    this.searchService = new SolrSearchService(baseUrl, site);
};