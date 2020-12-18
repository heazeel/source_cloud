/*
 * @Description: 路由配置
 * @Author: linjia
 * @Date: 2020-04-09 17:57:10
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-02 09:25:42
 */

/**
 * @description: 懒加载
 * @param {String} path 组件路径 (因为import时不可以所有都是变量，必须头尾是字符串才可以，所以我们只截取其中的一部分)
 * @return: 组件
 */
const lazyLoad = (path) => () => import(/* webpackChunkName: "[request]" */ `@v/${path}.vue`);

/**
 * @description: 获取路由
 * @param {Array} routes 路由数组
 * @return: 路由数组
 */
export function getRoute (routes = []) {
  routes = routes.map(routeItem => {
    if (routeItem.component && routeItem.component !== '') { // 没有component后端也会传，但是如果有这个字段并且是字符串就会报错，所以如果没有值就需要将component移除
      routeItem.component = lazyLoad(routeItem.component);
    } else {
      delete routeItem.component;
    }
    if (routeItem.children && routeItem.children.length > 0) {
      routeItem.children = getRoute(routeItem.children);
      return routeItem;
    } else {
      return routeItem;
    }
  });
  return routes;
}

/**
 * @description: 获得n级菜单数据
 * @param {Array} routes 菜单路由数组
 * @param {Number} level 想要几级菜单 默认2级
 * @return: n级菜单数据 Array
 */
export function getMenu (routes = [], level = 2) {
  // 只要两级
  routes = routes.map(routeItem => {
    if (routeItem.level < level) {
      if (routeItem.children && routeItem.children.length > 0) {
        routeItem.children = getMenu(routeItem.children);
        return routeItem;
      } else {
        return routeItem;
      }
    } else if (routeItem.level >= level) {
      if (routeItem.children && routeItem.children.length > 0) {
        if (routeItem.children[0].permission_type == 'page') {
          routeItem.redirectName = routeItem.children[0].name;
        }
        if (routeItem.children[0].query) {
          routeItem.redirecQuery = routeItem.children[0].query;
        }
      }
      delete routeItem.children;
      return routeItem;
    }
  });
  return routes;
}
