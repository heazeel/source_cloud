/*
 * @Description: 删除单个
 * @Author: linjia
 * @Date: 2020-07-17 16:58:05
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-18 13:54:12
 */
import Vue from 'vue';
import { errorCode } from '@/utils/consts.js';

Vue.prototype.$listDeleteItem = ({
  vm,
  row,
  api,
  message,
  successMessage,
  errorCallback,
  successCallback,
  cancelCallback,
  params, // 因为有些接口不是通过id删除的，所以这里需要传入参数
  needAlertWarning = false, // 有错误的时候是否弹出需要用户确认的弹窗提示
}) => {
  let errorText = '';
  vm.$confirm(message, '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: async function (action, instance, done) {
      if (action === 'confirm' && api) {
        if (!params) {
          params = {
            id: row.id,
          };
        }
        let res = await api(params, { loading: true });
        if (res.code != 200) {
          // 如果有其他的错误处理函数就在这里调用
          if (errorCallback) {
            errorCallback();
          }
          if (res.code == 210) {
            errorText = errorCode.get(res.msg).text;
          }
          done();
          cancelCallback && cancelCallback();
          return;
        }
        vm.$message({
          type: 'success',
          message: successMessage && successMessage || '删除成功!',
          containerType: 'message-box',
          onClose: () => {
            successCallback && successCallback(); // 删除成功的信息抛出去，外层知道可以做操作
            done();
          },
        });
      } else {
        done();
        cancelCallback && cancelCallback();
      }
    },
    callback: function (action, instance) {
      if (errorText && needAlertWarning) { // 这里不是所有删除都是需要弹出框的, 需要再加一层判断
        vm.$alert(errorText, '删除提示');
      }
    },
  }).catch(e => { cancelCallback && cancelCallback(); });
};
