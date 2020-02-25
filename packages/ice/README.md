# @craftercms/ice

Contains JavaScript utilities to use Crafter CMS In Context Editing in your Apps and Sites

**Note**: All methods of this package work with [Content Instance](../models/src/ContentInstance.ts) as data structure they understand (the model param). Use in conjunction with `parseDescriptor` from `@craftercms/content` to obtain such data structure. 

## getIceAttributes

Use this function to obtain the attributes that you need to add to your HTML element(s) to put pencils for In Context Editing.

### Example

```typescript
  import { from, forkJoin } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { getICEAttributes, fetchIsPreview, repaintPencils } from '@craftercms/ice';
  import { getItem, parseDescriptor } from '@craftercms/content';

  forkJoin({
    isAuthoring: from(fetchIsPreview()),
    model: getItem('/site/website/index.xml', { site: 'editorial' }).pipe(map(parseDescriptor))
  }).subscribe(({ isAuthoring, model }) => {
  
    const page = document.querySelector('#main');
    if (page) {
      const homepageEditPencil = getICEAttributes({ model, isAuthoring });
      Object.entries(homepageEditPencil).forEach(([attr, value]) => {
        page.setAttribute(attr, value);
      });
      repaintPencils();
    }
  
  });
```

## getDropZoneAttributes

Use this function to obtain the attributes that you need to add to your HTML element(s) to mark them as an item selector drop zone.

### Example

```typescript
  import { from, forkJoin } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { getICEAttributes, getDropZoneAttributes, fetchIsPreview, repaintPencils } from '@craftercms/ice';
  import { getItem, parseDescriptor } from '@craftercms/content';

  forkJoin({
    isAuthoring: from(fetchIsPreview()),
    model: getItem('/site/website/index.xml', { site: 'editorial' }).pipe(map(parseDescriptor))
  }).subscribe(({ isAuthoring, model }) => {
  
    const features = document.querySelector('.features');
    if (features) {

      const homepageFeaturesDropZone = getDropZoneAttributes({ model, isAuthoring, zoneName: 'features_o' });
      Object.entries(homepageFeaturesDropZone).forEach(([attr, value]) => {
        features.setAttribute(attr, value);
      });

      const items = features.querySelectorAll('article');
      items.forEach((item) => {
        const pencil = getICEAttributes({ model, isAuthoring });
        Object.entries(pencil).forEach(([attr, value]) => {
          item.setAttribute(attr, value);
        });
      });
        
      repaintPencils();

    }

  });
```

## @craftercms/ice/react

React bindings for pencils and drop zones. Requires React 16.8.0 or above (hooks release). Not available for class components, use the plain methods described above part of this same package.

### useICE

Use this function to obtain the attributes that you need to add to your HTML element(s) to put pencils for In Context Editing.

#### Example

```typescript jsx
  import React, { useEffect, useState } from 'react';
  import { from, forkJoin } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { fetchIsPreview } from '@craftercms/ice';
  import { useICE } from '@craftercms/ice/esm5/react';
  import { getItem, parseDescriptor } from '@craftercms/content';
  
  function App() {
    const [state, setState] = useState();
    useEffect(() => {
      forkJoin({
        isAuthoring: from(fetchIsPreview()),
        model: getItem('/site/website/index.xml', { site: 'editorial' }).pipe(map(parseDescriptor))
      }).subscribe(({ isAuthoring, model }) => {
        setState({ isAuthoring, model });
      });
    }, []);
    return (
      state ? <HomePage /> : 'Loading...'
    );
  }
  
  function HomePage(props) {
    const { isAuthoring, model } = props;
    const { props: pencil } = useICE({ isAuthoring, model });
    return  (
      <div {...pencil}>
        {/* ... */}
      </div>
    );
  }
  
```

### useDropZone

Use this function to obtain the attributes that you need to add to your HTML element(s) to mark them as an item selector drop zone.

```typescript jsx
  import React, { useEffect, useState } from 'react';
  import { from, forkJoin } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { fetchIsPreview } from '@craftercms/ice';
  import { useICE, useDropZone } from '@craftercms/ice/esm5/react';
  import { getItem, parseDescriptor } from '@craftercms/content';
  
  function App() {
    const [state, setState] = useState();
    useEffect(() => {
      forkJoin({
        isAuthoring: from(fetchIsPreview()),
        model: getItem('/site/website/index.xml', { site: 'editorial' }).pipe(map(parseDescriptor))
      }).subscribe(({ isAuthoring, model }) => {
        setState({ isAuthoring, model });
      });
    }, []);
    return (
      state ? <HomePage /> : 'Loading...'
    );
  }
  
  function HomePage(props) {
    const { isAuthoring, model } = props;
    const { props: pencil } = useICE({ isAuthoring, model });
    const { props: dz } = useDropZone({ isAuthoring, model, zoneName: 'features_o' });
    return  (
      <div {...pencil}>
        <section className="features" {...dz}>
          {
            model.features_o.map((feature) => <Feature model={feature} isAuthoring={isAuthoring} />)
          }
        </section>
      </div>
    );
  }
  
  function Feature(props) {
    const { isAuthoring, model } = props;
    const { props: pencil } = useICE({ isAuthoring, model });
    return  (
      <article {...pencil}>
        <h2>{model.title_s}</h2>
        <p>{model.body_s}</p>
      </article>
    );
  }
```
