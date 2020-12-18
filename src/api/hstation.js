/*
 * @Description: 人工站相关接口api
 * @Author: linjia
 * @Date: 2020-09-01 16:01:46
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-11 09:41:29
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

/* --- 主体 ---- */
// 人工站搜索
export const search = (params, options) => get('/dev/hstation/search', params, options);

// 人工站详情搜索
export const detailSearch = (params, options) => get('/dev/hstation/detail/search', params, options);

// 人工站新增
export const create = (params, options) => post('/dev/hstation/create', params, options);

// 人工站修改
export const update = (params, options) => post('/dev/hstation/update', params, options);

// 人工站删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/hstation/delete', params, options);
