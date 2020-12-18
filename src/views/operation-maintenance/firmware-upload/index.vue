<!--
 * @Description: 固件上传
 * @Author: hezhijie
 * @Date: 2020-04-11 10:10:20
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 17:59:15
 -->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.firmwares"
    :total-count="listsData.count"
    router-name="firmware-upload"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="device_type">
        <el-select v-model="searchForm.device_type" placeholder="请选择设备类型">
          <el-option
            v-for="item in DEV_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'operation_maintenance_firmware_upload_create'" type="operate" @click="$router.push({name: 'operation_maintenance_firmware_upload_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column prop="device_type" label="设备类型" width="180">
        <template slot-scope="scope">
          {{ scope.row.device_type | findSelectedText(DEV_TYPE) }}
        </template>
      </el-table-column>
      <el-table-column prop="version" label="版本" width="180">
        <template slot-scope="scope">
          {{ scope.row.version | findSelectedText(VERSION) }}
        </template>
      </el-table-column>
      <el-table-column prop="version_no" label="版本号" width="220"></el-table-column>
      <el-table-column prop="upload_status" label="上传进度" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.upload_status | findSelectedText(UPLOAD_STATUS) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'operation_maintenance_firmware_upload_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view></router-view>
  </page-list>
</template>

<script>
import { search, deleteItem } from '@/api/firmware-upload.js';
import { DEV_TYPE, VERSION, UPLOAD_STATUS } from '@/utils/consts.js';
import { errorCode } from '@/utils/consts.js';
export default {
  name: 'FirmwareUpload',
  data () {
    return {
      searchForm: {device_type: 'uav'},
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        firmwares: [],
      },
      DEV_TYPE,
      VERSION,
      UPLOAD_STATUS,
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
      let params = {
        device_type: row.device_type,
        version: row.version,
        version_no: row.version_no,
        file_name: row.file_name,
      };
      this.$listDeleteItem({
        vm: this,
        row: row,
        params: params,
        api: deleteItem,
        message: `是否确认删除${row.version_no}的固件？`,
        successMessage: `删除${row.version_no}成功!`,
        successCallback: this.getList,
        needAlertWarning: true,
      });
    },
  },
};
</script>

<style>

</style>
