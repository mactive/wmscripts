/**
 * Created by mengqian on 28/6/2018.
 */

var fs = require('fs');
// var readline = require('linebyline');
const readline = require('readline');

var mysql = require('mysql');
var lineCount = 0;
var rl;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mengqian',
  database: 'pageview',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
initReadline();

function initReadline() {

  // var rl = readline('./mysql/sources/0620_ios_pv.txt');

  // rl
  //   .on('line', parseLine)
  //   .on('error', function (e) {
  //     console.log('error max')
  //     // connection.end();
  //     // process.exit();
  //   });


  rl = readline.createInterface({
    input: fs.createReadStream('./mysql/sources/tt')
    // input: fs.createReadStream('./mysql/sources/0620_ios_pv.txt')
  });

  rl.on('line', parseLine);
  rl.on('pause', function (e) {
    console.log('pause')
    // connection.end();
    // process.exit();
  });
  
}


function parseLine(lineData) {
  rl.pause();

  lineCount += 1;
  var arr = lineData.split("\t");
  console.log(arr[2]);
  if (lineCount == 1) return;
  const values = {
    uuid: arr[0],
    sequence: parseInt(arr[1]),
    page_identifier: arr[2],
    refer_page_identifier: arr[3],
    page_stay_time: parseInt(arr[4]) || 0,
    event_timestamp: parseInt(arr[5])
  }


  rl.close();


  // 想办法变成同步阻塞的
  // connection.query('INSERT INTO pv SET ?', values, function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results.insertId);
  // });


    // rl.prompt();

}

function makeInsertSql() {
    // const insertSql = `INSERT INTO pv 
  //   (uuid, sequence,page_identifier, refer_page_identifier, page_stay_time, event_timestamp)
  //   VALUES
  //   ('${arr[0]}',${arr[1]}, '${arr[2]}', '${arr[3]}', ${arr[4]},${arr[5]})`;
  // console.log(insertSql)
}



