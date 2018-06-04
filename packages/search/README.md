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

    var query = searchService.createQuery({
      query: '*:*',
      filterQueries: ['content-type:/page/article', 'featured_b:true']
    });
    
    searchService.search(query)
      .subscribe(results => {
          // ...
      });
```
