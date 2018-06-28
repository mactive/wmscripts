// https://crash.sankuai.com/api/crash/channel?project=waimai_mfe_bee_android&type=crash&includes=optional_channel&size=200&eq=appVersion,1.0.94&start=2017-12-20 00:00:00&end=2017-12-20 23:59:59


var fs = require('fs');
var request = require('request');
var moment = require('moment');
var inquirer = require('inquirer')

var j = request.jar();
var multipleCookie = '_ga=GA1.2.1769249289.1502162152; _hc.v=46af742f-ad12-edce-1c52-761c7c9864a0.1503463574; _jzqc=1; _jzqx=1.1515041553.1515045943.1.jzqsr=cloud-in%2Esankuai%2Ecom|jzqct=/.-; _lxsdk=15dbc362d80c8-0a9870ee6d92cc-30667808-13c680-15dbc362d8052; _lxsdk_cuid=15dcaec71b2c8-0a0bf1ce96a0bf-30667808-240000-15dcaec71b3c8; ai=1; displayName=dw_hiveDW_HIVE_DB_CONNECT_URL; execEngine=hive; galaxy.sid=k8PkFWp1158POHN5YnTDnO5dqekjcQUb; galaxy.sid.sig=ogT_qDDIC4CCgogTL1AFyhSuv9w; misId=mengqian02; misId.sig=pFx5H3Z1B1Gq_cCTMM48Axtqa3E; role=staff; ssoid.sig=KnjuPnCR74Qd-XTI9i9dgE42Cn0; statDs=DW_HIVE_DB_CONNECT_URL; userId=99568; userId.sig=SaRmJ2730pjCWfk9hemm3HnRzck; userName=%E5%AD%9F%E8%B0%A6; userName.sig=Vt_XtZFuiihDV-bU9kAcT6qQ1Do; uu=6110abb0-7be1-11e7-9d4e-b93f461663f3; xingkong.sid=oIOVJfbrCOGq1Fn7c7CGBFiy5f0e20Sg; xingkong.sid.sig=KhwXG2X29ONO5FygqmdOYLqP2PU; UM_distinctid=1616f570ee63d5-0d419a3e18058a-32637402-232800-1616f570ee7b35; cid=1; meta.sid=ADaV_a21F-3qnuR5cYRFgaKo5UIsyUJQ; meta.sid.sig=avaW0lJc6p-DbWHgKqSLfVTDfqo; _jzqa=1.4185016504935755000.1513676823.1515123256.1520836849.12; skmtutc=gjS9MSS6LhfKhhd3KZ4THVXtC1FEKB3b2nwjqBCQrBWmXy/vLx1q8FuGWA4ZkDOU-+C9Ggtvtssk0eE/zjwOK9VlDZ+o=; client-id=ba171890-b4c4-4b12-9347-ed0c413b1a53; crash-sso=99568|6f8f0494f1*64d79979e61e66ef5e2c2|mengqian02|56cd83f790248b4758e0c845|1528697756761|%E5%AD%9F%E8%B0%A6|UtjOiShLXUkZ3lvOvZJZ+PxB/n2VQ3mFg7ZA1fqLDj8=; _gid=GA1.2.1479107009.1528698621; _lxsdk_s=163edde24f6-341-8ba-280%7C%7C4; __mta=217413929.1487667544655.1528704183748.1528705057872.1691';
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


