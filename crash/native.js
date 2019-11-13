var fs = require("fs");
var viewArray = new Set()

function sort(viewArray) {
  var sortable = [];
  for (var vehicle in viewArray) {
    sortable.push([vehicle, viewArray[vehicle]]);
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });

  sortable.forEach(function(ele) {
    console.log(ele);
  });
}

function readLines(input, func) {
    var remaining = "";

    input.on("data", function(data) {
        remaining += data;
        var index = remaining.indexOf("\n");
        while (index > -1) {
                var line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                parseLine(line);
                index = remaining.indexOf("\n");
            }
    });

    input.on("end", function() {
        if (remaining.length > 0) {
            parseLine(remaining);
        }
        console.log(viewArray)
    });
}

function parseLine(data) {
    const regex1 = /NativeModules.(\w+)\W/;
    const regex2 = /\{\s*(\w+)\s*\}.*NativeModules/;
    const groups1 =  data.match(regex1)
    const groups2 =  data.match(regex2)
    if(groups1) {
        viewArray.add(groups1[1])
    } else if(groups2) {
        if(groups2[1].indexOf(',')) {
            const modules = groups2[1].split(',')
            modules.forEach( item => {
                viewArray.add(item.trim())
            })
        } else {
            viewArray.add(groups2[1].trim())
        }
    } else {
        // 无效行
    }
}

var input = fs.createReadStream("./crash/native.txt");
readLines(input, parseLine);
