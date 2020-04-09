const request = require('request');
const fs = require('fs');

const URL = process.argv[2];
const localFile = process.argv[3];
const fileCheck = localFile[0] + localFile[1];

if (fileCheck !== "./") {
  console.log("The local file path is not valid.");
  return false;
}

const requestURL = function () {
  request(URL, (error, response, body) => {
    if (error) { throw error };
    console.log('statusCode: ', response && response.statusCode);
    const fileSize = response.headers["content-length"];
    writeFile(body, fileSize);
  });
}

const writeFile = function (body, fileSize) {
  fs.writeFile(localFile, body, err => {
    if (err) throw err;
    console.log(`Downloaded and saved ${fileSize} bytes to ${localFile}.`)
  });
}

requestURL();


/*
node fetcher.js http://www.example.edu/ ./index.html
*/