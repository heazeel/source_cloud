<!--
 * @Description: 各类按钮
 * @Author: linjia
 * @Date: 2020-04-22 17:28:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-21 19:16:24
 -->
<template>
  <button-sc
    v-bind="$attrs"
    :loading="loading"
    @click="startLoading">
    <slot></slot>
  </button-sc>
</template>

<script>
export default {
  name: 'ButtonSubmit',
  components: {
    'button-sc': () => import(/* webpackChunkName: "button-sc" */ '@c/button-sc.vue'),
  },
  props: {
    clickFunc: { type: Function, required: true },
  },
  data () {
    return {
      loading: false,
    };
  },
  methods: {
    async startLoading () {
      if (this.loading) { return; }
      this.loading = true;
      await this.clickFunc();
      this.loading = false;
    },
  },
};
</script>

<style>

</style>
