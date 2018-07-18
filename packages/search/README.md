# @craftercms/search

This package contains tools for integrating your application with Crafter Search engine.

## Usage

- Add the module to your project by running `yarn add @craftercms/search`
- Import and use the service(s) you need

## Services

- `SearchService.getItem` Returns the result for a given query.

## Example

- Connect to Crafter Search to query for content:

```js
  import { SearchService } from '@craftercms/search';

  SearchService
    .search({
        query: '*:*',
        filterQueries: ['content-type:"/page/article"', 'featured_b:true']
      }, {
        baseUrl: 'http://localhost:8080',
        site: 'editorial'
      })
    .subscribe(results => {
      // ...
    });
```

You may also set the Crafter configuration to _cache_ your config

```js
  import { SearchService } from '@craftercms/search';

  //Create query
  const query = SearchService.createQuery();
  query.query = "*:*";
  query.filterQueries = ['content-type:"/component/video"'];

  SearchService
    .search(query, {
      baseUrl: 'http://localhost:8080',
      site: 'editorial'
    })
    .subscribe(results => {
      // ...
    });
```
