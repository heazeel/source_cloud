<!--
 * @Description: 编辑
 * @Author: linjia
 * @Date: 2020-04-09 14:45:44
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 17:12:32
 -->
<template>
  <drawer-right
    class="drone-edit"
    :title="`无人机${action.title}`"
    width="600px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="90px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="序号"
        prop="no"
        :rules="[{required: true, message: '请输入序号'}, this.$tools.formRules.pureNumber, $tools.formRules.repeatCheck({value: form.name, module: 'drone', field: 'no'})]">
        <el-input v-model="form.no"
          :disabled="action.type != 'create'"
          placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="code">
        <el-input v-model="form.code"
          :disabled="action.type != 'create'"></el-input>
      </el-form-item>
      <el-form-item label="所属企业" prop="company">
        {{ form.company }}
      </el-form-item>
      <el-form-item label="型号" prop="model_id">
        <select-remote v-model="form.model_id"
          :disabled="action.type != 'create'"
          :label="form.model"
          label-key="code"
          placeholder="请输入型号关键字"
          :api-key-obj="{type: 'drone', funcName: 'modelRemoteSelectSearch'}"></select-remote>
      </el-form-item>
      <el-form-item label="产品状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusArr"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内部型号" prop="internal_model">
        <el-input v-model="form.internal_model"></el-input>
      </el-form-item>
      <el-form-item label="固件版本" prop="version_no">
        {{ form.version_no }}
      </el-form-item>
      <el-form-item label="IMEI" prop="imei">
        <el-input v-model="form.imei"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/drone.js';
import { mainDeviceStatus } from '@/mixins/main-device-status.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const form = {
  no: null, // 序号
  code: null, // 编号
  status: null, // 状态
  model_id: null, // 型号id
  model: null, // 型号名称
  internal_model: null, // 内部型号
  imei: null, // IMEI
  comment: null, // 备注
};
export default {
  name: 'DroneEdit',
  mixins: [mainDeviceStatus],
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        no: [{required: true, message: '请输入序号'}, this.$tools.formRules.pureNumber],
        code: [{required: true, message: '请输入产品编号'}, this.$tools.formRules.default],
        model_id: [{required: true, message: '请选择型号'}],
        status: [{required: true, message: '请选择产品状态'}],
        internal_model: [this.$tools.formRules.default],
        imei: [this.$tools.formRules.default],
        comment: [this.$tools.formRules.default],
      },
      statusArr: [],
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
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          no: Number(this.form.no), // 序号
          code: this.form.code, // 编号
          model_id: Number(this.form.model_id), // 型号
          status: Number(this.form.status), // 状态
          // 以下不必填，传也没关系，没有值就没有值
          internal_model: this.form.internal_model, // 内部型号
          imei: this.form.imei, // IMEI
          comment: this.form.comment, // 备注
        };
        if (this.action.type === 'update') {
          params.id = this.action.id;
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
  },
};
</script>

<style>

</style>
