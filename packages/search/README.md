# @craftercms/search

This package contains tools for integrating your application with Crafter Search.

## Usage

- Install module using `yarn` or `npm`
  - Yarn: `yarn add @craftercms/search`
  - npm: `npm install @craftercms/search`
- Import and use the service(s) you need

## Services
---

## Search
Returns the result for a given query.

`search(query: Query)` 

| Parameters    |                |
| ------------- |:--------------:|
| query         | The query object |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

Map model

### Examples

- Connect to Crafter Search to query for content with ELASTIC SEARCH (crafter version: 3.1.x):

```ts
  import { crafterConf } from '@craftercms/classes';
  import { SearchService } from '@craftercms/search';

  //First, set the Crafter configuration to _cache_ your config. 
  //All subsequent calls to `getConfig` will use that configuration.
  crafterConf.configure({
    baseUrl: 'http://localhost:8080'
    site: 'editorial'
  });

  //Create elastic query
  const query = SearchService.createQuery('elastic');
  query.query = {
    "query" : {
        "match_all" : {}
    }
  }

  SearchService
    .search(query)
    .subscribe(results => {
      // ...
    });
```

- Connect to Crafter Search to query for content with SOLR (crafter version: 3.0.x):

```ts
  import { crafterConf } from '@craftercms/classes';
  import { SearchService } from '@craftercms/search';

  //First, set the Crafter configuration to _cache_ your config. 
  //All subsequent calls to `getConfig` will use that configuration.
  crafterConf.configure({
    baseUrl: 'http://localhost:8080'
    site: 'editorial',
    searchId: 'editorial'   // if searchId is the same as site, this parameters is not needed
  })

  const query = SearchService.createQuery('solr');
  query.query = "*:*";
  query.filterQueries = ['content-type:"/component/video"'];

  SearchService
    .search(query)
    .subscribe(results => {
      // ...
    });
```

You may alternatively use a different config by supplying the config object at the service call invoking time

```ts
  import { SearchService } from '@craftercms/search';

  //Create query
  const query = SearchService.createQuery('elastic');
  query.query = {
    "query" : {
        "match_all" : {}
    }
  }

  SearchService
    .search(query, {
      baseUrl: 'http://localhost:8080',
      site: 'editorial'
    })
    .subscribe(results => {
      // ...
    });
```
