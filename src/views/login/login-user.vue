<!--
 * @Description: 账号登录
 * @Author: linjia
 * @Date: 2020-04-16 09:53:14
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-12 11:46:00
 -->
<template>
  <div class="login-user">
    <input-animation v-model="form.username"
      type="text"
      label="账号"
      placeholder="请输入账号"
      :error-info="errorInfoObj.username"
      @blur="checkValid('username', true)"
      @input="checkValid('username')"></input-animation>
    <input-animation v-model="form.password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      :error-info="errorInfoObj.password"
      @input="checkValid('password')"></input-animation>
  </div>
</template>

<script>
import { existedSearch } from '@/api/user.js';
import { errorCode } from '@/utils/consts.js';
export default {
  name: 'LoginUser',
  components: {
    'input-animation': () => import(/* webpackChunkName: "input-animation" */ '@c/input-animation.vue'),
  },
  props: {
    errorInfo: {
      type: Object,
      default: () => ({username: null, password: null}),
    },
  },
  data () {
    return {
      form: {
        login_type: 1,
        username: '',
        password: '',
      },
      errorInfoObj: {
        username: null,
        password: null,
      },
      canSubmit: false,
    };
  },
  watch: {
    errorInfo: {
      handler (newVal) {
        if (newVal.username) {
          this.errorInfoObj.username = newVal.username;
        }
        if (newVal.password) {
          this.errorInfoObj.password = newVal.password;
        }
      },
      deep: true,
    },
  },
  methods: {
    async checkValid (type, checkExit) {
      if (type == 'username') {
        this.errorInfoObj.username = await this.checkUsername(checkExit);
      }
      if (type == 'password') {
        this.errorInfoObj.password = this.checkPassword();
      }
      this.canSubmit = this.errorInfoObj.username == this.errorInfoObj.password && this.errorInfoObj.password == '';
      this.$emit('form-value-change', { form: this.form, error: this.errorInfoObj, canSubmit: this.canSubmit });
    },
    async checkUsername (checkExit) {
      let errorInfoObj = '';
      if (!this.form.username) {
        errorInfoObj = null; // 当做啥都没发生
      } else if (!/^[a-zA-Z0-9]{3,20}$/.exec(this.form.username)) {
        errorInfoObj = '3-20位，字母或数字组合';
      } else if (checkExit) {
        let res = await existedSearch({
          username: this.form.username,
        });
        if (res.code == 200) {
          if (res.content.status || res.content.status == 0) {
            const errorTxt = ['账号不存在', '', '账号被禁用，请联系企业管理员'];
            errorInfoObj = errorTxt[res.content.status];
          }
        }
      }
      return errorInfoObj;
    },
    checkPassword () {
      let errorInfoObj = '';
      if (!this.form.password) {
        errorInfoObj = null; // 当做啥都没发生
      } else if (!/^[a-zA-Z0-9]{8,20}$/.exec(this.form.password)) {
        errorInfoObj = '8-20位，字母或数字组合';
      }
      return errorInfoObj;
    },
  },
};
</script>

<style>
</style>
