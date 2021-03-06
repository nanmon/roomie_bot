const { readDirSyncRecursive } = require("../util/files");
const commands = {};

const files = readDirSyncRecursive(__dirname);

files.forEach((file) => {
  const fileName = file.split(/\/|\\/).pop();

  if (fileName !== "index.js") {
    const name = fileName.split(".").shift();
    const handler = require(file);
    commands[name] = handler;
  }
});

module.exports = commands;