<!--
 * @Description: 各类按钮
 * @Author: linjia
 * @Date: 2020-04-22 17:28:15
 * @LastEditors: linjia
 * @LastEditTime: 2020-05-07 17:17:49
 -->
<template>
  <el-button class="button-sc"
    v-bind="buttonAttrs"
    @click="$emit('click')">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'ButtonSc',
  props: {
    type: {
      type: String,
      default: () => 'primary', // primary主要按钮 intermediate中级按钮 secondary次级按钮 operate功能按钮 text文字按钮
    },
    size: {
      type: String,
      default: () => 'medium', // small
    },
  },
  computed: {
    buttonAttrs () {
      const buttonMap = new Map([
        ['primary', {type: 'primary', round: true, size: this.size, ...this.$attrs}], // 主要按钮
        ['intermediate', {type: 'primary', round: true, plain: true, size: this.size, ...this.$attrs}], // 中级按钮
        ['secondary', {round: true, plain: true, size: this.size, ...this.$attrs}], // 次要按钮
        ['text', {type: 'text', ...this.$attrs}], // 按钮文字
        ['operate', {class: 'btn-operate', round: true, size: this.size, ...this.$attrs}], // 如果是列表的操作按钮就需要另外给个class
      ]);
      return buttonMap.get(this.type);
    },
  },
};
</script>

<style>

</style>
