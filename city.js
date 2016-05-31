var sqlite3 = require('sqlite3').verbose();
import fs from 'fs';
import _ from 'lodash';
let citys = {};
const dbPath  =  './city.sqlite';

  // item
  // "id": 256,
  // "name": "孝感",
  // "locationid": 420900,
  // "pinyin": "xiaogan",
  // "acronym": "xiaogan",
  // "onlineTime": 1382025600,
  // "rank": "D"

let readFile = function () {
  return new Promise((resolve, reject) => {
    fs.readFile('./city_all.json', 'utf8', function (err, data) {
      if (err) throw err; // we'll not consider error handling for now
      citys = JSON.parse(data).data;
      // console.log(obj);
      resolve(citys);
    });
  })
};


let deleteFile = function(){
  return new Promise((resolve, reject) => {
    fs.unlink(dbPath, (err, data)=>{
      if (err) throw err; // we'll not consider error handling for now
      console.log('delete success');
      resolve(data);
    });
  });
};


let writeDB = function(){
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath);
    console.log("------------------");

    db.serialize(function() {
      db.run("CREATE TABLE china_citys (_id INTEGER, cityId INTEGER,locationId INTEGER, name TEXT, pinyin TEXT, fChar TEXT, rank TEXT )");

      // var stmt = db.prepare("INSERT INTO china_citys VALUES (?,?,?,?,?,?)");

      citys.forEach((item,index)=>{
        console.log(item.id);
        db.run("INSERT INTO china_citys VALUES (?,?,?,?,?,?,?)",index, item.id,item.locationid,item.name,item.pinyin,item.pinyin.substr(0,1).toUpperCase(),item.rank);
        // stmt.bind(1,item.id);
        // stmt.bind(2,item.locationid);
        // stmt.bind(3,item.name);
        // stmt.bind(4,item.pinyin);
        // stmt.bind(5,item.pinyin.substr(0,1).toUpperCase());
        // stmt.bind(6,item.rank);
        // stmt.step();  // Insert oneline
        // stmt.reset();
      });

      stmt.finalize();

      db.each("SELECT id, name FROM china_citys", function(err, row) {
        console.log(row.id + ": " + row.name);
      });
    });

    db.close();
    resolve(true);

  });
}
//
// SELECT * FROM sqlite_master WHERE type = 'index';
//
// DROP INDEX fchar_index;
// DROP INDEX pinyin_index;
//
// CREATE INDEX fchar_index ON china_citys(fchar);
// CREATE INDEX pinyin_index ON china_citys(pinyin);







var asyncReadFile = async function (){
  var f1 = await deleteFile();
  var f2 = await readFile();
  var f3 = await writeDB();
  console.log(f1.toString());
  console.log(f2.toString());
  console.log(f3.toString());
};

asyncReadFile();

