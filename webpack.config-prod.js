
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAutoInject = require('webpack-auto-inject-version');

console.log('\n===============================');
console.log(process.env.NODE_ENV);
console.log(process.env.production);
console.log('===============================\n');

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
                    runInWatchMode: false
                },
                InjectAsComment: {
                    tag: 'Version: {version} - {date}',
                    dateFormat: 'h:MM:ss TT', // change timezone: `UTC:h:MM:ss` or `GMT:h:MM:ss`
                    multiLineCommentType: true,
                },
                InjectByTag: {
                    fileRegex: /\.+/,
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