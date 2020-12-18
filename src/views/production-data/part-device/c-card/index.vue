<!--
 * @Description: 通信卡
 * @Author: linjia
 * @Date: 2020-09-22 10:05:51
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 14:27:36
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    :search-col="20"
    :operate-col="4"
    router-name="production_data_part_device_c_card"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="card_no">
        <el-input v-model="searchForm.card_no"
          clearable
          placeholder="卡号"></el-input>
      </el-form-item>
      <el-form-item prop="supplier">
        <el-select v-model="searchForm.supplier" clearable placeholder="供应商">
          <el-option
            v-for="item in SUPPLIER_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="provider">
        <el-select v-model="searchForm.provider" clearable placeholder="运营商">
          <el-option
            v-for="item in PROVIDER_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="flow_pool_id">
        <select-remote v-model="searchForm.flow_pool_id"
          :api-key-obj="{type: 'flowPool', funcName: 'remoteSelectSearch'}"
          placeholder="流量池"
          clearable></select-remote>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="searchForm.status" clearable placeholder="状态">
          <el-option
            v-for="item in DEV_C_CARD_LIFE_STATUS"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
    </template>

    <template>
      <div class="total-flow-pool">
        <span>当前条件下，套餐总量 {{ total.package_total_sum | kbToMb }} M，剩余 {{ total.remaining_flow_sum | kbToMb }} M，已用 {{ total.used_flow_sum | kbToMb }} M，昨天使用 {{ total.yesterday_use_flow_sum | kbToMb }} M</span>
      </div>
    </template>

    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <el-upload v-has="'production_data_part_device_c_card_create'"
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
      <button-sc v-has="'production_data_part_device_c_card_create'" type="operate" @click="$router.push({name: 'production_data_part_device_c_card_create'})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column
        fixed
        prop="card_no"
        width="130"
        label="卡号">
      </el-table-column>
      <el-table-column prop="provider" width="100" label="运营商"></el-table-column>
      <el-table-column prop="package_total" width="150" label="套餐总量（M/月）"></el-table-column>
      <el-table-column prop="remaining_flow" width="130" label="剩余流量（M）"></el-table-column>
      <el-table-column prop="total_used_flow" width="130" label="已用流量（M）"></el-table-column>
      <el-table-column prop="yesterday_use_flow" width="160" label="昨天使用流量（M）"></el-table-column>
      <el-table-column prop="price" width="130" label="价格（元）"></el-table-column>
      <el-table-column width="130" label="当前设备">
        <template slot-scope="scope">
          {{ scope.row.device_type | findSelectedText(DEV_TYPE) }} / {{ scope.row.device_no }}
        </template>
      </el-table-column>
      <el-table-column prop="supplier" width="130" label="供应商"></el-table-column>
      <el-table-column prop="flow_pool" width="130" label="流量池"></el-table-column>
      <el-table-column prop="purchase_time" min-width="120" label="采购日期">
        <template slot-scope="scope">
          {{ scope.row.purchase_time | momentFormat('s', 'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="status" width="100" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | findSelectedText(DEV_C_CARD_LIFE_STATUS) }}
        </template>
      </el-table-column>
      <el-table-column prop="comment" min-width="150" label="备注"></el-table-column>
      <el-table-column
        fixed="right"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="'production_data_part_device_c_card_look'" type="look" @click="$router.push({name: 'production_data_part_device_c_card_look', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_part_device_c_card_update'" type="update" @click="$router.push({name: 'production_data_part_device_c_card_update', query: {id: scope.row.id}})"></button-tooltip-icon-operation>
          <button-tooltip-icon-operation v-has="'production_data_part_device_c_card_delete'" type="delete" @click="deleteItem(scope.row)"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { SUPPLIER_TYPE, PROVIDER_TYPE, DEV_C_CARD_LIFE_STATUS, DEV_TYPE } from '@/utils/consts.js';
import { search, deleteItem, createImport, totalSearch } from '@/api/c-card.js';
export default {
  name: 'CCardIndex',
  data () {
    return {
      searchForm: { card_no: null, provider: null, supplier: null, flow_pool_id: null, status: null},
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        data: [],
      },
      SUPPLIER_TYPE,
      PROVIDER_TYPE,
      DEV_TYPE,
      DEV_C_CARD_LIFE_STATUS,
      total: {},
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

      this.getTotal();
    },
    deleteItem (row) {
      this.$listDeleteItem({
        vm: this,
        row: row,
        api: deleteItem,
        message: `是否确认删除${row.card_no}通信卡？`,
        successMessage: `删除${row.card_no}成功!`,
        successCallback: this.getList,
      });
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
    // 查询套餐总量
    async getTotal () {
      let res = await totalSearch({
        ...this.searchForm,
      }, { loading: true });
      if (res.code != 200) { return; }
      this.total = res.content;
    },
  },
};
</script>

<style lang="less" scoped>
.total-flow-pool{
  background-color: #eee!important;
  padding: 8px 0 8px 35px;
  span{
    color: #65738F;
  }
}
</style>
