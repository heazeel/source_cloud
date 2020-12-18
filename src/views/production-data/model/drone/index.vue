<!--
 * @Description: 无人机型号
 * @Author: linjia
 * @Date: 2020-07-13 15:26:23
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-10 11:07:34
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_model_drone"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code" clearable placeholder="无人机型号名称">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="bty_md_id">
        <select-remote v-model="searchForm.bty_md_id"
          label-key="code"
          :api-key-obj="{type: 'battery', funcName: 'remoteSelectSearch'}"
          placeholder="电池型号"
          clearable></select-remote>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_model_drone_create'" type="operate" @click="$router.push({name: 'production_data_model_drone_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column prop="code" label="名称" width="210"></el-table-column>
      <el-table-column prop="time_check_period" label="定检时间周期（天）" width="180"></el-table-column>
      <el-table-column prop="use_check_period" label="定检使用周期（h）" min-width="180"></el-table-column>
      <el-table-column label="操作" width="125" fixed="right">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_model_drone_look'" type="look" @click="$router.push({name: 'production_data_model_drone_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_model_drone_update'" type="update" @click="$router.push({name: 'production_data_model_drone_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'production_data_model_drone_alarm'"
            icon-title="告警"
            icon-class="iconsc-icon-warn"
            @click="$router.push({name: 'production_data_model_drone_alarm', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon-operation v-has="'production_data_model_drone_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <router-view></router-view>
  </page-list>
</template>

<script>
import { modelSearch, modelDelete } from '@/api/drone.js';
import { errorCode } from '@/utils/consts.js';
export default {
  name: 'DroneIndex',
  data () {
    return {
      searchForm: {code: null, bty_md_id: null},
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
      let res = await modelSearch({
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
        api: modelDelete,
        message: `是否确认删除${row.code}的无人机型号？`,
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
