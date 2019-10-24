const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packPath = process.argv[process.argv.length - 1];

const merge = require("webpack-merge");
const webpackConfigCommon = require('./webpack.common.config');

const webpackConfigProd = {
  entry: `./src/${packPath}/index.js`,
  output: {
    filename: `static/js/[name].js`,
    path: path.resolve(__dirname, `../dist/${packPath}`),
    publicPath: './'
  },

}
console.info('mergepath', merge(webpackConfigCommon, webpackConfigProd))
module.exports = merge(webpackConfigCommon, webpackConfigProd);