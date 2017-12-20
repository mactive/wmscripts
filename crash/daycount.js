// https://crash.sankuai.com/api/crash/channel?project=waimai_mfe_bee_android&type=crash&includes=optional_channel&size=200&eq=appVersion,1.0.94&start=2017-12-20 00:00:00&end=2017-12-20 23:59:59


var fs = require('fs');
var request = require('request');
var moment = require('moment');
var inquirer = require('inquirer')

var j = request.jar();
var cookie = request.cookie('_lxsdk=15dbc362d80c8-0a9870ee6d92cc-30667808-13c680-15dbc362d8052; UM_distinctid=15dc4bd802846b-02dc62edf86845-30667808-240000-15dc4bd802984f; galaxy.sid=k8PkFWp1158POHN5YnTDnO5dqekjcQUb; galaxy.sid.sig=ogT_qDDIC4CCgogTL1AFyhSuv9w; _lxsdk_cuid=15dcaec71b2c8-0a0bf1ce96a0bf-30667808-240000-15dcaec71b3c8; _hc.v=46af742f-ad12-edce-1c52-761c7c9864a0.1503463574; misId=mengqian02; misId.sig=pFx5H3Z1B1Gq_cCTMM48Axtqa3E; userId=99568; userId.sig=SaRmJ2730pjCWfk9hemm3HnRzck; userName=%E5%AD%9F%E8%B0%A6; userName.sig=Vt_XtZFuiihDV-bU9kAcT6qQ1Do; role=staff; xingkong.sid=oIOVJfbrCOGq1Fn7c7CGBFiy5f0e20Sg; xingkong.sid.sig=KhwXG2X29ONO5FygqmdOYLqP2PU; execEngine=hive; statDs=DW_HIVE_DB_CONNECT_URL; displayName=dw_hiveDW_HIVE_DB_CONNECT_URL; al=bcnruxzgmmsqnqhjxgxphnjpfmmpjliq; u=595338; uu=6110abb0-7be1-11e7-9d4e-b93f461663f3; ai=1; skmtutc=3ndLQdvgdGyS/cmB4uWJzF1qk0johL0V6z9V+ixRaWAyG5tP8xwMeLgnCcajs9HG-MnDTYvkFcMg9SHLTJt7E/judVIs=; ssoid.sig=KnjuPnCR74Qd-XTI9i9dgE42Cn0; _gid=GA1.2.1850279118.1511430463; crash-sso=99568|62c40561d3*b4b9fbd177cf6fd5f6cf9|mengqian02|1511489828212|%E5%AD%9F%E8%B0%A6|k87yi+VxXnnXT/amlz5IWP0YWK00tVDeILXLRLQmzTE=; _ga=GA1.2.1769249289.1502162152; __mta=217413929.1487667544655.1511513555234.1511513571103.912; client-id=92beca94-2fd8-4de0-98b1-08d4b077ee98');



j.setCookie(cookie, 'https://crash.sankuai.com');

/**
 * 版本信息
 * @param {*} args 
 */
var getVersionByPlatform = function(args) {
  console.log(args.platform)
  var filterUrl = `https://crash.sankuai.com/api/filter?project=waimai_mfe_bee_${args.platform}&type=crash&page=index`
  return new Promise( resolve => {
    request({url: filterUrl, jar: j}, function (error, response, body) {
      var res = JSON.parse(body)
      var versions = res.data.filter(item => item.filter === 'appVersion')
      console.log(versions);
      resolve(versions[0].options)
    });
  }, reject => {

  })
  
}

/**
 * 最近3天
 */
function getRecentDays(days) {
  let res = [];

  for (let index = 0; index < days; index++) {
    let date = moment().subtract(index, 'day');
    res.push(date.format('YYYY-MM-DD'))
  }
  return res 
};


