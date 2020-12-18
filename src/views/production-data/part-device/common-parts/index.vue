<!--
 * @Description: 通用零部件
 * @Author: linjia
 * @Date: 2020-09-22 10:05:51
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 15:21:24
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    :search-col="20"
    :operate-col="4"
    router-name="production_data_part_device_common_parts"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code"
          clearable
          placeholder="编号"></el-input>
      </el-form-item>
      <el-form-item prop="type_id">
        <select-remote v-model="searchForm.type_id"
          :label="searchForm.type_id"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteTypeSelect'}"
          placeholder="类别"
          clearable></select-remote>
      </el-form-item>
      <el-form-item prop="factory_id">
        <select-remote v-model="searchForm.factory_id"
          :label="searchForm.factory_id"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteFactorySelect'}"
          placeholder="原厂"
          clearable></select-remote>
      </el-form-item>
      <el-form-item prop="model_id">
        <select-remote v-model="searchForm.model_id"
          label-key="code"
          :label="searchForm.model_id"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteModelSelect'}"
          placeholder="型号"
          clearable></select-remote>
      </el-form-item>
      <el-form-item prop="device_type">
        <el-select v-model="searchForm.device_type"
          clearable
          placeholder="设备类型"
          @change="clearDeviceId"
          @clear="hideSelectionBox">
          <el-option
            v-for="item in DEV_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="searchForm.device_type !== null" prop="device_id">
        <select-remote v-model="searchForm.device_id"
          :label="searchForm.device_id"
          :params="{device_type: searchForm.device_type}"
          :api-key-obj="{type: 'commonParts', funcName: 'remoteUAVCodeSelect'}"
          placeholder="设备"
          clearable></select-remote>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="'production_data_part_device_common_parts_create'" type="operate" @click="$router.push({name: 'production_data_part_device_common_parts_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column
        fixed
        prop="code"
        width="210"
        label="编号">
      </el-table-column>
      <el-table-column prop="type" width="130" label="类别"></el-table-column>
      <el-table-column prop="factory" width="130" label="原厂"></el-table-column>
      <el-table-column prop="model" width="130" label="型号"></el-table-column>
      <el-table-column width="160" label="当前设备">
        <template slot-scope="scope">
          {{ scope.row.device_type | findSelectedText(DEV_TYPE) }} / {{ scope.row.device_id }}
        </template>
      </el-table-column>
      <el-table-column prop="total_time" width="160" label="累计使用时长（h）"></el-table-column>
      <el-table-column prop="remain_day" width="150" label="据下次维护（天）"></el-table-column>
      <el-table-column prop="remain_hour" width="150" label="据下次维护（h）"></el-table-column>
      <el-table-column prop="status" width="130" label="状态"></el-table-column>
      <el-table-column prop="comment" min-width="150" label="备注"></el-table-column>
      <el-table-column
        fixed="right"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_part_device_common_parts_update'" type="update" @click="$router.push({name: 'production_data_part_device_common_parts_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'production_data_part_device_common_parts_maintain_record'"
            icon-title="变更记录"
            icon-class="iconsc-icon-maintain"
            @click="$router.push({name: 'production_data_part_device_common_parts_maintain_record', query: {part_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon-operation v-has="'production_data_part_device_common_parts_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { SUPPLIER_TYPE, PROVIDER_TYPE, DEV_C_CARD_LIFE_STATUS, DEV_TYPE } from '@/utils/consts.js';
import { search, deleteItem} from '@/api/common-parts.js';
export default {
  name: 'CCardIndex',
  data () {
    return {
      searchForm: { code: null, type_id: null, factory_id: null, model_id: null, device_type: null, device_id: null},
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        data: [],
      },
      DEV_TYPE,
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
        message: `是否确认删除${row.code}的零部件？`,
        successMessage: `删除${row.code}成功!`,
        successCallback: this.getList,
      });
    },
    // 清除设备id
    clearDeviceId () {
      this.searchForm.device_id = null;
    },
    // 隐藏设备id选择框
    hideSelectionBox () {
      this.searchForm.device_type = null;
      this.searchForm.device_id = null;
    },
  },
};
</script>

<style>

</style>
