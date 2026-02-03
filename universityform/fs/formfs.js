import fs, { appendFileSync } from "fs"; // ES module
import path from "path";

// const fs = require('fs');   // degault in node.js
// in defalut path use __dirname

const filename = "test.txt";
//  process.cwd() = Get the folder where you are currently running node(cwd - current working Directory)
// path.join() = Intelligent glue that joins folders (handles slashes / or \ automatically)
const filepath = path.join(process.cwd(), filename);
console.log("Saving to:", filepath);
const writefile = fs.writeFileSync(
  filename,
  "use fs it is my first file system ",
  "utf-8",
);

const readfile = fs.readFileSync(filepath, "utf-8");
//  console.log(readfile.toString());
console.log(readfile);

console.log(writefile);
console.log("file crete succefully");

// appen or ubdate data so use this method

const appendfile = appendFileSync(
  filepath,
  "\n this is append updaed data ",
  "utf-8",
);

console.log(appendfile, "data append succesfully ");



// DELTED FILE IF WE NEED 

//  const filedata = fs.unlinkSync(filepath); 
//   console.log(filedata);


// RENAME FILE   fs.renamesync(oldpath , newpath);
const  newupdatefilename = "form.txt"
 const renamefile = fs.renameSync( filepath ,newupdatefilename);

