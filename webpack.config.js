const path = require('path');

module.exports = {
    entry: ['babel-polyfill', '.'],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, 'assets')
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.jsx?/i,
                loader: 'babel-loader'
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
                test: /\.png|.jpeg|.svg|.ico/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'assets/'
                    }
                }]
            }, {
                test: /\.html/i,
                loader: 'file-loader?name=./[name].[ext]'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        port: 9081,
        host: '0.0.0.0',
        contentBase: path.join(__dirname),
        compress: true, //GZIP compression
        // hot: true, //Hot reload
        // noInfo: true, //Don't show initial information
        overlay: true //Show error overlay
    }
}