/*
 * @Description: 固件相关
 * @Author: linjia
 * @Date: 2020-09-04 14:47:36
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-04 14:52:20
 */

import { post, get } from './axios'; // 导入http中创建的axios实例

// 紧急更新
export const forceUpdate = (params, options) => post('/dev/firmware/force/update', params, options);

// 重启终端设备
export const deviceCmd = (params, options) => post('/dev/firmware/device/cmd', params, options);

// 更新进度查询
export const percentSearch = (params, options) => get('/dev/firmware/percent/search', params, options);
