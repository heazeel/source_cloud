/*
 * @Description:固件上传
 * @Author: hezhijie
 * @Date: 2020-11-09 09:34:28
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-09 09:47:37
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

export const create = (params, options) => post('/dev/firmware/file/create', params, options);

export const search = (params, options) => get('/dev/firmware/file/search', params, options);

export const deleteItem = (params, options) => post('/dev/firmware/file/delete', params, options);
