<!--
 * @Description: factoryIndex
 * @Author: linjia
 * @Date: 2020-04-09 14:35:02
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-18 15:34:27
 -->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_base_data_factory"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="name">
        <el-input v-model="searchForm.name"
          clearable
          placeholder="请输入原厂"></el-input>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_base_data_factory_create'" type="operate" @click="$router.push({name: 'production_data_base_data_factory_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column fixed
        prop="id"
        width="100"
        label="序号">
      </el-table-column>
      <el-table-column prop="name" width="150" label="原厂"></el-table-column>
      <el-table-column prop="code" width="170" label="原厂编码"></el-table-column>
      <el-table-column prop="create_time" width="220" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time" min-width="220" label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_base_data_factory_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { search, deleteItem, factoryInModel } from '@/api/part-factory.js';
export default {
  name: 'FactoryIndex',
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
      let res = await search({
        ...this.searchForm,
        ...this.pageObj,
      }, { loading: true });
      if (res.code != 200) { return; }
      this.listsData = res.content;
    },
    deleteItem (row) {
      this.$listDeleteItem({
        vm: this,
        row: row,
        api: deleteItem,
        message: `是否确认删除${row.name}的原厂？`,
        successMessage: `删除${row.name}成功!`,
        successCallback: this.getList,
        needAlertWarning: true,
      });
    },
  },
};
</script>

<style>

</style>
