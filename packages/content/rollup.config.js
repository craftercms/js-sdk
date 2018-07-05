const rollupUtils = require('../../util/rollup-utils');
const commonJS = require('rollup-plugin-commonjs');

const config = rollupUtils.config('content')

module.exports = config;
