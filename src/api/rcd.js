/*
 * @Description: 导控器
 * @Author: linjia
 * @Date: 2020-09-11 09:40:53
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-11 10:16:22
 */

import { post, get } from './axios'; // 导入http中创建的axios实例

/* --- 主体 ---- */
// 导控器搜索
export const search = (params, options) => get('/dev/rcd/search', params, options);

// 导控器详情搜索
export const detailSearch = (params, options) => get('/dev/rcd/detail/search', params, options);

// 导控器新增
export const create = (params, options) => post('/dev/rcd/create', params, options);

// 导控器修改
export const update = (params, options) => post('/dev/rcd/update', params, options);

// 导控器删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/rcd/delete', params, options);
