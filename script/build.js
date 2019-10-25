const fs = require('fs');
const rm = require('rimraf');

process.env.NODE_ENV = 'production'

if (process.argv[2] === '-p') {
  console.log("线上")
  process.env.BUILD_ENV = 'p'
} else {
  process.env.BUILD_ENV = 't'
}
console.log(process.env.BUILD_ENV)
const packPath = process.argv[process.argv.length - 1]
const Webpack = require('webpack');
const webpackConfig = require('./../build/webpack.config.prd');
if (!fs.existsSync(`src/${packPath}`)) {
  console.error('-------------------------------------------------------------');
  console.error('                  未找到正确的打包路径              ');
  console.error('-------------------------------------------------------------');
  process.exit()
}

const compiler = Webpack(webpackConfig);
rm('./dist', err => {
  if (err) {
    throw err;
  }
  compiler.run((err, stats) => {
    if (stats.hasErrors()) {
      console.log('有错误');
      console.log(stats)
      process.exit(1)
    }
  })
})