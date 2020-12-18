<!--
 * @Description: 零部件
 * @Author: linjia
 * @Date: 2020-09-14 15:55:57
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 16:30:29
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
        { key: 'production_data_part_device_battery', name: '电池' },
        { key: 'production_data_part_device_c_card', name: '通信卡' },
        { key: 'production_data_part_device_common_parts', name: '通用零部件' },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>
