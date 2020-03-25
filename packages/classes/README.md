# @craftercms/classes

This package contains useful classes for developing craftercms websites & applications.

## Usage

- Install module using `yarn` or `npm`
  - Yarn: `yarn add @craftercms/classes`
  - npm: `npm install @craftercms/classes`
- Import and use the classes you need

## Classes
---

## SDK Service

`SDKService` Provides http get and post methods for Crafter services 

## Examples

```typescript
  import { httpGet } from '@craftercms/classes';

  const requestURL = "/some-url";

  httpGet(requestURL, { 
    crafterSite: "editorial"
  }).subscribe((response) => {
    console.log(response);
  })
```
