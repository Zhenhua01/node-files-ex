"use strict";

const axios = require("axios");
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

async function webCat(path) {
  try {
    const resp = await axios.get(path);;
    console.log(resp.data.slice(0, 80), "...");
  } catch (err) {
    console.error(`Error fetching ${path}: ${err}`);
    // console.log(`Error fetching ${path},
    //   Error: Request failed with status code 404`);
    process.exit(1);
  }

}

if (path.includes("http://")) {
  webCat(path);
} else {
  cat(path);
}
