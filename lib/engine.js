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

/**
 * Content Store Service API
 */
var ContentStoreService = function () {

    /**
     * @constructor
     * @param {string} baseUrl - Crafter Engine URL
     * @param {string} site - Site name used to resolve all API calls
     */
    function ContentStoreService(baseUrl, site) {
        _classCallCheck(this, ContentStoreService);

        this.baseUrl = baseUrl;
        this.site = site;
    }

    /**
     * Returns an Item from the content store.
     * @param {string} url - The item’s url
     */


    _createClass(ContentStoreService, [{
        key: 'getItem',
        value: function getItem(url) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/item.json', { crafterSite: this.site, url: url });
        }

        /**
         * Returns the descriptor data of an Item in the content store.
         * @param {string} url - The item’s url
         */

    }, {
        key: 'getDescriptor',
        value: function getDescriptor(url) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/descriptor.json', { crafterSite: this.site, url: url });
        }

        /**
         * Returns the list of Items directly under a folder in the content store.
         * @param {string} url - the folder’s url
         */

    }, {
        key: 'getChildren',
        value: function getChildren(url) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/children.json', { crafterSite: this.site, url: url });
        }

        /**
         * Returns the complete Item hierarchy under the specified folder in the content store.
         * @param {string} url - the folder’s url
         * @param {int} depth - Amount of levels to include
         */

    }, {
        key: 'getTree',
        value: function getTree(url, depth) {
            return (0, _utils.httpGet)(this.baseUrl, '/api/1/site/content_store/tree.json', { crafterSite: this.site, url: url, depth: depth });
        }
    }]);

    return ContentStoreService;
}();

/**
 * Navigation Service API
 */


var NavigationService = function () {

    /**
     * @constructor
     * @param {string} baseUrl - Crafter Engine URL
     * @param {string} site - Site name used to resolve all API calls
     */
    function NavigationService(baseUrl, site) {
        _classCallCheck(this, NavigationService);

        this.baseUrl = baseUrl;
        this.site = site;
    }

    /**
     * Returns the navigation tree with the specified depth for the specified store URL.
     * @param {string} url - the root folder of the tree
     * @param {int} depth - the depth of the tree
     * @param {string} currentPageUrl - the URL of the current page
     */


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

        /**
         * Returns the navigation items that form the breadcrumb for the specified store URL.
         * @param {string} url - the current URL used to build the breadcrumb
         * @param {string} root - the root URL, basically the starting point of the breadcrumb
         */

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

/**
 * URL Transformation Service API
 */


var UrlTransformationService = function () {

    /**
     * @constructor
     * @param {string} baseUrl - Crafter Engine URL
     * @param {string} site - Site name used to resolve all API calls
     */
    function UrlTransformationService(baseUrl, site) {
        _classCallCheck(this, UrlTransformationService);

        this.baseUrl = baseUrl;
        this.site = site;
    }

    /**
    * Transforms a URL, based on the current site's UrlTransformationEngine.
    * @param {string} transformerName - Name of the transformer to apply
    * @param {string} url - URL that will be transformed
    */


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

/**
 * Wrapper class for all services.
 */


var EngineClient =

/**
 * @constructor
 * @param {string} baseUrl - Crafter Engine URL
 * @param {string} site - Site name used to resolve all API calls
 */
exports.EngineClient = function EngineClient(baseUrl, site) {
    _classCallCheck(this, EngineClient);

    this.contentStoreService = new ContentStoreService(baseUrl, site);
    this.navigationService = new NavigationService(baseUrl, site);
    this.urlTransformationService = new UrlTransformationService(baseUrl, site);
};