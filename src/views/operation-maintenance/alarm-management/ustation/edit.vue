<!--
 * @Description: 无人站告警管理编辑
 * @Author: hezhijie
 * @Date: 2020-11-07 14:03:29
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 18:01:07
-->
<template>
  <common-edit device-type="ustation"></common-edit>
</template>

<script>
export default {
  name: 'UstationEdit',
  components: {
    'common-edit': () => import('../common/common-edit.vue'),
  },
};
</script>

<style>

</style>
