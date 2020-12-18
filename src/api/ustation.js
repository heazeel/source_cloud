/*
 * @Description: 无人站相关接口api
 * @Author: linjia
 * @Date: 2020-09-01 16:01:46
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-11 11:33:22
 */
import { baseUrl } from '@/config/env'; // 引入baseUrl
import { post, get } from './axios'; // 导入http中创建的axios实例

/* --- 主体 ---- */
// 无人站搜索
export const search = (params, options) => get('/dev/ustation/search', params, options);

// 无人站详情搜索
export const detailSearch = (params, options) => get('/dev/ustation/detail/search', params, options);

// 无人站新增
export const create = (params, options) => post('/dev/ustation/create', params, options);

// 无人站修改
export const update = (params, options) => post('/dev/ustation/update', params, options);

// 无人站删除 (delete关键字)
export const deleteItem = (params, options) => post('/dev/ustation/delete', params, options);

/* -- 其他 -- */
// 无人站配置文件查询
export const configSearch = (params, options) => get('/dev/ustation/config/search', params, options);

// 无人站配置文件更新
export const configUpdate = (params, options) => get('/dev/ustation/config/update', params, options);

// 无人站标定文件下载链接
export const cameraFileDownload = `${baseUrl}/dev/ustation/camera_file/download`;
