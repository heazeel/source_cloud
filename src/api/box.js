/*
 * @Description: 货箱
 * @Author: linjia
 * @Date: 2020-09-11 10:13:33
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-11 15:42:44
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

/* --- 主体 ---- */
// 货箱搜索
export const search = (params, options) => get('/dev/box/search', params, options);

// 货箱详情搜索
export const detailSearch = (params, options) => get('/dev/box/detail/search', params, options);

// 货箱新增
export const create = (params, options) => post('/dev/box/create', params, options);

// 货箱新增
export const createImport = (params, options) => post('/dev/box/import/create', params, {...options, formData: true});

// 货箱修改
export const update = (params, options) => post('/dev/box/update', params, options);

// 货箱删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/box/delete', params, options);
