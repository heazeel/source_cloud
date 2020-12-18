/*
 * @Description: 角色
 * @Author: linjia
 * @Date: 2020-05-22 14:41:57
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-17 13:45:51
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

// 角色搜索
export const search = (params, options) => get('/role/search', params, options);

// 角色明细
export const detailSearch = (params, options) => get('/role/detail/search', params, options);

// 角色新增
export const create = (params, options) => post('/role/create', params, options);

// 角色修改
export const update = (params, options) => post('/role/update', params, options);

// 角色删除
export const deleteItem = (params, options) => post('/role/delete', params, options);

// 下拉框
export const remoteSelectSearch = (params, options) => get('/role/name/search', params, options);
