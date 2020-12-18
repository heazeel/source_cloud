<!--
 * @Description: 电池型号
 * @Author: linjia
 * @Date: 2020-07-13 15:27:29
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-03 11:35:15
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_model_battery"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code"
          clearable
          placeholder="电池型号型号名称">
        </el-input>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_model_battery_create'"
        type="operate"
        @click="$router.push({name: 'production_data_model_battery_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column prop="code"
        label="名称"
        width="210"></el-table-column>
      <el-table-column prop="time_check_period"
        label="定检时间周期（天）"
        width="180"></el-table-column>
      <el-table-column prop="use_check_period"
        label="定检使用周期（h）"
        min-width="180"></el-table-column>
      <el-table-column label="操作"
        width="125"
        fixed="right">
        <template slot-scope="scope">
          <!-- <button-tooltip-icon v-has="'production_data_model_battery_look'"
            icon-title="查看"
            icon-class="iconsc-icon-look"
            @click="$router.push({name: 'production_data_model_battery_look', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_model_battery_update'"
            icon-title="编辑"
            icon-class="iconsc-icon-edit"
            @click="$router.push({name: 'production_data_model_battery_update', query: {id: scope.row.id}})"></button-tooltip-icon> -->
          <!-- <button-tooltip-icon-operation v-has="'production_data_model_battery_delete'"
            permission-name="production_data_model_battery_delete"
            type="delete"
            :row="scope.row"
            :message="`是否确认删除${scope.row.code}的电池型号？`"
            :api="api.modelDelete"
            @success-close="getList"></button-tooltip-icon-operation> -->
          <button-tooltip-icon-operation v-has="'production_data_model_battery_look'" type="look" @click="$router.push({name: 'production_data_model_battery_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_model_battery_update'" type="update" @click="$router.push({name: 'production_data_model_battery_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_model_battery_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <router-view></router-view>
  </page-list>
</template>

<script>
import { modelSearch, modelDelete } from '@/api/battery.js';
import { errorCode } from '@/utils/consts.js';
export default {
  name: 'BatteryIndex',
  data () {
    return {
      searchForm: { code: null },
      pageObj: { page_no: 1, page_size: 10 },
      listsData: {
        count: 0,
        data: [],
      },
      api: {
        modelDelete,
        modelSearch,
      },
    };
  },
  methods: {
    async getList (pageObj) {
      this.pageObj = pageObj || this.pageObj;
      let res = await modelSearch({
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
        api: modelDelete,
        message: `是否确认删除${row.code}的电池型号？`,
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
