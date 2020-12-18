<!--
 * @Description: 告警管理
 * @Author: hezhijie
 * @Date: 2020-09-22 10:05:51
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-18 10:33:31
-->
<template>
  <page-list :search-form="searchForm"
    :table-data="listsData.data"
    :total-count="listsData.count"
    :router-name="`operation_maintenance_alarm_management_${deviceType}`"
    @list-search="getList">
    <!-- 搜索栏 -->
    <template v-slot:search-form>
      <el-form-item prop="no">
        <el-input v-model="searchForm.no"
          v-input-number-prevent-wheel
          type="number"
          clearable
          placeholder="告警编号"></el-input>
      </el-form-item>
      <el-form-item prop="name_en">
        <el-input v-model="searchForm.name_en"
          v-input-number-prevent-wheel
          clearable
          placeholder="告警名称（英）"></el-input>
      </el-form-item>
    </template>
    <!-- 操作栏 -->
    <template v-slot:operate-btns>
      <button-sc v-has="`operation_maintenance_alarm_management_${deviceType}_create`" type="operate" @click="$router.push({name: `operation_maintenance_alarm_management_${deviceType}_create`})">
        新增 +
      </button-sc>
    </template>
    <!-- 表格 -->
    <template v-slot:table>
      <el-table-column fixed
        prop="no"
        width="100"
        label="编号">
      </el-table-column>
      <el-table-column prop="name" width="200" label="告警名称"></el-table-column>
      <el-table-column prop="name_en" width="250" label="告警名称（英）"></el-table-column>
      <el-table-column prop="level" width="120" label="响应等级"></el-table-column>
      <el-table-column prop="tips" width="300" label="建议操作"></el-table-column>
      <el-table-column width="120" label="是否允许忽略">
        <template slot-scope="scope">
          {{ scope.row.ignored | findSelectedText(ALARM_IGNORED) }}
        </template>
      </el-table-column>
      <el-table-column prop="comment" min-width="300" label="备注"></el-table-column>
      <el-table-column prop="disabled"
        label="状态"
        fixed="right"
        width="70">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.disabled"
            :disabled="!$tools.checkPermission(`operation_maintenance_alarm_management_${deviceType}_status`)"
            :active-value="0"
            :inactive-value="1"
            validate-event
            @change="statusUpdate($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作">
        <template slot-scope="scope">
          <button-tooltip-icon-operation v-has="`operation_maintenance_alarm_management_${deviceType}_update`" type="update" @click="$router.push({name: `operation_maintenance_alarm_management_${deviceType}_update`, query: {id: scope.row.id}})"></button-tooltip-icon-operation>
        </template>
      </el-table-column>
    </template>
    <!-- 子页面 -->
    <router-view />
  </page-list>
</template>

<script>
import { ALARM_LEVEL, ALARM_TYPE, ALARM_DISABLED, ALARM_IGNORED } from '@/utils/consts.js';
import { search, statusUpdate } from '@/api/alarm-management.js';
export default {
  name: 'AlarmManagementIndex',
  props: {
    deviceType: {
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      searchForm: { device_type: null, no: null, name_en: null },
      pageObj: {page_no: 1, page_size: 10},
      listsData: {
        count: 0,
        data: [],
      },
      ALARM_IGNORED,
    };
  },
  created () {
    this.searchForm.device_type = this.$tools.deviceTypeNameConversion(this.deviceType);
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
      res.content.roles.forEach((item) => {
        if (item.device_type === this.$tools.deviceTypeNameConversion(this.deviceType)) {
          this.listsData.data.push(item);
        }
      });
      this.listsData.count = this.listsData.data.length;
    },
    async statusUpdate (value, row) {
      const disabledName = [{name: '启用', text: `是否确认启用 ${row.no} 告警？`}, {name: '禁用', text: `是否确认禁用 ${row.no} 告警？`}];
      let flag = Number(!row.disabled); // true 1 false 0
      row.disabled = flag;
      let _this = this;
      this.$confirm(disabledName[value].text, `${disabledName[value].name}告警`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: async function (action, instance, done) {
          if (action === 'confirm') {
            let res = await statusUpdate({
              id: row.id,
              no: row.no,
              name: row.name,
              name_en: row.name_en,
              alarm_type: row.alarm_type,
              level: row.level,
              ignored: row.ignored,
              disabled: value,
              comment: row.comment,
            }, { loading: true });
            if (res.code != 200) { return; }
            this.$message({
              type: 'success',
              message: '操作成功!',
              containerType: 'message-box',
              onClose: () => {
                _this.getList();
                done();
              },
            });
          } else {
            done();
          }
        },
      }).catch(e => { /*  */ });
    },
  },
};
</script>

<style>

</style>
