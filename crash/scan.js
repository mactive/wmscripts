
var fs = require('fs');
var viewArray = {}

function sort(viewArray){
  var sortable = [];
  for (var vehicle in viewArray) {
      sortable.push([vehicle, viewArray[vehicle]]);
  }
  
  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });

  sortable.forEach(function(ele){
    console.log(ele)
  });
  
}

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      parseLine(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      parseLine(remaining);
    }
    sort(viewArray);

  });
}



function parseLine(data) {
  var arr =  data.split("\t");
  var crashViewText = arr[arr.length - 1]
  
  var views = JSON.parse(crashViewText).crashView;
  views = views.split(',')
  console.log('Line: ' + typeof views);
  var lastView = views[views.length - 1]

  var element = lastView.replace(/\[|]| /g, '');
  // console.log(element);

  if(viewArray[element] === undefined){
    viewArray[element] = 0;
  }
  viewArray[element] = viewArray[element] + 1;
  
  // ===  all View ====
  // views.forEach(function(ele) {
  //   var element = ele.replace(/\[|]| /g, '');
  //   // console.log(element);
  //   if(viewArray[element] === undefined){
  //     viewArray[element] = 0;
  //   }
  //   viewArray[element] = viewArray[element] + 1;
  //   // var viewArrayKeys = viewArray.keys();
  //   // var idx = viewArrayKeys.indexOf(element)
  //   // if(idx > -1) {
  //   //   viewArray[element] += 1;
  //   // }
  // }, this);
}



var input = fs.createReadStream('./sources.txt');
readLines(input, parseLine);