inquirer.prompt([
  {
    type: 'list',
    name: 'platform',
    choices: ['android', 'ios'],
    message: '请选择平台:',
    default: 0
  },
  {
    type: 'list',
    name: 'version',
    choices: getVersionByPlatform,
    message: '请选择版本:',
    default: 0
  },
  {
    type: 'list',
    name: 'startdate',
    choices: getRecentDays(10),
    message: '请选择Crash开始日期:',
    default: 0
  },
  {
    type: 'list',
    name: 'enddate',
    choices: getRecentDays(4),
    message: '请选择Crash结束日期:',
    default: 0
  },
  {
    type: 'list',
    name: 'brief',
    choices: ['yes','no'],
    message: '是否显示简报:',
    default: 0
  },
]).then((answers) => {
  console.log('结果为:')

  var countUrl = makeCountUrl(answers);
  var briefUrl;
  if( answers.platform === 'android') {
    briefUrl = makeBriefAndroidUrl(answers);
  } else {
    briefUrl = makeBriefUrl(answers);
  }
  // console.log(countUrl)
  request({url:countUrl, jar: j}, function (error, response, body) {
    var res = JSON.parse(body)
    console.log(`平台: ${answers.platform}\n版本: ${answers.version}\n开始日期: ${answers.startdate}\n结束日期: ${answers.enddate}\nCrash: ${res.total}次`)
  });

  if(answers.brief === 'yes'){
    console.log(briefUrl);
    request({url:briefUrl, jar: j}, function (error, response, body) {
      var res = JSON.parse(body)
      var result = [];
      if (answers.platform === 'ios') {
        for(const prop in res) {
          result.push({
            _count: res[prop],
            message: prop
          })
        }
      } else {
        result = res
      }

      // sort by _count
      result.sort(function (a, b) {
        return b._count - a._count;
      });


      for(const prop of result) {
        console.log(`Crash: ${prop.message}\n数量:${prop._count}\n`);      
      }

    });
  }
  
  
})



var makeCountUrl = function(args) {
  var countUrl = "https://crash.sankuai.com/api/crash/channel?project=waimai_mfe_bee_"+args.platform;
  countUrl += "&type=crash";
  countUrl += "&includes=optional_channel";
  countUrl += "&size=200";
  countUrl += "&eq=appVersion,"+args.version; //版本
  countUrl += "&start="+args.startdate+" 00:00:00"; // 开始
  countUrl += "&end="+args.enddate+" 23:59:59"  // 截止
  return countUrl
}

var makeBriefUrl = function(args) {
  var briefUrl = "https://crash.sankuai.com/api/crash/aggr?project=waimai_mfe_bee_"+args.platform;
  briefUrl += "&type=crash";
  briefUrl += "&includes=message";
  briefUrl += "&size=25";
  briefUrl += "&eq=appVersion,"+args.version; //版本
  briefUrl += "&start="+args.startdate+" 00:00:00"; // 开始
  briefUrl += "&end="+args.enddate+" 23:59:59"  // 截止
  return briefUrl
}

var makeBriefAndroidUrl = function(args) {
  var briefUrl = "https://crash.sankuai.com/api/crash/android-group-by-hash?project=waimai_mfe_bee_"+args.platform;
  briefUrl += "&type=crash";
  briefUrl += "&includes=hash,message";
  briefUrl += "&size=200";
  briefUrl += "&eq=appVersion,"+args.version; //版本
  briefUrl += "&start="+args.startdate+" 00:00:00"; // 开始
  briefUrl += "&end="+args.enddate+" 23:59:59"  // 截止
  return briefUrl
}





var showList = function (body) {
  var res = JSON.parse(body)
  res.forEach(element => {
    // deviceId
    // extra 附件信息, 页面view
    // lastPageTrack 具体崩溃
    var detailUrl = makeDetailUrl(element.id);
    var topTwoLine = getTwoLine(element.lastPageTrack)
    console.log(element.deviceId)    
    console.log(topTwoLine.join('\n'))
    console.log('\n')
    console.log('\n')
  });
}
