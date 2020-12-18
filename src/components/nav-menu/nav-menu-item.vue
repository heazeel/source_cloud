<!--
 * @Description: 单个菜单
 * @Author: linjia
 * @Date: 2020-04-10 14:49:23
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-13 17:48:07
 -->
<template>
  <el-submenu v-show="menu.menu_show == 1" :index="menu.name">
    <template slot="title">
      <span>{{ menu.menu_name }}</span>
    </template>
    <el-menu-item v-for="menuRoute in menu.children"
      v-show="menuRoute.menu_show == 1"
      :key="menuRoute.id"
      :index="menuRoute.name"
      @click="routeChange(menuRoute)">
      <span class="slide-span"></span>
      <span class="menu-item">
        {{ menuRoute.menu_name }}
        <i v-show="menuRoute.name == selectedMenu" class="el-icon-video-play"></i>
      </span>
    </el-menu-item>
  </el-submenu>
</template>

<script>
export default {
  name: 'NavMenuItem',
  props: {
    menu: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    selectedMenu: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    routeChange (routeItem) {
      let jumpTo = {name: routeItem.name};
      if (routeItem.redirectName) {
        jumpTo.name = routeItem.redirectName;
      }
      if (routeItem.query) {
        jumpTo.query = routeItem.query;
      }
      this.$router.push(jumpTo);
    },
  },
};
</script>
