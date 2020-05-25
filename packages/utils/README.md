![npm (scoped)](https://img.shields.io/npm/v/@craftercms/utils?style=plastic)

# @craftercms/utils

Contains various utilities useful when developing with Crafter CMS

## Usage

All of Crafter CMS packages can be used either via npm or in plain html/javascript via regular script imports.

### Via npm

- `yarn add @craftercms/utils` or `npm install @craftercms/utils`
- `import` or `require` the functions you wish.

### Via html script imports

- Download the bundle and import them in your page.
- The bundles declare a global variable named `craftercms`. You can access all craftercms' packages and functions under this root.
- The `utils` package depends on rxjs, make sure to import rxjs too before the `utils` script.
 
**Tip**: Once you've imported the scripts, type `craftercms` on your browser's dev tools console to inspect the package(s)
 
#### Vanilla html/js example
 ```html
<div id="myFeature"></div>
<script src="https://unpkg.com/rxjs"></script>
<script src="https://unpkg.com/@craftercms/utils"></script>
<script>
  (function ({ utils }) {

    const people = [
      { id: 1, name: 'Mary' }
    ]

    const myLookup = utils.createLookupTable(people);
    console.log(myLookup); // => { 1: { id: 1, name: 'Mary' } }

  })(craftercms);
</script>
```

## Package Index

The examples below assume usage in the style of using via npm. If you're using the bundles, 
directly importing as a script in the browser, these functions will be under the global variable
named `craftercms.utils` (i.e. `window.craftercms.utils`).

### createLookupTable
Creates a lookup table based on an array of items (of a type) and the items id identifier.

#### Example

- Create a lookup table of items:

```typescript
import { Item, LookupTable } from "@craftercms/models";
import { createLookupTable } from "@craftercms/utils";

const items: Item[] = [/* ... */];
const itemsLookupTable: LookupTable<Item> = createLookupTable<Item>(items, 'url');
```

The lookupTable will look like this:

```json
  {
    "/site/website/index.xml": {
      "name": "index.xml",
      "url": "/site/website/index.xml",
      "descriptorUrl": "/site/website/index.xml",
      "descriptorDom": { /* ... */ },
      "folder": false
    }
  }
```
