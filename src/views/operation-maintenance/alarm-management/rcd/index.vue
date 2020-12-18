<!--
 * @Description: 导控器告警管理
 * @Author: hezhijie
 * @Date: 2020-11-07 14:03:29
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 16:54:25
-->
<template>
  <common-index device-type="rcd"></common-index>
</template>

<script>
export default {
  name: 'RcdIndex',
  components: {
    'common-index': () => import('../common/common-index.vue'),
  },
};
</script>

<style>

</style>
