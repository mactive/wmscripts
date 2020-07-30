//
// Created by Joshua.Cao, 2018/10/19
//
const fs = require('fs')
const csv = require('fast-csv')
var mysql = require('mysql')

const PLATFORM = {
  1: 'Android',
  2: 'iOS'
}
const NETWORK = {
  1: 'Wifi',
  2: '2G',
  3: '3G',
  4: '4G'
}

const FILE_NAME = './location_result_code/20181020.csv'

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'caotao@126.com',
  database: 'cat',
});
connection.connect(function (error) {
  if (error) {
    console.log('failed to connect to database, error:', error)
    return
  }
  parseCSVFile(connection)
});

function parseCSVFile(connection) {
  var stream = fs.createReadStream(FILE_NAME);
  let counter = 0
  csv.fromStream(stream, {
    objectMode: true,
    delimiter: '\t',
    headers: [,,,,'response_code',,,,, 'reserves',,,]
  }).on("data", async function(data){
    let normalizedData = normaliseLocationData(data)
    if (!normalizedData) {
      return
    }
    await insertIntoDB(connection, normalizedData)
    console.log('...counter:', counter++)
  }).on("end", function(){
    connection.end()
    console.log("done");
  });
}

function normaliseLocationData(data) {
  if (data.response_code !== '401152') {
    return undefined
  }
  try {
    var reserves = JSON.parse(data.reserves)
    var extra = JSON.parse(reserves.extraData)
    const normalizedData = {
      platform: PLATFORM[reserves.platform] || 'Unknown',
      network: NETWORK[reserves.network] || 'Unknown',
      province: reserves.province,
      operator: reserves.operator,
      request_time: reserves.request_time,
      speed: extra.speed,
      latitude: extra.latitude,
      altitude: extra.altitude,
      longitude: extra.longitude,
      duration: extra.duration,
      accuracy: extra.accuracy,
      sdk: extra.sdk || 'amap',
      invokerId: extra.invokerId
    }
    return normalizedData
  } catch(error) {
    return undefined
  }
}

function insertIntoDB(connection, normalizedData) {
  const sql = 'INSERT INTO location_result_code SET ?'
  return new Promise((resolved, reject) => {
    connection.query(sql, normalizedData, (error, results, fields) => {
      if (error) {
        console.log('error:', error)
        reject(error)
        return
      }
      resolved(results)
    })
  })
}


