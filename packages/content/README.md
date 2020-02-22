# @craftercms/content

This package contains services for retrieving content and navigation using APIs offered by Crafter CMS.

## Usage

- Install module using `yarn` or `npm`
  - Yarn: `yarn add @craftercms/content`
  - npm: `npm install @craftercms/content`
- Import and use the service(s) you need
- You may pre-configure content services to a certain configuration and then you may omit the config param on subsequent calls

    ```typescript
      import { Item } from '@craftercms/models';
      import { getItem } from '@craftercms/content';
      import { crafterConf } from '@craftercms/classes';
    
      // Configure crafter services "globally". Your config will be cached. 
      // All content services use the specified configuration on subsequent calls.
      crafterConf.configure({
        baseUrl: 'http://authoring.company.com',
        site: 'editorial'
      });
     
      // Second param "config" will use "http://authoring.company.com" as 
      // crafter base url and "editorial" as the site to query
      getItem('/site/website/index.xml').subscribe((item: Item) => {
        // ...
      });
    ```

## parseDescriptor
Parse a [Descriptor](../models/src/descriptor.ts), [Item](../models/src/item.ts) or a GraphQL response into a [Content Instance](../models/src/ContentInstance.ts). It could also be a collection of any of these types.

`parseDescriptor(response: Descriptor | Item | GraphQLResponse | Descriptor[] | Item[] | GraphQLResponse)`

| Parameters    |                |
| ------------- |:--------------:|
| response      | The response of a getItem, getDescriptor or GraphQL fetch call |

### Returns

[ContentInstance](../models/src/ContentInstance.ts)

### Examples

- If you want a cleaner/parsed response, you may use `parseDescriptor` util to parse the response for you. You may use it to parse getItem, getDescriptor or GraphQL responses.

```typescript
  import { map } from 'rxjs/operators';
  import { ContentInstance } from '@craftercms/models';
  import { getChildren, getItem, parseDescriptor } from '@craftercms/content';
  
  getItem('/site/website/index.xml', { site: 'editorial' }).pipe(
    map(parseDescriptor)
  ).subscribe((content: ContentInstance) => {
    // ...
  });

  getChildren('/site/website', { site: 'editorial' }).pipe(
    map(parseDescriptor)
  ).subscribe((content: ContentInstance[]) => {
    // ...
  });
```

## Get Item
Get an Item from the content store.

`getItem(path: string, config?: CrafterConfig)`

