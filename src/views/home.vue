<!--
 * @Description: 主页
 * @Author: linjia
 * @Date: 2020-03-11 17:31:39
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 10:15:11
 -->
<template>
  <div class="home">
    <div class="left-menu">
      <div class="logo-part">
        <img src="@/assets/logo_source_cloud.png" alt="logo源云">
        <p>源云</p>
      </div>
      <div class="scroll-div">
        <nav-menu :menu-lists="displayedMenu" :active-menu="activeMenu"></nav-menu>
      </div>
      <div class="user-part">
        <user-info></user-info>
      </div>
    </div>
    <div class="main-container">
      <transition
        name="slide-fade"
        mode="out-in">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    'nav-menu': () => import(/* webpackChunkName: "nav-menu" */ '@c/nav-menu/nav-menu.vue'),
    'user-info': () => import(/* webpackChunkName: "user-info" */ '@v/user-info/index.vue'),
  },
  computed: {
    ...mapState({
      displayedMenu: state => state.app.displayedMenu,
    }),
    activeMenu () {
      let currentRoute = this.$route;
      let parents = currentRoute.matched;
      // console.log(parents);
      let level2Route = parents.find(route => route.path.split('/').length == 3); // 因为格式是 /一级路由/二级路由 所以切割后长度是3才是二级路由
      return level2Route && level2Route.name || '';
    },
  },
};
</script>

<style lang="less" scoped>
@left-menu-width: 146px;
.home {
  position: relative;
  height: 100%;
  width: 100%;
  .left-menu {
    position: relative;
    height: 100%;
    width: @left-menu-width;
    background: #505D75;
    float: left;
    user-select: none;
    .logo-part {
      text-align: center;
      padding-top: 43px;
      img {
        width: 54px;
      }
      p {
        color: white;
        line-height: 28px;
      }
    }
    .scroll-div {
      position: absolute;
      top: 160px;
      width: calc(100% + 10px);
      height: calc(100% - 320px);
      overflow-y: auto;
      display: flex;
      align-items: center;
    }
    .user-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 120px;
      margin: auto;
      padding-top: 16px;
      padding-bottom: 16px;
      border-top: 1px solid #607191;
    }
  }
  // 主体区域
  .main-container {
    box-sizing: border-box;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    overflow-y: auto;
    margin-left: @left-menu-width;
    transition: margin-left 0.28s;
    background-color: #eee;
    padding: 8px 10px;
  }
}
</style>
