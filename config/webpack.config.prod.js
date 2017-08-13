const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const paths = require('./paths')
const postcssConfig = require('./postcss.config.prod')

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    app: paths.appIndexJs
  },
  output: {
    path: paths.appBuild,
    publicPath: paths.servedPath,
    pathinfo: true,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.css$/,
        exclude: paths.appSrc,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: postcssConfig
            }
          ]
        })
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'file-loader', options: { name: 'static/media/[name].[hash:8].[ext]' } }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          dead_code: true,
          drop_debugger: true,
        },
        output: {
          comments: false
        }
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.html|\.css$/,
      minRatio: 0.8
    })
  ]
}