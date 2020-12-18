<!--
 * @Description: 无人站查看
 * @Author: linjia
 * @Date: 2020-09-02 09:44:25
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-19 16:11:46
-->
<template>
  <dialog-sc read-only
    title="无人站查看"
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
import { detailSearch } from '@/api/ustation.js';
import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
const formArr = [
  { label: '序号', key: 'no', unit: ''},
  { label: '产品编号', key: 'code', unit: ''},
  { label: '所属企业', key: 'company', unit: '', col: 24},
  { label: '型号', key: 'model', unit: ''},
  { label: '产品状态', key: 'status', unit: '', dataArr: DEV_DRONE_LIFE_STATUS},
  { label: '内部型号', key: 'internal_model', unit: ''},
  { label: '固件版本', key: 'version_no', unit: ''},
  { label: '摄像头标定', key: 'ref_line_filename', type: 'file', unit: '', col: 24},
  { label: '备注', key: 'comment', unit: '', col: 24},
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
