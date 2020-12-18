<!--
 * @Description: 无人机告警管理
 * @Author: hezhijie
 * @Date: 2020-11-07 14:03:29
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 16:52:59
-->
<template>
  <common-index device-type="drone"></common-index>
</template>

<script>
export default {
  name: 'DroneIndex',
  components: {
    'common-index': () => import('../common/common-index.vue'),
  },
};
</script>

<style>

</style>
