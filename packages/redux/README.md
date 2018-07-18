# @craftercms/redux

## Usage

- Add the module to your project by running `yarn add @craftercms/redux`
- Set the Crafter Configuration (site, baseUrl).
- Import and use the redux store provided by the library, or implement your own store.
- Import and use the action(s) you need.

## Actions

- `getItem` Get an Item from the content store.
- `getDescriptor` Get the descriptor data of an Item in the content store.
- `getChildren` Get the list of Items directly under a folder in the content store.
- `getTree` Get the complete Item hierarchy under the specified folder in the content store.
- `getNav` Returns the navigation tree with the specified depth for the specified store URL.
- `getNavBreadcrumb` Returns the navigation items that form the breadcrumb for the specified store URL.
- `search` 

## Utils

- `createReduxStore` Creates a redux store with all the crafter-redux details attached. Optionally, custom app reducers and/or epics may be supplied to create the store as required by client application.
- `getState` Retrieves the current redux store state.

## Examples

- Set the configuration for the redux store

```js
  import { crafterConf } from '@craftercms/classes';

  // This configuration will by used for all of the calls in the library. 
  crafterConf.configure({
    baseUrl: 'http://localhost:8090',  // By default - http://localhost:8080
    site: 'editorial'
  })
```

- Create redux store provided by the library

```js
  import { createReduxStore } from '@craftercms/redux';

  import { allReducers } from './your-reducers/reducers';
  import thunk from 'redux-thunk';  // Or your chosen middleware

  const store = createReduxStore({
    namespaceCrafterState: true,   // Set to true to namespace craftercms states
    namespace: "craftercms",       // Namespace label used for craftercms states
    reducerMixin: allReducers,     // Your reducers (to combine them with the redux store)
    reduxDevTools: true,           // Set to true if you want to use reduxDevTools extension
    additionalMiddleWare: [thunk]  // Your chosen middleware to combine it with the library store
  });

```

- Get the index page from the site into your store

```js
  import { getItem } from '@craftercms/redux';

  const itemUrl = '/site/website/index.xml';

  store.dispatch(getItem(itemUrl));
```

Store state while loading item

```json
  {
    "craftercms": {
      "items": {
        "loading": {
          "/site/website/index.xml": true
        },
        "entries": { }
      }
    },
    ...
  }
```

Resulting store state

```json
  {
    "craftercms": {
      "items": {
        "loading": {
          "/site/website/index.xml": false
        },
        "entries": {
          "/site/website/index.xml": { ... }
        }
      }
    },
    ...
  }
```

- Get the tree under a specified folder from the site into your store

```js
  import { getTree } from '@craftercms/redux';

  const url = '/site/website';

  store.dispatch(getTree(url));
```

Store state while loading tree

```json
  {
    "craftercms": {
      "trees": {
        "loading": {
          "/site/website": true
        },
        "entries": {},
        "childIds": {}
      }
    },
    ...
  }
```

Resulting store state

```json
  {
    "craftercms": {
      "items": {
        "loading": {
          "/site/website": true
        },
        "entries": {
          "/site/website": { ... },
          "/site/website/style": { ... },
          "/site/website/health": { ... }
        },
        "childIds": {
          "/site/website" : [
            "/site/website/style",
            "/site/website/health"
          ],
          "/site/website/style": [],
          "/site/website/health": []
        }
      }
    },
    ...
  }
```

If you want to get '/site/website' children, you can do as follow:

```js
  const parentId = '/site/website';

  state.childrenIds[parentId].map(id => {
    state.entries[id]  //child item
  })
```