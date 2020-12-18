<!--
 * @Description: 验证码登录
 * @Author: linjia
 * @Date: 2020-04-16 09:53:34
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-21 16:17:11
 -->
<template>
  <div class="login-verify-code">
    <input-animation v-model="form.phone"
      type="number"
      label="手机号"
      placeholder="请输入手机号"
      :error-info="errorInfoObj.phone"
      @blur="checkValid('phone', true)"
      @input="checkValid('phone')">
    </input-animation>
    <input-animation v-model="form.code"
      type="number"
      label="验证码"
      placeholder="请输入验证码"
      :error-info="errorInfoObj.code"
      @input="checkValid('code')">
      <span v-show="countDown == 0"
        class="verify-code get-verify"
        :class="{disabled: errorInfoObj.phone !== ''}"
        @click="sendVerify">获取验证码</span>
      <span v-show="countDown > 0"
        class="verify-code verify-count-down">{{ countDown }}s</span>
    </input-animation>
  </div>
</template>

<script>
import { phoneCodeSend, existedSearch } from '@/api/user.js';
import { errorCode } from '@/utils/consts.js';
export default {
  name: 'LoginVerifyCode',
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
        login_type: 2,
        phone: '',
        code: '',
      },
      errorInfoObj: {
        phone: null,
        code: null,
      },
      countDown: 0,
      countDownInterval: null,
      canSubmit: false,
    };
  },
  watch: {
    errorInfo: {
      handler (newVal) {
        if (newVal.phone) {
          this.errorInfoObj.phone = newVal.phone;
        }
        if (newVal.code) {
          this.errorInfoObj.code = newVal.code;
        }
      },
      deep: true,
    },
    'form.phone': {
      handler () {
        if (this.errorInfoObj.phone == '' && this.countDownInterval) {
          clearInterval(this.countDownInterval);
          this.countDown = 0;
          this.countDownInterval = null;
        }
      },
    },
  },
  destroyed () {
    if (this.countDownInterval) {
      clearInterval(this.countDownInterval);
      this.countDownInterval = null;
    }
  },
  methods: {
    async checkValid (type, checkExit) {
      if (type == 'phone') {
        this.errorInfoObj.phone = await this.checkPhone(checkExit);
      }
      if (type == 'code') {
        this.errorInfoObj.code = this.checkCode();
      }
      this.canSubmit = this.errorInfoObj.phone == this.errorInfoObj.code && this.errorInfoObj.code == '';
      this.$emit('form-value-change', {form: this.form, error: this.errorInfoObj, canSubmit: this.canSubmit});
    },
    async checkPhone (checkExit) {
      let errorInfoObj = '';
      if (!this.form.phone) {
        errorInfoObj = null; // 当做啥都没发生
      } else if (!/^1[0-9]{10}$/.exec(this.form.phone)) {
        errorInfoObj = '请输入11位正确格式手机号码';
      } else if (checkExit) {
        let res = await existedSearch({
          phone: this.form.phone,
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
    checkCode () {
      let errorInfoObj = '';
      if (!this.form.code) {
        errorInfoObj = null; // 当做啥都没发生
      } else if (!/^[0-9]{6}$/.exec(this.form.code)) {
        errorInfoObj = '请输入6位正确验证码';
      }
      return errorInfoObj;
    },
    async sendVerify (e) {
      e.preventDefault(); // 防止input被点了
      if (this.errorInfoObj.phone === '') { // 为 '' 的时候是检查过并通过状态
        let res = await phoneCodeSend({
          phone: this.form.phone,
        });
        if (res.code == 200) {
          this.countDownFunc();
        } else if (res.code == 210) {
          const errorType = {
            u003: 'phone',
            u004: 'code',
            u005: 'code',
            u007: 'code',
          };
          // console.log(errorType[res.msg], errorCode.get(res.msg).text);
          this.errorInfoObj[errorType[res.msg]] = errorCode.get(res.msg).text;
        }
      }
    },
    // 倒计时处理函数
    countDownFunc () {
      this.countDown = 60;
      this.countDownInterval = setInterval(() => {
        this.countDown--;
        if (this.countDown == 0) {
          clearInterval(this.countDownInterval);
          this.countDownInterval = null;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/base.less";
.verify-code {
  width: 80px;
  position: absolute;
  right: 0;
  bottom: 8px;
  color: @primary-color;
  text-align: right;
  &.get-verify {
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
  &.verify-count-down {
    color: rgba(38, 65, 91, 0.4);
    cursor: not-allowed;
  }
}
</style>
