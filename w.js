const fs = require('fs')

const data = fs.readFileSync('./package.json', { encoding: 'utf8' })

const obj = JSON.parse(data)

const arr = []
for (const key in obj.devDependencies) {
  arr.push(key)
}
console.log(arr.join(' '))


