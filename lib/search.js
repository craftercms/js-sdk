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
        key: 'toString',
        value: function toString(value) {
            return Array.isArray(value) ? value.join(",") : value;
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
        key: 'setOffset',
        value: function setOffset(offset) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "start", offset);
        }
    }, {
        key: 'setNumResults',
        value: function setNumResults(numResults) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "rows", numResults);
        }
    }, {
        key: 'setQuery',
        value: function setQuery(query) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "q", query);
        }
    }, {
        key: 'setFieldsToReturn',
        value: function setFieldsToReturn(fields) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "fl", _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'toString', this).call(this, fields));
        }
    }, {
        key: 'setHighlight',
        value: function setHighlight(highlight) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "hl", highlight);
        }
    }, {
        key: 'setHighlightFields',
        value: function setHighlightFields(fields) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "hl.fl", _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'toString', this).call(this, fields));
        }
    }, {
        key: 'setHighlightSnippets',
        value: function setHighlightSnippets(snippets) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "hl.snippets", snippets);
        }
    }, {
        key: 'setHighlightSnippetSize',
        value: function setHighlightSnippetSize(size) {
            _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "hl.fragsize", size);
        }
    }, {
        key: 'setFilterQueries',
        value: function setFilterQueries(queries) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = queries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var query = _step.value;

                    _get(SolrQuery.prototype.__proto__ || Object.getPrototypeOf(SolrQuery.prototype), 'addParam', this).call(this, "fq", query);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
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
        value: function search(query, callback) {
            var params = {};
            params.index_id = this.site;
            for (var param in query.params) {
                params[param] = query.params[param];
            }
            (0, _utils.httpGet)(this.baseUrl, '/crafter-search/api/2/search/search.json', params, callback);
        }
    }]);

    return SolrSearchService;
}(SearchService);

var SearchClient = exports.SearchClient = function SearchClient(baseUrl, site) {
    _classCallCheck(this, SearchClient);

    this.searchService = new SolrSearchService(baseUrl, site);
};