/*
 * @Description: 零部件原厂信息管理接口
 * @Author: linjia
 * @Date: 2020-09-11 10:13:33
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 11:20:54
 */
import {get, post} from './axios'; // 导入http中创建的axios实例

/* --- 主体 ---- */
// 原厂信息搜索
export const search = (params, options) => get('/dev/parts/factory/search', params, options);

// 原厂信息新建
export const create = (params, options) => post('/dev/parts/factory/create', params, options);

// 原厂信息删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/parts/factory/delete', params, options);

// 原厂中查询类别字段
export const factoryInModel = (params, options) => get('/dev/parts/model/search', params, options);
