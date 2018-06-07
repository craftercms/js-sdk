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
