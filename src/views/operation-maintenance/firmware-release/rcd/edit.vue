<!--
 * @Description: 导控器固件发布编辑
 * @Author: hezhijie
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-17 00:02:29
-->
<template>
  <common-edit device-type="rcd"></common-edit>
</template>

<script>
export default {
  name: 'RcdEdit',
  components: {
    'common-edit': () => import('../common/common-edit.vue'),
  },
};
</script>

<style>

</style>
