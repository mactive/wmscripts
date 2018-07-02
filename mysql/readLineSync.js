// // reading with file position boundaries
// var readStream = fs.createReadStream('test.log', { start: 0, end: 10000 });
// lineReader.eachLine(readStream, function(line) {});
var mysql = require('mysql');
var lineReader = require('line-reader');
const filePath = './mysql/sources/P1';
var lineCount = 0;
var connection ;
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mengqian',
//     database: 'pageview',
// });

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'mengqian',
    database: 'pageview',
});

pool.getConnection(function (err, conn) {
    if (err) throw err; // not connected!
    connection  = conn
    initReadline();
});

// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
//     initReadline();
// });


function initReadline() {
    lineReader.eachLine(filePath, function (line, last, continueCallback) {
        if (last) {
            continueCallback(false); // stop reading
            connection.release();
            process.exit();
        } else {
            const insertPromise = parseLine(line);
            insertPromise.then(() => {
                continueCallback();
            }, (error) => {
                console.error(error)
            })
        }
    });
}

function parseLine(lineData) {
    lineCount += 1;
    var arr = lineData.split("\t");
    console.log(arr[2], lineCount);
    // 跳过第一行 表头
    if (lineCount == 1) return new Promise((resolve, reject) => { resolve(true) });


    const values = {
        uuid: arr[0],
        sequence: parseInt(arr[1]),
        page_identifier: arr[2],
        refer_page_identifier: arr[3],
        page_stay_time: parseInt(arr[4]) || 0,
        event_timestamp: parseInt(arr[5])
    }
    return new Promise((resolve, reject) => {
        // 想办法变成同步阻塞的
        connection.query('INSERT INTO pv SET ?', values, function (error, results, fields) {
            if (error) reject(error);
            resolve(results.insertId);
        });
    });
}

