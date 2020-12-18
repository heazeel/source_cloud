<!--
 * @Description: 告警管理编辑
 * @Author: hezhijie
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-18 10:33:16
-->
<template>
  <drawer-right
    class="alarm-management-edit"
    :title="`告警${action.title}`"
    width="700px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="120px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item
        label="编号"
        prop="no"
        class="block"
        :rules="[{ required: true, message: '请输入编号'}, $tools.formRules.pureNumber, $tools.formRules.repeatCheck({value: form.no, id: form.id, module: 'alarm', field: 'no'})]">
        <el-input v-model="form.no" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="告警名称"
        prop="name"
        class="block"
        :rules="[{ required: true, message: '请输入告警名称'}, $tools.formRules.stringRange({min: 0, max: 32}), $tools.formRules.repeatCheck({value: form.name, id: form.id, module: 'alarm', field: 'name'})]">
        <el-input v-model="form.name" placeholder="请输入告警名称"></el-input>
      </el-form-item>
      <el-form-item label="告警名称(英)"
        prop="name_en"
        class="block"
        :rules="[{ required: true, message: '请输入告警名称英文'}, $tools.formRules.stringRange({min: 0, max: 128}), $tools.formRules.repeatCheck({value: form.name_en, id: form.id, module: 'alarm', field: 'name_en'})]">
        <el-input v-model="form.name_en" placeholder="请输入告警名称英文名"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="disabled">
        <el-select v-model="form.disabled" placeholder="请选择">
          <el-option
            v-for="item in ALARM_DISABLED"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否允许忽略" prop="ignored">
        <el-select v-model="form.ignored" placeholder="请选择">
          <el-option
            v-for="item in ALARM_IGNORED"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警类型" prop="alarm_type">
        <el-select v-model="form.alarm_type" placeholder="请选择">
          <el-option
            v-for="item in ALARM_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="响应等级" prop="level">
        <el-select v-model="form.level" placeholder="请选择">
          <el-option
            v-for="item in ALARM_LEVEL"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="建议措施" prop="tips" class="block">
        <el-input v-model="form.tips" placeholder="请输入建议措施" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" placeholder="请输入备注" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/alarm-management.js';
import { ALARM_LEVEL, ALARM_TYPE, ALARM_DISABLED, ALARM_IGNORED } from '@/utils/consts.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const form = {
  no: null, // 编号
  name: null, // 告警名称
  name_en: null, // 告警名称英文
  device_type: null, // 设备类型
  level: null, // 响应等级
  alarm_type: null, // 告警类型
  tips: null, // 建议操作
  ignored: null, // 是否允许忽略
  disabled: null, // 状态
  comment: null, // 备注
};
let id = 0;
export default {
  name: 'AlarmManagementEdit',
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
        disabled: [{required: true, message: '请选择状态'}],
        ignored: [{required: true, message: '是否允许忽略'}],
        alarm_type: [{required: true, message: '请选择告警类型'}],
        level: [{required: true, message: '请选择响应等级'}],
        tips: [this.$tools.formRules.stringRange({min: 0, max: 128})],
        comment: [this.$tools.formRules.stringRange({min: 0, max: 128})],
      },
      ALARM_DISABLED,
      ALARM_IGNORED,
      ALARM_LEVEL,
      ALARM_TYPE,
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
  methods: {
    async init () {
      console.log(this.action.type);
      if (this.action.type === 'create') {
        this.form = this.$lodash.cloneDeep(form);
      } else if (this.action.type === 'update') {
        let res = await detailSearch({
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
          no: this.form.no,
          name: this.form.name,
          name_en: this.form.name_en,
          device_type: this.$tools.deviceTypeNameConversion(this.deviceType),
          alarm_type: this.form.alarm_type,
          level: this.form.level,
          tips: this.form.tips,
          ignored: this.form.ignored,
          disabled: this.form.disabled,
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
  },
};
</script>

<style>

</style>
