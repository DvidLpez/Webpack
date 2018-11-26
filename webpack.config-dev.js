

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
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