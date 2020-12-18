<!--
 * @Description: 交付
 * @Author: linjia
 * @Date: 2020-09-04 15:32:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-09 09:15:36
-->
<template>
  <dialog-sc
    ref="delivery"
    class="delivery"
    size="small"
    title="交付"
    @cancel="$router.back()"
    @submit="handleSubmit">
    <el-form ref="form"
      class="form-dialog"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item prop="company_id" class="block" label="所属企业">
        <select-remote v-model="form.company_id"
          placeholder="企业"
          :api-key-obj="{type: 'delivery', funcName: 'remoteSelectSearch'}"></select-remote>
      </el-form-item>
    </el-form>
  </dialog-sc>
</template>

<script>
import { update } from '@/api/delivery.js';
export default {
  name: 'Delivery',
  data () {
    return {
      form: {company_id: null},
      rules: {
        company_id: [{required: true, message: '请选择企业'}],
      },
    };
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) { return; }
        let params = {
          device_type: this.$route.query.device_type,
          device_id: Number(this.$route.query.device_id),
          company_id: this.form.company_id,
        };
        let res = await update(params, {loading: true});
        if (res.code !== 200) {
          // TODO 错误处理
          return;
        }
        this.$message({
          message: '交付成功！',
          type: 'success',
          containerType: 'drawer',
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
