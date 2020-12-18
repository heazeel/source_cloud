<!--
 * @Description: 用户信息查看
 * @Author: linjia
 * @Date: 2020-05-25 15:43:42
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-04 16:05:20
-->
<template>
  <dialog-sc
    read-only
    size="small"
    title="用户查看"
    @cancel="$router.back()"
    @open="getInfo">
    <ul class="look-ul">
      <li><p><label>账号：</label>{{ form.username }}</p></li>
      <li><p><label>手机号：</label>{{ form.phone }}</p></li>
      <li><p><label>姓名：</label>{{ form.name }}</p></li>
      <li><p><label>角色：</label>{{ form.roles | rolesName }}</p></li>
    </ul>
  </dialog-sc>
</template>

<script>
import { detailSearch } from '@/api/user.js';
export default {
  name: 'UserLook',
  filters: {
    rolesName (nameArr) {
      return nameArr && nameArr.map(role => role.name).join('/') || '--';
    },
  },
  data () {
    return {
      form: {
        username: '',
        phone: '',
        name: '',
        roles: [],
      },
    };
  },
  methods: {
    async getInfo () {
      let res = await detailSearch({
        id: this.$route.query.id,
      });
      if (res.code !== 200) {
        this.$message({type: 'error', message: '查询信息失败', containerType: 'dialog'});
      } else {
        this.form = res.content;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.look-ul {
  text-align: center;
  p {
    line-height: 34px;
    color: #505D75;
  }
  label {
    opacity: 0.77;
    width: 60px;
  }
}
</style>
