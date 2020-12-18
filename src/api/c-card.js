/*
 * @Description: 通信卡相关api
 * @Author: linjia
 * @Date: 2020-09-22 11:34:25
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 11:14:14
 */

import { post, get } from './axios'; // 导入http中创建的axios实例
/* === 主体 ==== */
// 通信卡搜索
export const search = (params, options) => get('/dev/c_card/search', params, options);

// 通信卡详情搜索
export const detailSearch = (params, options) => get('/dev/c_card/detail/search', params, options);

// 通信卡新增
export const create = (params, options) => post('/dev/c_card/create', params, options);

// 通信卡导入新增
export const createImport = (params, options) => post('/dev/c_card/import/create', params, {formData: true, ...options});

// 通信卡修改
export const update = (params, options) => post('/dev/c_card/update', params, options);

// 通信卡删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/c_card/delete', params, options);

// 查询套餐总量
export const totalSearch = (params, options) => get('/dev/c_card/total/search', params, options);

// 无人机编号远程下拉框
export const remoteSelectSearch = (params, options) => get('/dev/no/search', params, options);
