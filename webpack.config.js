const path = require('path');
const port = 9081;
const ASSET_PATH = process.env.ASSET_PATH || '/';
console.log(`Asset Path: ${ASSET_PATH}`);

module.exports = {
    entry: ['babel-polyfill', '.'],
    output: {
        path: path.resolve('dist/client'),
        filename: 'bundle.js',
        publicPath: ASSET_PATH
    },
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, 'client/assets'),
            Redux: path.resolve(__dirname, 'client/redux')
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
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/assets/fonts/[hash].[ext]'
            },  {
                test: /\.(mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/assets/[name].[ext]'
            }, {
                test: /\.png|.jpeg|.svg|.ico/i,
                loader: 'file-loader?name=/assets/[name].[ext]'
            }, {
                test: /\.html/i,
                loader: 'file-loader?name=/[name].[ext]'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        port,
        host: '0.0.0.0',
        // public: 'http://lggansbe-mac01.jf.intel.com:9081',
        contentBase: path.join(__dirname),
        compress: true, //GZIP compression
        overlay: true, //Show error overlay
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {from: /.index.html/, to: '/index.html'},
                {from: /.bundle.js/, to: '/bundle.js'},
                {from: /.assets\/.+/, to: function(context) {
                    console.log(context);
                    let url = context.parsedUrl.pathname.replace(/.+\/assets/, 'client/assets');
                    return 'fuckyou';
                    return url;
                }}
            ]
        }
    }
}