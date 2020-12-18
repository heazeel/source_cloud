/*
 * @Description: 交付相关
 * @Author: linjia
 * @Date: 2020-07-21 16:10:12
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-17 13:51:25
 */
import { post, get } from './axios'; // 导入http中创建的axios实例

// 查询交付企业列表
export const search = (params, options) => get('/dev/delivery/company/search', params, options);

// 修改交付信息
export const update = (params, options) => post('/dev/delivery/update', params, options);

// 下拉框
export const remoteSelectSearch = (params, options) => get('/dev/delivery/company/name/search', params, options);
