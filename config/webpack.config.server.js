const paths = require('./paths')
const config = require('./webpack.config.dev')

module.exports = {
  publicPath: config.output.publicPath,
  contentBase: paths.appPublic,
  historyApiFallback: true,
  clientLogLevel: 'none',
  quiet: true,
  hot: true,
  watchOptions: {
    ignored: /node_modules/
  }
}