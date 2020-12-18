/*
 * @Description: 型号接口
 * @Author: hezhijie
 * @Date: 2020-09-23 16:32:07
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 11:46:23
 */
import { post, get } from './axios';
// 新建型号
export const create = (params, options) => post('/dev/parts/model/create', params, options);

// 获取列表
export const search = (params, options) => get('/dev/parts/model/search', params, options);

// 删除
export const deleteItem = (params, options) => post('/dev/parts/model/delete', params, options);

// 修改
export const update = (params, options) => post('/dev/parts/model/update', params, options);

// 查询类别远程下拉框
export const remoteTypeSelect = (params, options) => get('/dev/parts/type/name/search', params, options);

// 查询原厂远程下拉框
export const remoteFactorySelect = (params, options) => get('/dev/parts/factory/name/search', params, options);

// 硬件版本中查询型号信息
export const modelInHardVersion = (params, options) => get('/dev/parts/version/search', params, options);
