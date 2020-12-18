/*
 * @Description: 电池相关api
 * @Author: linjia
 * @Date: 2020-07-14 09:40:27
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 15:29:53
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

/* === 主体 ==== */
// 电池搜索
export const search = (params, options) => get('/dev/battery/search', params, options);

// 电池详情搜索
export const detailSearch = (params, options) => get('/dev/battery/detail/search', params, options);

// 电池新增
export const create = (params, options) => post('/dev/battery/create', params, options);

// 电池导入新增
export const createImport = (params, options) => post('/dev/battery/import/create', params, {formData: true, ...options});

// 电池修改
export const update = (params, options) => post('/dev/battery/update', params, options);

// 配置电池型号序列号
export const configUpdate = (params, options) => post('/dev/battery/config/update', params, options);

/* === 型号 === */
// 电池型号搜索
export const modelSearch = (params, options) => get('/dev/battery/model/search', params, options);

// 电池型号详情搜索
export const modelDetailSearch = (params, options) => get('/dev/battery/model/detail/search', params, options);

// 电池型号新增
export const modelCreate = (params, options) => post('/dev/battery/model/create', params, options);

// 电池型号修改
export const modelUpdate = (params, options) => post('/dev/battery/model/update', params, options);

// 电池型号删除
export const modelDelete = (params, options) => post('/dev/battery/model/delete', params, options);


// 电池型号远程下拉框搜索
export const remoteSelectSearch = (params, options) => get('/dev/battery/model/code/search', params, options);

