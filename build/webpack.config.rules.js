const autoprefixer = require('autoprefixer');
const rules = [
  {
    test: /\.js$/,
    exclude:/(node_modules|bower_components)/,
    use: [{
      loader:'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env']
      }
    }]
  },
  {
    test:  /\.(css|scss|sass)$/,
    use: ['style-loader', 'css-loader', 'sass-loader', {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          autoprefixer(),
        ]
      }
    }]
  },
  {
    test: /\.(png|svg|jpe?g)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/imgs/[name].[ext]',
          // publicPath: '/'
        }
      },
      {
        loader: 'image-webpack-loader',// 压缩图片 会根据 url-loader中设置的limit大小来对图片进行处理，小于limit的图片转化成base64格式，其余的不做操作。对于比较大的图片我们可以用image-webpack-loader 来压缩图片。 
        options: {
          bypassOnDebug: true,
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader'
  }
  
  
]
module.exports = rules;