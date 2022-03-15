![npm (scoped)](https://img.shields.io/npm/v/@craftercms/classes?style=plastic)

# @craftercms/classes

This package contains useful classes for developing craftercms websites & applications.

## Usage

All of Crafter CMS packages can be used either via npm or in plain html/javascript via regular script imports.

- Install module using `yarn` or `npm`
  - `yarn add @craftercms/classes` or
  - `npm install @craftercms/classes`
- Import and use the classes you need

## Package Index

The examples below assume usage in the style of using via npm. If you're using the bundles, 
directly importing as a script in the browser, these functions will be under the global variable
named `craftercms.classes` (i.e. `window.craftercms.classes`).

### crafterConf

#### Example

The `crafterConf` is a special class to globally configure CrafterCMS libraries. Most services you can supply these configurations
on a call-by-call basis, but you may simplify by configuring all services via `crafterConf` early-on on your application bootstrap.

```typescript
import { crafterConf } from '@craftercms/classes';

crafterConf.configure({
  // Set the base url for all service calls (i.e. urls get built `${baseUrl}/some-endpoint.json`)
  baseUrl: process.env.CRAFTER_HOST_NAME,
  // Set the site id of the site to fetch from/against
  site: process.env.CRAFTER_SITE_NAME,
  // Optionally, set cors mode to true/false (default is false)
  cors: true,
  // Optionally, set any headers you want SDK requests to go out with
  headers: {
    SOME_HEADER: 'some-value'
  }
});
```

### SDK Service

`SDKService` Provides http get and post methods for Crafter services 

#### Examples

```typescript
  import { httpGet } from '@craftercms/classes';

  const requestURL = "/some-url";

  httpGet(requestURL, { 
    crafterSite: "editorial"
  }).subscribe((response) => {
    console.log(response);
  })
```
