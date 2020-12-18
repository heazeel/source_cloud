/*
 * @Description: 通用相关api
 * @Author: linjia
 * @Date: 2020-09-22 11:34:25
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-03 17:43:20
 */

import { post, get } from './axios'; // 导入http中创建的axios实例
/* === 主体 ==== */
// 搜索
export const search = (params, options) => get('/dev/parts/search', params, options);

// 详情搜索
export const detailSearch = (params, options) => get('/dev/parts/detail/search', params, options);

// 新增
export const create = (params, options) => post('/dev/parts/create', params, options);

// 修改
export const update = (params, options) => post('/dev/parts/update', params, options);

// 删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/parts/delete', params, options);

// 查询类别远程下拉框
export const remoteTypeSelect = (params, options) => get('/dev/parts/type/name/search', params, options);

// 查询原厂远程下拉框
export const remoteFactorySelect = (params, options) => get('/dev/parts/factory/name/search', params, options);

// 查询型号远程下拉框
export const remoteModelSelect = (params, options) => get('/dev/parts/model/code/search', params, options);

// 查询版本号远程下拉框
export const remoteVersionSelect = (params, options) => get('/dev/parts/version/no/search', params, options);

// 无人机编号远程下拉框
export const remoteUAVCodeSelect = (params, options) => get('/dev/no/search', params, options);

// 查询变更记录
export const changeRecordSearch = (params, options) => post('/dev/parts/change_record/search', params, options);

// 新增变更记录
export const changeRecordCreate = (params, options) => post('/dev/parts/change_record/create', params, options);
