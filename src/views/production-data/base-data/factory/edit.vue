<!--
 * @Description: 编辑零部件类别
 * @Author: linjia
 * @Date: 2020-04-09 14:45:44
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 00:41:04
 -->
<template>
  <drawer-right
    class="factory-edit"
    size="mini"
    :title="`原厂${action.title}`"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :model="form"
      label-width="90px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="原厂名称"
        prop="name"
        :rules="[{required: true, message: '请输入原厂名称'}, $tools.formRules.repeatCheck({value: form.name, module: 'partfactory', field: 'name'}), $tools.formRules.default]">
        <el-input v-model="form.name"
          placeholder="请输入原厂名称"></el-input>
      </el-form-item>
      <el-form-item label="原厂编码"
        prop="code"
        :rules="[{required: true, message: '请输入原厂编码'}, $tools.formRules.repeatCheck({value: form.code, module: 'partfactory', field: 'code'}), $tools.formRules.code]">
        <el-input v-model="form.code"
          placeholder="请输入原厂编码"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create } from '@/api/part-factory.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
};
const form = {
  name: null, // 原厂名称
  code: null, // 原厂编码
};
export default {
  name: 'DroneEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
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
          name: this.form.name, // 原厂名称
          code: this.form.code, // 原厂编码
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
