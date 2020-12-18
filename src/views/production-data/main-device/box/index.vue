<!--
 * @Description: 货箱
 * @Author: linjia
 * @Date: 2020-09-11 09:37:27
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 18:22:59
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    router-name="production_data_main_device_box"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="no">
        <el-input v-model="searchForm.no"
          v-input-number-prevent-wheel
          type="number"
          clearable
          placeholder="RFID卡号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code" clearable placeholder="货箱编号"></el-input>
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
      <el-upload v-has="'production_data_main_device_box_create'"
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
      <button-sc v-has="'production_data_main_device_box_create'" type="operate" @click="$router.push({name: 'production_data_main_device_box_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column
        fixed
        prop="no"
        width="150"
        label="RFID卡号">
      </el-table-column>
      <el-table-column prop="code" width="130" label="货箱编号"></el-table-column>
      <el-table-column prop="company" width="180" label="所属企业"></el-table-column>
      <el-table-column prop="delivery_time" min-width="120" label="交付日期">
        <template slot-scope="scope">
          {{ scope.row.delivery_time | momentFormat('s', 'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="130"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_main_device_box_look'" type="look" @click="$router.push({name: 'production_data_main_device_box_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_main_device_box_update'" type="update" @click="$router.push({name: 'production_data_main_device_box_update', query: {id: scope.row.id, status: scope.row.status}})"></button-tooltip-icon-operation>
          <button-tooltip-icon v-has="'production_data_main_device_box_delivery'"
            icon-title="交付"
            icon-class="iconsc-icon-deliver"
            @click="$router.push({name: 'production_data_main_device_box_delivery', query: {device_type: 'h-uap', device_id: scope.row.id}})"></button-tooltip-icon>
          <button-tooltip-icon-operation v-has="'production_data_main_device_box_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { search, deleteItem, createImport } from '@/api/box.js';
export default {
  name: 'BoxIndex',
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
        message: `是否确认删除${row.code}的货箱？`,
        successMessage: `删除${row.code}成功!`,
        successCallback: this.getList,
      });
    },
    // 导入
    // createByImportFile (file, fileList) {
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
