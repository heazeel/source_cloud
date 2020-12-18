<!--
 * @Description: droneIndex
 * @Author: linjia
 * @Date: 2020-04-09 14:35:02
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-03 10:05:49
 -->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_main_device_drone"
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
      <el-form-item prop="status">
        <el-select v-model="searchForm.status" clearable placeholder="状态">
          <el-option
            v-for="item in DEV_DRONE_LIFE_STATUS"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="company_id">
        <select-remote v-model="searchForm.company_id"
          clearable
          placeholder="企业"
          :api-key-obj="{type: 'delivery', funcName: 'remoteSelectSearch'}"></select-remote>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_main_device_drone_create'" type="operate" @click="$router.push({name: 'production_data_main_device_drone_create'})">
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
      <el-table-column prop="last_fly" width="180" label="最后飞行时间">
        <template slot-scope="scope">
          {{ scope.row.last_fly | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column prop="total_dis" width="165" label="累计飞行里程（km）">
        <template slot-scope="scope">
          {{ scope.row.total_dis | mToKm }}
        </template>
      </el-table-column>
      <el-table-column prop="status" width="100" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | findSelectedText(DEV_DRONE_LIFE_STATUS) }}
        </template>
      </el-table-column>
      <el-table-column prop="delivery_time" min-width="120" label="交付日期">
        <template slot-scope="scope">
          {{ scope.row.delivery_time | momentFormat('s', 'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="240"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_main_device_drone_look'" type="look" @click="$router.push({name: 'production_data_main_device_drone_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_main_device_drone_update'" type="update" @click="$router.push({name: 'production_data_main_device_drone_update', query: {id: scope.row.id, status: scope.row.status}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_main_device_drone_config'" type="config" @click="$router.push({name: 'production_data_main_device_drone_config', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'production_data_main_device_drone_force_update'"
            icon-title="紧急更新"
            icon-class="iconsc-icon-forceupdate"
            @click="$router.push({name: 'production_data_main_device_drone_force_update', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_main_device_drone_log'"
            icon-title="日志"
            icon-class="iconsc-icon-log"
            @click="$router.push({name: 'production_data_main_device_drone_log', query: {id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_main_device_drone_delivery'"
            icon-title="交付"
            icon-class="iconsc-icon-deliver"
            @click="$router.push({name: 'production_data_main_device_drone_delivery', query: {device_type: 'uav', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_main_device_drone_maintain_record'"
            icon-title="维护"
            icon-class="iconsc-icon-maintain"
            @click="$router.push({name: 'production_data_main_device_drone_maintain_record', query: {device_type: 'uav', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon-operation v-has="'production_data_main_device_drone_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
import { search, deleteItem } from '@/api/drone.js';
export default {
  name: 'DroneIndex',
  data () {
    return {
      searchForm: {no: null, code: null, status: null, company_id: null},
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        data: [],
      },
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
        message: `是否确认删除${row.code}的无人机？`,
        successMessage: `删除${row.code}成功!`,
        successCallback: this.getList,
      });
    },
  },
};
</script>

<style>

</style>
