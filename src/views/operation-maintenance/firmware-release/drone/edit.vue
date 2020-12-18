<!--
 * @Description: 无人机固件发布编辑
 * @Author: hezhijie
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-17 00:02:04
-->
<template>
  <common-edit device-type="drone"></common-edit>
</template>

<script>
export default {
  name: 'DroneEdit',
  components: {
    'common-edit': () => import('../common/common-edit.vue'),
  },
};
</script>

<style>

</style>
