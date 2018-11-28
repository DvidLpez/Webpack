
const merge = require('webpack-merge');
const config = require('./webpack.config-prod.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function compileDate() {

    let date = new Date();

    return String(date.getFullYear()) +
        String(date.getMonth()) +
        String(date.getDate()) +
        String(date.getHours()) +
        String(date.getMinutes()) +
        String(date.getSeconds());
}

module.exports =  [

    merge( config, {
        
        plugins: [
            new CleanWebpackPlugin(['dist/pdp/prod']),
            new MiniCssExtractPlugin({
                filename: "./pdp/prod/pdp-" + compileDate() + ".css"
            })
        ],
        entry: './src/js/pdp/pdp.js',
        output: {
            filename: './pdp/prod/pdp-' + compileDate() + '.js'
        }
    }),
    merge( config, {
        
        plugins: [
            new CleanWebpackPlugin(['dist/common/prod']),
            new MiniCssExtractPlugin({
                filename: "./common/prod/common-" + compileDate() + ".css",
            })
        ],
        entry: './src/js/common/common.js',
        output: {
            filename: './common/prod/common-' + compileDate() + '.js'
        }
    })];