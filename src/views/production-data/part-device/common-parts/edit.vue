<!--
 * @Description: 通用零部件编辑
 * @Author: linjia
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-18 14:37:00
-->
<template>
  <drawer-right
    class="battery-edit"
    :title="`通用零部件${action.title}`"
    width="750px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :model="form"
      :rules="rules"
      label-width="120px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="编号" prop="code">
        {{ form.code || '--' }}
      </el-form-item>
      <el-form-item label="类别" prop="type_id">
        <select-remote v-model="form.type_id"
          clearable
          :label="form.type"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteTypeSelect'}"
          @clear="clearContent(['model_id', 'version_id', 'type', 'model', 'version'])"
          @change="clearContent(['model_id', 'version_id', 'type', 'model', 'version'])"></select-remote>
      </el-form-item>
      <el-form-item label="原厂" prop="factory_id">
        <select-remote v-model="form.factory_id"
          clearable
          :label="form.factory"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteFactorySelect'}"
          @clear="clearContent(['factory_code', 'model_id', 'version_id', 'factory', 'model', 'version'])"
          @change="initFactoryCode"></select-remote>
      </el-form-item>
      <el-form-item label="型号" prop="model_id">
        <select-remote v-model="form.model_id"
          label-key="code"
          clearable
          :label="form.model"
          :params="{type_id: form.type_id, factory_id: form.factory_id}"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteModelSelect'}"
          @change="clearContent(['version_id', 'model', 'version'])"
          @clear="clearContent(['version_id', 'model', 'version'])"></select-remote>
      </el-form-item>
      <el-form-item label="原厂编码" prop="factory_code">
        {{ form.factory_code || '--' }}
      </el-form-item>
      <el-form-item prop="purchase_time" label="采购时间">
        <el-date-picker
          v-model="form.purchase_time"
          type="date"
          value-format="timestamp"
          :editable="false"
          placeholder="选择日期"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="硬件版本" prop="version_id">
        <select-remote v-model="form.version_id"
          clearable
          label-key="version"
          :label="form.version"
          :params="{type_id: form.type_id, factory_id: form.factory_id, model_id: form.model_id, used: 1}"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteVersionSelect'}"></select-remote>
      </el-form-item>
      <el-form-item label="序号" prop="serial_no">
        {{ form.serial_no || '--' }}
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in DEV_C_CARD_LIFE_STATUS"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="last_maintain_time" label="最近维护">
        <el-date-picker
          v-model="form.last_maintain_time"
          type="date"
          value-format="timestamp"
          :editable="false"
          placeholder="选择日期"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="距下次维护" prop="remain_day">
        {{ form.remain_day || '--' }} 天
      </el-form-item>
      <el-form-item label="距下次维护" prop="remain_hour">
        {{ form.remain_hour || '--' }} h
      </el-form-item>

      <el-form-item label="当前设备">
        <el-col :span="12">
          <el-form-item>
            <el-select v-model="form.device_type"
              placeholder="类别"
              clearable
              @change="clearContent(['device_id'])"
              @clear="clearContent(['device_id', 'device_type'])">
              <el-option
                v-for="item in DEV_TYPE"
                :key="item.key"
                :label="item.text"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.device_type !== null" :span="12">
          <el-form-item prop="device_id">
            <select-remote v-model="form.device_id"
              :label="form.device_code"
              :params="{device_type: form.device_type}"
              :api-key-obj="{type: 'commonParts', funcName: 'remoteUAVCodeSelect'}"
              placeholder="编号"
              clearable></select-remote>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="履历本" prop="resume_book" class="block">
        <el-input v-model="form.resume_book" placeholder="请输入履历本"></el-input>
      </el-form-item>
      <el-form-item label="贴码位置" prop="qr_position" class="block">
        <el-input v-model="form.qr_position" placeholder="请输入贴码位置"></el-input>
      </el-form-item>
      <el-form-item label="贴码图片" prop="qr_img" class="block uploadItem">
        <el-upload
          action="#"
          list-type="picture-card"
          :class="{'limit-hide': imgList.length == 1}"
          :auto-upload="false"
          :on-change="handleImgChange"
          :file-list="imgList">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="previewImg = {visible: true, urls: [file.url]}">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-image-viewer
          v-show="previewImg.visible"
          :on-close="() => previewImg.visible = false"
          :url-list="previewImg.urls">
        </el-image-viewer>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/common-parts.js';
