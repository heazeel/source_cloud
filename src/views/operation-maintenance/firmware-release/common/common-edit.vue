<!--
 * @Description: 固件发布编辑
 * @Author: hezhijie
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-18 11:11:01
-->
<template>
  <drawer-right
    class="firmware-release-edit"
    :title="`固件版本${action.title}`"
    width="700px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :model="form"
      :rules="rules"
      label-width="120px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item
        class="block"
        label="版本号"
        prop="version_no"
        :rules="[{ required: true, message: '请输入版本号'}, $tools.formRules.default, $tools.formRules.code, $tools.formRules.repeatCheck({value: form.version_no, module: 'firmware', field: 'version_no'})]">
        <el-input v-model="form.version_no" placeholder="请输入数字、字母组合"></el-input>
      </el-form-item>
      <el-form-item label="系统信息" prop="sys_ip_port" class="block">
        <el-autocomplete
          v-model="form.sys_branch"
          style="width: 33.3%"
          :fetch-suggestions="querySearch1"
          placeholder="branch">
        </el-autocomplete>
        <el-autocomplete
          v-model="form.sys_version"
          style="width: 33.3%"
          :fetch-suggestions="querySearch2"
          placeholder="version">
        </el-autocomplete>
        <el-select v-if="deviceType === 'drone' || deviceType === 'ustation'"
          v-model="form.sys_ip_port"
          placeholder="ip_port"
          style="width: 33.3%">
          <el-option
            v-for="item in ip_port['sys']"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
        <!-- 导控器还没默认的ip_port，所以导控器用输入的方式 -->
        <el-autocomplete
          v-if="deviceType === 'rcd'"
          v-model="form.sys_ip_port"
          style="width: 33.3%"
          :fetch-suggestions="querySearch7"
          placeholder="ip_port">
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="依赖库信息" prop="lib_ip_port" class="block">
        <el-autocomplete
          v-model="form.lib_branch"
          style="width: 33.3%"
          :fetch-suggestions="querySearch3"
          placeholder="branch">
        </el-autocomplete>
        <el-autocomplete
          v-model="form.lib_version"
          style="width: 33.3%"
          :fetch-suggestions="querySearch4"
          placeholder="version">
        </el-autocomplete>
        <el-select v-if="deviceType === 'drone' || deviceType === 'ustation'"
          v-model="form.lib_ip_port"
          placeholder="ip_port"
          style="width: 33.3%">
          <el-option
            v-for="item in ip_port['lib']"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
        <!-- 导控器还没默认的ip_port，所以导控器用输入的方式 -->
        <el-autocomplete
          v-if="deviceType === 'rcd'"
          v-model="form.lib_ip_port"
          style="width: 33.3%"
          :fetch-suggestions="querySearch8"
          placeholder="ip_port">
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="应用程序信息" prop="app_ip_port" class="block">
        <el-autocomplete
          v-model="form.app_branch"
          style="width: 33.3%"
          :fetch-suggestions="querySearch5"
          placeholder="branch">
        </el-autocomplete>
        <el-autocomplete
          v-model="form.app_version"
          style="width: 33.3%"
          :fetch-suggestions="querySearch6"
          placeholder="version">
        </el-autocomplete>
        <el-select v-if="deviceType === 'drone' || deviceType === 'ustation'"
          v-model="form.app_ip_port"
          placeholder="ip_port"
          style="width: 33.3%">
          <el-option
            v-for="item in ip_port['app']"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
        <!-- 导控器还没默认的ip_port，所以导控器用输入的方式 -->
        <el-autocomplete
          v-if="deviceType === 'rcd'"
          v-model="form.app_ip_port"
          style="width: 33.3%"
          :fetch-suggestions="querySearch9"
          placeholder="ip_port">
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" placeholder="请输入备注" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, search, historySearch } from '@/api/firmware-release.js';
import { DRONE_IP_PORT, USTATION_IP_PORT, DEV_TYPE } from '@/utils/consts.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
};
const form = {
  version_no: null, // 版本号
  device_type: null,
  sys_branch: null,
  sys_version: null,
  sys_ip_port: null,
  lib_branch: null,
  lib_version: null,
  lib_ip_port: null,
  app_branch: null,
  app_version: null,
  app_ip_port: null,
  comment: null,
};
let id = 0;
export default {
  name: 'FirmwareReleaseEdit',
  props: {
    deviceType: {
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        version: [{required: true, message: '请输入版本号'}],
        sys_ip_port: [{required: true, message: '系统信息不能为空'}],
        lib_ip_port: [{required: true, message: '依赖库信息不能为空'}],
        app_ip_port: [{required: true, message: '应用程序信息不能为空'}],
        comment: [this.$tools.formRules.stringRange({min: 0, max: 100})],
      },
      DRONE_IP_PORT,
      USTATION_IP_PORT,
      ip_port: [],
      history_data: [],
    };
  },
  watch: {
    '$route.query.id': {
      handler (newVal) {
        if (!newVal && newVal !== 0) {
          this.action = type.create;
        } else {
          this.action = { ...type.update, id: newVal };
        }
      },
      immediate: true,
    },
  },
  created () {
    let deviceTyep = this.$tools.deviceTypeNameConversion(this.deviceType);
    if (deviceTyep === 'uav') {
      this.ip_port = DRONE_IP_PORT;
    }
    else if (deviceTyep === 'uap') {
      this.ip_port = USTATION_IP_PORT;
    }
  },
  methods: {
    async init () {
      if (this.action.type === 'create') {
        this.form = this.$lodash.cloneDeep(form);
        let res = await historySearch({
          device_type: this.$tools.deviceTypeNameConversion(this.deviceType),
        }, {loading: true});
        if (res.code !== 200) {
          this.history_data = [];
        }
        this.history_data = res.content;
        console.log(this.history_data['sys_branch'].concat('TX2-production').map(item => ({'value': item})));
      } else if (this.action.type === 'update') {
        let res = await search({
          id: this.action.id,
        }, {loading: true});
        if (res.code !== 200) {
          this.form = this.$lodash.cloneDeep(form);
          return;
        }
        this.form = res.content;
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          version_no: this.form.version_no, // 版本号
          device_type: this.$tools.deviceTypeNameConversion(this.deviceType),
          sys_branch: this.form.sys_branch,
          sys_version: this.form.sys_version,
          sys_ip_port: this.form.sys_ip_port,
          lib_branch: this.form.lib_branch,
          lib_version: this.form.lib_version,
          lib_ip_port: this.form.lib_ip_port,
          app_branch: this.form.app_branch,
          app_version: this.form.app_version,
          app_ip_port: this.form.app_ip_port,
          comment: this.form.comment,
        };
        if (this.action.type === 'update') {
          params.id = this.form.id;
        }
        let res = await this.action.submitFunc(params, { loading: true });
        if (res.code !== 200) {
        // TODO 错误处理
          return;
        }
        this.$message({
          message: `${this.action.title}成功！`,
          type: 'success',
          containerType: 'drawer',
          onClose: () => {
            this.$router.back();
          },
        });
      }
      catch (e) {
        return e;
      }
    },

    querySearch1 (queryString, cb) {
      var history_data = this.branchFormatData(this.history_data['sys_branch']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2 (queryString, cb) {
      var history_data = this.versionFormatData(this.history_data['sys_version']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch3 (queryString, cb) {
      var history_data = this.branchFormatData(this.history_data['lib_branch']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch4 (queryString, cb) {
      var history_data = this.versionFormatData(this.history_data['lib_version']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch5 (queryString, cb) {
      var history_data = this.branchFormatData(this.history_data['app_branch']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch6 (queryString, cb) {
      var history_data = this.versionFormatData(this.history_data['app_version']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch7 (queryString, cb) {
      var history_data = this.ipPortFormatData(this.history_data['sys_ip_port']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch8 (queryString, cb) {
      var history_data = this.ipPortFormatData(this.history_data['lib_ip_port']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch9 (queryString, cb) {
      var history_data = this.ipPortFormatData(this.history_data['app_ip_port']);
      var results = queryString ? history_data.filter(this.createFilter(queryString)) : history_data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 数据处理格式化
    branchFormatData (arr = []) {
      return this.duplicateRemoval(arr.concat('TX2-production')).map(item => ({'value': item}));
    },
    versionFormatData (arr = []) {
      return this.duplicateRemoval(arr.concat('newest')).map(item => ({'value': item}));
    },
    ipPortFormatData (arr = []) {
      return this.duplicateRemoval(arr.map(item => ({'value': item})));
    },
    // 数组去重
    duplicateRemoval (arr) {
      var newArr = new Set(arr);
      return [...newArr];
    },
    createFilter (queryString) {
      return (history_data) => (history_data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    },
  },
};
</script>

<style>

</style>
