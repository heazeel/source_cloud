<!--
 * @Description: 电池编辑
 * @Author: linjia
 * @Date: 2020-09-14 17:08:18
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-21 14:44:58
-->
<template>
  <drawer-right
    class="battery-edit"
    :title="`电池${action.title}`"
    width="700px"
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
      <el-form-item label="产品编号" prop="code" :rules="[{ required: true, message: '请输入产品编号'}, $tools.formRules.code, $tools.formRules.repeatCheck({value: form.code, id: form.id, module: 'battery', field: 'code'})]">
        <el-input v-model="form.code" :disabled="action.type != 'create'" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="型号"
        prop="model_id">
        <select-remote v-model="form.model_id"
          :label="form.model"
          label-key="code"
          :api-key-obj="{type: 'battery', funcName: 'remoteSelectSearch'}"></select-remote>
      </el-form-item>
      <el-form-item label="产品状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in DEV_BOX_LIFE_STATUS"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/battery.js';
import { DEV_BOX_LIFE_STATUS } from '@/utils/consts.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const form = {
  code: null, // 产品编号
  model_id: null, // 型号id
  model: null, // 型号名称
  status: null, // 状态
  comment: null, // 备注
};
export default {
  name: 'BatteryEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        model_id: [{required: true, message: '请选择型号'}],
        status: [{required: true, message: '请选择产品状态'}],
        comment: [this.$tools.formRules.default],
      },
      DEV_BOX_LIFE_STATUS,
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
          code: this.form.code,
          model_id: this.form.model_id,
          status: this.form.status, // 状态
          comment: this.form.comment, // 备注
        };
        if (this.action.type === 'update') {
          params.id = this.form.id;
        }
        let res = await this.action.submitFunc(params, { loading: true });
        // this.action.submitFunc(params, { loading: true });
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
