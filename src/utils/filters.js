/*
 * @Description: 过滤器
 * @Author: linjia
 * @Date: 2020-03-30 14:25:43
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-07 23:47:53
 */
import Vue from 'vue';
import moment from 'moment'; // 打包的时候这个要注释掉，之后看看怎么回事 TODO FISRT

// 时间格式转换
Vue.filter('momentFormat', function (time, unit = 's', pattern = 'YYYY-MM-DD HH:mm:ss') {
  let formatTime = '--';
  if (time) {
    if (unit == 's') {
      time = time * 1000;
    }
    formatTime = moment(time).format(pattern);
  }
  return formatTime;
});

// 根据值找到选中的文字
Vue.filter('findSelectedText', function (value, arr, defaultText = '--') {
  const obj = arr.find(ele => ele.key == value);
  return obj && obj.text || defaultText;
});

// m转成km
Vue.filter('mToKm', function (value, toFixedNum = 2) {
  let km = 0;
  if (value) {
    km = Number(value / 1000).toFixed(toFixedNum);
  }
  return km;
});

// KB转换成MB
Vue.filter('kbToMb', function (value, toFixedNum = 2, defaultText = '--') {
  if (value !== null) {
    let mb = Number(value / 1000).toFixed(toFixedNum);
    return mb;
  }
  return defaultText;
});
