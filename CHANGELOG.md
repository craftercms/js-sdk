# SDK Changelog

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

