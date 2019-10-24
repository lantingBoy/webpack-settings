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