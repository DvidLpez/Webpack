
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config-dev.js');
const webpack  = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = merge(config, {
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin(['dist/common/dev']),
        new MiniCssExtractPlugin({
            filename: "[name]-bundle.css"
        })
    ],
    entry: {
        common: './src/js/common/common.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/common/dev')
    }
});