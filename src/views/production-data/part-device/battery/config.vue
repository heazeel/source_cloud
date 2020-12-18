<!--
 * @Description: 配置
 * @Author: linjia
 * @Date: 2020-09-14 17:08:28
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 15:27:59
-->
<template>
  <dialog-sc
    ref="battery-config"
    class="battery-config"
    title="无人机配置"
    size="small"
    @open="init"
    @cancel="$router.back()"
    @submit="handleSubmit">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="70px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="型号">
        {{ info.model }}
      </el-form-item>
      <el-form-item label="编号">
        {{ info.code }}
      </el-form-item>
      <el-form-item label="位置" prop="position" class="block">
        <el-radio-group v-model="form.position">
          <el-radio label="L">
            左
          </el-radio>
          <el-radio label="R">
            右
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </dialog-sc>
</template>

<script>
import { detailSearch, configUpdate } from '@/api/battery.js';
const form = {
  position: null,
};
export default {
  name: 'BatteryConfig',
  data () {
    return {
      form: this.$lodash.cloneDeep(form),
      info: {},
      rules: {
        position: [{required: true, message: '请选择位置'}],
      },
    };
  },
  methods: {
    async init () {
      let res = await detailSearch({
        id: this.$route.query.id,
      }, {loading: true});
      if (res.code !== 200) {
        this.form = this.$lodash.cloneDeep(form);
        // TODO 错误处理
        return;
      }
      this.info = res.content;
    },
    handleSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) { return; }
        let params = {
          device_id: 1000,
          device_type: 'uav',
          model: this.info.model,
          position: this.form.position,
        };
        let res = await configUpdate(params, { loading: true });
        if (res.code !== 200) {
        // TODO 错误处理
          return;
        }
        this.$message({
          message: `配置电池${this.info.code}成功！`,
          type: 'success',
          containerType: 'dialog',
          onClose: () => {
            this.$router.back();
          },
        });
      });
    },
  },
};
</script>

<style>

</style>
