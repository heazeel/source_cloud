<!--
 * @Description: 人工站查看
 * @Author: linjia
 * @Date: 2020-09-10 18:02:56
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 15:34:36
-->
<template>
  <dialog-sc read-only
    title="人工站查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="80px" :form="form" :form-arr="formArr"></look-page-form>
    <set-tarmacs read-only
      :form="form"
      :type="'ustation'"
      style="margin-top: 24px"></set-tarmacs>
  </dialog-sc>
</template>

<script>
import { detailSearch } from '@/api/hstation.js';
import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
const formArr = [
  { label: '产品编号', key: 'code', unit: ''},
  { label: '产品状态', key: 'status', unit: '', dataArr: DEV_DRONE_LIFE_STATUS},
  { label: '所属企业', key: 'company', unit: ''},
];
export default {
  name: 'UstationLook',
  components: {
    'set-tarmacs': () => import('../common/set-tarmacs.vue'),
  },
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
