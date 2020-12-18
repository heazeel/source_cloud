<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_main_device_rcd"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="no">
        <el-input v-model="searchForm.no"
          v-input-number-prevent-wheel
          type="number"
          clearable
          placeholder="序号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code" clearable placeholder="产品编号"></el-input>
      </el-form-item>
      <el-form-item prop="company_id">
        <select-remote v-model="searchForm.company_id"
          placeholder="企业"
          clearable
          :api-key-obj="{type: 'delivery', funcName: 'remoteSelectSearch'}"></select-remote>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_main_device_rcd_create'" type="operate" @click="$router.push({name: 'production_data_main_device_rcd_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column
        fixed
        prop="no"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column prop="code" width="130" label="产品编号"></el-table-column>
      <el-table-column prop="company" width="180" label="所属企业"></el-table-column>
      <el-table-column prop="delivery_time" min-width="120" label="交付日期">
        <template slot-scope="scope">
          {{ scope.row.delivery_time | momentFormat('s', 'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_main_device_rcd_look'" type="look" @click="$router.push({name: 'production_data_main_device_rcd_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_main_device_rcd_update'" type="update" @click="$router.push({name: 'production_data_main_device_rcd_update', query: {id: scope.row.id, status: scope.row.status}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'production_data_main_device_rcd_delivery'"
            icon-title="交付"
            icon-class="iconsc-icon-deliver"
            @click="$router.push({name: 'production_data_main_device_rcd_delivery', query: {device_type: 'h-uap', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_main_device_rcd_maintain_record'"
            icon-title="维护"
            icon-class="iconsc-icon-maintain"
            @click="$router.push({name: 'production_data_main_device_rcd_maintain_record', query: {device_type: 'h-uap', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon-operation v-has="'production_data_main_device_rcd_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { search, deleteItem } from '@/api/rcd.js';
export default {
  name: 'RcdIndex',
  data () {
    return {
      searchForm: {no: null, code: null, company_id: null},
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
      this.listsData = res.content;
    },
    deleteItem (row) {
      this.$listDeleteItem({
        vm: this,
        row: row,
        api: deleteItem,
        message: `是否确认删除${row.code}的导控器？`,
        successMessage: `删除${row.code}成功!`,
        successCallback: this.getList,
      });
    },
  },
};
</script>

<style>

</style>
