<!--
 * @Description: 零部件电池
 * @Author: linjia
 * @Date: 2020-09-14 16:00:07
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 15:42:33
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_part_device_battery"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code" clearable placeholder="产品编号">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="model_id">
        <select-remote v-model="searchForm.model_id"
          :api-key-obj="{type: 'battery', funcName: 'remoteSelectSearch'}"
          label-key="code"
          placeholder="电池型号"
          clearable></select-remote>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <el-link v-has="'production_data_part_device_battery_create'"
        :underline="false"
        style="margin-right: 22px; user-select: none;"
        class="assist-color">
        <i class="iconfont iconsc-icon-templatedownload"></i>&nbsp;下载模板
      </el-link>
      <el-upload v-has="'production_data_part_device_battery_create'"
        action="#"
        accept=".xlsx,.xls"
        :auto-upload="false"
        :show-file-list="false"
        style="display:inline-block;"
        :on-change="createByImportFile">
        <button-sc type="operate" style="margin-right: 10px;">
          导入
        </button-sc>
      </el-upload>
      <button-sc v-has="'production_data_part_device_battery_create'" type="operate" @click="$router.push({name: 'production_data_part_device_battery_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column
        fixed
        prop="code"
        width="150"
        label="编号">
      </el-table-column>
      <el-table-column prop="company" width="180" label="所属企业"></el-table-column>
      <el-table-column prop="model" width="120" label="型号"></el-table-column>
      <el-table-column prop="comment" min-width="200" label="备注"></el-table-column>
      <el-table-column
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_part_device_battery_look'" type="look" @click="$router.push({name: 'production_data_part_device_battery_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_part_device_battery_update'" type="update" @click="$router.push({name: 'production_data_part_device_battery_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_part_device_battery_config'" type="config" @click="$router.push({name: 'production_data_part_device_battery_config', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'production_data_part_device_battery_delivery'"
            icon-title="交付"
            icon-class="iconsc-icon-deliver"
            @click="$router.push({name: 'production_data_part_device_battery_delivery', query: {device_type: 'src', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon v-has="'production_data_part_device_battery_maintain_record'"
            icon-title="维护"
            icon-class="iconsc-icon-maintain"
            @click="$router.push({name: 'production_data_part_device_battery_maintain_record', query: {device_type: 'src', device_id: scope.row.id}})"></button-tooltip-icon>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { search, createImport } from '@/api/battery.js';
export default {
  name: 'BatteryIndex',
  data () {
    return {
      searchForm: { code: null, model_id: null},
      listsData: {
        count: 0,
        data: [],
      },
      pageObj: {page_no: 1, page_size: 10},
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
    // 导入
    async createByImportFile (file, fileList) {
      let params = new FormData();
      params.append('file_content', file.raw);
      let res = await createImport(params, {loading: true});
      if (res.code != 200) {
        if (res.code == 210) {
          const h = this.$createElement;
          const content = res.content;
          let invalid = content.invalid_no.map(ele => h('p', {style: 'position: relative;'}, [
            h('span', {style: 'display:inline-block;padding: 2px 8px;background: white;'}, ele.code),
            h('span', {style: 'display:inline-block;padding: 2px 8px;background: white;float:right'}, `第${ele.index}行`),
          ]));
          let exist = content.exist_no.map(ele => h('p', {style: 'position: relative;'}, [
            h('span', {style: 'display:inline-block;padding: 2px 8px;background: white;'}, ele.code),
            h('span', {style: 'display:inline-block;padding: 2px 8px;background: white;float:right'}, `第${ele.index}行`),
          ]));
          this.$msgbox({
            title: '失败提示',
            message: h('div', null,
              [h('p', null, '以下编号已存在')]
                .concat(exist)
                .concat([h('p', {style: 'margin-top: 9px'}, '以下编号非法')])
                .concat(invalid)),
            confirmButtonText: '确定',
          });
        }
      }
      this.getList();
    },
  },
};
</script>

<style>

</style>
