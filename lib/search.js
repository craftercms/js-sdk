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

var Query = function () {
    function Query() {
        _classCallCheck(this, Query);

        this.params = {};
    }

    _createClass(Query, [{
        key: 'setParam',
        value: function setParam(name, value) {
            this.params[name] = value;
        }
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

var SolrQuery = function (_Query) {
    _inherits(SolrQuery, _Query);

    function SolrQuery() {
        _classCallCheck(this, SolrQuery);

        return _possibleConstructorReturn(this, (SolrQuery.__proto__ || Object.getPrototypeOf(SolrQuery)).apply(this, arguments));
    }

    _createClass(SolrQuery, [{
        key: 'offset',


        // Synonym of start, added for consistency with Java Search Client
        set: function set(offset) {
            this.start = offset;
        }

        // Synonym of rows, added for consistency with Java Search Client

    }, {
        key: 'numResults',
        set: function set(numResults) {
            this.rows = numResults;
        }
    }, {
        key: 'start',
        set: function set(start) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "start", start);
        }
    }, {
        key: 'rows',
        set: function set(rows) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "rows", rows);
        }
    }, {
        key: 'query',
        set: function set(query) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "q", query);
        }
    }, {
        key: 'sort',
        set: function set(sort) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "sort", sort);
        }
    }, {
        key: 'fieldsToReturn',
        set: function set(fields) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "fl", fields);
        }
    }, {
        key: 'highlight',
        set: function set(highlight) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl", highlight);
        }
    }, {
        key: 'highlightFields',
        set: function set(fields) {
            this.highlight = true;

            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl.fl", fields);
        }
    }, {
        key: 'highlightSnippets',
        set: function set(snippets) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl.snippets", snippets);
        }
    }, {
        key: 'highlightSnippetSize',
        set: function set(size) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "hl.fragsize", size);
        }
    }, {
        key: 'filterQueries',
        set: function set(queries) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "fq", queries);
        }
    }, {
        key: 'disableAdditionalFilters',
        set: function set(disableAdditionalFilters) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'setParam', this).call(this, "disable_additional_filters", disableAdditionalFilters);
        }
    }]);

    return SolrQuery;
}(Query);

var SearchService = function SearchService(baseUrl, site) {
    _classCallCheck(this, SearchService);

    this.baseUrl = baseUrl;
    this.site = site;
};

var SolrSearchService = function (_SearchService) {
    _inherits(SolrSearchService, _SearchService);

    function SolrSearchService() {
        _classCallCheck(this, SolrSearchService);

        return _possibleConstructorReturn(this, (SolrSearchService.__proto__ || Object.getPrototypeOf(SolrSearchService)).apply(this, arguments));
    }

    _createClass(SolrSearchService, [{
        key: 'createQuery',
        value: function createQuery() {
            return new SolrQuery();
        }
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

var SearchClient = exports.SearchClient = function SearchClient(baseUrl, site) {
    _classCallCheck(this, SearchClient);

    this.searchService = new SolrSearchService(baseUrl, site);
};