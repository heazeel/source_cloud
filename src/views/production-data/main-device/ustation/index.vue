<!--
 * @Description: 无人站
 * @Author: linjia
 * @Date: 2020-09-02 09:42:56
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 14:15:24
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_main_device_ustation"
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
      <button-sc v-has="'production_data_main_device_ustation_create'" type="operate" @click="$router.push({name: 'production_data_main_device_ustation_create'})">
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
      <el-table-column prop="model" width="80" label="型号"></el-table-column>
      <el-table-column prop="company" width="180" label="所属企业"></el-table-column>
      <el-table-column prop="status" width="100" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | findSelectedText(DEV_DRONE_LIFE_STATUS) }}
        </template>
      </el-table-column>
      <el-table-column prop="schedule" width="120" label="生产进度"></el-table-column>
      <el-table-column prop="delivery_time" width="120" label="交付日期">
        <template slot-scope="scope">
          {{ scope.row.delivery_time | momentFormat('s', 'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="config_file_status" min-width="120" label="配置文件状态">
        <template slot-scope="scope">
          {{ scope.row.config_file_status | findSelectedText(DEV_USTATION_CONFIG_FILE_STATUS) }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_main_device_ustation_look'" type="look" @click="$router.push({name: 'production_data_main_device_ustation_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_main_device_ustation_update'" type="update" @click="$router.push({name: 'production_data_main_device_ustation_update', query: {id: scope.row.id, status: scope.row.status}})"></button-tooltip-icon-operation>
          <!-- <button-tooltip-icon-operation v-has="'production_data_main_device_ustation_config'" type="config" @click="$router.push({name: 'production_data_main_device_ustation_config', query: {id: scope.row.id}})"></button-tooltip-icon-operation> -->
          <!-- <button-tooltip-icon v-has="'production_data_main_device_ustation_config'"
            icon-title="配置文件"
            icon-class="iconsc-icon-configure"
            @click="$router.push({name: 'production_data_main_device_ustation_config', query: {id: scope.row.id}})"></button-tooltip-icon> -->
          <button-tooltip-icon v-has="'production_data_main_device_ustation_delivery'"
            icon-title="交付"
            icon-class="iconsc-icon-deliver"
            @click="$router.push({name: 'production_data_main_device_ustation_delivery', query: {device_type: 'uap', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_main_device_ustation_maintain_record'"
            icon-title="维护"
            icon-class="iconsc-icon-maintain"
            @click="$router.push({name: 'production_data_main_device_ustation_maintain_record', query: {device_type: 'uap', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon-operation v-has="'production_data_main_device_ustation_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { DEV_USTATION_CONFIG_FILE_STATUS, DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
import { search, deleteItem } from '@/api/ustation.js';
export default {
  name: 'UstationIndex',
  data () {
    return {
      searchForm: {no: null, code: null, company_id: null},
      listsData: {
        count: 0,
        data: [],
      },
      pageObj: {page_no: 1, page_size: 10},
      DEV_USTATION_CONFIG_FILE_STATUS,
      DEV_DRONE_LIFE_STATUS,
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
        message: `是否确认删除${row.code}的无人站？`,
        successMessage: `删除${row.code}成功!`,
        successCallback: this.getList,
      });
    },
  },
};
</script>

<style>

</style>
