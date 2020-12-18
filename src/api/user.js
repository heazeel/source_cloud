/*
 * @Description: 用户相关
 * @Author: linjia
 * @Date: 2020-04-16 13:37:10
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-01 16:30:23
 */

import { post, get } from './axios'; // 导入http中创建的axios实例

// 查询用户名是否存在
export const existedSearch = (params, options) => get('/user/existed/search', params, options);

// 发送手机验证码
export const phoneCodeSend = (params, options) => get('/user/phone_code/send', params, { noTokenApi: true, ...options });

// 查询用户信息明细
export const detailSearch = (params, options) => get('/user/detail/search', params, options);

// 查询用户
export const search = (params, options) => get('/user/search', params, options);

// 创建用户
export const create = (params, options) => post('/user/create', params, options);

// 修改用户
export const update = (params, options) => post('/user/update', params, options);

// 修改密码
export const passwordUpdate = (params, options) => post('/user/pwd/update', params, options);

// 禁用/启用用户
export const statusUpdate = (params, options) => post('/user/status/update', params, options);

// 重置用户密码
export const passwordReset = (params, options) => post('/user/pwd/reset', params, options);

// 用户权限查询
export const permissionSearch = () => get('/user/permission');
