<!--
 * @Description: 货箱编辑
 * @Author: linjia
 * @Date: 2020-09-11 09:37:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-22 15:15:24
-->
<template>
  <drawer-right
    class="hstation-edit"
    :title="`货箱${action.title}`"
    width="700px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="90px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="货箱编号" prop="code" :rules="[{ required: true, message: '请输入货箱编号'}, $tools.formRules.code, $tools.formRules.repeatCheck({value: form.code, id: form.id, module: 'cargobox', field: 'code'})]">
        <el-input v-model="form.code" placeholder="请输入数字、字母"></el-input>
      </el-form-item>
      <el-form-item label="RFID卡号" prop="no" :rules="[{ required: true, message: 'RFID卡号'}, $tools.formRules.code, $tools.formRules.repeatCheck({value: form.no, id: form.id, module: 'cargobox', field: 'no'})]">
        <el-input v-model="form.no" placeholder="请输入数字、字母"></el-input>
      </el-form-item>
      <el-form-item label="产品状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusArr"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/box.js';
import { mainDeviceStatus } from '@/mixins/main-device-status.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const form = {
  no: null, // RFID卡号
  code: null, // 货箱编号
  status: null, // 状态
  comment: null, // 备注
};
export default {
  name: 'BoxEdit',
  mixins: [mainDeviceStatus],
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        status: [{required: true, message: '请选择产品状态'}],
        comment: [this.$tools.formRules.default],
      },
      statusArr: [],
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
          code: this.form.code,
          no: this.form.no,
          status: this.form.status, // 状态
          comment: this.form.comment, // 备注
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
