const fs = require('fs');
const rm = require('rimraf');

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