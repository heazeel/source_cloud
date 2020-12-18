/*
 * @Description: 路由
 * @Author: linjia
 * @Date: 2020-03-11 17:31:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-10 10:45:16
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import { getCookie, setCookie } from '@/utils/cookies.js';

// 解决Navigating to current location (XXX) is not allowed"的问题
// 在控制台中看到的错误是新的promise api的一部分：
// 在以前，如果没有向router.push提供回调，则错误仅发送到全局路由器错误处理程序，所以在控制台看不到报错；
// 但现在，由于push和replace都返回了一个promise，
// 因此，如果未捕获到导航失败（取消导航的任何事情（如next（false）或next（'/ other'）也算在内）），
// 因为没有兑现承诺，将在控制台中看到错误
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(VueRouter);

const defaultRouter = [
  {
    path: '/login',
    name: 'login',
    menu_show: false,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '@v/login/login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    menu_show: false,
    children: [{
      path: '404',
      name: '404', // 总入口
      component: () => import(/* webpackChunkName: "404" */ '@v/404.vue'),
    }],
  },
];

// 创建路由
const createRouter = () => new VueRouter({
  routes: defaultRouter,
});

// 默认路由
export const router = createRouter();

// 重置路由
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // the relevant part
}


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  try {
    // 是否有token，没有重新登录
    let t = getCookie('token');
    // localStorage.getItem('token');
    if (to.name === 'login') {
      localStorage.clear();
      setCookie('token', null, 0);
      next();
    } else if (t) { // 如果有token
      next();
    } else { // 没有token跳转到登录页
      localStorage.clear();
      setCookie('token', null, 0);
      next({name: 'login'});
    }
  } catch (e) {
    localStorage.clear();
    next({name: 'login'});
  }
});
