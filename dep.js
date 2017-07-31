const pkgJSON = require('./package.json')

const dependencies = pkgJSON.dependencies
const dependenciesArray = []
for (const key in dependencies) {
  dependenciesArray.push(key)
}

console.log(dependenciesArray.join(' '))