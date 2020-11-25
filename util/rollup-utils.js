/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

'use strict';

const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {

  'rxjs': 'rxjs',
  'react': 'React',
  'react-dom': 'ReactDOM',
  'rxjs/ajax': 'rxjs.ajax',
  'rxjs/operators': 'rxjs.operators',

  '@craftercms/classes': 'craftercms.classes',
  '@craftercms/content': 'craftercms.content',
  '@craftercms/ice': 'craftercms.ice',
  '@craftercms/models': 'craftercms.models',
  '@craftercms/redux': 'craftercms.redux',
  '@craftercms/search': 'craftercms.search',
  '@craftercms/utils': 'craftercms.utils',
  '@craftercms/ice/react': 'craftercms.iceReact'

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
      nodeResolve({
        preferBuiltins: false,
        mainFields: ['module', 'main', 'browser']
      }),
      commonjs({
        namedExports: {
          'uuid': ['uuid'],
          'react-dom': ['createPortal', 'findDOMNode', 'hydrate', 'render', 'unmountComponentAtNode', 'flushSync'],
          'react-is': ['isValidElementType', 'ForwardRef'],
          'prop-types': ['elementType'],
          'react': [
            'Children',
            'createRef',
            'Component',
            'PureComponent',
            'createContext',
            'forwardRef',
            'lazy',
            'memo',
            'useCallback',
            'useContext',
            'useEffect',
            'useImperativeHandle',
            'useDebugValue',
            'useLayoutEffect',
            'useMemo',
            'useReducer',
            'useRef',
            'useState',
            'Fragment',
            'Profiler',
            'StrictMode',
            'Suspense',
            'createElement',
            'cloneElement',
            'createFactory',
            'isValidElement',
            'version'
          ]
        }
      }),
      sourcemaps()
    ],
    external: Object.keys(globals)
  }, (opts || {}))
}

module.exports = {
  globals,
  config: createRollupConfig
};
