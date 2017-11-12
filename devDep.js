const pkgJSON = require('./package.json')

const devDependencies = pkgJSON.devDependencies
const devDependenciesArray = []
for (const key in devDependencies) {
    devDependenciesArray.push(key)
}

console.log(devDependenciesArray.join(' '))