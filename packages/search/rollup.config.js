const rollupUtils = require('../../util/rollup-utils');
const commonJS = require('rollup-plugin-commonjs');
const config = rollupUtils.config('search');

config.plugins.push(commonJS({
    namedExports: { 'uuid': ['uuid'] }
}));

module.exports = config;
