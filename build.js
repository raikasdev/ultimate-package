const names = require("all-the-package-names")

const package = require('./package.json');

package.dependencies = {}

names.forEach((name) => { package.dependencies[name] = 'latest' })

fs = require('fs')
fs.writeFile('package.json', JSON.stringify(package, null, 2), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Saved ${Object.keys(package.dependencies).length} dependencies`);
});
