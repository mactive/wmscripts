var fs = require('fs');

var request = require('request');


var deviceIdSet = new Set();

var j = request.jar();
var cookie = request.cookie('_lxsdk=15dbc362d80c8-0a9870ee6d92cc-30667808-13c680-15dbc362d8052; UM_distinctid=15dc4bd802846b-02dc62edf86845-30667808-240000-15dc4bd802984f; galaxy.sid=k8PkFWp1158POHN5YnTDnO5dqekjcQUb; galaxy.sid.sig=ogT_qDDIC4CCgogTL1AFyhSuv9w; _lxsdk_cuid=15dcaec71b2c8-0a0bf1ce96a0bf-30667808-240000-15dcaec71b3c8; _hc.v=46af742f-ad12-edce-1c52-761c7c9864a0.1503463574; misId=mengqian02; misId.sig=pFx5H3Z1B1Gq_cCTMM48Axtqa3E; userId=99568; userId.sig=SaRmJ2730pjCWfk9hemm3HnRzck; userName=%E5%AD%9F%E8%B0%A6; userName.sig=Vt_XtZFuiihDV-bU9kAcT6qQ1Do; role=staff; xingkong.sid=oIOVJfbrCOGq1Fn7c7CGBFiy5f0e20Sg; xingkong.sid.sig=KhwXG2X29ONO5FygqmdOYLqP2PU; execEngine=hive; statDs=DW_HIVE_DB_CONNECT_URL; displayName=dw_hiveDW_HIVE_DB_CONNECT_URL; al=bcnruxzgmmsqnqhjxgxphnjpfmmpjliq; u=595338; uu=6110abb0-7be1-11e7-9d4e-b93f461663f3; ai=1; skmtutc=3ndLQdvgdGyS/cmB4uWJzF1qk0johL0V6z9V+ixRaWAyG5tP8xwMeLgnCcajs9HG-MnDTYvkFcMg9SHLTJt7E/judVIs=; ssoid.sig=KnjuPnCR74Qd-XTI9i9dgE42Cn0; _gid=GA1.2.1850279118.1511430463; crash-sso=99568|62c40561d3*b4b9fbd177cf6fd5f6cf9|mengqian02|1511489828212|%E5%AD%9F%E8%B0%A6|k87yi+VxXnnXT/amlz5IWP0YWK00tVDeILXLRLQmzTE=; _ga=GA1.2.1769249289.1502162152; __mta=217413929.1487667544655.1511513555234.1511513571103.912; client-id=92beca94-2fd8-4de0-98b1-08d4b077ee98');


var listUrl = "https://crash.sankuai.com/api/crash/detail?project=waimai_mfe_bee_android";
listUrl += "&type=crash";
listUrl += "&excludes=log,iosLog";
listUrl += "&size=200";
listUrl += "&order=-ts";
listUrl += "&eq=hash,9667dd04146546dba26bbda666b30af0"; //版本
listUrl += "&start=2017-11-05 00:00:00"; // 开始
listUrl += "&end=2017-12-04 23:59:59"  // 截止

console.log(listUrl);
j.setCookie(cookie, 'https://crash.sankuai.com');

request({url:listUrl, jar: j}, function (error, response, body) {
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
    // var detailUrl = makeDetailUrl(element.id);
    var topTwoLine = getTwoLine(element.lastPageTrack)
    console.log(element.message)    
    console.log(topTwoLine.join('\n'))
    console.log('\n')
    console.log('\n')
    // deviceIdSet.add(element.deviceId)
    // console.log(deviceIdSet.size)

    // console.log(detailUrl)
    // request(listUrl, function (error, response, body) {
    //   // console.log('statusCode:', response);
    //   var detail = JSON.parse(body)[0];
    //   console.log(detail.crashVersion, detail.lastPageTrack);
    // });
    
  });
}

// 通过 DeviceId获取Mis信息
var getMisInfoByDeviceId = () => {

}

var getTwoLine = function (string) {
  var arr = string.split('\n')
  return arr.slice(0,2)
}

var makeDetailUrl = function(id) {
  var detailUrl = "https://crash.sankuai.com/api/crash/detail?project=waimai_mfe_bee_android";
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
    "project": "waimai_mfe_bee_android", 
    "optional_ch": "waimai_e", 
    "source": "light", 
    "appVersion": "1.0.85", 
    "optional_rnPackageVersion": "***", 
    "lighterId": "Lighter-66949de3-de75-491d-a998-618efbc1d8b3", 
    "lighterDt": "20171123", 
    "lighterVersion": "v2", 
    "idfa": "DD5DAA0A-DE48-478C-A52A-3F01615E66B3" };
