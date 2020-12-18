<!--
 * @Description: 文件上传
 * @Author: linjia
 * @Date: 2020-09-08 15:14:12
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-08 15:42:58
-->
<template>
  <div class="upload-file">
    <el-row v-for="file in fileLists" :key="file.name" class="file-list">
      <el-col :span="2">
        <img :src="require('@/assets/icon_imgs/file.png')" alt="文件">
      </el-col>
      <el-col :span="20" style="padding: 0 4px;">
        <span>{{ file.name }}</span>
      </el-col>
      <el-col :span="2">
        <el-link
          :href="file.downloadUrl"
          :underline="false"
          target="_blank">
          <i class="iconfont iconsc-icon-download color-info" style="cursor: pointer"></i>
        </el-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="form-operate-text" style="cursor: pointer;">
        <el-upload
          ref="upload-file"
          name="file"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="uploadFile"
          v-bind="$attrs">
          <slot name="upload">
            <i class="iconfont iconsc-icon-upload color-info"></i><span class="color-info">上传文件</span>
          </slot>
        </el-upload>
      </el-col>
      <slot name="other"></slot>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    fileLists: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    uploadFile (file, fileList) {
      this.$emit('on-change', file, fileList);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../../styles/base.less';
.file-list {
  background: @input-bg;
  border-radius: 15px;
  padding: 16px 16px 6px;
  vertical-align: middle;
}
</style>
