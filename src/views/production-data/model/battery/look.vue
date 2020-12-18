<!--
 * @Description: 电池型号查看
 * @Author: linjia
 * @Date: 2020-07-21 09:06:42
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-04 16:24:23
-->
<template>
  <dialog-sc read-only
    title="电池型号查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="160px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { modelDetailSearch } from '@/api/battery.js';
const formArr = [
  { label: '型号名称', key: 'code', unit: ''},
  { label: '电池重量', key: 'weight', unit: ''},
  { label: '额定容量', key: 'rated_cap', unit: ''},
  { label: '标称容量', key: 'nominal_cap', unit: ''},
  { label: '最大可循环次数', key: 'max_cycle_count', unit: ''},
  { label: '定检时间周期', key: 'time_check_period', unit: ''},
  { label: '标称截止电压', key: 'cut_off_volt', unit: ''},
  { label: '定检使用周期', key: 'use_check_period', unit: ''},
  { label: '标称满电电压', key: 'full_power_volt', unit: ''},
  { label: '测量电压', split: '-', children: [
    { label: '上限', key: 'min_measured_volt', unit: 'V'},
    { label: '下限', key: 'max_measured_volt', unit: 'V'},
  ]},
  { label: '最大值', key: 'max_measured_volt', unit: ''},
  { label: '容量衰减系数', key: 'power_decay_factor', unit: ''},
  { label: '单电池循环平均时长', key: 'cycle_average_duration', unit: ''},
  { label: '健康状态标准参数', key: 'standard_parameters', unit: ''},
  { label: '最低可用软件版本', key: 'lowest_software_version', unit: ''},
  { label: '健康状态临界参数', key: 'critical_parameters', unit: ''},
  { label: '出厂价格', key: 'price', unit: ''},
  { label: '电压带载转空载换算系数', key: 'conversion_factor', unit: '', col: 24},
  { label: '电容-电压曲线', key: 'volt_cap_relation', unit: '', col: 24},
  { label: '电容-温度曲线', key: 'temp_cap_relation', unit: '', col: 24},
  { label: '备注', key: 'comment', unit: '', col: 24},
];
export default {
  name: 'BatteryLook',
  data () {
    return {
      form: {},
      formArr: formArr,
    };
  },
  methods: {
    async getInfo () {
      let res = await modelDetailSearch({
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
