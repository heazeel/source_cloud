<!--
 * @Description: 电池查看
 * @Author: linjia
 * @Date: 2020-09-14 17:08:23
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-14 17:25:05
-->
<template>
  <dialog-sc read-only
    title="电池查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="80px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { detailSearch } from '@/api/battery.js';
import { DEV_BOX_LIFE_STATUS } from '@/utils/consts.js';
const formArr = [
  { label: '产品编号', key: 'code', unit: ''},
  { label: '型号', key: 'model', unit: ''},
  { label: '状态', key: 'status', unit: '', dataArr: DEV_BOX_LIFE_STATUS},
  { label: '备注', key: 'comment', unit: '', col: 24},
];
export default {
  name: 'BatteryLook',
  data () {
    return {
      form: {tarmacs: []},
      formArr: formArr,
    };
  },
  methods: {
    async getInfo () {
      let res = await detailSearch({
        id: this.$route.query.id,
      }, { loading: true });
      if (res.code !== 200) {
        this.form = {tarmacs: []};
        // TODO 错误处理
        return;
      }
      this.form = res.content;
    },
  },
};
</script>

<style>

</style>
