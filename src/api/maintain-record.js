/*
 * @Description: 维护信息
 * @Author: linjia
 * @Date: 2020-04-09 14:30:36
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-09 16:44:50
 */
import { post, get } from './axios';

// 获取列表
export const search = (params, options) => get('/dev/maintain_record/search', params, options);

// 新增维护信息
export const create = (params, options) => post('/dev/maintain_record/create', params, options);
