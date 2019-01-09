/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const resolvePlugin = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {

  'rxjs': 'rxjs',
  'rxjs/ajax': 'rxjs.ajax',
  'rxjs/operators': 'rxjs.operators',

  '@craftercms/utils': 'craftercms.utils',
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
