<!--
 * @Description: 货箱查看
 * @Author: linjia
 * @Date: 2020-09-11 09:37:40
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 14:27:01
-->
<template>
  <dialog-sc read-only
    title="货箱查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="80px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { detailSearch } from '@/api/box.js';
import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
const formArr = [
  { label: '货箱编号', key: 'code', unit: ''},
  { label: 'RFID卡号', key: 'no', unit: ''},
  { label: '状态', key: 'status', unit: '', dataArr: DEV_DRONE_LIFE_STATUS},
  { label: '备注', key: 'comment', unit: '', col: 24},
];
export default {
  name: 'BoxLook',
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
