/*
 * @Description: 无人机相关接口api
 * @Author: linjia
 * @Date: 2020-07-13 15:54:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-17 13:50:31
 */

import { post, get } from './axios'; // 导入http中创建的axios实例

/* -- 主体 -- */
// 无人机搜索
export const search = (params, options) => get('/dev/drone/search', params, options);

// 无人机详情搜索
export const detailSearch = (params, options) => get('/dev/drone/detail/search', params, options);

// 无人机新增
export const create = (params, options) => post('/dev/drone/create', params, options);

// 无人机修改
export const update = (params, options) => post('/dev/drone/update', params, options);

// 无人机删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/drone/delete', params, options);

/* -- 其他 -- */
// 无人机配置查询
export const configSearch = (params, options) => get('/dev/drone/config/search', params, options);

// 无人机配置修改
export const configUpdate = (params, options) => post('/dev/drone/config/update', params, options);

// 无人机告警查询
export const alarmSearch = (params, options) => post('/dev/drone/alarm/search', params, options);

// 无人机告警修改
export const alarmUpdate = (params, options) => post('/dev/drone/alarm/update', params, options);


/* -- 型号 -- */
// 无人机型号搜索
export const modelSearch = (params, options) => get('/dev/drone/model/search', params, options);

// 无人机型号详情搜索
export const modelDetailSearch = (params, options) => get('/dev/drone/model/detail/search', params, options);

// 无人机型号新增
export const modelCreate = (params, options) => post('/dev/drone/model/create', params, options);

// 无人机型号修改
export const modelUpdate = (params, options) => post('/dev/drone/model/update', params, options);

// 无人机型号删除
export const modelDelete = (params, options) => post('/dev/drone/model/delete', params, options);

// 无人机型号下拉框
export const modelRemoteSelectSearch = (params, options) => get('/dev/drone/model/code/search', params, options);

