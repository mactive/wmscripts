

// var lineReader = require('readline').createInterface({
//     terminal: false,
//     input: require('fs').createReadStream('./mysql/sources/tt')
//   });
  
//   lineReader.on('line', function (data) {
//       lineReader.pause(); 
//       syncP(data);
//   });
  
  
//   lineReader.on('pause', function (data) { 
//       console.log('Waiting for event to finish:');
//   });

//   function rand(min, max) {
//     var argc = arguments.length;
//     if (argc === 0) {
//       min = 0;
//       max = 2147483647;
//     } else if (argc === 1) {
//       throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
//     }
//     return Math.floor(Math.random() * (max - min + 1)) + min;
  
//   }
  
//   function syncP(data) {
//     var rands = rand(2000,3000);
//     console.log(rands);
//       setTimeout(function() {
//         console.log('Line from file:', data);
//         lineReader.resume();
//       },rands);
//   }
  
  
  
// //get the filesystem module
// var fs = require('fs');
// const stream = fs.createReadStream("./mysql/sources/0620_ios_pv.txt", {
//     flags: 'r',
//     encoding: 'utf-8',
//     fd: null,
//     bufferSize: 1
// });
// let line = '';
// let lineCount = 0;

// //start reading the file
// stream.addListener('data', function (char) {
//     // pause stream if a newline char is found
//     stream.pause();
//     if (char == '\n') {
//         (function () {
//             //do whatever you want to do with the line here.
//             //....
//             console.log(parseLine(line));
//             line = '';
//             stream.resume();
//         })();
//     }
//     else {
//         //add the new char to the current line
//         line += char;
//         stream.resume();
//     }
// })


// function parseLine(lineData) {
//     lineCount += 1;
//     var arr = lineData.split("\t");
//     console.log(arr[2]);
//     if (lineCount == 1) return;
//     const values = {
//         uuid: arr[0],
//         sequence: parseInt(arr[1]),
//         page_identifier: arr[2],
//         refer_page_identifier: arr[3],
//         page_stay_time: parseInt(arr[4]) || 0,
//         event_timestamp: parseInt(arr[5])
//     }

//     return values;

//     // rl.pause();

//     // // 想办法变成同步阻塞的
//     // connection.query('INSERT INTO pv SET ?', values, function (error, results, fields) {
//     //     if (error) throw error;
//     //     console.log(results.insertId);
//     // });
//     // setTimeout(() => {
//     //     rl.resume();
//     // }, 1000);
// }
