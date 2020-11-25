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

const rollupUtils = require('../../util/rollup-utils');

let config = rollupUtils.config('redux', {
  output: {
    globals: {
      'rxjs/Subject': 'rxjs',
      'rxjs/operator/map': 'rxjs.operators.map',
      'rxjs/operator/filter': 'rxjs.operators.filter',
      'rxjs/operator/switchMap': 'rxjs.operators.switchMap',
      'rxjs/observable/of': 'rxjs.of',
      'rxjs/observable/from': 'rxjs.from',
      'rxjs/observable/merge': 'rxjs.merge',
      'rxjs/Observable': 'rxjs.Observable'
    }
  }
});

config.external = Object.keys(config.output.globals);

module.exports = config;
