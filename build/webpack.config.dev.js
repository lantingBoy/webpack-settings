const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packPath = process.argv[process.argv.length - 1]
const merge = require("webpack-merge");
const webpackConfigCommon = require('./webpack.common.config');

const webpackConfigDev = {

  entry: `./src/${packPath}/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(`dist/${packPath}`)
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/${packPath}/index.html`,
      title: 'Development'
    })
  ],
  resolve: {
    alias: {
      'style': path.resolve('style')
    }
  },

}





module.exports = merge(webpackConfigCommon, webpackConfigDev);