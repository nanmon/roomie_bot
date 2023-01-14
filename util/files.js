const fs = require("fs");
const path = require("path");

function readDirSyncRecursive(dir) {
  let results = [];
  const dirents = fs.readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      let files = readDirSyncRecursive(res);
      results = [...results, ...files]
    } else {
      results.push(res);
    }
  }
  return results;
}

module.exports = { readDirSyncRecursive }