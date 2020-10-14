/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    } else if (duration instanceof String) {
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        } else {
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
        } else {
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {}; //记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0; //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration * 20 / 400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch (mode) {
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}

/**
 * 函数防抖
 */
export const debounce = (fn, delay) => {
    // 记录上一次的延时器
    var timer = null;
    var delay = delay || 200;
    return function () {
        var args = arguments;
        var that = this;
        // 清除上一次延时器
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(that, args)
        }, delay);
    }
}

/**
 * 函数节流
 */
export const throttle = (fn, delay) => {
    var lastTime;
    var timer;
    var delay = delay || 200;
    return function () {
        var args = arguments;
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        if (lastTime && nowTime - lastTime < delay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                // 记录上一次函数触发的时间
                lastTime = nowTime;
                // 修正this指向问题
                fn.apply(this, args);
            }, delay);
        } else {
            lastTime = nowTime;
            fn.apply(this, args);
        }
    }
}

/*
 * 日期格式化
 * 使用方式：
 *  let date = new Date()
 *  dateFormat("YYYY-mm-dd HH:MM:SS", date)
 *  2019-06-06 19:45:11
 *  let date1 = new Date()
 *  dateFormat("YYYY/mm/dd HH:MM:SS", date1)
 *  2019/11/08 16:41:24
 */
export const dateFormat = (fmt, date) => {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

/*
 * 时间戳转化为日期格式
 * 参数一：时间戳
 * 参数二：分隔符 如'/','-'
 * timeStampTurnTime(new Date().getTime()/1000)
 * 2019-11-08 16:52:42
 * timeStampTurnTime(new Date().getTime()/1000,'/')
 * 2019/11/08 16:52:42
 */
export const timeStampTurnTime = (timeStamp, fmt = '-') => {
    if (timeStamp > 0) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + fmt + m + fmt + d + ' ' + h + ':' + minute + ':' + second;
    }
}


export function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
    // 其他更多是格式化有如下:
    // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
    timestamp = parseInt(timestamp);
    // 如果为null,则格式化当前时间
    if (timestamp == null) timestamp = Number(new Date());
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000;
    let date = new Date(timestamp);
    let ret;
    let opt = {
        "y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "h+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "s+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
export function timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
    if (timestamp == null) timestamp = Number(new Date());
    timestamp = parseInt(timestamp);
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000;
    var timer = (new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1000);
    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = '';

    switch (true) {
        case timer < 300:
            tips = '刚刚';
            break;
        case timer >= 300 && timer < 3600:
            tips = parseInt(timer / 60) + '分钟前';
            break;
        case timer >= 3600 && timer < 86400:
            tips = parseInt(timer / 3600) + '小时前';
            break;
        case timer >= 86400 && timer < 2592000:
            tips = parseInt(timer / 86400) + '天前';
            break;
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = parseInt(timer / (86400 * 30)) + '个月前';
                } else {
                    tips = parseInt(timer / (86400 * 365)) + '年前';
                }
            } else {
                tips = timeFormat(timestamp, format);
            }
    }
    return tips;
}

/**
* 格式化时间 下午 08:12 | 昨日 09:12 | 2019-12-03 20:12
* @param {Date} time 输入Unix时间戳
* @return {Object} 格式化结果
*/
export function fnFormatTimeHeader(time) {
    // 格式化传入时间
    let date = new Date(parseInt(time)),
        year = date.getUTCFullYear(),
        month = date.getUTCMonth(),
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getUTCMinutes()
    // 获取当前时间
    let currentDate = new Date(),
        currentYear = date.getUTCFullYear(),
        currentMonth = date.getUTCMonth(),
        currentDay = currentDate.getDate()
    // 计算是否是同一天
    if (currentYear == year && currentMonth == month && currentDay == day) { //同一天直接返回
        if (hour > 12) {
            return `下午 ${hour}:${minute < 10 ? '0' + minute : minute}`
        } else {
            if (hour >= 10) {
                return `上午 ${hour}:${minute < 10 ? '0' + minute : minute}`
            } else {
                return `上午 0${hour}:${minute < 10 ? '0' + minute : minute}`
            }

        }
    }
    // 计算是否是昨天
    let yesterday = new Date(currentDate - 24 * 3600 * 1000)
    // console.log('123', day , yesterday.getDate())
    // console.log(month , yesterday.getUTCMonth())
    if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth() && day == yesterday.getDate()) { //昨天
        return `昨天 ${hour >= 10 ? hour : '0' + hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
        return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
    }
}

/**
 * @description: URL地址转成对象格式  https://www.baidu.com?name=郝晨光&age=24&sex=男  =>   {name: "郝晨光", age: "24", sex: "男"}
 * @param {string}  https://www.baidu.com?name=郝晨光&age=24&sex=男
 * @return {object}  {name: "郝晨光", age: "24", sex: "男"}
 */
export function getURLParams(url) {
    let paramsStr = url.split('?')[1];
    let paramsArr = paramsStr.split('&');
    let result = {};
    for(let i = 0; i < paramsArr.length; i++) {
        let params = paramsArr[i].split('=');
        result[params[0]] = params[1];
    }
    return result;
}

/**
 * @description: 简单的冒泡排序
 * @param {Array} [1,33,55,7,8,9,100]
 * @return {Array} [1,7,8,9,33,55,100]
 */
export function sort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

/**
 * @description: 输出字符串中出现次数最多的字符及其出现次数
 * @param {string} str = 'asdfghjasdfghjassdasasdasdaa'
 * @return {object} { word: "a", count: 8 }
 */
export function getMaxWord(str) {
    // 1. 先定义一个临时对象
    let obj = {};
    // 2. 定义返回结果
    let result = {
        word: '',
        count: 0
    };
    // 3. 判断对象中是否有这个key 有的话就+1，反之没有赋值为1
    for(let i = 0; i < str.length; i++) {
        if(obj[str[i]]) {
            obj[str[i]]++;
        }else {
            obj[str[i]] = 1;
        }
    }
    // 4. 遍历 临时对象
    for(let i in obj) {
        if(result.count < obj[i]) {
            result.word = i;
            result.count = obj[i];
        }
    }
    return result;
}

/**
 * @description: 判断是否是回文  =>  ABCDEFGFEDCBA
 * @param {String} 
 * @return {String} 
 */
export function palindrome(str) {
    return str === str.split('').reverse().join('');
}

/**
 * @description: 找出数组最大的差值，最大值减最小值的差
 * @param {array} [1,2,3,4,5,6,7,8,9]
 * @return {number}  8
 */
export function maxDifference(arr) {
    let min = Math.min.apply(null, arr);
    let max = Math.max.apply(null, arr);
    return max - min;
}