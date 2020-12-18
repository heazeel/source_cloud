<!--
 * @Description: 查看
 * @Author: linjia
 * @Date: 2020-09-03 16:12:44
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-11 15:56:28
-->
<template>
  <dialog-sc read-only
    title="无人机查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="60px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
import { detailSearch } from '@/api/drone.js';
const formArr = [
  { label: '序号', key: 'no', unit: ''},
  { label: '编号', key: 'code', unit: ''},
  { label: '所属企业', key: 'company', unit: '', col: 24},
  { label: '型号名称', key: 'model', unit: '', col: 24},
  { label: '产品状态', key: 'status', unit: '', col: 24, dataArr: DEV_DRONE_LIFE_STATUS},
  { label: '内部型号', key: 'internal_model', unit: '', col: 24},
  { label: '固件版本', key: 'version_no', unit: '', col: 24},
  { label: 'IMEI', key: 'imei', unit: '', col: 24},
  { label: '备注', key: 'comment', unit: '', col: 24},
];
export default {
  name: 'DroneLook',
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
        this.form = {};
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
