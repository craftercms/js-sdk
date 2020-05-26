# craftercms-sdk-js
Crafter CMS SDK for JavaScript in the browser and Node JS

## Project Structure

The `packages` directory contains the different SDK packages and their respective sources (TypeScript for the most part)

Please go into the distinct packages to see docs.

- [classes](./packages/classes)
- [content](./packages/content)
- [ice](./packages/ice)
- [models](./packages/models)
- [redux](./packages/redux)
- [search](./packages/search)
- [utils](./packages/utils)

## Building & Testing

You don't ever need to do this unless you're interested in collaborating. See the [packages](./packages) you're interested on for usage instructions if you just want to consume the sdk.

### Building

- `yarn` will fetch all dependencies for development
- `./build.sh` will use webpack to generate a production ES5 bundle under `dist` folder

### Testing

Run `yarn test` on each of the packages to execute all tests.
