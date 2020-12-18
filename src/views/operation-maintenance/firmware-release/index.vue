<!--
 * @Description: 固件发布
 * @Author: hezhijie
 * @Date: 2020-09-14 15:55:57
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-11 14:14:25
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
  name: 'FirmwareRelease',
  data () {
    return {
      menuArr: [
        { key: 'operation_maintenance_firmware_release_drone', name: '无人机' },
        { key: 'operation_maintenance_firmware_release_ustation', name: '无人站' },
        { key: 'operation_maintenance_firmware_release_rcd', name: '导控器' },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>
