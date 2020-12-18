<!--
 * @Description: 主入口
 * @Author: linjia
 * @Date: 2020-03-11 17:31:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-08 15:06:50
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import './styles/base.less';
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: PingFangSC-Regular,PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @font-color;
  height: 100%;
}

</style>
