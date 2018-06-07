# Usage

- `yarn add @craftercms/search`

## Example

- Connect to Crafter Search to query for content:

```js
    import { SearchService } from '@craftercms/search';

    const searchService = SearchService.getInstance({
      baseUrl: 'http://localhost:8080', 
      site: 'editorial'
    });

    searchService
      .search({
         query: '*:*',
         filterQueries: ['content-type:/page/article', 'featured_b:true']
       })
      .subscribe(results => {
          // ...
      });
```
