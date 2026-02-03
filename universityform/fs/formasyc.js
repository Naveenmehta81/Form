import fs from "fs" ; 
import path from "path";


const filename = "formasyc.txt" ; 
const filepath = path.join(process.cwd(),filename);


// write data to file , or replacing if already exist  fs.writefile(path , data , options , callback)

fs.writeFile(filepath  , "this is the initial data" , "utf-8" , 
    (err) =>{
    if(err) console.error(err);
    else console.log("file is saved ");

})



// read file fs.readfile(path , option , callback )  - callback - err , data 

fs.readFile(filepath , "utf-8" , 
    (err , data ) =>{
          if(err) console.error(err);
          else  console.log("data succefully read without err using callback fucntion" , data)
    }
)


// append file 

    // fs.appendfile(path , data , option , callback) ; 

    fs.appendFile(filepath , "\n this is my append data naveen" , "utf-8" ,
        (err) =>{
          if(err) console.error(err);
          else console.log("data append ");
        }
     );