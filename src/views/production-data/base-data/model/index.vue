<!--
 * @Description: 型号
 * @Author: linjia
 * @Date: 2020-07-13 15:27:29
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-18 11:56:56
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_base_data_model"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code"
          clearable
          placeholder="型号">
        </el-input>
      </el-form-item>
      <el-form-item prop="factory_id">
        <select-remote v-model="searchForm.factory_id"
          :api-key-obj="{type: 'baseModel', funcName: 'remoteFactorySelect'}"
          placeholder="原厂"
          clearable></select-remote>
      </el-form-item>
      <el-form-item prop="type_id">
        <select-remote v-model="searchForm.type_id"
          :api-key-obj="{type: 'baseModel', funcName: 'remoteTypeSelect'}"
          placeholder="类别"
          clearable></select-remote>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_base_data_model_create'"
        type="operate"
        @click="$router.push({name: 'production_data_base_data_model_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column prop="code"
        label="型号"
        width="150"
        fixed="left"></el-table-column>
      <el-table-column prop="factory"
        label="原厂"
        width="150"></el-table-column>
      <el-table-column prop="type"
        label="类别"
        width="150"></el-table-column>
      <el-table-column prop="use_check_period"
        label="维护时间周期（天）"
        width="180"></el-table-column>
      <el-table-column prop="time_check_period"
        label="维护使用周期（h）"
        width="180"></el-table-column>
      <el-table-column prop="create_time"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time"
        label="修改时间"
        min-width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column label="操作"
        width="90"
        fixed="right">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_base_data_model_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <router-view></router-view>
  </page-list>
</template>

<script>
import { search, deleteItem, modelInHardVersion} from '@/api/base-model.js';
export default {
  name: 'ModelIndex',
  data () {
    return {
      searchForm: { code: null, type_id: null, factory_id: null },
      pageObj: { page_no: 1, page_size: 10 },
      listsData: {
        count: 0,
        data: [],
      },
      api: {
        deleteItem,
        search,
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
      this.listsData = res.content;
    },
    deleteItem (row) {
      this.$listDeleteItem({
        vm: this,
        row: row,
        api: deleteItem,
        message: `是否删除${row.code}型号？`,
        successMessage: `删除${row.code}成功!`,
        successCallback: this.getList,
        needAlertWarning: true,
      });
    },
  },
};
</script>

<style>
</style>
