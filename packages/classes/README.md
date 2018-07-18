# @craftercms/classes

This package contains classes that encapsulate data for it to be used in other Crafter CMS packages or applications. 

## Usage

- Add the module to your project by running `yarn add @craftercms/classes`
- Import and use the classes you need

## Classes

- `SDKService` Provides http get and post methods for Crafter services 

## Examples

```js
  import { SDKService } from '@craftercms/classes';

  const requestURL = "/crafter-url";

  SDKService.httpGet(requestURL, { 
    crafterSite: "editorial"
  })
  .subscribe((response) => {
    ...
  })
```