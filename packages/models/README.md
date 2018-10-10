# @craftercms/models

This package contains data model definitions of different structures of Crafter CMS. This interfaces are useful when developing in typescript.

## Usage

- Install module using `yarn` or `npm`
  - Yarn: `yarn add @craftercms/models`
  - npm: `npm install @craftercms/models`
- Import and use the models you need

## Models
---

## - CrafterConfig
Crafter configuration model for modules to work

### Example

- Default values:

```json
  {
    site: "editorial",
    searchId: "editorial",
    baseUrl: "http://localhost:8080"
  }
```

- Defining an object of type CrafterConfig:

```ts
  import { CrafterConfig } from "@craftercms/models";

  const config: CrafterConfig = {
    site: "editorial",
    searchId: 'editorial'   // if searchId is the same as site, this parameters is not needed
    baseUrl: "http://localhost:8090"
  };
```

## - Item
Crafter item model with its base properties

### Example

- Defining an object of type Item:

```ts
  import { Item } from "@craftercms/models";

  const item: Item = {
    name: "index.xml",
    url: "/site/website/index.xml",
    descriptorUrl: "/site/website/index.xml",
    descriptorDom: { ... },
    folder: false
  };
```

## - Descriptor
Crafter descriptor model with its base properties

### Example

- Defining an object of type Descriptor:

```ts
  import { Descriptor } from "@craftercms/models";

  const item: Descriptor = {
    page: { ... }
  };
```

## - NavigationItem
Crafter navigation item model  with its base properties

### Example

- Defining an object of type NavigationItem:

```ts
  import { NavigationItem } from "@craftercms/models";

  const item: NavigationItem = {
    url: "/site/website",
    active: boolean,
    subItems: [
      {
        //Each Item is a NavigationItem
      }
    ]
  };
```

## - StateContainer
Describes the container of a redux state, with entries and optional childIds.

### Example

- Defining an object of type StateContainer:

```ts
  import { StateContainer } from "@craftercms/models";

  const item: StateContainer = {
    entries: { /* type = LookupTable */ },
    loading: { /* type = LookupTable */ }
    childIds: { /* type = LookupTable */ }
  };
```

Every property value in a state container is a [LookupTable](#lookupTable)

## - CrafterState
Describes the crafter state, each entry is as [StateContainer](#stateContainer)

### Example

- Defining an object of type CrafterState:

```ts
  import { CrafterState } from "@craftercms/models";

  const item: CrafterState = {
    items: { /* type = StateContainer */ }
  };
```

## - CrafterNamespacedState
Describes a namespaced state, with a [CrafterState](#CrafterState) under the namespace

### Example

- Defining an object of type CrafterNamespacedState:

```ts
  import { CrafterNamespacedState } from "@craftercms/models";

  const item: CrafterNamespacedState = {
    craftercms: { /* type = CrafterState */ }
  };
```

## - LookupTable
Describes an object consisting on keys (item id property) and values (content itself)

### Example

- Defining an object of type LookupTable:

```ts
  import { LookupTable } from "@craftercms/models";

  const item: LookupTable = {
    /site/website/index.xml: {
      name: "index.xml",
      url: "/site/website/index.xml",
      descriptorUrl: "/site/website/index.xml",
      descriptorDom: { ... },
      folder: false
    }
  };
```

## Utils
---

## createLookupTable
Creates a lookup table based on an array of items (of a type) and the items id identifier.

### Example

- Create a lookupTable of type Item:

```ts
  import { createLookupTable } from "@craftercms/models";
  import { Item } from "@craftercms/models";

  // item (type Item) - Defined on previous example
  const channelsTable = createLookupTable<Item>([item], 'url');
```

The lookupTable will look like this:

```json
  {
    /site/website/index.xml: {
      name: "index.xml",
      url: "/site/website/index.xml",
      descriptorUrl: "/site/website/index.xml",
      descriptorDom: { ... },
      folder: false
    }
  }
```