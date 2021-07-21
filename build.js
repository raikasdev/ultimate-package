const names = require("all-the-package-names")

const package = require('./package.json');
const search = require('libnpmsearch')

package.dependencies = {}
fs = require('fs')

// <3 https://github.com/Zalastax/no-one-left-behind
const scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$')
function urlFriendly(name) {
  return name === encodeURIComponent(name);
}
function validScopedName(name) {
  const nameMatch = name.match(scopedPackagePattern)
  if (nameMatch && !name.includes('_')) {
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
Promise.all(names.map(sanitize).filter(validName).map(async (name) => { 
//  const s = await search(name);
  //if (s.length === 0 || s[0].name !== name) return;
  package.dependencies[name.replaceAll(' ','')] = 'latest'
  return;
}))
.then(() => {

fs = require('fs')
fs.writeFile('package.json', JSON.stringify(package, null, 2), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Saved ${Object.keys(package.dependencies).length} dependencies`);
});
})
