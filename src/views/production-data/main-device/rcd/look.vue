<!--
 * @Description: 导控器查看
 * @Author: linjia
 * @Date: 2020-09-11 09:37:09
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-19 17:30:32
-->
<template>
  <dialog-sc read-only
    title="导控器查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="80px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
import { detailSearch } from '@/api/rcd.js';
const formArr = [
  { label: '序号', key: 'no', unit: ''},
  { label: '产品编号', key: 'code', unit: ''},
  { label: '所属企业', key: 'company', unit: '', col: 24},
  { label: '型号', key: 'model', unit: ''},
  { label: '产品状态', key: 'status', unit: '', dataArr: DEV_DRONE_LIFE_STATUS},
  { label: '备注', key: 'comment', unit: '', col: 24},
];
export default {
  name: 'UstationLook',
  data () {
    return {
      form: {},
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
