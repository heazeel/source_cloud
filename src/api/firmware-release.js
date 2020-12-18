/*
 * @Description: 无人机相关接口api
 * @Author: linjia
 * @Date: 2020-07-13 15:54:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-07 11:00:24
 */

import { post, get } from './axios'; // 导入http中创建的axios实例

/* -- 主体 -- */
// 固件信息搜索
export const search = (params, options) => get('/dev/firmware/search', params, options);

// 固件新增
export const create = (params, options) => post('/dev/firmware/create', params, options);

// 固件删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/firmware/delete', params, options);

// 历史输入查询
export const historySearch = (params, options) => get('/dev/firmware/history/search', params, options);
