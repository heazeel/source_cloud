<!--
 * @Description: 人工站新增编辑
 * @Author: linjia
 * @Date: 2020-09-10 17:50:23
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-08 17:55:17
-->
<template>
  <drawer-right
    class="hstation-edit"
    :title="`人工站${action.title}`"
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
      <el-form-item label="产品编号" prop="code">
        <el-input v-model="form.code"
          :disabled="action.type != 'create'"
          placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="所属企业" prop="company">
        {{ form.company }}
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
      <el-form-item label="型号">
        RH1P
      </el-form-item>
      <el-form-item label-width="0" class="block">
        <set-tarmacs
          ref="tarmacs-form"
          :type="'hstation'"
          :form="form"
          @add-item="addTarmacsItem"
          @delete-item="deleteTarmacsItem"
          @form-valid="tarmacsValid = arguments[0]"></set-tarmacs>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/hstation.js';
import { mainDeviceStatus } from '@/mixins/main-device-status.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const defaultTarmacs = [{ // 每个停机位默认值
  no: '',
  angle: 0,
  fall_type: 2,
  identify_type: 1,
  retry_times: 0,
  usage_scenario: 3,
  vision_feature: 1,
}];

const form = {
  code: null, // 编号
  status: null, // 状态
  tarmacs: defaultTarmacs, // 停机位信息
};
export default {
  name: 'UstationEdit',
  components: {
    'set-tarmacs': () => import('../common/set-tarmacs.vue'),
  },
  mixins: [mainDeviceStatus],
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        code: [{required: true, message: '请输入产品编号'}, this.$tools.formRules.default],
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
          status: this.form.status,
        };
        this.form.tarmacs.map(tarmac => {
          tarmac.angle = Number(tarmac.angle);
          return tarmac;
        });
        params.tarmacs = JSON.stringify(this.form.tarmacs);
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
    // 新增停机位
    addTarmacsItem () {
      if (!this.form.tarmacs) {
        this.$set(this.form, 'tarmacs', []);
      }
      if (this.form.tarmacs.length >= 1) {
        return this.$message({ type: 'warning', message: '最多只能设置一个停机位'});
      }
      let item = this.$lodash.cloneDeep(defaultTarmacs);
      this.form.tarmacs.push(item);
    },
    // 停机位删除一个数据
    deleteTarmacsItem (item) {
      if (this.form.tarmacs.length <= 1) {
        return this.$message({ type: 'warning', message: '必须有一个停机位，并且有且仅有一个'});
      }
      this.form.tarmacs.splice(item.index, 1);
    },
  },
};
</script>

<style>

</style>
