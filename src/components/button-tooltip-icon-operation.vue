<!--
 * @Description: 操作按钮，定死操作按钮的图标样式 如果有特定的就不要用这个
 * @Author: linjia
 * @Date: 2020-07-17 16:05:56
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-03 10:38:45
-->
<template>
  <button-tooltip-icon :icon-title="iconTitle" :icon-class="iconClass" @click="$emit('click')"></button-tooltip-icon>
</template>

<script>
import { errorCode } from '@/utils/consts.js';
const typeMap = new Map([
  ['look', {title: '查看', classType: 'look'}],
  ['update', {title: '编辑', classType: 'edit'}],
  ['delete', {title: '删除', classType: 'delete'}],
  ['config', {title: '配置', classType: 'configure'}],
]);
export default {
  name: 'ButtonTooltipIconOperation',
  props: {
    type: {
      type: String,
      default: () => '',
      required: true,
    },
  },
  data () {
    return {
      iconTitle: '',
      iconClass: '',
    };
  },
  watch: {
    type: {
      handler (newVal) {
        let iconClass = newVal;
        let typeObj = typeMap.get(this.type);
        this.iconClass = typeObj.classType ? `iconsc-icon-${typeObj.classType}` : '';
        this.iconTitle = typeObj.title ? typeObj.title : '';
      },
      immediate: true,
    },
  },
};
</script>

<style>

</style>
