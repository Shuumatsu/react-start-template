const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const chalk = require('chalk')
const gzipSize = require('gzip-size')
const paths = require('../config/paths')
const config = require('../config/webpack.config.prod')

require('dotenv').config({ path: paths.dotenv })
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
config.output.publicPath = process.env.SERVED_PATH || config.output.publicPath
config.plugins.unshift(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}))

fs.removeSync(paths.appBuild)
fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: file => file !== paths.appHtml
})

const printAssets = assets => {
  // const maxNameLength = Math.max.apply(null, assets.map(asset => asset.name.length))
  console.log()
  assets.forEach(asset => {
    const filePath = path.resolve(paths.appBuild, asset.name)
    const content = fs.readFileSync(filePath)
    const gzippedSize = gzipSize.sync(content)

    let dirname = path.dirname(asset.name)
    dirname = dirname === '.' ? '' : `${dirname}/`
    const basename = path.basename(asset.name)

    console.log(dirname + chalk.cyan(basename))
    console.log(` - gzipped size: ${gzippedSize}`)
    console.log(` - size on disk: ${asset.size}`)
  })
  console.log()
}

const handleCompile = (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    err.details && console.error(err.details)
    return
  }

  console.log(new Date())

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.log(chalk.red('Failed to compile.\n'))
    info.errors.forEach(message => console.log(message))
    return
  }


  console.log(chalk.green('Compiled successfully!'))

  printAssets(info.assets)

  if (stats.hasWarnings()) {
    console.log(chalk.yellow('Compiled with warnings.\n'))
    info.warnings.forEach(message => console.log(message))
  }
}

const compiler = webpack(config)

compiler.run(handleCompile)