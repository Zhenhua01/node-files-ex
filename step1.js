"use strict";

const fsP = require("fs/promises");

const path = process.argv[2];

async function cat(path) {
  try {
    const contents = await fsP.readFile(`./${path}`, "utf8");
    console.log(contents);
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    // console.log(`Error reading ${path},
    //   Error: ENOENT: no such file or directory, open ${path}`);
    process.exit(1);
  }
}

cat(path);

// module.exports = {
//   fsP: fsP,
//   path: path,
//   cat: cat,
// }
