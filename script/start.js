const fs = require('fs');
const path = require('path');
const os = require('os');
const myHost = getIPAdress();
const WebpackDevServer = require('webpack-dev-server');
const packPath = process.argv[process.argv.length-1]
const Webpack = require('webpack');
const webpackConfig = require('./../build/webpack.config.dev');

if(!fs.existsSync(`src/${packPath}`)) {
  console.error('-------------------------------------------------------------');
  console.error('                  未找到正确的打包路径  ');
  console.error('-------------------------------------------------------------');
  process.exit()
}
const compiler = Webpack(webpackConfig);
const devServerOptions = {
   open: true,
  stats: {
    colors: true,
  },
  contentBase: path.resolve(`dist/${packPath}`),
  // host: "0.0.0.0",
  noInfo: true,
  useLocalIp: true,
  quiet: true
}
const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(8080, myHost, () => {
  console.log(`Starting server on http://${myHost}:8080`);
});



function getIPAdress() {
    var interfaces = os.networkInterfaces();
    console.log(interfaces)
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}