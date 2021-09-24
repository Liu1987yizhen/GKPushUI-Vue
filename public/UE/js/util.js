/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 *   let dateStr = null;
 dateStr = new Date(79, 5, 24, 11, 33, 0).format("MM月dd日");
 dateStr = new Date().format("yyyy-MM-dd hh:mm:ss");
 dateStr = new Date().format("yyyy年MM月dd日");
 dateStr = new Date().format("yyyy-MM-dd hh:mm:ss");
 dateStr = new Date().format("yyyy年MM月dd日hh小时mm分ss秒");
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                   //月份
        "d+": this.getDate(),                        //日
        "h+": this.getHours(),                       //小时
        "m+": this.getMinutes(),                     //分
        "s+": this.getSeconds(),                     //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()                  //毫秒
    };

    if (/(y+)/i.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")", "i").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 获取浏览器窗口的尺寸
 * @returns {{w: number, h: number}}
 */
function getWidnowWH() {
    /**
     * 有三种方法能够确定浏览器窗口的尺寸。
     对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
     window.innerHeight - 浏览器窗口的内部高度(包括滚动条)
     window.innerWidth - 浏览器窗口的内部宽度(包括滚动条)

     对于 Internet Explorer 8、7、6、5：
     document.documentElement.clientHeight
     document.documentElement.clientWidth
     或者
     document.body.clientHeight
     document.body.clientWidth
     */
    let w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    let h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    return {
        w: w,
        h: h
    }
}

/**
 *
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/**
 *
 * @param cname
 * @returns {string}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}
