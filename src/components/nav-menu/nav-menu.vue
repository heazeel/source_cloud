<!--
 * @Description: 菜单
 * @Author: linjia
 * @Date: 2020-04-10 14:49:10
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-23 15:04:49
 -->
<template>
  <el-menu
    class="nav-menu"
    :default-active="activeMenu"
    @select="selectHandle">
    <nav-menu-item v-for="menu in menuLists"
      :key="menu.id"
      :menu="menu"
      :selected-menu="selectedMenu"></nav-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  components: {
    'nav-menu-item': () => import(/* webpackChunkName: "nav-menu-item" */ './nav-menu-item.vue'),
  },
  props: {
    menuLists: {
      type: Array,
      default: () => [],
      required: true,
    },
    activeMenu: {
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      selectedMenu: this.activeMenu,
    };
  },
  methods: {
    selectHandle (key, keyPath) {
      this.selectedMenu = key;
    },
  },
};
</script>

<style>

</style>
