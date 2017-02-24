const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const postcssConfig = require('./postcss.config.dev')

module.exports = {
  entry: [
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    publicPath: '/',
    pathinfo: true,
    filename: 'static/js/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'eslint-loader' }],
        include: paths.appSrc,
        enforce: 'pre'
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /-worker\.js$/,
        include: paths.appSrc,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }]
      },
      {
        test: /-worker\.js$/,
        include: paths.appSrc,
        use: [{ loader: 'babel-loader' }, { loader: 'worker-loader' }],
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }]
      },
      {
        test: /\.css$/,
        include: paths.appSrc,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              module: true
            }
          },
          {
            loader: 'postcss-loader',
            options: postcssConfig
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: paths.appSrc,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'file-loader', options: { name: 'static/media/[name].[hash:8].[ext]' } }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    })
  ],
  devtool: 'cheap-module-source-map'
}