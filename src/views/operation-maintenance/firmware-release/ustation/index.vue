<!--
 * @Description: 无人站固件发布
 * @Author: hezhijie
 * @Date: 2020-09-22 10:05:51
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 16:56:18
-->
<template>
  <common-index device-type="ustation"></common-index>
</template>

<script>
export default {
  name: 'UstationIndex',
  components: {
    'common-index': () => import('../common/common-index.vue'),
  },
};
</script>

<style>

</style>
