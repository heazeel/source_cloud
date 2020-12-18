/*
 * @Description: 公共接口
 * @Author: linjia
 * @Date: 2020-05-26 16:55:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-11 15:38:26
 */
import { get, post } from './axios'; // 导入http中创建的axios实例

// 校验字段是否重复
export const repeatSearch = (params, options) => get('/common/repeat/search', params, options);

// 图片上传
export const imageUpload = (params, options) => post('/common/image/upload', params, {...options, formData: true});
