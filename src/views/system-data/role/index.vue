<!--
 * @Description: 角色
 * @Author: linjia
 * @Date: 2020-04-11 10:10:20
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-03 11:31:59
 -->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="system_data_role"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="name">
        <el-input v-model="searchForm.name" clearable placeholder="角色名称"></el-input>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'system_data_role_create'" type="operate" @click="$router.push({name: 'system_data_role_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column prop="name" label="名称" width="310"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.update_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="125">
        <template slot-scope="scope">
          <!-- <button-tooltip-icon v-has="'system_data_role_look'"
            icon-title="查看"
            icon-class="iconsc-icon-look"
            @click="$router.push({name: 'system_data_role_look', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'system_data_role_update'"
            icon-title="编辑"
            icon-class="iconsc-icon-edit"
            @click="$router.push({name: 'system_data_role_update', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'system_data_role_delete'"
            icon-title="删除"
            icon-class="iconsc-icon-delete"
            @click="deleteItem(scope.row)"></button-tooltip-icon> -->
          <button-tooltip-icon-operation v-has="'system_data_role_look'" type="look" @click="$router.push({name: 'system_data_role_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'system_data_role_update'" type="update" @click="$router.push({name: 'system_data_role_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'system_data_role_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view></router-view>
  </page-list>
</template>

<script>
import { search, deleteItem as roleDelete } from '@/api/role';
export default {
  name: 'RoleIndex',
  data () {
    return {
      searchForm: {name: null},
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
      console.log(res.content);
      if (res.code != 200) { return; }
      this.listsData = res.content;
    },
    deleteItem (row) {
      this.$listDeleteItem({
        vm: this,
        row: row,
        api: roleDelete,
        message: '删除后，拥有此角色的用户将失去相关权限，是否继续？',
        successMessage: `删除${row.name}成功!`,
        successCallback: this.getList,
      });
    },
  },
};
</script>

<style>

</style>
