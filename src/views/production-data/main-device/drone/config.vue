<!--
 * @Description: 侧拉
 * @Author: linjia
 * @Date: 2020-04-09 15:30:41
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-19 14:38:56
 -->
<template>
  <dialog-sc
    ref="drone-config"
    class="drone-config"
    title="无人机配置"
    @open="init"
    @cancel="$router.back()"
    @submit="handleSubmit">
    <el-form ref="form"
      class="form-dialog"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item label="序号" prop="no">
        <el-input v-model="form.no" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="型号" prop="model_id">
        <select-remote v-model="form.model_id"
          :label="form.model"
          :api-key-obj="{type: 'drone', funcName: 'modelRemoteSelectSearch'}"
          placeholder="请输入型号关键字"
          @change="handleModelChange"></select-remote>
      </el-form-item>
      <el-form-item label="其他参数"
        class="block"
        prop="paramsStr">
        <el-input v-model="form.paramsStr" type="textarea" :placeholder="`格式：参数名:参数值\n一行一个，回车换行`"></el-input>
      </el-form-item>
    </el-form>
  </dialog-sc>
</template>

<script>
import { configSearch, configUpdate } from '@/api/drone.js';
const form = {
  no: null,
  code: null,
  model_id: null,
  model: null,
  params: '',
  paramsStr: '',
};
export default {
  name: 'DroneConfig',
  data () {
    return {
      form: this.$lodash.cloneDeep(form),
      rules: {
        no: [{required: true, message: '请输入序号'}, this.$tools.formRules.pureNumber],
        code: [{required: true, message: '请输入产品编号'}, this.$tools.formRules.default],
        model_id: [{required: true, message: '请选择型号'}],
        paramsStr: [this.$tools.formRules.multipleParamsSplitWrap()],
      },
    };
  },
  methods: {
    async init () {
      let res = await configSearch({
        id: this.$route.query.id,
      }, {loading: true});
      if (res.code !== 200) {
        this.form = this.$lodash.cloneDeep(form);
        // TODO 错误处理
        return;
      }
      res.content.paramsStr = JSON.parse(res.content.params); // 增加str字段，保存参数框，方便校验和转换
      this.form = res.content;
    },
    handleSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) { return; }
        let params = {
          id: Number(this.$route.query.id),
          no: Number(this.form.no),
          code: this.form.code,
          model: this.form.model,
          model_id: Number(this.form.model_id),
        };
        if (this.form.paramsStr) {
          params.params = JSON.stringify(this.$tools.paramsStrTransToObj(this.form.paramsStr));
        }
        let res = await configUpdate(params, { loading: true });
        if (res.code !== 200) {
        // TODO 错误处理
          return;
        }
        this.$message({
          message: `配置无人机${this.form.no}成功！`,
          type: 'success',
          containerType: 'dialog',
          onClose: () => {
            this.$router.back();
          },
        });
      });
    },
    /**
     * @description: 远程下拉框值改变回调处理函数
     * @param {Object} {item: {}} 元素对象
     */
    handleModelChange ({item}) {
      this.form.model = item.label; // 这里还要型号的名称 model
    },
  },
};
</script>

<style>

</style>
