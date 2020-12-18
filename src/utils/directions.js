/*
 * @Description: 指令
 * @Author: linjia
 * @Date: 2020-04-10 17:18:25
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-08 18:02:56
 */
import Vue from 'vue';
import store from '@/store';
import '@c/list-delete-item.js'; // 删除

/**
 * @description: 权限校验，没有权限的就移除
 */
export const has = Vue.directive('has', {
  inserted: function (el, binding, vnode) {
    let permissionRoute = store.state.app.permissionRouteFlatArr.find(route => route.name == binding.value);
    if (!permissionRoute) {
      el.parentNode.removeChild(el);
    }
  },
});

/**
 * @description: 禁用数字输入框滚轮事件
 */
export const inputNumberPreventWheel = Vue.directive('input-number-prevent-wheel', {
  inserted: function (el, binding, vnode) {
    const ele = el.tagName === 'INPUT' ? el : el.querySelector( 'input' );
    ele.addEventListener('mousewheel', () => {
      ele.blur(); // 滚了就失去焦点
    });
  },
});
