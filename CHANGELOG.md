
# 1.0.0

**Refactors**

* Migrated to typescript
* Services now able to work both as static classes or as instances
* API endpoints are available as constants
* New `getInstance` method on services
* Removed `axios` and `qs` packages
* Added RxJS
* Removed SolrSearchService in favour of SearchService and SearchService is now published
* `createQuery` is now a static method of SearchService 

**BREAKING CHANGES**

* Converted to mono-repo of all craftercms JS packages (redux, ice, utils, etc)
* The @craftercms/sdk is no longer the lib. Use specific packages instead (@craftercms/content, @craftercms/search, @craftercms/redux, etc)
* All content api (@craftercms/content) classes receive a CrafterConfig object instead of baseUrl and site
* Services now return Observables (Promises can be gotten by calling .toPromise() on the observable if desired)
* Removed EngineClient (use specific services directly) 
* Removed SearchClient class (use SearchService directly instead)
* Renamed all "engine" to "content"

---
