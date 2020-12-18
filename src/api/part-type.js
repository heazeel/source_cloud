/*
 * @Description: 零部件类别
 * @Author: linjia
 * @Date: 2020-09-11 10:13:33
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 10:45:19
 */
import {get, post} from './axios'; // 导入http中创建的axios实例

/* --- 主体 ---- */
// 类别搜索
export const search = (params, options) => get('/dev/parts/type/search', params, options);

// 类别新建
export const create = (params, options) => post('/dev/parts/type/create', params, options);

// 类别记录删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/parts/type/delete', params, options);

// 型号中查询类别字段
export const typeInModel = (params, options) => get('/dev/parts/model/search', params, options);
