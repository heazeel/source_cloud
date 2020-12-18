<!--
 * @Description: 带有文字提示的 icon的 文字button
 * @Author: linjia
 * @Date: 2020-04-23 16:43:37
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-21 14:57:51
 -->
<template>
  <el-tooltip effect="light" :content="$attrs['icon-title']" placement="top">
    <i class="iconfont"
      :class="$attrs['icon-class']"
      @click="$emit('click')"></i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ButtonTooltipIcon',
};
</script>

<style lang="less" scoped>
.iconfont {
  cursor: pointer;
  outline: none;
}
.iconfont + .iconfont {
  margin-left: 10px;
}
</style>
