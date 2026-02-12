import { Dexie } from "dexie";

//1 create data base
const db = new Dexie("collegedatabase");

//2 define schema like in sql table or coloumn
// note like Note: You only need to list fields you want to search or filter by
// ++id  means auot increament like 1 , 2, 3, 4 ,5 ...

db.version(2).stores({
  student: "++id , firstname , lastname , email , phone",  // data store 
  users : "++id , email , password  ,name , resettoken"    // for  athutentication 
});

// whta we make in this
// like in sql we make a db and then in that we make a table it same like that

// we make a table name student
// id generate automatically
// we are indexing like firstname , lastname , email , phone so is searhc fast
// it doest mean other data not store it still save

export default db;
