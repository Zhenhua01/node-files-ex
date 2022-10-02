"use strict";

const axios = require("axios");
const fsP = require("fs/promises");
let path;
let outputFile;
let contents;

if (process.argv[2] === "--out") {
  path = process.argv[4];
  outputFile = process.argv[3];
} else {
  path = process.argv[2];
}

async function cat(path) {
  try {
    contents = await fsP.readFile(`./${path}`, "utf8");

  } catch (err) {
    console.log(`Error reading ${path},
      Error: ENOENT: no such file or directory, open ${path}`);
    process.exit(1);
  }

  if (outputFile) {
    writeOutput()
  } else {
    console.log(contents)
  }
}

async function webCat(path) {
  try {
    const resp = await axios.get(path);
    contents = `${resp.data.slice(0, 80)}, "..."`
  } catch (err) {
    console.log(`Error fetching ${path},
      Error: Request failed with status code 404`);
    process.exit(1);
  }

  if (outputFile) {
    writeOutput()
  } else {
    console.log(contents);
  }

}

async function writeOutput() {
  try {
    await fsP.writeFile(`./${outputFile}`, contents, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file!");
}

if (path.includes("http://")) {
  webCat(path);
} else {
  cat(path);
}
