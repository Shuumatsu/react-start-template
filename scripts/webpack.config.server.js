const paths = require('./paths')
const config = require('./webpack.config.dev')

module.exports = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    compress: true,
    lazy: true,
    publicPath: config.output.publicPath,
    contentBase: paths.public,
    historyApiFallback: true,
    host: '0.0.0.0',
    hotOnly: true,
    https: true,
    watchContentBase: true,
    hot: true,
    open: true
}
