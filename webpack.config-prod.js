
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true 
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new WebpackAutoInject({
            // specify the name of the tag in the outputed files eg
            // bundle.js: [SHORT]  Version: 0.13.36 ...
            SHORT: 'Author: David Lopez Blasco',
            SILENT: false,
            PACKAGE_JSON_PATH: './package.json',
            PACKAGE_JSON_INDENT: 4,
            components: {
                AutoIncreaseVersion: true,
                InjectAsComment: true,
                InjectByTag: true
            },
            componentsOptions: {
                AutoIncreaseVersion: {
                    runInWatchMode: false // it will increase version with every single build!
                },
                InjectAsComment: {
                    tag: 'Version: {version} - {date}',
                    dateFormat: 'h:MM:ss TT', // change timezone: `UTC:h:MM:ss` or `GMT:h:MM:ss`
                    multiLineCommentType: true, // use `/** */` instead of `//` as comment block
                },
                InjectByTag: {
                    fileRegex: /\.+/,
                    // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
                    // but also you can change [AIV] tag to anything you want
                    AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
                    dateFormat: 'h:MM:ss TT'
                }
            },
            LOGS_TEXT: {
                AIS_START: 'Despliegue de Información\n'
            }
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            loader: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                'sass-loader'
            ]
        }]
    }
};