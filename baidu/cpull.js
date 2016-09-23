/**
 * Created by mengqian on 7/6/2016.
 */
var fs = require('fs');
var csv = require("fast-csv");

var stream = fs.createReadStream("./baidu/cpullnew.csv");
var subURL = 'redpacket_acquire_user/activity_page';
// var subURL = 'redpacket_acquire_user/grab_redpacket_page';
var totalUV = 0;
csv
  .fromStream(stream, {headers : ["id", "url","pv","uv","dd"]})
  .on("data", function(data){
    if(data.url.indexOf(subURL) >=0){
      totalUV += parseInt(data.pv);
      console.log(data.id,totalUV);
    }
  })
  .on("end", function(){
    console.log("done");
  });

