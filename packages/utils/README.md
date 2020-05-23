![npm (scoped)](https://img.shields.io/npm/v/@craftercms/utils?style=plastic)

# @craftercms/utils

Contains various utilities useful when developing with Crafter CMS

## createLookupTable
Creates a lookup table based on an array of items (of a type) and the items id identifier.

### Example

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
