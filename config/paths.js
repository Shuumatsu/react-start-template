const path = require('path')

const appDirectory = process.cwd()
const appPathResolve = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appBuild: appPathResolve('build'),
  appPublic: appPathResolve('public'),
  appSrc: appPathResolve('src'),
  appIndexJs: appPathResolve('src/index.js'),
  // appEjs: appPathResolve('public/index.ejs'),
  appHtml: appPathResolve('public/index.html'),
  servedPath: '',
  dotenv: appPathResolve('.env')
}
