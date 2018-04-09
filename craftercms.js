'use strict';

var axios = require("axios");

// Utility functions

var buildOpts = function(site, baseUrl, url, params) {
    var opts = {
        method: "get",
        baseUrl: baseUrl,
        url: url,
        params: params
    };
    if(site) {
        opts.headers = {
            Cookie: "crafterSite=" + site
        };
    }
    return opts;
}

var doGet = function(site, baseUrl, url, params, callback) {
    axios(buildOpts(site, baseUrl, url, params))
    .then(function(response) {
        callback(null, response.data);
    })
    .catch(function(error) {
        callback({ status: error.response.status, data: error.response.data }, null);
    });
};

// Engine Client classes

var SiteContentStoreService = function(baseUrl, site) {
    this.baseUrl = baseUrl;
    this.site = site;
};

SiteContentStoreService.prototype.getItem = function(url, callback) {
    doGet(this.site, this.baseUrl, "/api/1/site/content_store/item.json", { url: url }, callback);
};

SiteContentStoreService.prototype.getDescriptor = function(url, callback) {
    doGet(this.site, this.baseUrl, "/api/1/site/content_store/descriptor.json", { url: url }, callback);
};

SiteContentStoreService.prototype.getChildren = function(url, callback) {
    doGet(this.site, this.baseUrl, "/api/1/site/content_store/children.json", { url: url }, callback);
};

SiteContentStoreService.prototype.getTree = function(url, callback) {
    doGet(this.site, this.baseUrl, "/api/1/site/content_store/tree.json", { url: url }, callback);
};


var EngineClient = function(baseUrl, site) {
    this.baseUrl = baseUrl;
    this.site = site;
};

EngineClient.prototype.getSiteContentStoreService = function() {
    return new SiteContentStoreService(this.baseUrl, this.site);
};

// Search Client classes

var SearchService = function(baseUrl) {
    this.baseUrl = baseUrl;
};

SearchService.prototype.search = function(params, callback) {
    doGet(null, this.baseUrl, "/crafter-search/api/2/search/search.json", params, callback);
};

var SearchClient = function(baseUrl) {
    this.baseUrl = baseUrl;
};

SearchClient.prototype.getSearchService = function() {
    return new SearchService(this.baseUrl);
};

// Exports

module.exports.getEngineClient = function(baseUrl, site) {
    return new EngineClient(baseUrl, site);
};

module.exports.getSearchClient = function(baseUrl) {
    return new SearchClient(baseUrl);
}
