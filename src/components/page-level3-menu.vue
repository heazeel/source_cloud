<!--
 * @Description: 页面中有三级菜单的页面框架
 * @Author: linjia
 * @Date: 2020-04-20 09:57:29
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 10:16:33
 -->
<template>
  <!-- <div class="level3-menu-page">
     -->
  <div class="menu-card">
    <!-- <el-menu ref="level3-menu"
      :default-active="activeMenu"
      class="level3-menu"
      mode="horizontal"
      @select="handleSelect">
      <span class="slide-span" :style="slideLeft"></span>
      <el-menu-item v-for="(menuItem) in menuArr"
        :key="menuItem.key"
        v-has="menuItem.key"
        :index="menuItem.key">
        {{ menuItem.name }}
      </el-menu-item>
    </el-menu> -->
    <div class="level3-menu-div" :style="{width: `${124 * permissonMenu.length}px`}">
      <span class="slider" :style="slideLeft"></span>
      <ul class="level3-menu">
        <li v-for="(menuItem, index) in permissonMenu"
          :key="menuItem.key"
          v-has="menuItem.key"
          :class="{active: activeMenu == menuItem.key}"
          @click="handleSelect(menuItem.key, menuItem, index)">
          {{ menuItem.name }}
        </li>
      </ul>
    </div>
  </div>
  <!--  </div> -->
</template>

<script>
export default {
  name: 'PageLevel3Menu',
  props: {
    menuArr: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      slideLeft: null,
    };
  },
  computed: {
    permissonMenu () {
      return this.menuArr.filter(menu => this.$tools.checkPermission(menu.key));
    },
    activeMenu () {
      let currentRoute = this.$route;
      let parents = currentRoute.matched;
      let level3Route = parents.find(route => route.path.split('/').length == 4); // 因为格式是 /一级路由/二级路由/三级路由 所以切割后长度是4才是三级路由
      return level3Route && level3Route.name || '';
    },
  },
  watch: {
    activeMenu: {
      immediate: true,
      handler (val) {
        let index = this.permissonMenu.findIndex(menu => menu.key == val);
        this.slideLeft = {transform: `translateX(${124 * index}px)`};
      },
    },
  },
  methods: {
    // handleSelect1 (key, keyPath, n) {
    //   // this.slideLeft = {left: n.$el.offsetLeft + 'px', top: n.$el.offsetTop + 'px'};
    //   // this.$router.push({name: key});
    //   this.$emit('select', key);
    // },
    handleSelect (key, keyPath, index) {
      this.slideLeft = {transform: `translateX(${124 * index}px)`};
      // this.$router.push({name: key});
      this.$emit('select', key);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../styles/base.less';
.menu-card {
  margin-bottom: 8px;
  padding: 12px 20px;
  background: white;
  .level3-menu-div {
    list-style: none;
    width: fit-content;
    border-bottom: none;
    background-color: @level3-menu-bg-color;
    box-shadow: 1px 1px 3px 0px@level3-menu-shadow-color;
    padding: 4px;
    border-radius: @level3-menu-border-radius;
    overflow: hidden;
    height: 34px;
  }
  .slider {
    width: @level3-menu-li-width;
    height: @level3-menu-height;
    display: inline-block;
    transition: 0.4s;
    border: none;
    border-radius: @level3-menu-item-active-border-radius;
    background: @level3-menu-active-bg-color;
    box-shadow: 0px 2px 4px 0px @level3-menu-active-shadow-color;
    vertical-align: middle;
    position: absolute;
    overflow: hidden;
    transition: 0.4s;
  }
  .level3-menu {
    list-style: none;
    width: fit-content;
    position: absolute;
    overflow: hidden;
    user-select: none;
    li {
      cursor: pointer;
      display: inline-block;
      height: 34px;
      width: 124px;
      line-height: 34px;
      text-align: center;
      border: none;
      color: @level3-menu-color;
      transition: 0.4s;
      &.active {
        color: white;
      }
    }
  }
}
</style>