| Parameters    |                |
| ------------- |:--------------:|
| path          | The item’s path in the content store |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[Item](../models/README.md#Item) - from the content store

### Examples

- Get the index page from the site:

```typescript
  import { Item } from '@craftercms/models';
  import { getItem } from '@craftercms/content'; 
  
  getItem('/site/website/index.xml', { site: 'editorial' }).subscribe((item: Item) => {
    // ...
  });
```

- If you want a cleaner/parsed response, you may use `parseDescriptor` util to parse the response for you.

```typescript
  import { map } from 'rxjs/operators';
  import { ContentInstance } from '@craftercms/models';
  import { getItem, parseDescriptor } from '@craftercms/content';
  
  getItem('/site/website/index.xml', { site: 'editorial' }).pipe(
    map(parseDescriptor)
  ).subscribe((content: ContentInstance) => {
    // ...
  });
```

## Get Descriptor
Get the descriptor data of an Item in the content store.

`getDescriptor(path: string, config?: CrafterConfig)` 

| Parameters    |                |
| ------------- |:--------------:|
| path          | The item’s path in the content store |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[Descriptor](../models/README.md#Descriptor) - from the content store

### Examples

- Get the index page from the site:

```typescript
  import { map } from 'rxjs/operators';
  import { getDescriptor, parseDescriptor } from '@craftercms/content';
  import { Descriptor, ContentInstance } from '@craftercms/models';

  // Example 1: Supplying config inline, Descriptor response...
  getDescriptor('/site/website/index.xml', { site: 'editorial' }).subscribe((descriptor: Descriptor) => {
    // ...
  });

  // Example 2: 
  // - Omit config (must have configured earlier @see Usage section above)
  // - Parse the response
  getDescriptor('/site/website/index.xml').pipe(
    map(parseDescriptor) // Optional. Use for a cleaner parsed response.
  ).subscribe((content: ContentInstance) => {
    // ...
  });
```

## Get Children
Get the list of Items directly under a folder in the content store.

`getChildren(path: string, config?: CrafterConfig)` 

| Parameters    |                |
| ------------- |:--------------:|
| path          | The folder’s path |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[Item](../models/README.md#Item)[] - List of Items from the content store

### Examples

- Get the children items under root folder from the site:

```typescript
  import { getChildren } from '@craftercms/content';

  // Example 1: Supplying config inline
  getChildren('/site/website', { site: 'editorial' }).subscribe((children) => {
    // ...
  });
  
  // Example 2: Omits the config param (must have been previously configured, see Usage section above)
  getChildren('/site/website').subscribe((children) => {
    // ...
  });
```

## Get Tree
Get the complete Item hierarchy under the specified folder in the content store.

`getTree(path: string, depth: number, config: CrafterConfig)` 

| Parameters    |                |
| ------------- |:--------------:|
| path          | The folder’s path |
| depth         | Amount of levels to include. Optional. Default is `1` |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[Item](../models/README.md#Item) - from the content store

### Examples

- Get the items tree under root folder from the site:

```typescript
  import { getTree } from '@craftercms/content';

  // This call will get 3 levels of the tree under the specified folder

  // Example 1: Config supplied inline
  getTree('/site/website', 3, { site: 'editorial' }).subscribe((tree) => {
    // ...
  });

  // Example 2: Services pre-configured (see "Usage" section above), config param omitted.
  getTree('/site/website', 3).subscribe((tree) => {
    // ...
  });
```

## Get Navigation Tree
Returns the navigation tree with the specified depth for the specified store URL.

`getNavTree(path: string, depth: number, currentPageUrl: string, config: CrafterConfig)`

| Parameters     |                |
| -------------- |:--------------:|
| path           | The folder’s path |
| depth          | Amount of levels to include. Optional. Default is `1` |
| currentPageUrl | The URL of the current page. Optional. Default is `''` |
| config         | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[NavigationItem](../models/README.md#NavigationItem) - from the content store

### Examples

- Get the navigation tree of the root folder from the site (depth = 3):

```typescript
  import { getTree } from '@craftercms/content';

  // Example 1: Config supplied inline
  getTree('/site/website', 3, { site: 'editorial' }).subscribe((tree) => {
    // ...
  });

  // Example 2: Services pre-configured (see "Usage" section above), config param omitted.
  getTree('/site/website', 3).subscribe((tree) => {
    // ...
  });
```

## Get Navigation Breadcrumb
Returns the navigation items that form the breadcrumb for the specified store URL.

`getNavBreadcrumb(path: string, root: string, config: CrafterConfig)`

| Parameters     |                |
| -------------- |:--------------:|
| path            | The folder’s path |
| root           | the root URL, basically the starting point of the breadcrumb. Optional. Default is `''` |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

[NavigationItem](../models/README.md#NavigationItem)[] - List of NavigationItem from the content store

### Examples

- Get the breadcrumb for the root folder from the site:

```typescript
  import { getNavBreadcrumb } from '@craftercms/content';

  // Example 1: Config supplied inline
  getNavBreadcrumb('/site/website').subscribe((navBreadcrumb) => {
    // ...
  });

  // Example 2: Services pre-configured (see "Usage" section above), config param omitted.
  getNavBreadcrumb('/site/website').subscribe((navBreadcrumb) => {
    // ...
  });
```

## Transform
Transforms a URL, based on the current site’s configuration. 

- `transform(transformerName: string, path: string, config: CrafterConfig)` 

| Parameters      |                |
| --------------- |:--------------:|
| transformerName | Name of the transformer to apply |
| path             | URL that will be transformed |
| config        | Crafter configuration. Optional. Default value in [here](../models/README.md#CrafterConfig). |

### Returns

string - URL transformed according to transformer applied.

### Examples

- Transform a store path into a render path

```typescript
  import { urlTransform } from '@craftercms/content';

  // Example 1: Config supplied inline
  urlTransform('storeUrlToRenderUrl', '/site/website/style/index.xml', { site: 'editorial' }).subscribe((webUrl) => {
    console.log(webUrl) // "/style"
  });

  // Example 2: Services pre-configured (see "Usage" section above), config param omitted.
  urlTransform('storeUrlToRenderUrl', '/site/website/style/index.xml').subscribe((webUrl) => {
    console.log(webUrl) // "/style"
  });
```

- Transform a render path into a store path

```typescript
  import { transform } from '@craftercms/content';

  // Assuming that you already set the configuration (as explained above)
  
  // Example 1: Config supplied inline
  transform('renderUrlToStoreUrl', '/technology', { site: 'editorial' }).subscribe((path) => {
    console.log(path); // "/site/website/technology/index.xml"
  });

  // Example 2: Services pre-configured (see "Usage" section above), config param omitted.
  transform('renderUrlToStoreUrl', '/technology').subscribe((path) => {
    console.log(path); // "/site/website/technology/index.xml"
  })
```
