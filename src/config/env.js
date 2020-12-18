/*
 * @Description: 环境
 * @Author: linjia
 * @Date: 2020-03-24 16:52:54
 * @LastEditors: linjia
 * @LastEditTime: 2020-08-28 15:11:46
 */

// 根据不同的环境更改不同的baseUrl

// 环境接口 开发时用的
let baseUrl = 'http://source.antworkcloud.com/api/';
// let baseUrl = 'http://antlink-alpha.xyitech.com/';
// let baseUrl = 'http://antlink-sandbox.xyitech.com/';
// let baseUrl = 'http://antlink.xyitech.com/';

// 打包环境接口 打包时用的
if (process.env.NODE_ENV == 'production') {
  baseUrl = process.env.VUE_APP_BASEURL;
}
export {
  baseUrl, // 导出baseUrl
};
