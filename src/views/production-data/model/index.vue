<!--
 * @Description: 型号
 * @Author: linjia
 * @Date: 2020-07-13 15:27:04
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-13 19:00:22
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
  name: 'Model',
  data () {
    return {
      menuArr: [
        { key: 'production_data_model_drone', name: '无人机' },
        { key: 'production_data_model_battery', name: '电池' },
      ],
    };
  },
};
</script>
