<!--
 * @Description: 编辑零部件类别
 * @Author: linjia
 * @Date: 2020-04-09 14:45:44
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 00:40:20
 -->
<template>
  <drawer-right
    class="type-edit"
    size="mini"
    :title="`类别${action.title}`"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :model="form"
      label-width="90px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="类别"
        prop="name"
        :rules="[{required: true, message: '请输入类别名称'}, $tools.formRules.repeatCheck({value: form.name, module: 'parttype', field: 'name'}), $tools.formRules.default]">
        <el-input v-model="form.name"
          placeholder="请输入类别名称"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create } from '@/api/part-type.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
};
const form = {
  name: null, // 类别名称
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
          name: this.form.name, // 类别名称
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
