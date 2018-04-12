import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import rollupJson from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
    {
        input: 'src/craftercms.js',
        output: [
            { name: 'craftercms', format: 'umd', file: pkg.browser }
        ],
        plugins: [
            globals(),
            builtins(),
            resolve(),
            commonjs(),
            rollupJson(),
            babel({ exclude: 'node_modules/**' })
        ]
    }
];
