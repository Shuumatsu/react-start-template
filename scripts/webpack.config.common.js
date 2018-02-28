import webpack from 'webpack'
import { dotenvConfig } from 'dotenv'
import createWebpackMiddleware from 'webpack-dev-middleware'

import postcssConfig from '../config/postcss.config.dev'
import babelConfig from '../config/babel.config.dev'
import paths from '../config/paths'
import webpackServerConfig from './webpack.config.server'

dotenvConfig({ path: paths.dotenv })

const compiler = webpack(config)

createWebpackMiddleware(compiler, serverConfig)
