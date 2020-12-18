<!--
 * @Description: 型号（无人机查看）
 * @Author: linjia
 * @Date: 2020-07-14 14:42:19
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-04 16:39:57
-->
<template>
  <dialog-sc read-only
    title="无人机型号查看"
    @cancel="$router.back()"
    @open="getInfo">
    <look-page-form label-width="170px" :form="form" :form-arr="formArr"></look-page-form>
  </dialog-sc>
</template>

<script>
import { modelDetailSearch } from '@/api/drone.js';
const formArr = [
  { label: '型号名称', key: 'code', unit: ''},
  { label: '电池型号', key: 'bty_md_name', unit: ''},
  { label: '空机重量（不含电池）', key: 'weight', unit: 'kg'},
  { label: '定检时间周期', key: 'time_check_period', unit: '天'},
  { label: '最大起飞重量', key: 'max_takeoff_load', unit: 'kg'},
  { label: '定检使用周期', key: 'use_check_period', unit: 'h'},
  { label: '防雨等级', key: 'waterproof_level', unit: ''},
  { label: '抗风等级', key: 'windbreak_level', unit: ''},
  { label: '温度限制', split: '-', children: [
    { label: '低温', key: 'temp_lower_limit', unit: '&#8451;'},
    { label: '高温', key: 'temp_upper_limit', unit: '&#8451;'},
  ]},
  { label: '海拔限制', key: 'alt_upper_limit', unit: ''},
  { label: '总重截止电压关系参数', key: 'weight_end_volt_relation', unit: ''},
  { label: '安全悬停时间阈值', key: 'safe_hover_time', unit: ''},
  { label: '机载电池数量', key: 'battery_count', unit: '块'},
  { label: '飞机待机功率', key: 'standby_power', unit: 'W'},
  { label: '电机轴数', key: 'motor_shaft_count', unit: '轴'},
  { label: '起飞重量检测高度区间', split: '-', children: [
    { label: '上限', key: 'weight_height_min', unit: 'm'},
    { label: '下限', key: 'weight_height_max', unit: 'm'},
  ]},
  { label: '飞控PWM脉宽', split: '-', children: [
    { label: '上限', key: 'FC_pulse_width_min', unit: ''},
    { label: '下限', key: 'FC_pulse_width_max', unit: ''},
  ]},
  { label: '电调最小响应PWM脉宽', key: 'PWM_pulse_width_min', unit: ''},
  { label: '飞机应急下降速度', key: 'emergency_land_speed', unit: 'm/s'},
  { label: '起落架长*宽', split: '*', children: [
    { label: '长', key: 'undercarriage_length', unit: 'mm'},
    { label: '宽', key: 'undercarriage_width', unit: 'mm'},
  ]},
  { label: '起落架与货箱距离', key: 'under_offset', unit: 'mm'},
  { label: '起落架前后偏移', key: 'fb_offset', unit: 'mm'},
  { label: '起落架左右偏移', key: 'lr_offset', unit: 'mm'},
  { label: '悬停功率系数', key: 'hover_power_factor', unit: '', col: 24},
  { label: '飞行功率系数', key: 'flight_power_factor', unit: '', col: 24},
  { label: '等效悬停单轴拉力计算系数', key: 'equal_hover_uniaxial_tension_factor', unit: '', col: 24},
  { label: '实时单轴拉力计算系数', key: 'real_time_uniaxial_tension_factor', unit: '', col: 24},
  { label: '飞机实时功率系数', key: 'real_time_power_factor', unit: '', col: 24},
  { label: '备注', key: 'comment', unit: ''},
];
export default {
  name: 'ModelDroneLook',
  data () {
    return {
      formArr: formArr,
      form: {},
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

<style lang="less" scoped>
.form-item-col {
  height: 36px;
}
label {
  width: 160px;
  display: inline-block;
  text-align: right;
  position: absolute;
  color: #505D75;
  opacity: 0.68;
  line-height: 36px;
  margin-right: 30px;
}
.value-span {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding-left: calc(160px + 30px);
  line-height: 36px;
  color: #505D75;
  float: left;
}
</style>
