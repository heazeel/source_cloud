<!--
 * @Description: 用户管理
 * @Author: linjia
 * @Date: 2020-05-22 17:28:11
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-14 16:41:16
-->
<template>
  <!-- TODO -->
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="system_data_user"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form ref="search-form">
      <el-form-item prop="username">
        <el-input v-model="searchForm.username"
          clearable
          placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="phone" :rules="$tools.formRules.pureNumber">
        <el-input v-model="searchForm.phone"
          type="number"
          clearable
          placeholder="手机号"></el-input>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'system_data_user_create'" type="operate" @click="$router.push({name: 'system_data_user_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column prop="username" label="账号" width="310"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="130"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
      <el-table-column prop="disabled"
        label="状态"
        fixed="right"
        width="70">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.disabled"
            :disabled="!$tools.checkPermission('system_data_user_status_update')"
            :active-value="0"
            :inactive-value="1"
            validate-event
            @change="statusUpdate($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="125">
        <template slot-scope="scope">
          <!-- <button-tooltip-icon v-has="'system_data_user_look'"
            icon-title="查看"
            icon-class="iconsc-icon-look"
            @click="$router.push({name: 'system_data_user_look', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'system_data_user_update'"
            icon-title="编辑"
            icon-class="iconsc-icon-edit"
            @click="$router.push({name: 'system_data_user_update', query: {id: scope.row.id}})"></button-tooltip-icon> -->
          <button-tooltip-icon-operation v-has="'system_data_user_look'" type="look" @click="$router.push({name: 'system_data_user_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'system_data_user_update'" type="update" @click="$router.push({name: 'system_data_user_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'system_data_user_reset_password'"
            icon-title="重置密码"
            icon-class="iconsc-icon-resetpassword"
            @click="resetPassword(scope.row)"></button-tooltip-icon>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view></router-view>
  </page-list>
</template>

<script>
import { search, statusUpdate, passwordReset } from '@/api/user';
export default {
  name: 'UserIndex',
  data () {
    return {
      searchForm: {username: null, phone: null},
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        data: [],
      },
    };
  },
  methods: {
    async getList (pageObj) {
      this.pageObj = pageObj || this.pageObj;
      let res = await search({
        ...this.searchForm,
        ...this.pageObj,
      }, { loading: true });
      if (res.code != 200) { return; }
      else {
        this.listsData = res.content;
      }
    },
    async statusUpdate (value, row) {
      const disabledName = [{name: '启用', text: `是否确认启用 ${row.name} 的账号？`}, {name: '禁用', text: `是否确认禁用 ${row.name} 的账号？禁用将会导致用户不可用`}];
      let flag = Number(!row.disabled); // true 1 false 0
      row.disabled = flag;
      let _this = this;
      this.$confirm(disabledName[value].text, `${disabledName[value].name}账号`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: async function (action, instance, done) {
          if (action === 'confirm') {
            let res = await statusUpdate({
              id: row.id,
              disabled: value,
            }, { loading: true });
            if (res.code != 200) { return; }
            this.$message({
              type: 'success',
              message: '操作成功!',
              containerType: 'message-box',
              onClose: () => {
                _this.getList();
                done();
              },
            });
          } else {
            done();
          }
        },
      }).catch(e => { /*  */ });
    },
    resetPassword (row) {
      this.$confirm(`是否确认重置${row.username}的密码？重置密码将导致用户重新登录`, '重置密码', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: async function (action, instance, done) {
          if (action === 'confirm') {
            let res = await passwordReset({
              id: row.id,
            }, { loading: true });
            if (res.code != 200) { return; }
            else {
              this.$message({
                type: 'success',
                message: '操作成功!',
                containerType: 'message-box',
                onClose: () => {
                  done();
                },
              });
            }
          } else {
            done();
          }
        },
      }).catch(e => { /*  */ });
    },
  },
};
</script>

<style>

</style>
