# SDK Changelog

## 1.2.4

### @craftercms/content
- Add ability to specify `flatten` for the `content_store/descriptor` endpoint (via the config argument of the function).
- Make `parseDescriptor` be able to handle the deserialization products of the [recent `crafter-source` & `crafter-source-content-type-id` attribute additions](https://github.com/craftercms/craftercms/issues/4093).

### @craftercms/ice
- [bugfix] Handle calls to `repaintPencils` before the dependency loader has been configured to avoid incorrect paths to load scripts/css from.
- Extend support to react 17 (peerDependencies).

### misc
- Upgrade to typescript 4+
    - Fix type check issues that arose from upgrade.

## 1.2.3

### @craftercms/ice
- Add `package.json` to `react` folder for prettier import usage and module bundler support

### @craftercms/content
- Improve robustness of `parseDescriptor` function
- Adds `preParseSearchResults` function

### misc
- Added docs to package readme files for plain html/js usage
- Removed the `browser` field from `package.json` files so bundlers can make use of es6 modules and tree shaking
- Add npm badge to README files

## 1.2.2

### @craftercms/ice
- Adds `reportNavigation` util for SPAs to report the current URL as the app navigates.

### misc
- [internal] Bumps acorn version

## 1.2.1

### @craftercms/ice
- Added validation addAuthoringSupport require.js load event
- `getICEAttributes`
  - Auto calculates the label if not supplied based on the model param
  - Validates parentModelId and path (model.craftercms.path) and throws console errors to help developers use the right values
  - Adds a _secret_ second argument so that wrapping utilities can identify themselves and errors as the entry point of the error

### @craftercms/utils
- Renames misc/composeUrl param renamed for more accurate semantics

### @craftercms/content
- `parseDescriptor`
  - Fixes issue  where repeat group items with inner node selectors weren't parsed
  - Improvements in `getItem` service parsing and component detection algorithms for `getItem` and `getDescriptor`
  - Adds ability to parse a `getTree` response into a flat content instance array
  - Adds `getChildren` response recognition and throws with non-parsable responses

## 1.2.0

### @craftercms/classes
- SDKService refactored as stand alone functions; no need to use as class now though you may still use in the same way as in previous release if you prefer (backward compatible).

### @craftercms/content
- Services refactored as stand alone functions; no need to use as class now though you may still use in the same way as in previous release if you prefer (backward compatible).
- New `parseDescriptor` method which parses a `getDescriptor`, `getItem` or `GraphQL` response into a Content Instance (@see models/Content Instance).

### @craftercms/ice
- First published
- Publishing generic Crafter CMS In Context Editing (ICE) attribute retrieval functions for pencils and drop zones (drag and drop)
    - getIceAttributes, 
    - getDropZoneAttributes
    - import/use in code by doing 
        - `import { getIceAttributes } from '@craftercms/ice';`
        - `import { getDropZoneAttributes } from '@craftercms/ice';`
- Publishing generic util functions
    - repaintPencils: Repaints/repositions Crafter CMS In Context Editing pencils 
    - fetchIsAuthoring: Interrogates the current origin server to determine if the site/app is running in Crafter CMS authoring or delivery environments
    - addAuthoringSupport: Includes the necessary scripts to enable Crafter CMS authoring support
    - `import { repaintPencils, fetchIsAuthoring, addAuthoringSupport } from '@craftercms/ice';` as needed
- Publishing React specific bindings via custom hooks:
    - useICE, 
    - useDropZone
    - Import/use in code by doing
        - `import { useICE } from '@craftercms/ice/esm5/react';`
        - `import { useDropZone } from '@craftercms/ice/esm5/react';`
- For direct usage in HTML `<script/>` tags, use the umd build
    ```html
    <script src="{path-to-your-scripts}/ice/bundles/ice.umd.js"></script>
    <!-- ice/react requires the main ice script -->
    <script src="{path-to-your-scripts}/ice/bundles/react/index.umd.js"></script>
    ```
- Notice the multi-platform builds published under
    - bundles (umd)
    - esm5 (module)
    - es2015 (esm2015)
    - fesm5
    - fesm2015

### @craftercms/models
- Removed unpublished createLookupTable function; moved to @craftercms/utils
- ContentInstance model added

### @craftercms/redux
- redux, redux-observable & rxjs upgraded

### @craftercms/search
- Service refactored as stand alone functions; no need to use as class now though you may still use in the same way as in previous release if you prefer (backward compatible).

### @craftercms/utils
- Publishes createLookupTable util

### Global
- Internal Yarn workspace set up
- RxJS upgrade for all packages which have it as a dependency
- Rollup config adjustments
- Build script updates to print rollup output
- Added `index.js` to fesm distributions
- License updates