import { DEV_C_CARD_LIFE_STATUS, DEV_TYPE } from '@/utils/consts.js';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue';
import { imageUpload } from '@/api/common.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const form = {
  no: null, // 编号
  type_id: null, // 类别
  model_id: null, // 型号
  factory_id: null, // 原厂id
  factory_code: null, // 原厂编码
  purchase_time: null, // 采购时间
  version_id: null, // 硬件版本
  serial_no: null, // 序号
  status: null, // 状态
  last_maintain_time: null, // 最近维护
  remian_day: null, // 距下次维护（天）
  remian_hour: null, // 据下次维护（h）
  device_type: null, // 当前设备类别
  device_id: null, // 当前设备id
  resume_book: null, // 履历本
  qr_position: null, // 贴码位置
  qr_img: null, // 贴码图片
  comment: null, // 备注
};
let id = 0;
export default {
  name: 'CommonPartsEdit',
  components: { 'el-image-viewer': ElImageViewer },
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        version_id: [{required: true, message: '请选择硬件版本'}],
        purchase_time: [{required: true, message: '请选择采购时间'}],
        status: [{required: true, message: '请选择状态'}],
        device_id: [{required: true, message: '请选择编号'}],
      },
      imgList: [],
      previewImg: {visible: false, urls: []},
      DEV_C_CARD_LIFE_STATUS,
      DEV_TYPE,
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
      } else if (this.action.type === 'update') {
        let res = await detailSearch({
          id: this.action.id,
        }, {loading: true});
        if (res.code !== 200) {
          this.form = this.$lodash.cloneDeep(form);
          return;
        }
        this.form = res.content;
        this.form.purchase_time = parseInt(res.content.purchase_time * 1000);
        this.form.last_maintain_time = parseInt(res.content.last_maintain_time * 1000);
        this.imgList.push({url: res.content.qr_img});
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          purchase_time: parseInt(this.form.purchase_time / 1000), // 采购时间
          version_id: this.form.version_id, // 硬件版本
          status: this.form.status, // 状态
          last_maintain_time: parseInt(this.form.last_maintain_time / 1000), // 最近维护
          device_type: this.form.device_type, // 当前设备类别
          device_id: this.form.device_id, // 当前设备id
          resume_book: this.form.resume_book, // 履历本
          qr_position: this.form.qr_position, // 贴码位置
          qr_img: this.imgList[0] && this.imgList[0].url || null,
          comment: this.form.comment, // 备注
        };
        if (this.action.type === 'update') {
          params.id = this.form.id;
        }
        let res = await this.action.submitFunc(params, { loading: true });
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
    // 图片改变 + 上传
    async handleImgChange (file, fileList) {
      // this.imgs = fileList;
      let params = new FormData();
      params.append('image', file.raw);
      let res = await imageUpload(params);
      if (res.code !== 200) {
        // TODO 错误处理
        return;
      }
      console.log(res.content.link, fileList);
      this.imgList.push({url: res.content.link});
      console.log(this.imgList);
    },

    // 移除选中的图片
    handleRemove (file) {
      const index = this.imgList.findIndex(img => img.uid == file.uid);
      this.imgList.splice(index, 1);
    },

    // 选择原厂，自动填入原厂编码
    initFactoryCode (value) {
      if (value.item !== undefined) {
        this.form.factory_id = value.item.id;
        this.form.factory_code = value.item.code;
      }
      this.clearContent(['model_id', 'version_id', 'factory', 'model', 'version']);
    },

    // 清除选择框中内容，因为型号、硬件版本、设备id的查询都有前置条件的，前置条件改变后需要清除内容
    clearContent (arr) {
      arr.forEach(item => {
        this.form[item] = null;
      });
    },

  },
};
</script>

<style lang="less">
.uploadItem{
  .small-img.el-image {
    width: 40px;
    height: 40px;
    border-radius: 15px;
    margin: 0 5px;
    display:inline-block;
    cursor: pointer;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    border-color: white;
    outline: none;
  }
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-style: solid;
    border-radius: 10px;
  }
  .el-upload--picture-card i.el-icon-plus {
    font-size: 20px;
    font-weight: bold;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span+span {
    margin-left: 10px;
  }

  .el-upload-list__item-actions {
    line-height: 56px;
    font-size: 16px;
  }
  .limit-hide {
    .el-upload--picture-card {
      display: none;
    }
  }
  .el-image-viewer__close {
    color: white;
    opacity: 0.6;
  }
}
</style>
