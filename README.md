# craftercms-sdk-js
Crafter CMS SDK for JavaScript in the browser and Node JS

## Examples

- Add the module to your project by running `npm install --save @craftercms/sdk`

- Connect Crafter Engine to get the index page from the site:

```js
  import { EngineClient } from '@craftercms/engine';

  const engineClient = new EngineClient({
    baseUrl: 'http://localhost:8080', 
    site: 'editorial'
  });

  engineClient.getItem('/site/website/index.xml')
    .subscribe(item => {
      // ...
    });
```

- Connect to Crafter Search to query for content:

```js
    import { SolrService } from '@craftercms/search';

    const searchService = new SolrService({
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

## Project Structure

- `packages` contains the different SDK packages and their respective sources (TypeScript for the most part)

## Building

- `yarn` will fetch all dependencies for development
- `yarn compile` will use babel to generate ES5 sources in the `lib` folder
- `yarn build` will use webpack to generate a production ES5 bundle under `dist` folder
- `yarn dev` will use webpack to generate a development ES5 bundle under `dist` folder and watch for changes
- `yarn doc` will generate the sdk documentation under `doc` folder

## Testing

Run `yarn test` to execute all tests, before running this command you need to:
- Start a crafter authoring environment
- Create a site using the `editorial` blueprint with the same name
