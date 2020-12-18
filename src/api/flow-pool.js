/*
 * @Description: 流量池
 * @Author: linjia
 * @Date: 2020-09-22 11:10:06
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-22 11:10:52
 */

import { get } from './axios'; // 导入http中创建的axios实例

// 下拉框
export const remoteSelectSearch = (params, options) => get('dev/flow_pool/name/search', params, options);
