/**
 * Created by mengqian on 7/6/2016.
 */
var fs = require('fs');
var csv = require("fast-csv");

var result = [];
var stream = fs.createReadStream("./hangzhou/price.txt");
var lineOne = [];
csv
  .fromStream(stream, {headers : ["pan", "tao","area","price"]})
  .on("data", function(data){
    if(data.url.indexOf(subURL) >=0){
      totalUV += parseInt(data.pv);
      console.log(data.id,totalUV);
    }
  })
  .on("end", function(){
    console.log("done");
  });

