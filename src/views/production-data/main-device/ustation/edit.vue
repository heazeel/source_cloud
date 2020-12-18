<template>
  <drawer-right
    class="ustation-edit"
    :title="`无人站${action.title}`"
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
        <el-input v-model="form.no" :disabled="action.type != 'create'" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="code">
        <el-input v-model="form.code" :disabled="action.type != 'create'" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="所属企业" prop="company">
        {{ form.company }}
      </el-form-item>
      <el-form-item label="型号" prop="model">
        RH1
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
      <el-form-item label="内部型号" prop="internal_model">
        <el-input v-model="form.internal_model"></el-input>
      </el-form-item>
      <el-form-item label="固件版本" prop="version_no">
        {{ form.version_no }}
      </el-form-item>
      <el-form-item label="摄像头标定" prop="ref_line_file" class="block">
        <upload-file accept=".xlsx, .xls" :file-lists="fileList" @on-change="handleFileChange">
          <template v-slot:other>
            <el-col :span="6" class="form-operate-text color-primary" style="cursor: pointer;">
              <span>下载模板</span>
            </el-col>
          </template>
        </upload-file>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
      <!-- 停机坪设置 -->
      <el-form-item label-width="0" class="block">
        <set-tarmacs
          ref="tarmacs-form"
          :type="'ustation'"
          :form="form"
          @add-item="addTarmacsItem"
          @delete-item="deleteTarmacsItem"
          @form-valid="tarmacsValid = arguments[0]"></set-tarmacs>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { mainDeviceStatus } from '@/mixins/main-device-status.js';
import { create, update, detailSearch, cameraFileDownload } from '@/api/ustation.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const defaultTarmacs = [{ // 每个停机位默认值
  id: null,
  no: '',
  angle: 0,
  fall_type: 4,
  identify_type: 1,
  retry_times: 0,
  usage_scenario: 3,
  vision_feature: 2,
}];
const form = {
  no: null, // 序号
  code: null, // 编号
  status: null, // 状态
  // model_id: null, // 型号id
  // model: null, // 型号名称
  internal_model: null, // 内部型号
  ref_line_file: null,
  ref_line_file_name: null,
  tarmacs: defaultTarmacs, // 停机位信息
  comment: null, // 备注
};
export default {
  name: 'UstationEdit',
  components: {
    'upload-file': () => import('../common/upload-file.vue'),
    'set-tarmacs': () => import('../common/set-tarmacs.vue'),
  },
  mixins: [mainDeviceStatus],
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        no: [{required: true, message: '请输入序号'}, this.$tools.formRules.pureNumber],
        code: [{required: true, message: '请输入产品编号'}, this.$tools.formRules.default],
        // model_id: [{required: true, message: '请选择型号'}],
        status: [{required: true, message: '请选择产品状态'}],
        internal_model: [this.$tools.formRules.default],
        comment: [this.$tools.formRules.default],
      },
      statusArr: [],
    };
  },
  computed: {
    fileList () {
      return this.form.ref_line_file_name && [{
        name: this.form.ref_line_file_name,
        downloadUrl: `${cameraFileDownload}token=${localStorage.getItem('token')}&id=${this.$route.query.id}`,
      }] || [];
    },
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
      let tarmacsVaild = await this.$refs['tarmacs-form'].submitForm();
      try {
        let valid = await this.$refs.form.validate();
        if (!tarmacsVaild || !valid) { return; }
        let params = new FormData();
        params.append('no', Number(this.form.no));
        params.append('code', this.form.code);
        params.append('status', this.form.status);
        params.append('internal_model', this.form.internal_model);
        params.append('comment', this.form.comment);
        this.form.tarmacs.map(tarmac => {
          tarmac.angle = Number(tarmac.angle);
          return tarmac;
        });
        params.append('tarmacs', JSON.stringify(this.form.tarmacs));
        if (this.form.ref_line_file) { // 可以不必要有
          params.append('ref_line_file', this.form.ref_line_file);
        }
        if (this.action.type === 'update') {
          params.append('id', this.form.id);
        }
        console.log(params);
        let res = await this.action.submitFunc(params, { loading: true, formData: true });
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
    // 文件更改
    handleFileChange (file, fileList) {
      this.form.ref_line_file = file.raw;
      this.form.ref_line_file_name = file.name;
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
