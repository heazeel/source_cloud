<!--
 * @Description: 修改密码
 * @Author: linjia
 * @Date: 2020-05-26 11:44:51
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-09 09:47:33
-->
<template>
  <dialog-sc
    ref="update-password"
    class="update-password"
    title="修改密码"
    @cancel="$emit('cancel')"
    @submit="handleSubmit">
    <el-form ref="update-password-form"
      :model="form"
      :rules="rules"
      label-width="120px"
      style="width: 80%;margin: 40px auto 0;"
      @keyup.enter.native="handleSubmit">
      <el-form-item prop="old_password" label="原始密码" :error="error.old_password">
        <el-input v-model="form.old_password" type="password" placeholder="请输入原始密码"></el-input>
      </el-form-item>
      <el-form-item prop="new_password" label="新密码">
        <el-input v-model="form.new_password" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="check_password" label="确认密码">
        <el-input v-model="form.check_password" type="password" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
    </el-form>
  </dialog-sc>
</template>

<script>
import { passwordUpdate } from '@/api/user.js';
import { errorCode } from '@/utils/consts.js';
import md5 from 'blueimp-md5'; // md5加密32位
const form = {
  new_password: '',
  old_password: '',
  check_password: '',
};
export default {
  name: 'UpdatePassword',
  data () {
    const diffOldValue = (rule, value, callback) => {
      if (value) {
        if (this.form.old_password === value) {
          callback(new Error('不可与原始密码相同'));
        } else if (this.form.check_password) { // 如果验证密码有值的话就需要再触发一下验证密码的校验
          this.$refs['update-password-form'].validateField('check_password');
          callback();
        }
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value && this.form.new_password !== value) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: this.$lodash.cloneDeep(form),
      rules: {
        old_password: [{ required: true, message: '请输入原始密码'}, this.$tools.formRules.password],
        new_password: [{ required: true, message: '请输入新密码'}, this.$tools.formRules.password, { validator: diffOldValue }],
        check_password: [{ required: true, message: '请再次输入新密码'}, this.$tools.formRules.password, { validator: checkPassword }],
      },
      error: {
        old_password: '',
      },
    };
  },
  methods: {
    handleSubmit () {
      this.$refs['update-password-form'].validate(async valid => {
        console.log(valid);
        if (valid) {
          this.error.old_password = '';
          let res = await passwordUpdate({
            old_password: md5(this.form.old_password),
            new_password: md5(this.form.new_password),
          });
          if (res.code !== 200) {
            this.error.old_password = res.msg && errorCode.get(res.msg).text || '';
            return;
          }
          this.$message({
            type: 'success',
            message: '修改成功！请重新登录！',
            containerType: 'dialog',
            onClose: () => {
              this.$router.replace({name: 'login'});
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.update-password {
  text-align: left;
}
</style>
