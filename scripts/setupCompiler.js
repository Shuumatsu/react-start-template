const webpack = require('webpack')
const clear = require('terminal-clear')
const chalk = require('chalk')
const config = require('../config/webpack.config.dev')
const paths = require('../config/paths')

require('dotenv').config({ path: paths.dotenv })
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const processEnvForDefinePlugin = {}
for (let key in process.env) processEnvForDefinePlugin[key] = JSON.stringify(process.env[key])
config.plugins.unshift(new webpack.DefinePlugin({
  'process.env': processEnvForDefinePlugin
}))

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

module.exports = setupCompiler