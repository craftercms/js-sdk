const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/craftercms.js',
    output: {
        filename: 'craftercms.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'craftercms',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};
