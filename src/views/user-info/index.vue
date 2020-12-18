<!--
 * @Description: 用户信息
 * @Author: linjia
 * @Date: 2020-04-18 15:56:13
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-09 09:46:10
 -->
<template>
  <div class="user-info">
    <span>{{ username }}</span>
    <el-dropdown trigger="click"
      size="mini"
      placement="top"
      @command="handleCommand">
      <el-avatar class="avatar"
        icon="el-icon-user-solid"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="loginOut">
          退出登录
        </el-dropdown-item>
        <el-dropdown-item command="changePwd">
          修改密码
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <update-password v-if="updatePasswordDialog" @cancel="updatePasswordDialog = false"></update-password>
  </div>
</template>

<script>
import { loginOut } from '@/api/login.js';
export default {
  name: 'UserInfo',
  components: {
    'update-password': () => import(/* webpackChunkName: "update-password" */ './update-password.vue'),
  },
  data () {
    return {
      username: localStorage.getItem('username'),
      updatePasswordDialog: false,
    };
  },
  methods: {
    handleCommand (value) {
      if (value) {
        this[value]();
      }
    },
    loginOut () {
      const _this = this;
      this.$confirm('是否确认退出登录？', '退出登录', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: async function (action, instance, done) {
          if (action === 'confirm') {
            let res = await loginOut();
            if (res.code != 200) { return; }
            this.$message({
              type: 'success',
              message: '退出登录成功！正在跳转至登录页...',
              containerType: 'message-box',
              onClose: () => {
                _this.$router.replace({name: 'login'});
                done();
              },
            });
          } else {
            done();
          }
        },
      }).catch(e => { /*  */ });
    },
    changePwd () {
      this.updatePasswordDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>
.user-info {
  text-align: center;
  color: white;
  .avatar {
    vertical-align: middle;
    margin: 0 10px;
    cursor: pointer;
    outline: none;
  }
}
</style>
