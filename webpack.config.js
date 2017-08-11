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
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.png|.jpeg|.svg/i,
                loader: "file-loader?name=../server/static/assets/[name].[ext]",
                query: {
                    useRelativePath: process.env.NODE_ENV === "production"
                }
            }
        ]
    }
}