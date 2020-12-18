/*
 * @Description: 硬件版本接口
 * @Author: hezhijie
 * @Date: 2020-09-23 16:32:07
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 09:37:14
 */
import { post, get } from './axios';
// 新建硬件版本
export const create = (params, options) => post('/dev/parts/version/create', params, options);
// 获取列表
export const search = (params, options) => get('/dev/parts/version/search', params, options);
// 删除
export const deleteItem = (params, options) => post('/dev/parts/version/delete', params, options);
// 查询类别远程下拉框
export const remoteTypeSelect = (params, options) => get('/dev/parts/type/name/search', params, options);
// 查询原厂远程下拉框
export const remoteFactorySelect = (params, options) => get('/dev/parts/factory/name/search', params, options);
// 查询型号远程下拉框
export const remoteModelSelect = (params, options) => get('/dev/parts/model/code/search', params, options);
// 查询版本号远程下拉框
export const remoteVersionSelect = (params, options) => get('/dev/parts/version/no/search', params, options);
