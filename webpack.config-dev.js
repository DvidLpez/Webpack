

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


console.log('\n===============================');
console.log(process.env.NODE_ENV);
console.log(process.env.production);
console.log('===============================\n');


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