<template>
  <drawer-right
    class="ustation-edit"
    :title="`导控器${action.title}`"
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
      <el-form-item label="序号" prop="no">
        <el-input v-model="form.no"
          :disabled="action.type != 'create'"
          placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="code">
        <el-input v-model="form.code"
          :disabled="action.type != 'create'"
          placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="所属企业" prop="company">
        {{ form.company }}
      </el-form-item>
      <el-form-item label="型号" prop="model">
        RC1
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
      <el-form-item label="固件版本" prop="version_no">
        {{ form.version_no }}
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch } from '@/api/rcd.js';
import { mainDeviceStatus } from '@/mixins/main-device-status.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};

const form = {
  no: null, // 序号
  code: null, // 编号
  status: null, // 状态
  // model_id: null, // 型号id
  // model: null, // 型号名称
  comment: null, // 备注
};
export default {
  name: 'RcdEdit',
  mixins: [mainDeviceStatus],
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        no: [{required: true, message: '请输入序号'}, this.$tools.formRules.pureNumber],
        code: [{required: true, message: '请输入产品编号'}, this.$tools.formRules.default],
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
          no: Number(this.form.no),
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
