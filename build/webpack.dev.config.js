const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig,{
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        port: 8080,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // also for hot updates
    ],
})