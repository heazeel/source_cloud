/*
 * @Description: 数据记录
 * @Author: linjia
 * @Date: 2020-04-10 11:19:08
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-01 16:29:57
 */
import { APP_SET_DISPLAYED_MENU, APP_SET_PERMISSION_ROUTER, APP_PERMISSION_ROUTE_FLAT_ARR } from '../mutation-types.js';
import { PROMISSE_ROUTER, getRoute, getMenu } from '@/router/router.js';
import { router, resetRouter } from '@/router/index.js';
import { cloneDeep } from 'lodash/fp';
import { permissionSearch } from '@/api/user.js';

const app = {
  namespaced: true,
  state: {
    permissionRouter: [], // 得到的个人权限访问路由
    permissionRouteFlatArr: [], // 权限访问路由扁平数组
    displayedMenu: [], // 用来展示在侧边栏的菜单
  },
  getters: {},
  mutations: {
    [APP_SET_PERMISSION_ROUTER] (state, permissionRouter) {
      state.permissionRouter = permissionRouter;
    },
    [APP_SET_DISPLAYED_MENU] (state, displayedMenu) {
      state.displayedMenu = displayedMenu;
    },
    [APP_PERMISSION_ROUTE_FLAT_ARR] (state, permissionRouteFlatArr) {
      let routeArr = [];
      function getFlatRouteArr (routes) {
        routes.forEach(routeItem => {
          let route = routeItem;
          if (routeItem.children && routeItem.children.length > 0) {
            getFlatRouteArr(routeItem.children);
          }
          delete route.children;
          routeArr.push(route);
        });
      }
      getFlatRouteArr(permissionRouteFlatArr);
      state.permissionRouteFlatArr = routeArr;
    },
  },
  actions: {
    async getPermissionMenu ({ state, commit }) {
      let res = await permissionSearch();
      console.log('getUserPermission', res);
      if (res.code == 200) {
        let _permissionRouter = res.content;
        // _permissionRouter = PROMISSE_ROUTER; // 调试用
        commit('APP_SET_PERMISSION_ROUTER', cloneDeep(_permissionRouter));
        commit('APP_SET_DISPLAYED_MENU', getMenu(cloneDeep(_permissionRouter)));
        commit('APP_PERMISSION_ROUTE_FLAT_ARR', cloneDeep(_permissionRouter));

        let _router = getRoute(cloneDeep(_permissionRouter));
        _router.push({path: '*', redirect: '/404', menu_show: false}); // 不然刷新会导致直接到404页面
        resetRouter(); // 重置路由
        router.options.routes.concat(_router);
        router.addRoutes(_router);
      }
    },
  },
};
export default app;
