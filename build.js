const names = require("all-the-package-names")

const package = require('./package.json');

package.dependencies = {}

// <3 https://github.com/Zalastax/no-one-left-behind
const scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$')
function urlFriendly(name) {
  return name === encodeURIComponent(name);
}
function validScopedName(name) {
  const nameMatch = name.match(scopedPackagePattern)
  if (nameMatch) {
    return urlFriendly(nameMatch[1]) && urlFriendly(nameMatch[1])
  }
}
function validName(name) {
  return name.length > 0 && (urlFriendly(name) || validScopedName(name));
}

function sanitize(name) {
  return name.trim(); // validName will filter out anything else that is a problem
}

// back own code
names.map(sanitize).filter(validName).forEach((name) => { package.dependencies[name.replaceAll(' ','')] = 'latest' })

fs = require('fs')
fs.writeFile('package.json', JSON.stringify(package, null, 2), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Saved ${Object.keys(package.dependencies).length} dependencies`);
});
