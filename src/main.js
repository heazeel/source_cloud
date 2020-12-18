/*
 * @Description: 入口配置
 * @Author: linjia
 * @Date: 2020-03-11 17:31:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-07 16:30:22
 */
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import './config/elementui'; // elementui 配置过的
import * as axios from './api/axios.js';
import _ from 'lodash'; // 导入lodash
import './utils/filters'; // 自定义过滤器
import './utils/directions'; // 自定义指令
import './config/global-components.js';
import { getCookie } from './utils/cookies.js';
import './styles/theme/theme/index.css'; // elementui主题样式
import './styles/common.less';
import * as tools from './utils/tools.js';


Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$lodash = _;
Vue.prototype.$tools = tools;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  async created () {
    if (getCookie('token')) { // 如果已经登录了，就去拿菜单列表
      await store.dispatch('app/getPermissionMenu', true);
    }
  },
  render: h => h(App),
});
