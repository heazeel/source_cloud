<!--
 * @Description: 硬件版本编辑
 * @Author: linjia
 * @Date: 2020-09-14 17:08:18
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-05 21:02:46
-->
<template>
  <drawer-right
    class="hard-version-edit"
    :title="`硬件版本${action.title}`"
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
      <el-form-item label="类别" prop="type_id">
        <select-remote v-model="form.type_id"
          :api-key-obj="{type: 'hardVersion', funcName: 'remoteTypeSelect'}"
          @change="clearContent(['model_id', 'version'])"></select-remote>
      </el-form-item>
      <el-form-item label="原厂" prop="factory">
        <select-remote
          v-model="form.factory"
          :api-key-obj="{type: 'hardVersion', funcName: 'remoteFactorySelect'}"
          @change="initFactoryCode"></select-remote>
      </el-form-item>
      <el-form-item label="型号" prop="model_id">
        <select-remote v-model="form.model_id"
          label-key="code"
          :params="{type_id: form.type_id, factory_id: form.factory_id}"
          :api-key-obj="{type: 'hardVersion', funcName: 'remoteModelSelect'}"
          @change="clearContent(['version'])"></select-remote>
      </el-form-item>
      <el-form-item label="原厂编码" prop="factory_code">
        {{ form.factory_code }}
      </el-form-item>
      <el-form-item label="硬件版本"
        prop="version">
        <select-remote v-model="form.version"
          label-key="version"
          :params="{type_id: form.type_id, factory_id: form.factory_id, model_id: form.model_id, used: 0}"
          :api-key-obj="{type: 'hardVersion', funcName: 'remoteVersionSelect'}"></select-remote>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create } from '@/api/hard-version.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
};
const form = {
  model_id: null, // 型号
  type_id: null, // 类别
  factory: null, // 原厂
  factory_id: null, // 原厂id
  factory_code: null, // 原厂编码
  version: null, // 硬件版本
  comment: null, // 备注
};
export default {
  name: 'HardVersionEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        model_id: [{required: true, message: '请选择型号'}],
        type_id: [{ required: true, message: '请选择类别'}],
        factory: [{ required: true, message: '请选择原厂'}],
        version: [{required: true, message: '请选择硬件版本'}],
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
      // else if (this.action.type === 'update') {
      //   let res = await detailSearch({
      //     id: this.action.id,
      //   }, {loading: true});
      //   if (res.code !== 200) {
      //     this.form = this.$lodash.cloneDeep(form);
      //     return;
      //   }
      //   this.form = res.content;
      // }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          model_id: this.form.model_id,
          type_id: this.form.type_id,
          factory_id: this.form.factory_id,
          version: this.form.version,
          comment: this.form.comment,
        };
        console.log(params);
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
    // 选择原厂，自动填入原厂编码
    initFactoryCode (value) {
      if (value.item !== undefined) {
        this.form.factory_id = value.item.id;
        this.form.factory_code = value.item.code;
      }
      this.form.model_id = null;
      this.form.version = null;
    },

    // 型号和硬件版本的选择有前置条件，所以前置条件改变时，内容要清空
    clearContent (arr) {
      arr.forEach(item => {
        this.form[item] = null;
      });
    },
  },
};
</script>

<style>

</style>
