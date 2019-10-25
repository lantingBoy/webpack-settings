const rules = require('./webpack.config.rules.js')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packPath = process.argv[process.argv.length - 1]
const uglify = require('uglifyjs-webpack-plugin')

const webpack = require('webpack')
process.env.NODE_ENV = 'production'
var _url = null
if (process.argv[2] === '-p') {
  console.log("线上环境打包")
  _url = JSON.stringify("https://adv.api.venomlipstick.cn/")
} else {
  console.log("测试环境打包")
  _url = JSON.stringify("https://t-adv.api.venomlipstick.cn/")
}
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
        from: `./src/${packPath}/static/imgs`,
        to: './static/imgs',
        ignore: ['.*']
      },
      {
        from: `./src/${packPath}/static/style`,
        to: './static/style',
        ignore: ['.*']
      },
      {
        from: `./common`,
        to: './static',
        ignore: ['.*']
      }
    ]), // 定义一个全局变量
    new webpack.DefinePlugin({
      BXM_API_URL: _url
    }),
  ],

  resolve: {
    alias: {
      'style': path.resolve('style')
    }
  }
};