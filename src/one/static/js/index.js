import {
  getInfo,
  getWareHouseInfo,
  getDebrisPrizeList,
  draw,
  getPrizeRecordList,
  chargeEnergy
} from './allApi'

var $maskRule = $("#mask-rule"), //规则遮罩层
  $mask = $("#mask"), //红包遮罩层
  $winning = $(".winning"), //红包
  $card = $("#card"),
  $close = $("#close"),
  $record = $('#record'),
  $dialog1 = $('.dialog-wrap1'),
  $dialogCon = $('.dialog-wrap1 .con'),
  $noChance = $('.noChance');

//link = false;//判断是否在链接跳转中

//规则
$(".rule-bar").click(function () {
  $maskRule.show();
  anime({
    targets: '#mask-rule .box-rule',
    scale: [
      0, 1
    ]
  })
});

$("#close-rule").click(function () {
  $maskRule.hide();
});
$('#close-record').click(function () {
  $record.hide();
})

function setSteps(data, active) {
  steps({
    el: "#steps1",
    data: data,
    active: active,
    dataOrder: ["title", "line", "description", ],
    iconType: 'bullets',
    center: true
  })
}

/* 增加scale动画 */
function addScaleAnimation(dom) {
  $(dom).addClass("scale")
}
/* 没有中奖机会弹窗 */
function noChance(bottleNum) {

  addScaleAnimation(".dialog-wrap .con")
  //没有能量瓶
  if (bottleNum <= 0) {
    $noChance.show()

  } else {
    $('.power-dialog').show()

  }

}
//此处可以在commonjs中合并
function queryString(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results === null) {
    return "";
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
/*
时间倒计时插件
TimeDown.js
*/
function TimeDown(endDateStr) {
  var totalSeconds = parseInt(endDateStr / 1000);
  //取模（余数）
  var modulo = totalSeconds % (60 * 60 * 24);
  //小时数
  var hours = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  //分钟
  var minutes = Math.floor(modulo / 60);
  //秒
  var seconds = modulo % 60;
  //输出到页面
  document.getElementById('hours').innerHTML = addZero(hours)
  document.getElementById('minutes').innerHTML = addZero(minutes)
  document.getElementById('seconds').innerHTML = addZero(seconds)
  setTimeout(function () {
    TimeDown(endDateStr);
  }, 1000)
}

var timer1

function transTime(timestamp) {


  var totalSeconds = parseInt(timestamp);
  //取模（余数）
  var modulo = totalSeconds % (60 * 60 * 24);
  //小时数
  var hours = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  //分钟
  var minutes = Math.floor(modulo / 60);
  //秒
  var seconds = modulo % 60;
  //输出到页面
  document.getElementById('hours').innerHTML = addZero(hours)
  document.getElementById('minutes').innerHTML = addZero(minutes)
  document.getElementById('seconds').innerHTML = addZero(seconds)
}




/* 补0 */
function addZero(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

function message(text, time) {
  if (!document.getElementById('alertBg')) {
    var _time = time || 1000;
    var parent = document.createElement('div');
    parent.setAttribute('id', 'alertBg');
    var child = document.createElement('p');
    child.setAttribute('class', 'text');
    var _text = document.createTextNode(text);
    child.appendChild(_text);
    parent.appendChild(child);
    document.body.appendChild(parent);
    setTimeout(() => {
      document.body.removeChild(parent);
    }, _time)
  };
}






// 获取url中参数

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var
  $item = $(".cj"),
  $change = $("#change"), //显示剩余机会
  $btn = $("#btn"), //开始抽奖按钮   
  $record = $('#record'),
  $strs = '',
  lottery = {
    count: 0, //抽奖次数
    bool: true, // 是否可点击
    id: 0, // 奖品位置下标 用于识别奖品
    circle: 0, // 转动的圈数
    prize: 1 // 中奖的位置
  },
  $noChance = $('.noChance'), //没机会弹框
  $bottleNum = 0, // 能量屏的数量
  $awardSpNum = 0, //中奖弹层里的用户当前奖品获取的碎片数量
  $userId = localStorage.getItem('userId') || '',
  $dialog1 = $('.dialog-wrap1'),
  $first = 0,
  $seven = 0,
  $thirteen = 0,
  $twenty = 0,
  $forty = 0,
  obj1 = {},
  obj2 = {},
  obj3 = {},
  obj4 = {},
  obj5 = {},
  initNum = -1,
  stepList = [],
  videoFlag = 0, // 看视频类型的表示 1.兑换能量瓶 2 领取双倍奖励
  $url = "",
  $urlImg = "",
  $activeId = '',
  $assetsId = '',
  $awardtype = "",
  $preid = "",
  $prizeId = 0, // 需要翻倍的奖品id
  timer,
  flag = true,
  timer1,
  $aniImg = '',
  $ball = $('.sp-ani-dom'),
  $bxmVideo,
  params = {};
params.t = Math.random();
params.p = 'ads'
params.locaurl = window.location.href
params.referrer = document.referrer || ''
params.sh = 667,
  params.sw = 375,
  params.cd = window.screen.colorDepth || 0
params.lang = 'zh-CN'
params.activityid = getUrlParam("activityid")
params.mt = 3001,
  params.startTime = new Date().getTime()
params.jsV = 20191018
var img = new Image();
var path = 'https://log.cudaojia.com:10090/dot/s.gif';
var paramsStr = '';
for (const key in params) {
  paramsStr += `${paramsStr.indexOf('?') >= 0 ? '&' : '?'}${key}=${encodeURI(params[key])}`;
}
img.src = `${path}${paramsStr}`;
$bxmVideo = new BxmJsVideoSdk({
  onload: function () {
    $bxmVideo.showAd()
  },
  onclose: function () {
    if (videoFlag == 1) {
      getWatchAdEbergy()
    } else if (videoFlag == 2) {
      // 看完后隐藏双倍奖励按钮
      $('.ani-img').attr("src", $aniImg)
      $('.ani-dialog-wrap').show()
      $('.ani-con').show()
      $('.ani-img').css({
        'transform': 'translateY(0)'
      })
      $('.btn-right-wrap').hide()
      getDouble()
    }
  }, //视频播放完成的回调，跟之前的  bxmVideoComplete  对应
  uid: getUrlParam("uid"), //  uid
  position: getUrlParam("appkey") + getUrlParam("business").substring(getUrlParam("business").indexOf("-"), getUrlParam("business").length), //广告位id
  activityid: getUrlParam("activityid") //活动id
});
/* 获取用户信息 */
if ($userId === 'undefined' || !$userId) {
  getInfo({
    bxmId: getUrlParam("uid")
  }).then(res => {
    localStorage.setItem('userId', res.userId)
    $userId = res.userId
    getSpInfo()
    getLotteryInfo();
    bxm_point("advert-activity-debris", "homeExposure", "首页曝光", $userId)
  })

} else {
  /* 获取碎片获取情况 */
  getSpInfo()
  /* 获取用户能量瓶 和抽奖次数 宝箱状态*/
  getLotteryInfo();
  bxm_point("advert-activity-debris", "homeExposure", "首页曝光", $userId)
}

/* 初始化动画 */
init();
//点击中奖记录
$('.award').click(function () {
  getRecord()
  $record.show();
  anime({
    targets: '#record .box-record',
    scale: [
      0, 1
    ]
  })
})
//点击抽奖
$btn.click(function () {
  params.mt = 4001
  params.startTime = new Date().getTime()
  var img = new Image();
  var path = 'https://log.cudaojia.com:10090/dot/s.gif';
  var paramsStr = '';
  for (const key in params) {
    paramsStr += `${paramsStr.indexOf('?') >= 0 ? '&' : '?'}${key}=${encodeURI(params[key])}`;
  }
  img.src = `${path}${paramsStr}`;
  md(4, "活动参与");
  if (lottery.bool) { //若未按下
    lottery.bool = false;
    if (lottery.count > 0) { //若还有次数 
      lottery.circle = 0
      lottery.count--;
      $change.html(lottery.count);
      draw({
        type: 1,
        userId: $userId
      }).then(res => {
        lottery.prize = res.prizeCode
        $awardSpNum = res.prizeNum
        $url = res.jumpUrl
        $urlImg = res.imgUrl
        $activeId = res.bxmId
        $assetsId = res.assetsId
        $preid = res.preid
        $prizeId = res.id
        $awardtype = res.awardtype
      })
      clickFn();
    } else {
      lottery.bool = true;
      noChance($bottleNum)
    }
  }
});
/* 宝箱点击 */
/* 给未来元素添加点击事件，不能直接操作该元素 */
$(document).on('click', '.pulse', function () {
  draw({
    type: 2,
    userId: $userId,
  }).then(res => {
    lottery.prize = res.prizeCode
    $awardSpNum = res.prizeNum
    $url = res.jumpUrl
    $urlImg = res.imgUrl
    $activeId = res.bxmId
    $assetsId = res.assetsId
    $preid = res.preid
    $prizeId = res.id
    $awardtype = res.awardtype
    win(res.prizeCode, lottery.count, $awardSpNum);
    getLotteryInfo()
  })
})
// 关闭没有抽奖机会的弹框
$('.close').click(function () {
  $noChance.hide()
  lottery.bool = true;
})
// 头部能量瓶点击事件
$('.close-power').click(function () {
  $('.power-dialog').hide()
  $('.dialog-wrap1').hide()
})
$('.power-bottle').click(function () {
  //没有能量瓶
  if ($bottleNum <= 0) {
    $noChance.show()
    anime({
      targets: '.noChance .con',
      scale: [
        0, 1
      ]
    })
    bxm_point("advert-activity-debris", "energyExposure", "能量瓶视频曝光", $userId)
  } else {
    $('.power-dialog').show()
    anime({
      targets: '.power-dialog .con',
      scale: [
        0, 1
      ]
    })
  }

})

//中奖信息提示

$('.left-btn').on('click', function (evt) {
  if (flag) {
    clearInterval(timer); //关闭弹出时清除定时器
    init();
    //更新状态
    getSpInfo()
    getLotteryInfo();
    anime.remove('.ani-img');
    $ball.css({
      top: '160px',
      left: 200 + 'px',
      transition: 'left 0s, top 0s',
      opacity: '1',
      display: 'block'
    })
    setTimeout(() => {
      $ball.css({
        top: 800 + 'px',
        left: '0px',
        transform: 'scale(0)',
        opacity: '0',
        transition: 'left .7s linear .1s, top .7s ease-in .1s ,transform .7s ease-in .1s,opacity .7s ease-in .1s'
      })
    }, 20)
    anime({
      targets: '.dialog-wrap1 .sp-award',
      scale: [
        1, 0
      ],
      duration: 300,
      easing: 'linear',
    })
    setTimeout(() => {
      $ball.removeAttr("style")
      $ball.css('display', 'none')
      $dialog1.hide();
    }, 700);

  } else {
    return false
  }
})

var timeClock;

function countDown() {
  $('#three-wrap').show()
  $('.sp-foot-btn').css({
    background: "linear-gradient(180deg,rgba(206,206,206,1) 0%,rgba(178,178,178,1) 100%)",
    "box-shadow": '2px 2px 14px 0px rgba(255,255,255,0.5);'
  })
  var timer_num = 3;
  $("#three").html(3);
  flag = false
  timeClock = setInterval(function () {
    timer_num--;
    $("#three").html(timer_num);
    flag = false
    if (timer_num == 0) {
      clearInterval(timeClock);
      $('.sp-foot-btn').css({
        background: "linear-gradient(180deg,rgba(152,115,249,1) 0%,rgba(132,87,250,1) 100%)",
        "box-shadow": "2px 2px 14px 0px rgba(255,255,255,0.5);"
      })
      $('#three-wrap').hide()
      flag = true
    }
  }, 1000)

}

$('.use-power').click(function () {
  getchargeEnergy()
})
/* 看视频兑换能量瓶 */
$('.get-power').click(function () {
  videoFlag = 1
  bxmsdk_haveVideo()
  bxm_point("advert-activity-debris", "energyPlay", "能量瓶视频播放", $userId)

})
/* 看视频领取双倍 */
$('.btn-right').click(function () {
  videoFlag = 2
  bxm_point("advert-activity-debris", "debrisPlay", "碎片视频播放", $userId)
  bxmsdk_haveVideo()
})
$('.adv-btn').click(function () {
  active()
  window.location.href = $url
  bxm_point("advert-activity-debris", "advertPlay", "广告券播放", $userId)
})
// 判断本地是否有视频
function bxmsdk_haveVideo() {
  $bxmVideo.haveVideo()
}
/*中奖信息提示*/
function win(prize, count, spNum) {
  //广告券
  $('.btn-right-wrap').show()
  if (prize == 4) {
    bxm_point("advert-activity-debris", "advertExposure", "广告券曝光", $userId)
    $('.adv').show();
    $('.sp-award').hide()
    $('.adv-body img').attr("src", $urlImg)
  } else {
    bxm_point("advert-activity-debris", "debrisExposure", "碎片视频曝光", $userId)
    countDown()
    $('.adv').hide();
    $aniImg = "";
    $('.sp-award').show()
    $('.sp-con img').attr('src', "./static/imgs/get_0" + prize + ".png")
    $('.sp-wrap img').attr('src', "./static/imgs/s_0" + prize + ".png")
    $aniImg = "./static/imgs/s_0" + prize + "_0" + prize + ".png"
    $('.sp-num').text(spNum)
    if (prize == 1) {
      $('.sp-total').text(100)
    } else if (prize == 3) {
      $('.sp-total').text(80)
    } else {
      $('.sp-total').text(49)
    }
    $('.sp-bottom .count').html(count)
  }
  $dialog1.show();
  anime({
    targets: '.dialog-wrap1 .con',
    scale: [
      0, 1
    ]
  });
}
// 获取碎片信息
function getSpInfo() {
  getDebrisPrizeList({
    userId: $userId,
  }).then(data => {
    var res = data;
    for (var i = 0; i < res.length; i++) {
      var code = parseInt(res[i].prizeCode)
      if (code !== 4) {
        $('.pro-num' + code + '').html(res[i].prizeNum)
        if (code === 1) {
          $('.pro-num1').parent().siblings('.progress-bar').css('width', '' + res[i].prizeNum + '%')
        } else if (code === 3) {
          $('.pro-num3').parent().siblings('.progress-bar').css('width', '' + (res[i].prizeNum * 100 / 80) + '%')
        } else {
          $('.pro-num' + code + '').parent().siblings('.progress-bar').css('width', '' + (res[i].prizeNum * 100 / 49) + '%')
        }
      }

    }
  })
}
// 获取抽奖次数 能量瓶等信息
function getLotteryInfo() {
  getWareHouseInfo({
    type: 2,
    userId: $userId,
  }).then(res => {
    stepList = []
    initNum = -1 // 每次进来初始化数据
    $bottleNum = res.energyNum
    lottery.count = res.drawNum
    $first = res.first
    $seven = res.seven
    $thirteen = res.thirteen
    $twenty = res.twenty
    $forty = res.forty
    $change.html(lottery.count)
    $('.round2').text(1)
    $('.energyNum').text($bottleNum)
    var leftTime = res.leftTime
    // 三个就不显示倒计时   
    if (leftTime == "0") {
      clearInterval(timer1)
      $('#timer').hide()
    } else {
      $('.timer').show()
      clearInterval(timer1)
      leftTimer(parseInt(leftTime) / 1000)
    }
    if ($first === 1) {
      obj1 = {
        title: '<img src="./static/imgs/open_01.png" width="70%" class="pulse">',
        description: "今日首抽",
      }
      initNum++
    } else if ($first === 0) {
      obj1 = {
        title: '<img src="./static/imgs/no_01.png" width="90%">',
        description: "今日首抽",
      }
    } else {
      obj1 = {
        title: '<img src="./static/imgs/finish_01.png" width="90%">',
        description: "今日首抽",
      }
      initNum++
    }
    if ($seven === 1) {
      obj2 = {
        title: '<img src="./static/imgs/open_02.png" width="70%" class="pulse">',
        description: "7次",
      }
      initNum++
    } else if ($seven === 0) {
      obj2 = {
        title: '<img src="./static/imgs/no_02.png" width="90%">',
        description: "7次",
      }
    } else {
      obj2 = {
        title: '<img src="./static/imgs/finish_02.png" width="90%">',
        description: "7次",
      }
      initNum++
    }
    if ($thirteen === 1) {
      obj3 = {
        title: '<img src="./static/imgs/open_03.png" width="70%" class="pulse">',
        description: "13次",
      }
      initNum++
    } else if ($thirteen === 0) {
      obj3 = {
        title: '<img src="./static/imgs/no_03.png" width="90%">',
        description: "13次",
      }
    } else {
      obj3 = {
        title: '<img src="./static/imgs/finish_03.png" width="90%">',
        description: "13次",
      }
      initNum++
    }
    if ($twenty === 1) {
      obj4 = {
        title: '<img src="./static/imgs/open_04.png" width="70%" class="pulse">',
        description: "20次",
      }
      initNum++
    } else if ($twenty === 0) {
      obj4 = {
        title: '<img src="./static/imgs/no_04.png" width="90%">',
        description: "20次",
      }
    } else {
      obj4 = {
        title: '<img src="./static/imgs/finish_04.png" width="90%">',
        description: "20次",
      }
      initNum++
    }
    if ($forty === 1) {
      obj5 = {
        title: '<img src="./static/imgs/open_05.png" width="70%" class="pulse">',
        description: "40次",
      }
      initNum++
    } else if ($forty === 0) {
      obj5 = {
        title: '<img src="./static/imgs/no_05.png" width="90%">',
        description: "40次",
      }
    } else {
      obj5 = {
        title: '<img src="./static/imgs/finish_05.png" width="90%">',
        description: "40次",
      }
      initNum++
    }
    stepList.push(obj1)
    stepList.push(obj2)
    stepList.push(obj3)
    stepList.push(obj4)
    stepList.push(obj5)
    setSteps(stepList, initNum)
  })

}
/* 获取中奖纪录接口 */
function getRecord() {
  getPrizeRecordList({
    userId: $userId
  }).then(res => {
    var list = res
    $('#record .box-rule').removeClass('norecord')
    if (list.length) {
      $strs = ""
      $.each(list, function (index, item) {
        item.imgs = 'item' + item.prizeCode + ''
        $strs +=
          '<div class="item"><div><img src="./static/imgs/' + item.imgs + '.png" width="30%"> <span>' + item.date + '</span></div> <div>×<span>' + item.prizeNum + '</span></div></div>'
      })
      $('#record .con').html($strs)
    } else {
      $('#record .box-rule').addClass('norecord')
      $('#record .con').html('暂无记录~')
    }
  })

}

function clickFn() {
  var change = setInterval(function () {
    lottery.id++;
    if (lottery.id > 8) {
      lottery.id = 1;
      lottery.circle++;
    }
    $item.removeClass("select");
    $('#c' + lottery.id).addClass('select')
    if (lottery.circle >= 3) {
      if (lottery.id == lottery.prize) {
        clearInterval(change)
        clearInterval(timer)
        setTimeout(() => {
          win(lottery.prize, lottery.count, $awardSpNum);
          lottery.bool = true;
        }, 500);
      }
    }
  }, 80)
}

//默认动画效果
function init() {
  timer = setInterval(function () {
    lottery.id++;
    if (lottery.id > 8) lottery.id = 1
    $item.removeClass("select");
    $('#c' + lottery.id).addClass('select')
  }, 1000);
}
// 能量瓶兑换抽奖次数
function getchargeEnergy() {
  chargeEnergy({
    userId: $userId,
  }).then(res => {
    if (res.result == "success") {
      /* 获取用户能量瓶 和抽奖次数 宝箱状态*/
      getLotteryInfo()
      $('.dialog-wrap').hide()
    }
  }).catch(err => {
    message('今日兑换已达到上限', 1500)
    $('.dialog-wrap').hide()
  })
}
// 看视频领能量瓶
function getWatchAdEbergy() {
  watchAdEnergy({
    userId: $userId,
  }).then(res => {
    /* 获取用户能量瓶 和抽奖次数 宝箱状态*/
    getLotteryInfo()
    $('.noChance').hide()
    $('.power-dialog').show()
  })

}
// 看视频领取双倍奖励
function getDouble() {
  watchAd({
    userId: $userId,
    id: $prizeId
  }).then(res => {
    /* 获取用户能量瓶 和抽奖次数 宝箱状态*/
    anime({
      targets: ['.ani-img'],
      delay: 1200,
      duration: 400,
      translateY: -150,
      scale: [
        1, 0
      ],
      easing: 'linear'
    });
    setTimeout(() => {
      $('.ani-con').hide()
    }, 1200);
    setTimeout(() => {
      $('.round2').text(2)
      $('.sp-num').text(res.prizeNum)
      $('.ani-dialog-wrap').hide()
    }, 1650);
    //$('.sp-num').text()
    getSpInfo()
  })

}
// 激活
function active() {
  $.get('https://adv.api.venomlipstick.cn/debris/user/activeAdTicket', {
    userId: $userId,
    bxmId: $activeId,
    assetsId: $assetsId,
    preid: $preid,
    awardtype: $awardtype
  }, function (data) {

  })
}

function leftTimer(timestamp) {
  timer1 = setInterval(function () {
    transTime(timestamp);
    if (parseInt(timestamp) <= 0) {
      clearInterval(timer1)
      getLotteryInfo()
    }
    timestamp = timestamp - 1;
  }, 1000);
}
//埋点
function bxm_point(name, key, description, uid) {
  $.ajax({
    url: 'https://data.api.bxlm.com.cn/point',
    type: "POST",
    data: JSON.stringify({
      name: name,
      key: key,
      description: description,
      uuid: uid
    }),
    dataType: 'json',
    contentType: 'application/json',
    success: function (res) {

    }
  });
}

md(3, '首页');

function md(type, name) {
  $.ajax({
    url: 'https://adscount.fawulu.com/award/countInf0',
    type: "POST",
    data: {
      appkey: getUrlParam("appkey"),
      uid: getUrlParam("uid"),
      business: getUrlParam("business"),
      ua: 0,
      appos: 1,
      activityid: getUrlParam("activityid"),
      modeltype: type,
      modelname: name,
      random3: '360,640'
    },
    contentType: 'application/x-www-form-urlencoded',
    success: function (res) {}
  });
}