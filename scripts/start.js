const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clear = require('terminal-clear')
const chalk = require('chalk')
const open = require('react-dev-utils/openBrowser')
const getProcessForPort = require('react-dev-utils/getProcessForPort')
const detect = require('detect-port')
const paths = require('../config/paths')
const config = require('../config/webpack.config.dev')
const serverConfig = require('../config/webpack.config.server')

require('dotenv').config({ path: paths.dotenv })
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const processEnvForDefinePlugin = {}
for (let key in process.env) processEnvForDefinePlugin[key] = JSON.stringify(process.env[key])
config.plugins.unshift(new webpack.DefinePlugin({
  'process.env': processEnvForDefinePlugin
}))

const handleCompile = (err, stats) => {
  clear()

  if (err) {
    console.error(err.stack || err)
    err.details && console.error(err.details)
    return
  }

  const info = stats.toJson()
  stats.hasErrors() && console.error(info.errors)
  stats.hasWarnings() && console.error(info.warnings)

  console.log(stats.toString({ color: true }))
}

const setupCompiler = port => {
  const compiler = webpack(config)

  compiler.plugin('invalid', () => {
    clear()
    console.log('Recompiling...')
  })

  compiler.plugin('done', stats => {
    clear()
    console.log(new Date())

    const info = stats.toJson()

    if (stats.hasErrors() || stats.hasWarnings()) {
      if (stats.hasErrors()) {
        console.log(chalk.red('Failed to compile.\n'))
        info.errors.forEach(message => console.log(message))
        return
      }

      if (stats.hasWarnings()) {
        console.log(chalk.yellow('Compiled with warnings.\n'))
        info.warnings.forEach(message => console.log(message))
        return
      }
    }


    console.log(chalk.green('Compiled successfully!'))
    console.log('\nThe app is running at:\n')
    console.log(chalk.cyan(`  http://localhost:${port}\n`))
    console.log('Note that the development build is not optimized.\n')
  })

  return compiler
}

const runDevServer = port => {
  const entries = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server'
  ]
  config.entry = entries.concat(config.entry)

  const compiler = setupCompiler(port)
  const devServer = new WebpackDevServer(compiler, serverConfig)

  devServer.listen(port, (err, result) => {
    if (err) {
      console.error(err)
      return
    }

    clear()

    console.log(chalk.magenta('Starting the development server...'))

    open(`http://localhost:${port}`)
  })
}

const defaultPort = parseInt(process.env.PORT, 10) || 9000
detect(defaultPort).then(port => runDevServer(port))
