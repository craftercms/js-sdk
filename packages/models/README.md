# @craftercms/models

This package contains definitions for different content used by Crafter CMS.

## Usage

- Add the module to your project by running `yarn add @craftercms/models`
- Import and use the models you need

## Models

- `CrafterConfig` Crafter configuration model for modules to work
- `Endpoints` 
- `Item` Crafter item model with its base properties
- `Descriptor` Crafter descriptor model with its base properties
- `NavigationItem` Crafter navigation item model  with its base properties
- `Page` Crafter Page model with its base properties
- `StateContainer` Describes the container of a redux states, with entries and optional childIds.
- `CrafterState` Describes the crafter state, each entry is as StateConainer
- `CrafterNamespacedState` Describes a namespaced state, with a CrafterState under the namespace
- `LookupTable` Describes an object consisting on keys (item id property) and values (content itself)

## Utils

- `createLookupTable` Creates a lookup table based on an array of items (of a type) and the items id identifier.

## Examples

- Defining an object of type Item:

```js
  import { Item } from "@craftercms/models";

  const item:Item = {
    "name": "index.xml",
    "url": "/site/website/index.xml",
    "descriptorUrl": "/site/website/index.xml",
    "descriptorDom": { ... },
    "folder": false
  };
```

Notice that all of the properties on Item model are required, and it can have extra properties as a part of the item.

- Create a lookupTable of type Item:

```js
  import { createLookupTable } from "@craftercms/models";
  import { Item } from "@craftercms/models";

  // item (type Item) - Defined on previous example
  const channelsTable = createLookupTable<Item>([item], 'url');
```

The lookupTable will look like this:

```json
  {
    "/site/website/index.xml": {
      "name": "index.xml",
      "url": "/site/website/index.xml",
      "descriptorUrl": "/site/website/index.xml",
      "descriptorDom": { ... },
      "folder": false
    }
  }
```