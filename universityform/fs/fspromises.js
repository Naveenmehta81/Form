import fs from "fs" ; 
import path from "path";


const filename = "fspromises.txt" ; 
const filepath = path.join(process.cwd(),filename);

const file = process.cwd() ;

fs.promises.
readdir(file).
then((data) => console.log(data)).
catch((err) => console.log(err));

