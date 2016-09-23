var fs = require('fs');
var JSONStream = require('JSONStream');

var inputFile = './jsonstream.json';
var outputFile = './out.json';

var readable = fs.createReadStream(inputFile);
var writeable = fs.createWriteStream(outputFile);


// ====


var stream = JSONStream.parse(['rows', true, 'doc']) //rows, ANYTHING, doc

stream.on('data', function(data) {
  console.log('received:', data);
});

readable.pipe(stream);
