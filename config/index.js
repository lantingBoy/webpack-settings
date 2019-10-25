'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    /*  index: path.resolve(__dirname, '../ROOT/index.html'),
     assetsRoot: path.resolve(__dirname, '../ROOT'),
     assetsSubDirectory: 'static',
     assetsPublicPath: './',
     productionSourceMap: false,
     productionGzip: false,
     productionGzipExtensions: ['js', 'css'], */
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8098,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/bb': {
        target: 'http://abc.rwlaile.com:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/bb': ''
        }
      },
      '/cc': {
        target: 'http://118.178.135.132:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/cc': ''
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}