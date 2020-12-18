<!--
 * @Description: 固件发布
 * @Author: hezhijie
 * @Date: 2020-09-22 10:05:51
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-16 17:57:50
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    :router-name="`operation_maintenance_firmware_release_${deviceType}`"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="version_no">
        <el-input v-model="searchForm.version_no"
          v-input-number-prevent-wheel
          clearable
          placeholder="请输入版本号"></el-input>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="`operation_maintenance_firmware_release_${deviceType}_create`" type="operate" @click="$router.push({name: `operation_maintenance_firmware_release_${deviceType}_create`})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column fixed
        prop="id"
        width="100"
        label="ID">
      </el-table-column>
      <el-table-column prop="version_no" width="180" label="版本号"></el-table-column>
      <el-table-column width="180" label="系统信息">
        <template slot-scope="scope">
          {{ scope.row.sys_branch }}
          <br>
          {{ scope.row.sys_version }}
          <br>
          {{ scope.row.sys_ip_port }}
        </template>
      </el-table-column>
      <el-table-column width="200" label="应用程序信息">
        <template slot-scope="scope">
          {{ scope.row.app_branch }}
          <br>
          {{ scope.row.app_version }}
          <br>
          {{ scope.row.app_ip_port }}
        </template>
      </el-table-column>
      <el-table-column prop="used_flow" width="200" label="依赖库信息">
        <template slot-scope="scope">
          {{ scope.row.lib_branch }}
          <br>
          {{ scope.row.lib_version }}
          <br>
          {{ scope.row.lib_ip_port }}
        </template>
      </el-table-column>
      <el-table-column prop="comment" width="180" label="备注"></el-table-column>
      <el-table-column min-width="130" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | momentFormat('s') }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="`operation_maintenance_firmware_release_${deviceType}_delete`" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { search, deleteItem } from '@/api/firmware-release.js';
export default {
  name: 'FirmwareReleaseIndex',
  props: {
    deviceType: {
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      searchForm: { card_no: null, provider: null, supplier: null, model_id: null, status: null},
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        data: [],
      },
      device_type: null,
    };
  },
  created () {
    // switch (this.deviceType) {
    // case 'drone':
    //   this.device_type = 'uav';
    //   break;
    // case 'rcd':
    //   this.device_type = 'src';
    //   break;
    // case 'ustation':
    //   this.device_type = 'uap';
    //   break;
    // default:
    //   break;
    // }
    this.device_type = this.$tools.deviceTypeNameConversion(this.deviceType);
  },
  methods: {
    async getList (pageObj) {
      this.pageObj = pageObj || this.pageObj;
      let res = await search({
        ...this.searchForm,
        ...this.pageObj,
      }, { loading: true });
      if (res.code != 200) { return; }
      this.listsData.data = [];
      res.content.firmwares.forEach((item) => {
        if (item.device_type === this.device_type) {
          this.listsData.data.push(item);
        }
      });
      this.listsData.count = this.listsData.data.length;
    },
    deleteItem (row) {
      this.$listDeleteItem({
        vm: this,
        row: row,
        api: deleteItem,
        message: `是否确认删除版本号为${row.version_no}的固件？`,
        successMessage: `删除${row.version_no}成功!`,
        successCallback: this.getList,
      });
    },
  },
};
</script>

<style>

</style>
