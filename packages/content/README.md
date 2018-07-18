# @craftercms/content

## Usage

- Add the module to your project by running `yarn add @craftercms/content`
- Import and use the service(s) you need

## Services

- `ContentStoreService.getItem` Get an Item from the content store.
- `ContentStoreService.getDescriptor` Get the descriptor data of an Item in the content store.
- `ContentStoreService.getChildren` Get the list of Items directly under a folder in the content store.
- `ContentStoreService.getTree` Get the complete Item hierarchy under the specified folder in the content store.
- `NavigationService.getNavTree` Returns the navigation tree with the specified depth for the specified store URL.
- `NavigationService.getNavBreadcrumb` Returns the navigation items that form the breadcrumb for the specified store URL.
- `UrlTransformationService.transform` Transforms a URL, based on the current site’s configuration. 

## Examples

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
You may also set the Crafter configuration to _cache_ your config

```js
  import { crafterConf } from '@craftercms/classes';
  import { ContentStoreService } from '@craftercms/content';

  // Supply config on first invocation. All subsequent calls 
  // to `getConfig` will use that config.
  crafterConf.configure({
    baseUrl: 'http://localhost:8090',  //by default - http://localhost:8080
    site: 'editorial'
  })

  ContentStoreService.getItem('/site/website/index.xml')
    .subscribe(item => {
      // ...
    });
```

- Get the navigation tree for the index page from the site, depth 3:

```js
  import { NavigationService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  NavigationService.getNavTree("/site/website", 3)
    .subscribe((tree) => {
      // ...
    })
```

- Transform a store url into a render url

```js
  import { UrlTransformationService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  UrlTransformationService.transform("storeUrlToRenderUrl", "/site/website/style/index.xml")
    .subscribe((url) => {
      // url = '/style'
    })
```

- Transform a render url into a store url

```js
  import { UrlTransformationService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  UrlTransformationService.transform("renderUrlToStoreUrl", "/technology")
    .subscribe((url) => {
      // url = '/site/website/technology/index.xml'
    })
```