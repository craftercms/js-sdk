# Usage

- Add the module to your project by running `yarn add @craftercms/content`
- Import and use the service(s) you need

## Example

- Get the index page from the site:

```js
  import { ContentStoreService } from '@craftercms/content';

  ContentStoreService
    .getItem('/site/website/index.xml', {
      baseUrl: 'http://localhost:8080',
      site: 'editorial'
    })
    .subscribe(item => {
      // ...
    });
```
You may also instantiate or use the singleton method to _cache_ your config

```js
  import { ContentStoreService } from '@craftercms/content';

  // Supply config on first invocation. All subsequent calls 
  // to `getInstance` will use that config.
  const engineClient = new ContentStoreService.getInstance({
    baseUrl: 'http://localhost:8080', 
    site: 'editorial'
  });

  engineClient.getItem('/site/website/index.xml')
    .subscribe(item => {
      // ...
    });
```

