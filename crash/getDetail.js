var fs = require('fs');

var request = require('request');
var listUrl = "https://crash.sankuai.com/api/crash/detail?project=waimai_mfe_bee_ios";
listUrl += "&type=crash";
listUrl += "&excludes=log,iosLog";
listUrl += "&size=200";
listUrl += "&order=-ts";
listUrl += "&eq=appVersion,1.0.85"; //版本
listUrl += "&eq=message,RCTFatal (RCTAssert.m:138)";
listUrl += "&start=2017-11-10 00:00:00"; // 开始
listUrl += "&end=2017-11-23 23:59:59"  // 截止

console.log(listUrl);

request(listUrl, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response);
  // console.log('body:', body); // Print the HTML for the Google homepage.
  showList(body);
});


var showList = function (body) {
  var res = JSON.parse(body)
  res.forEach(element => {
    // deviceId
    // extra 附件信息, 页面view
    // lastPageTrack 具体崩溃
    var detailUrl = makeDetailUrl(element.id);

    console.log(detailUrl)
    request(listUrl, function (error, response, body) {
      // console.log('statusCode:', response);
      var detail = JSON.parse(body)[0];
      console.log(detail.optional_userID, detail.crashVersion);
    });
    
  });
}

// 通过 DeviceId获取Mis信息
var getMisInfoByDeviceId = () => {

}

var makeDetailUrl = function(id) {
  var detailUrl = "https://crash.sankuai.com/api/crash/detail?project=waimai_mfe_bee_ios";
  detailUrl += "type=crash";
  detailUrl += "includes=*";
  detailUrl += "size=1";
  detailUrl += "eq=id,"+id;
  detailUrl += "eq=lighterVersion,v2";
  detailUrl += "eq=ts,1511420040";
  detailUrl += "start=2017-11-23 00:00:00";
  detailUrl += "end=2017-11-23 23:59:59";
  return detailUrl;
}

var scheme =
  { "dt": "20171123", 
    "mt_datetime": "2017-11-23 14:54:08+0800", 
    "ts": "1511420040", 
    "es_timestamp": "2017/11/23 14:54:08 +0800", 
    "deviceModel": "iPhone7,2", 
    "venderId": "D7F142E2-6B72-499B-8F0A-AA43D9382DAA", 
    "resolution": "750*1334", 
    "net": "LTE", 
    "type": "crash", 
    "optional_crashTimeStamp": "1511450000", 
    "city": "Unknown", 
    "sdkVersion": "1.0", 
    "deviceProvider": "Apple", 
    "id": "GUID-D0259544-96EA-47A2-900F-06E1112D7613", 
    "crashVersion": "1.0.85.686", 
    "pushId": "***", 
    "deviceType": "iphone", 
    "province": "Unknown", 
    "carrier": "中国电信", 
    "lastPageTrack": "2017-11-23 14:53:41 [ACTION]IQBarButtonItem(_sendAction:withEvent:)\n2017-11-23 14:53:41 [ACTION]RCTTextField(textFieldEndEditing)\n2017-11-23 14:53:40 [ACTION]RCTTextField(textFieldDidChange)\n2017-11-23 14:53:40 [ACTION]RCTTextField(textFieldDidChange)\n2017-11-23 14:53:40 [ACTION]RCTTextField(textFieldDidChange)", 
    "lighterHour": "14", 
    "apn": "", 
    "deviceId": "D7F142E2-6B72-499B-8F0A-AA43D9382DAA", 
    "optional_channel": "Unprovided", 
    "os": "iOS", 
    "osVersion": "8.1.2", 
    "optional_userID": "2067279", 
    "extra": "{\"patchVersion\":\"加载中...\",\"usedMemery\":205.609,\"rnPackageVersion\":\"WMLocation_regeo_count_ios\",\"freeDiskspace\":\"36.58 GB\",\"sdkVersion\":\"1.0\"}", 
    "optional_biz_group": "BizGroup Unprovided", 
    "optional_patchVersion": "***", 
    "lighterMinute": "54", 
    "did": "***", 
    "deviceMarketingName": "iPhone 6", 
    "guid": "D0259544-96EA-47A2-900F-06E1112D7613", 
    "message": "RCTFatal (RCTAssert.m:138)", 
    "project": "waimai_mfe_bee_ios", 
    "optional_ch": "waimai_e", 
    "source": "light", 
    "appVersion": "1.0.85", 
    "optional_rnPackageVersion": "***", 
    "lighterId": "Lighter-66949de3-de75-491d-a998-618efbc1d8b3", 
    "lighterDt": "20171123", 
    "lighterVersion": "v2", 
    "idfa": "DD5DAA0A-DE48-478C-A52A-3F01615E66B3" };
