/*
 * @Description: 告警管理
 * @Author: hezhijie
 * @Date: 2020-11-03 00:16:39
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-10 17:58:02
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

/* -- 主体 -- */
// 告警信息搜索
export const search = (params, options) => get('/dev/alarm/search', params, options);

// 详情搜索
export const detailSearch = (params, options) => get('/dev/alarm/detail/search', params, options);

// 新增
export const create = (params, options) => post('/dev/alarm/create', params, options);

// 修改
export const update = (params, options) => post('/dev/alarm/update', params, options);

// 状态修改
export const statusUpdate = (params, options) => post('/dev/alarm/update', params, options);
