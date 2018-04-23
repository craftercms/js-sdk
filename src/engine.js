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

// Engine Client classes

class ContentStoreService {

    constructor(baseUrl, site) {
        this.baseUrl = baseUrl;
        this.site = site;
    }

    getItem(url, callback) {
        return httpGet(this.baseUrl, '/api/1/site/content_store/item.json', { crafterSite: this.site, url: url });
    }

    getDescriptor(url, callback) {
        return httpGet(this.baseUrl, '/api/1/site/content_store/descriptor.json', { crafterSite: this.site, url: url });
    }

    getChildren(url, callback) {
        return httpGet(this.baseUrl, '/api/1/site/content_store/children.json', { crafterSite: this.site, url: url });
    }

    getTree(url, callback) {
        return httpGet(this.baseUrl, '/api/1/site/content_store/tree.json', { crafterSite: this.site, url: url });
    }
}

class NavigationService {

    constructor(baseUrl, site) {
        this.baseUrl = baseUrl;
        this.site = site;
    }

    getNavTree(url, depth, currentPageUrl) {
        var params = { crafterSite: this.site, url: url };
        if(depth) {
            params.depth = depth;
        }
        if(currentPageUrl) {
            params.currentPageUrl = currentPageUrl;
        }
        return httpGet(this.baseUrl, '/api/1/site/navigation/tree.json', params);
    }

    getNavBreadcrumb(url, root) {
        var params = { crafterSite: this.site, url: url };
        if(root) {
            params.root = root;
        }
        return httpGet(this.baseUrl, '/api/1/site/navigation/breadcrumb.json', params);
    }

}

class UrlTransformationService {

    constructor(baseUrl, site) {
        this.baseUrl = baseUrl;
        this.site = site;
    }

    transform(transformerName, url) {
        return httpGet(this.baseUrl, '/api/1/site/url/transform.json', {
            crafterSite: this.site,
            url: url,
            transformerName: transformerName
        });
    }
}

export class EngineClient {

    constructor(baseUrl, site) {
        this.contentStoreService = new ContentStoreService(baseUrl, site);
        this.navigationService = new NavigationService(baseUrl, site);
        this.urlTransformationService = new UrlTransformationService(baseUrl, site);
    }

}
