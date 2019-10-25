const rules = require('./webpack.config.rules.js')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packPath = process.argv[process.argv.length - 1]
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {

  module: {
    rules: [...rules]
  },
  plugins: [
    new uglify(),
    new HtmlWebpackPlugin({
      template: `./src/${packPath}/index.html`,
      title: 'Development'
    }),
    new CopyWebpackPlugin([{
        from: `./src/${packPath}/static`,
        to: './static',
        ignore: ['.*']
      },
      {
        from: `./common`,
        to: './static',
        ignore: ['.*']
      }
    ])
  ],
  resolve: {
    alias: {
      'style': path.resolve('style')
    }
  }
};