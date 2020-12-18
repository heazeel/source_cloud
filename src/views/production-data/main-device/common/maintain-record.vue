<!--
 * @Description: 维护
 * @Author: linjia
 * @Date: 2020-09-09 16:10:52
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-19 15:14:16
-->
<template>
  <dialog-sc
    ref="maintain-record"
    class="maintain-record"
    title="维护信息"
    @open="init"
    @cancel="$router.back()"
    @submit="handleSubmit">
    <el-form ref="form"
      class="form-dialog"
      :model="form"
      :rules="rules"
      label-width="80px">
      <el-form-item prop="maintain_time" label="日期">
        <el-date-picker
          v-model="form.maintain_time"
          type="date"
          value-format="timestamp"
          :editable="false"
          :picker-options="pickerOptions"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="uid" label="维护人">
        {{ form.name }}
      </el-form-item>
      <el-form-item prop="explanation" label="说明" class="block">
        <el-input v-model="form.explanation" type="textarea" placeholder="请输入说明"></el-input>
      </el-form-item>
      <el-form-item label="图片" class="block">
        <el-upload
          action="#"
          :class="{'limit-hide': imgs.length == 3}"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="handleImgChange"
          :file-list="imgs"
          accept=".jpeg,.jpg,.png">
          <i slot="trigger" class="el-icon-plus"></i>
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
    </el-form>
    <!-- 历史记录 -->
    <el-table
      :data="recordList"
      height="290"
      class="gray-secondary-table"
      style="width: 100%;">
      <el-table-column
        prop="maintain_time"
        label="日期"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.maintain_time | momentFormat('s', 'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="维护人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="explanation"
        label="说明">
      </el-table-column>
      <el-table-column
        label="图片"
        width="240">
        <template slot-scope="scope">
          <el-image v-if="scope.row.img1"
            class="small-img"
            :src="scope.row.img1"
            :preview-src-list="[scope.row.img1]"></el-image>
          <el-image v-if="scope.row.img2"
            class="small-img"
            :src="scope.row.img2"
            :preview-src-list="[scope.row.img2]"></el-image>
          <el-image v-if="scope.row.img3"
            class="small-img"
            :src="scope.row.img3"
            :preview-src-list="[scope.row.img3]"></el-image>
        </template>
      </el-table-column>
    </el-table>
  </dialog-sc>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue';
import { search, create } from '@/api/maintain-record.js';
import { imageUpload } from '@/api/common.js';
const form = {
  maintain_time: null,
  uid: null,
  name: null,
  explanation: null,
  img1: null,
  img2: null,
  img3: null,
};
export default {
  name: 'MaintainRecord',
  components: { 'el-image-viewer': ElImageViewer },
  data () {
    return {
      form: this.$lodash.cloneDeep(form),
      rules: {
        maintain_time: [{required: true, message: '请选择时间'}],
        explanation: [{required: true, message: '请输入说明内容'}],
      },
      recordList: [], // 历史维护记录
      imgs: [],
      previewImg: {visible: false, urls: []},
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000; // 比今天大比一个星期前小都不行
        },
      },
    };
  },
  created () {
    // 获取操作人信息
    this.form.name = localStorage.getItem('name');
    this.form.uid = localStorage.getItem('uid');
  },
  methods: {
    // 查询维护记录
    async init () {
      let res = await search({
        device_id: this.$route.query.device_id,
        device_type: this.$route.query.device_type,
      }, {loading: true});
      if (res.code !== 200) {
        this.recordList = [];
        // TODO 错误处理
        return;
      }
      this.recordList = res.content;
    },
    handleSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) { return; }
        let params = {
          maintain_time: parseInt(this.form.maintain_time / 1000),
          uid: this.form.uid,
          name: this.form.name,
          explanation: this.form.explanation,
          device_id: this.$route.query.device_id,
          device_type: this.$route.query.device_type,
        };
        this.imgs.forEach((img, index) => {
          params[`img${index + 1}`] = img.url;
        });
        console.log(params);
        let res = await create(params, { loading: true });
        if (res.code !== 200) {
        // TODO 错误处理
          return;
        }
        this.$message({
          message: '维护信息提交成功！',
          type: 'success',
          containerType: 'dialog',
          onClose: () => {
            this.$router.back();
          },
        });
      });
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
      this.imgs.push({url: res.content.link});
      console.log(this.imgs);
    },
    // 删除图片
    handleRemove (file) {
      const index = this.imgs.findIndex(img => img.uid == file.uid);
      this.imgs.splice(index, 1);
    },
  },
};
</script>

<style lang="less">
.maintain-record {
  .small-img.el-image {
    width: 40px;
    height: 40px;
    border-radius: 15px;
    margin: 0 5px;
    display:inline-block;
    cursor: pointer;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 56px;
    height: 56px;
    line-height: 58px;
    border-radius: 15px;
    border-color: white;
    outline: none;
  }
  .el-upload--picture-card {
    height: 56px;
    width: 56px;
    line-height: 58px;
    border-style: solid;
    border-radius: 15px;
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
