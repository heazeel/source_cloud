<!--
 * @Description: 主设备
 * @Author: linjia
 * @Date: 2020-04-09 16:24:27
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-14 15:56:25
 -->
<template>
  <div class="level3-page">
    <page-level3-menu :menu-arr="menuArr"
      @select="$router.push({name: arguments[0]})"></page-level3-menu>
    <div class="level3-page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDevice',
  data () {
    return {
      menuArr: [
        { key: 'production_data_main_device_drone', name: '无人机' },
        { key: 'production_data_main_device_ustation', name: '无人站' },
        { key: 'production_data_main_device_hstation', name: '人工站' },
        { key: 'production_data_main_device_rcd', name: '导控器' },
        { key: 'production_data_main_device_box', name: '货箱' },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
/* .main-device {
  height: 100%;
  box-sizing: border-box;
  .main-content {
    background: white;
    height: calc(100% - 78px);
  }
} */
</style>
