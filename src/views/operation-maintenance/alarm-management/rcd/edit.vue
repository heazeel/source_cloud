<!--
 * @Description: 导控器告警管理编辑
 * @Author: hezhijie
 * @Date: 2020-11-07 14:03:29
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 18:00:53
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
