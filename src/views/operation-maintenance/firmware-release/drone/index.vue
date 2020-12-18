<!--
 * @Description: 无人机固件发布
 * @Author: hezhijie
 * @Date: 2020-09-22 10:05:51
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 16:55:44
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
