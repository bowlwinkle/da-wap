/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
    entry: '.',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.jsx?/i,
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.png|.jpeg|.svg/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'assets/'
                    }
                }]
            }
        ]
    }
}