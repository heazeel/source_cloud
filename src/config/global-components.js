/*
 * @Description: 常用组件全局挂载
 * @Author: linjia
 * @Date: 2020-04-28 16:12:03
 * @LastEditors: linjia
 * @LastEditTime: 2020-04-28 16:28:36
 */
import Vue from 'vue';
const requireComponent = require.context(
  // 找到components文件夹下以.vue命名的文件
  '@c', false, /\.vue$/,
);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  // 因为得到的filename格式是: './button-sc.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});
