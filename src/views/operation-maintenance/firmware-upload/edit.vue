<!--
 * @Description: 固件上传编辑
 * @Author: hezhijie
 * @Date: 2020-04-09 14:45:44
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-11 17:49:35
 -->
<template>
  <drawer-right
    class="firmware-upload-edit"
    size="mini"
    :title="`固件上传${action.title}`"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :model="form"
      label-width="90px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="设备类型"
        prop="device_type"
        class="block"
        :rules="[{required: true, message: '请选择设备类型'}]">
        <el-select v-model="form.device_type" placeholder="请选择设备类型">
          <el-option
            v-for="item in DEV_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本"
        prop="version"
        class="block"
        :rules="[{required: true, message: '请选择版本'}]">
        <el-select v-model="form.version" placeholder="请选择版本">
          <el-option
            v-for="item in VERSION"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号"
        prop="version_no"
        class="block"
        :rules="[{ required: true, message: '请输入版本号'}]">
        <el-input v-model="form.version_no" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item v-model="form.file_name"
        label="固件"
        prop="file"
        class="block"
        :rules="[{required: true, message: '请选择需要上传的文件'}]">
        <el-upload
          ref="uploadFile"
          name="file"
          action="#"
          class="firmware-upload"
          drag
          :multiple="false"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="uploadFile">
          <i v-if="form.file_name === null" class="el-icon-upload"></i>
          <div v-if="form.file_name === null" class="el-upload__text">
            将文件拖到此处，或点击上传
          </div>
          <div v-if="form.file_name !== null" class="file-box">
            <img class="file-img" src="../../../assets/icon_imgs/file.png">
            <p>{{ form.file_name }}</p>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create } from '@/api/firmware-upload.js';
import { DEV_TYPE, VERSION } from '@/utils/consts.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
};
const form = {
  device_type: null, // 设备类型
  version: null, // 版本
  version_no: null, // 版本号
  file: null, // 文件
  file_name: null, // 文件名
};
export default {
  name: 'FirmwareUploadEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      DEV_TYPE,
      VERSION,
    };
  },
  watch: {
    '$route.query.id': {
      handler (newVal) {
        if (!newVal && newVal !== 0) {
          this.action = type.create;
        } else {
          this.action = { ...type.update, id: newVal };
        }
      },
      immediate: true,
    },
  },
  methods: {
    async init () {
      if (this.action.type === 'create') {
        this.form = this.$lodash.cloneDeep(form);
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = new FormData();
        params.append('device_type', this.form.device_type);
        params.append('version', this.form.version);
        params.append('version_no', this.form.version_no);
        params.append('file', this.form.file);
        if (this.action.type === 'update') {
          params.id = this.action.id;
        }
        let res = await this.action.submitFunc(params, { loading: true, formData: true });
        if (res.code !== 200) {
        // TODO 错误处理
          return;
        }
        this.$message({
          message: `${this.action.title}成功！`,
          type: 'success',
          containerType: 'drawer',
          onClose: () => {
            this.$router.back();
          },
        });
      }
      catch (e) {
        return e;
      }
    },
    uploadFile (file, fileList) {
      this.form.file = file.raw;
      this.form.file_name = file.name;
    },
  },
};
</script>

<style lang="less">
.firmware-upload{
  .el-upload.el-upload--text{
    width: 100%;
    .el-upload-dragger{
      width: 100%;
      border-radius: 15px;
    }
    .el-upload-dragger:hover{
      border-color: #EF8354;
    }
  }
  i{
    opacity: 0.4;
  }
  .el-upload__text{
    opacity: 0.5;
  }
  .file-box {
    position: absolute;
    left: 30px;
    top: 30px;
    img {
      width: 45px;
      height: auto;
    }
    p{
      color: #8891A2;
    }
  }
}
</style>
