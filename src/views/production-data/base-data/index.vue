<!--
 * @Description: 基础数据
 * @Author: linjia
 * @Date: 2020-09-14 15:55:57
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-23 14:35:39
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
        { key: 'production_data_base_data_type', name: '类别' },
        { key: 'production_data_base_data_factory', name: '原厂' },
        { key: 'production_data_base_data_model', name: '型号' },
        { key: 'production_data_base_data_hard_version', name: '硬件版本' },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>
