<!--
 * @Description: 无人机告警管理编辑
 * @Author: hezhijie
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 18:00:44
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
