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
exports.EngineClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Engine Client classes

var ContentStoreService = function () {
    function ContentStoreService(baseUrl, site) {
        _classCallCheck(this, ContentStoreService);

        this.baseUrl = baseUrl;
        this.site = site;
    }

    _createClass(ContentStoreService, [{
        key: 'getItem',
        value: function getItem(url, callback) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/item.json', { crafterSite: this.site, url: url });
        }
    }, {
        key: 'getDescriptor',
        value: function getDescriptor(url, callback) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/descriptor.json', { crafterSite: this.site, url: url });
        }
    }, {
        key: 'getChildren',
        value: function getChildren(url, callback) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/children.json', { crafterSite: this.site, url: url });
        }
    }, {
        key: 'getTree',
        value: function getTree(url, callback) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/tree.json', { crafterSite: this.site, url: url });
        }
    }]);

    return ContentStoreService;
}();

var NavigationService = function () {
    function NavigationService(baseUrl, site) {
        _classCallCheck(this, NavigationService);

        this.baseUrl = baseUrl;
        this.site = site;
    }

    _createClass(NavigationService, [{
        key: 'getNavTree',
        value: function getNavTree(url, depth, currentPageUrl) {
            var params = { crafterSite: this.site, url: url };
            if (depth) {
                params.depth = depth;
            }
            if (currentPageUrl) {
                params.currentPageUrl = currentPageUrl;
            }
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/navigation/tree.json', params);
        }
    }, {
        key: 'getNavBreadcrumb',
        value: function getNavBreadcrumb(url, root) {
            var params = { crafterSite: this.site, url: url };
            if (root) {
                params.root = root;
            }
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/navigation/breadcrumb.json', params);
        }
    }]);

    return NavigationService;
}();

var UrlTransformationService = function () {
    function UrlTransformationService(baseUrl, site) {
        _classCallCheck(this, UrlTransformationService);

        this.baseUrl = baseUrl;
        this.site = site;
    }

    _createClass(UrlTransformationService, [{
        key: 'transform',
        value: function transform(transformerName, url) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/url/transform.json', {
                crafterSite: this.site,
                url: url,
                transformerName: transformerName
            });
        }
    }]);

    return UrlTransformationService;
}();

var EngineClient = exports.EngineClient = function EngineClient(baseUrl, site) {
    _classCallCheck(this, EngineClient);

    this.contentStoreService = new ContentStoreService(baseUrl, site);
    this.navigationService = new NavigationService(baseUrl, site);
    this.urlTransformationService = new UrlTransformationService(baseUrl, site);
};