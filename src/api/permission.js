/*
 * @Description: 权限相关
 * @Author: linjia
 * @Date: 2020-04-09 14:30:36
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-09 18:24:54
 */
import { get } from './axios';

// 获取所有权限列表
export const search = (params, options) => get('/permission/search', params, options);
