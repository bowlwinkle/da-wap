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
            },  {
                test: /\.(ttf|eot|svg|woff|woff2|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./assets/fonts/[hash].[ext]'
            }, {
                test: /\.png|.jpeg|.svg|.ico/i,
                loader: 'file-loader?name=./assets/[name].[ext]'
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
        overlay: true, //Show error overlay
        historyApiFallback: {
            rewrites: [
                {from: /.index.html/, to: '/index.html'},
                {from: /.bundle.js/, to: '/bundle.js'},
                {from: /.+\/assets\/.+/, to: function(context) {
                    let url = '/assets/' + context.parsedUrl.pathname.replace(/.+\/assets/, '');
                    return url;
                }}
            ]
        }
    }
}