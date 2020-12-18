/*
 * @Description:
 * @Author: linjia
 * @Date: 2020-03-11 17:31:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-04-10 14:08:06
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
  },
});
