
# 4.0.0

**Refactors**

* Migrated to typescript
* Services now able to work both as static classes and instances
* API endpoints are available as constants
* `getInstance` method supplied by services to use as singleton
* Removed `axios` and `qs` packages
* Added RxJS
* Renamed SolrSearchService to SolrService
* Converted to mono-repo for other packages too (redux, ice, utils, etc)

**BREAKING CHANGES**

* All engine classes receive a StudioConfig object instead of baseUrl and site
* Services now return Observables. Promises can be used by calling .toPromise on the observable or using the promise wrapper classes provided
* Engine client publishes all methods of the wrapped classes as a class method directly and no longer has each service instance as a property
* Removed SearchClient class (Use SolrService directly instead).

---

(Changelog prior to 4.0.0 not available.)
