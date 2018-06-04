# craftercms-sdk-js
Crafter CMS SDK for JavaScript in the browser and Node JS

## Project Structure

- `packages` contains the different SDK packages and their respective sources (TypeScript for the most part)

## Building

- `yarn` will fetch all dependencies for development
- `yarn compile` will use babel to generate ES5 sources in the `lib` folder
- `yarn build` will use webpack to generate a production ES5 bundle under `dist` folder
- `yarn dev` will use webpack to generate a development ES5 bundle under `dist` folder and watch for changes
- `yarn doc` will generate the sdk documentation under `doc` folder

## Testing

Run `yarn test` to execute all tests, before running this command you need to:
- Start a crafter authoring environment
- Create a site using the `editorial` blueprint with the same name
