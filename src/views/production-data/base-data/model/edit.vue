<!--
 * @Description: 型号编辑
 * @Author: linjia
 * @Date: 2020-09-14 17:08:18
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-05 21:03:05
-->
<template>
  <drawer-right
    class="model-edit"
    :title="`型号${action.title}`"
    width="700px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="110px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="类别" prop="type">
        <select-remote v-model="form.type"
          :api-key-obj="{type: 'baseModel', funcName: 'remoteTypeSelect'}"></select-remote>
      </el-form-item>
      <el-form-item label="原厂" prop="factory">
        <select-remote v-model="form.factory"
          other-key="code"
          :api-key-obj="{type: 'baseModel', funcName: 'remoteFactorySelect'}"
          @change="initFactoryCode"></select-remote>
      </el-form-item>
      <el-form-item label="型号"
        prop="code"
        :rules="[{ required: true, message: '请输入零部件型号'}, $tools.formRules.code, $tools.formRules.repeatCheck({value: form.code, id: form.id, module: 'partmodel', field: 'code'})]">
        <el-input v-model="form.code" :disabled="action.type != 'create'" placeholder="请输入型号编码"></el-input>
      </el-form-item>
      <el-form-item label="原厂编码" prop="factory_code">
        {{ form.factory_code }}
      </el-form-item>
      <el-form-item label="维护时间周期" prop="time_check_period">
        <el-input v-model="form.time_check_period" :disabled="action.type != 'create'" placeholder="请输入数字">
          <span slot="suffix"
            class="unit">天</span>
        </el-input>
      </el-form-item>
      <el-form-item label="维护使用周期" prop="use_check_period">
        <el-input v-model="form.use_check_period" :disabled="action.type != 'create'" placeholder="请输入数字">
          <span slot="suffix"
            class="unit">h</span>
        </el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create } from '@/api/base-model.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
};
const form = {
  code: null, // 型号
  type: null, // 类别
  factory: null, // 原厂
  factory_id: null, // 原厂id
  factory_code: null, // 原厂编码
  time_check_period: null, // 维护时间周期
  use_check_period: null, // 使用时间周期
};
export default {
  name: 'ModelEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        type: [{required: true, message: '请选择类别'}],
        factory: [{ required: true, message: '请选择原厂'}, this.$tools.formRules.code],
        time_check_period: [{required: true, message: '请输入维护时间周期'}, this.$tools.formRules.pureNumber],
        use_check_period: [{required: true, message: '请输入维护使用周期'}, this.$tools.formRules.pureNumber],
      },
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
        let params = {
          code: this.form.code,
          type_id: this.form.type,
          factory_id: this.form.factory_id, // 状态
          time_check_period: this.form.time_check_period, // 备注
          use_check_period: this.form.use_check_period,
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

    // 选择原厂时，自动填入原厂编码
    initFactoryCode (value) {
      this.form.factory_code = value.item.code;
      this.form.factory_id = value.item.id;
    },
  },
};
</script>

<style>

</style>
