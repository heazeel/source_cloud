<!--
 * @Description: 用户修改
 * @Author: linjia
 * @Date: 2020-05-25 14:17:58
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-21 14:54:08
-->
<template>
  <drawer-right
    class="role-edit"
    :title="`用户${action.title}`"
    width="600px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="120px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="账号"
        prop="username"
        class="block"
        :rules="[{ required: true, message: '请输入账号'}, $tools.formRules.username, $tools.formRules.repeatCheck({value: form.name, id: form.id, module: 'user', field: 'username'})]">
        <el-input v-model="form.username" placeholder="请输入3-20位，字母与数字组合的字符"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" class="block">
        <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
        prop="phone"
        class="block"
        :rules="[{ required: true, message: '请输入手机号'}, $tools.formRules.phone, $tools.formRules.repeatCheck({value: form.name, id: form.id, module: 'user', field: 'phone'})]">
        <el-input v-model="form.phone" placeholder="请输入11位手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_ids" class="block">
        <select-remote v-model="form.role_ids"
          multiple
          :label="form.role_names"
          :api-key-obj="{type: 'role', funcName: 'remoteSelectSearch'}"></select-remote>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { detailSearch, create, update } from '@/api/user.js';
const form = {
  username: '',
  name: '',
  phone: '',
  roles: [],
  role_ids: [],
  role_names: [],
};
const type = {
  create: {title: '新建', type: 'create', submitFunc: create },
  update: {title: '修改', type: 'update', submitFunc: update },
};
export default {
  name: 'UserEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        name: [{ required: true, message: '请输入姓名'}, this.$tools.formRules.name],
        role_ids: [{ required: true, message: '请选择角色'}],
      },
    };
  },
  watch: {
    '$route.query.id': {
      handler (newVal) {
        if (!newVal && newVal !== 0) {
          this.action = type.create;
        } else {
          this.action = {...type.update, id: newVal};
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
          // TODO 错误处理
          return;
        }
        res.content.role_ids = res.content.roles.map(role => role.id);
        res.content.role_names = res.content.roles.map(role => role.name);
        // 需要在赋值前把值改掉，不然就没有双向绑定了
        this.form = res.content;
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          username: this.form.username,
          name: this.form.name,
          phone: this.form.phone,
          role_ids: JSON.stringify(this.form.role_ids),
        };
        if (this.action.type === 'update') {
          params.id = this.action.id;
        }
        let res = await this.action.submitFunc(params, {loading: true});
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
