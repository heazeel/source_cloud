/*
 * @Description: 登录
 * @Author: linjia
 * @Date: 2020-03-26 14:51:41
 * @LastEditors: linjia
 * @LastEditTime: 2020-04-17 09:31:28
 */

import { post, get } from './axios'; // 导入http中创建的axios实例

// 登录
export const loginIn = (params, options) => post('/user/login', {...params, login_from: 'web'}, {loading: true, noTokenApi: true, ...options});

// 登出
export const loginOut = () => get('/user/logout', {login_from: 'web'});
