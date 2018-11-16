// https://crash.sankuai.com/api/crash/channel?project=waimai_mfe_bee_android&type=crash&includes=optional_channel&size=200&eq=appVersion,1.0.94&start=2017-12-20 00:00:00&end=2017-12-20 23:59:59


var fs = require('fs');
var request = require('request');
var moment = require('moment');
var inquirer = require('inquirer')

var j = request.jar();
var multipleCookie = 'UM_distinctid=1641bf500f45d-08c37f7b36d00a-17376952-232800-1641bf500f552f; _lxsdk_cuid=1641c1f67cf61-05197fca6009d2-17376952-232800-1641c1f67d0c8; _lxsdk=1641c1f67cf61-05197fca6009d2-17376952-232800-1641c1f67d0c8; _ga=GA1.2.968884466.1529548216; misId=mengqian02; misId.sig=pFx5H3Z1B1Gq_cCTMM48Axtqa3E; userId=99568; userId.sig=SaRmJ2730pjCWfk9hemm3HnRzck; userName=%E5%AD%9F%E8%B0%A6; userName.sig=Vt_XtZFuiihDV-bU9kAcT6qQ1Do; role=staff; execEngine=hive; statDs=DW_HIVE_DB_CONNECT_URL; displayName=dw_hiveDW_HIVE_DB_CONNECT_URL; al=xjmkagslghydxegscmoakdxdibsqrxuq; u=595338; uu=bc6f8ea0-7a9a-11e8-8975-ff8e87c46ec2; cid=1; ai=1; xingkong.sid=VQtQPEJFkBNqDV_PJTNKyQIkTPS5x5mt; xingkong.sid.sig=pv9bUBrdIaNfa--ugddLfiScFMQ; _gid=GA1.2.426120775.1530494723; client-id=58fed925-0bb2-4e52-80af-2888a1b7d676; skmtutc=dOuwUU7/25qtQUUhb8ceQNv5H3Zb4slcZUIc/7y9fABgqmZxp8BiRVcRMSNsiq9o-YAeNXRfMVz8BjFRnZQH8xeiyHcw=; _lxsdk_s=16468dabbc2-bb4-12c-997%7C%7C6; crash-sso=99568|0846cd6762*c4044ae0e93c01c8ac9dc|mengqian02|56cd83f790248b4758e0c845|1530767958272|%E5%AD%9F%E8%B0%A6|E0Mej3JWgzj17bCRJYYY3cUfxHu+Oxq+1/pqcyZ23n0=; __mta=41858461.1529545561796.1530685733229.1530767958695.39';
multipleCookie.split(';').forEach((x) => {
  j.setCookie(request.cookie(x),  'https://crash.sankuai.com')
})

/**
 * 版本信息
 * @param {*} args 
 */
var getVersionByPlatform = function(args) {
  var filterUrl = `https://crash.sankuai.com/api/filter?project=waimai_mfe_bee_${args.platform}&type=crash&page=index`
  return new Promise( resolve => {
    // console.log(j.getCookieString('https://crash.sankuai.com') )
    request({url: filterUrl, jar: j, method: 'GET'}, function (error, response, body) {
      var res = JSON.parse(body)
      var versions = res.data.filter(item => item.filter === 'appVersion')
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
    message: '是否显示详情:',
    default: 0
  },
]).then((answers) => {
  console.log('/*========结果为=========*/')

  var countUrl = makeCountUrl(answers);

  // console.log(countUrl)
  request({url:countUrl, jar: j}, function (error, response, body) {
    var res = JSON.parse(body)
    console.log(`平台: ${answers.platform}\n版本: ${answers.version}\n开始日期: ${answers.startdate}\n结束日期: ${answers.enddate}\nCrash: ${res.total}次`)
    console.log('/*=========End=========*/')

    if(answers.brief === 'yes'){
      var briefUrl;
      if( answers.platform === 'android') {
        briefUrl = makeBriefAndroidUrl(answers);
      } else {
        briefUrl = makeBriefUrl(answers);
      }
      showBriefList(briefUrl, answers);      
    }
  })

  
})


var showBriefList = function(briefUrl, answers) {
  // console.log(briefUrl);
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


