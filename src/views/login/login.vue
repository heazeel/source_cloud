<!--
 * @Description: 登录
 * @Author: linjia
 * @Date: 2020-03-11 17:31:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-09 17:42:06
 -->
<template>
  <page-login class="login">
    <ul class="tab"
      :class="type + '-tab'">
      <li :class="{active: type == 'user'}"
        @click="changeType('user')">
        用户名登录
      </li>
      <li :class="{active: type == 'verify-code'}"
        @click="changeType('verify-code')">
        验证码登录
      </li>
    </ul>
    <form class="form-part" @keyup.enter.prevent="handleSubmit">
      <login-user v-show="type == 'user'"
        ref="login-user"
        :error-info="errorInfo"
        @form-value-change="handleCheckValue"></login-user>
      <login-verify-code v-show="type == 'verify-code'"
        ref="login-verify-code"
        :error-info="errorInfo"
        @form-value-change="handleCheckValue"></login-verify-code>
    </form>
    <!-- 登录按钮 -->
    <a class="sc-btn sc-btn-transform sc-btn-block login-submit" :class="{disabled: !canSubmit}" @click="handleSubmit"><slot name="submitBtnName">登录</slot></a>
  </page-login>
</template>

<script>
import { loginIn } from '@/api/login.js';
import { errorCode } from '@/utils/consts.js';
import { mapActions } from 'vuex';
import { setCookie } from '@/utils/cookies.js';
import md5 from 'blueimp-md5'; // md5加密32位

const formMap = new Map([
  ['user', { username: null, password: null }],
  ['verify-code', { phone: null, code: null }],
]);
export default {
  name: 'Login',
  components: {
    'page-login': () => import(/* webpackChunkName: "page-login" */ '@c/page-login.vue'),
    'login-user': () => import(/* webpackChunkName: "login-user" */ './login-user.vue'),
    'login-verify-code': () => import(/* webpackChunkName: "login-verify-code" */ './login-verify-code.vue'),
  },
  data () {
    return {
      type: 'user', // verify-code
      form: {},
      canSubmit: false,
      errorInfo: {},
    };
  },
  methods: {
    ...mapActions('app', ['getPermissionMenu']),
    changeType (type) {
      this.type = type;
      this.canSubmit = this.$refs['login-' + this.type].canSubmit;
      this.form = this.$refs['login-' + this.type].form;
    },
    handleCheckValue ({ form, errorInfo, canSubmit }) {
      this.$set(this, 'form', form); // 因为一开始的form没有key，会导致不能双向绑定，所以我们用$set
      this.canSubmit = canSubmit;
    },
    async handleSubmit () {
      console.log('canSubmit', this.canSubmit);
      if (!this.canSubmit) { return; }
      let params = this.$lodash.cloneDeep(this.form);
      if (params.password) {
        params.password = md5(params.password);
      }
      let res = await loginIn({
        ...params,
      }, { loading: true });
      if (res && res.code == 200) {
        this.$message({
          message: '登录成功！',
          type: 'success',
        });
        setCookie('token', res.content.token, 3);
        localStorage.setItem('token', res.content.token);
        localStorage.setItem('username', res.content.username);
        localStorage.setItem('name', res.content.name);
        localStorage.setItem('uid', res.content.id);
        await this.getPermissionMenu();
        this.$router.replace({name: 'home'});
        // id: 6
        // username: "admin"
        // password: "c4d3c0f3202239f9285408f5f738b4b3d9748265"
        // name: "测试用户"
        // secret_key: "f3c4d6cbe728ce95889c250944bbfe46"
        // phone: "1806979884"
        // login_ip: "125.119.76.254"
        // last_login: 1587040084
        // disabled: 0
        // create_time: 1584513932
        // update_time: 1584513932
        // roles: ""
        // permissions: ""
        // token: "NiMxNTg3MDQwMTIwQDQ3Ljk4LjI1NS4yMzk6OTk5OSN3ZWIjZjdnRTYyenEzdGFzTGwrdDhWMUkzbHlUcW8wPQ=="
      } else if (res && res.code == 210) { // 出问题就弹出来
        const errorType = {
          u001: 'username',
          u002: 'username',
          u003: 'phone',
          u004: 'code',
          u005: 'code',
          u006: 'password',
          u007: 'code',
        };
        this.errorInfo = this.$lodash.cloneDeep(formMap.get(this.type));
        this.$nextTick(() => {
          this.errorInfo[errorType[res.msg]] = errorCode.get(res.msg).text;
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .tab {
    list-style: none;
    width: 151px;
    height: 120px;
    position: absolute;
    bottom: 150px;
    left: -151px;
    background: url("../../assets/bg_login_tab_active.png") no-repeat;
    padding: 7px 0;
    background-position: 0 -20px;
    color: white;
    transition: background-position 0.3s ease-in;
    &.user-tab {
      background-position: 0 -20px;
    }
    &.verify-code-tab {
      background-position: 0 (-20px + (1 * 60px));
    }
    li {
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      box-sizing: border-box;
      padding-left: 25px;
      cursor: pointer;
      transition: color 0.3s ease-in;
      &.active {
        color: #ef8354;
      }
    }
  }
  @media screen and (max-width: 1500px) {
    .tab {
      bottom: 107px;
    }
  }
  .form-part {
    width: 296px;
    margin: auto;
    margin-bottom: 56px;
  }


  /**
  * button
  */
  @btn-transform-assist-color: #505D75;
  @btn-transform-assist-middle-color: #434F65;
  @btn-transform-assist-deep-color: #434F65;
  @btn-transform-assist-middle-disabled-color: rgba(80,93,117, 0.12);
  @btn-transform-assist-deep-disabled-color: rgba(67,79,101, 0.12);

  @btn-shadow-color: rgba(71,83,105,0.4);
  .sc-btn {
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }
  .sc-btn-transform {
    width: 296px;
    height: 46px;
    color: white;
    font-size: 20px;
    line-height: 46px;
    background-image: linear-gradient(to right, @btn-transform-assist-color, @btn-transform-assist-middle-color);
    box-shadow:0px 25px 24px -8px @btn-shadow-color;
    transition: box-shadow 0.2s ease-out;
    &:active {
      background-image: linear-gradient(to right, @btn-transform-assist-middle-color, @btn-transform-assist-deep-color);
      box-shadow:0px 13px 12px -4px @btn-shadow-color;
    }
    &.disabled {
      background-image: linear-gradient(to right, @btn-transform-assist-middle-disabled-color, @btn-transform-assist-deep-disabled-color);
      box-shadow: none;
      cursor: not-allowed;
    }
  }
  .sc-btn-block {
    display: block;
    margin: auto;
  }
}
</style>
