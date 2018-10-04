'use strict';

const resolvePlugin = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {

  'rxjs': 'rxjs',
  'rxjs/ajax': 'rxjs.ajax',
  'rxjs/operators': 'rxjs.operators',

  '@craftercms/utils': 'craftercms.utils',
  '@craftercms/classes': 'craftercms.classes',
  '@craftercms/models': 'craftercms.models',
  '@craftercms/engine': 'craftercms.engine',
  '@craftercms/search': 'craftercms.search',
  '@craftercms/redux': 'craftercms.redux',
  '@craftercms/ice': 'craftercms.ice'

};

function isPlainObject(obj) {
  return typeof obj === 'object' && obj !== null && obj.constructor == Object;
}

function deepExtend(target, source) {
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (prop in target && isPlainObject(target[prop]) && isPlainObject(source[prop])) {
        deepExtend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

function createRollupConfig(pkg, opts) {
  return deepExtend({
    input: `../../dist/packages-dist/${pkg}/fesm5/${pkg}.js`,
    output: {
      format: 'umd',
      file: `../../dist/packages-dist/${pkg}/bundles/${pkg}.umd.js`,
      name: `craftercms.${pkg}`,
      exports: 'named',
      amd: { id: `@craftercms/${pkg}` },
      globals,
    },
    plugins: [
      resolvePlugin(),
      sourcemaps()
    ],
    external: Object.keys(globals)
  }, (opts || {}))
}

module.exports = {
  globals,
  config: createRollupConfig
};
