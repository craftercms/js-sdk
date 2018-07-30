# @craftercms/content

This package contains services for retrieving content and navigation using APIs offered by craftercms.

## Usage

- Install module using `yarn` or `npm`
  - Yarn: `yarn add @craftercms/content`
  - npm: `npm install @craftercms/content`
- Import and use the service(s) you need

## Services - Content Store
---

## Get Item
Get an Item from the content store.

`getItem(url: string, config: CrafterConfig)`

| Parameters    |                |
| ------------- |:--------------:|
| url           | The item’s url in the content store |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[Item](../models/README.md#Item) - from the content store

### Examples

- Get the index page from the site:

```ts
  import { crafterConf } from '@craftercms/classes';
  import { ContentStoreService } from '@craftercms/content';

  //First, set the Crafter configuration to _cache_ your config. 
  //All subsequent calls to `getConfig` will use that configuration.
  crafterConf.configure({
    baseUrl: 'http://localhost:8090',  //by default - http://localhost:8080
    site: 'editorial'
  })

  ContentStoreService.getItem('/site/website/index.xml')
    .subscribe(item => {
      // ...
    });
```

You may alternatively use a different config by supplying the config object at the service call invoking time

```ts
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


## Get Descriptor
Get the descriptor data of an Item in the content store.

`getDescriptor(url: string, config: CrafterConfig)` 

| Parameters    |                |
| ------------- |:--------------:|
| url           | The item’s url in the content store |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |


### Returns

[Descriptor](../models/README.md#Descriptor) - from the content store

### Examples

- Get the index page from the site:

```ts
  import { ContentStoreService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  ContentStoreService.getDescriptor('/site/website/index.xml')
    .subscribe(descriptor => {
      // ...
    });
```


## Get Children
Get the list of Items directly under a folder in the content store.

`getChildren(url: string, config: CrafterConfig)` 

| Parameters    |                |
| ------------- |:--------------:|
| url           | The folder’s url |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |


### Returns

[Item](../models/README.md#Item)[] - List of Items from the content store

### Examples

- Get the children items under root folder from the site:

```ts
  import { ContentStoreService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  ContentStoreService.getChildren('/site/website')
    .subscribe(children => {
      // ...
    });
```


## Get Tree
Get the complete Item hierarchy under the specified folder in the content store.

`getTree(url: string, depth: int, config: CrafterConfig)` 

| Parameters    |                |
| ------------- |:--------------:|
| url           | The folder’s url |
| depth         | Amount of levels to include. Optional. Default is `1` |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |


### Returns

[Item](../models/README.md#Item) - from the content store

### Examples

- Get the items tree under root folder from the site:

```ts
  import { ContentStoreService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  //This call will get 3 levels of the tree under the specified folder
  ContentStoreService.getTree('/site/website', 3)
    .subscribe(tree => {
      // ...
    });
```


## Services - Navigation
---

## Get Navigation Tree
Returns the navigation tree with the specified depth for the specified store URL.

`getNavTree(url: string, depth: string, currentPageUrl: string, config: CrafterConfig)`

| Parameters     |                |
| -------------- |:--------------:|
| url            | The folder’s url |
| depth          | Amount of levels to include. Optional. Default is `1` |
| currentPageUrl | The URL of the current page. Optional. Default is `''` |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[NavigationItem](../models/README.md#NavigationItem) - from the content store

### Examples

- Get the navigation tree of the root folder from the site (depth = 3):

```ts
  import { NavigationService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  //This call will get 3 levels of the tree under the specified folder
  NavigationService.getTree('/site/website', 3)
    .subscribe(tree => {
      // ...
    });
```


## Get Navigation Breadcrumb
Returns the navigation items that form the breadcrumb for the specified store URL.

`getNavBreadcrumb(url: string, root: string, config: CrafterConfig)`

| Parameters     |                |
| -------------- |:--------------:|
| url            | The folder’s url |
| root           | the root URL, basically the starting point of the breadcrumb. Optional. Default is `''` |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[NavigationItem](../models/README.md#NavigationItem)[] - List of NavigationItem from the content store

### Examples

- Get the breadcrumb for the root folder from the site:

```ts
  import { NavigationService } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)

  NavigationService.getNavBreadcrumb('/site/website')
    .subscribe(navBreadcrumb => {
      // ...
    });
```


## Services - URL Transformation
---

## Transform
Transforms a URL, based on the current site’s configuration. 

- `transform(transformerName: string, url: string, config: CrafterConfig)` 

| Parameters      |                |
| --------------- |:--------------:|
| transformerName | Name of the transformer to apply |
| url             | URL that will be transformed |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

string - URL transformed according to transformer applied.

### Examples

- Transform a store url into a render url

```ts
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
