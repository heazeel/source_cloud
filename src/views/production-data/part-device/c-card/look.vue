<!--
 * @Description: 通信卡查看
 * @Author: linjia
 * @Date: 2020-09-14 17:08:23
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-24 10:36:20
-->
<template>
  <dialog-sc read-only
    title="通信卡查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="120px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { detailSearch } from '@/api/c-card.js';
import { DEV_C_CARD_LIFE_STATUS, DEV_TYPE } from '@/utils/consts.js';
const formArr = [
  { label: '卡号', key: 'card_no', unit: ''},
  { label: '运营商', key: 'supplier', unit: ''},
  { label: '价格', key: 'price', unit: ''},
  { label: '状态', key: 'status', unit: '', dataArr: DEV_C_CARD_LIFE_STATUS},
  { label: '套餐总量', key: 'package_total', unit: ''},
  { label: '剩余流量', key: 'remaining_flow', unit: ''},
  { label: '已用流量', key: 'total_used_flow', unit: ''},
  { label: '昨日使用流量', key: 'yesterday_use_flow', unit: ''},
  { label: '供应商', key: 'provider', unit: ''},
  { label: '流量池', key: 'flow_pool', unit: ''},
  { label: '采购时间', key: 'purchase_time', unit: '', type: 'time', format: 'YYYY-MM-DD'},
  { label: '备注', key: 'comment', unit: '', col: 24},
];
export default {
  name: 'CCardLook',
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
