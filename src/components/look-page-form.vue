<!--
 * @Description: 查看页表单排列
 * @Author: linjia
 * @Date: 2020-07-21 09:07:59
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-23 16:25:33
-->
<template>
  <div class="look-page-form">
    <el-row>
      <el-col v-for="formItem in formArr"
        :key="formItem.label"
        :span="formItem.col || 12"
        class="form-item-col">
        <label :style="{width: $attrs['label-width']}">{{ formItem.label }}</label>
        <!-- 如果有几个值并成一个label value的 -->
        <span v-if="formItem.children" class="value-span" :style="{ paddingLeft: `calc(${$attrs['label-width']} + 20px)`}">
          <span v-for="(childItem, index) in formItem.children" :key="childItem.label">
            <!-- TODO 暂时只有一层，如果后续内容更多，可以增加把这部分内容也做成一个小组件 -->
            <!-- 如果是下拉框（不是远程下拉）远程下拉都会直接给中文 -->
            <span v-if="childItem.dataArr">
              {{ form[childItem.key] | findSelectedText(childItem.dataArr) }}
            </span>
            <!-- 时间（默认都是s的） -->
            <span v-else-if="childItem.type == 'time'">
              {{ form[childItem.key] | momentFormat('s', childItem.format) }}
            </span>
            <span v-else>
              {{ form[childItem.key] }}
            </span>
            <span v-if="childItem.unit" class="unit" v-html="childItem.unit"></span>
            <span v-if="index < formItem.children.length - 1" class="split">{{ formItem.split }}</span>
          </span>
        </span>
        <!-- 直接键值对的 -->
        <span v-else
          class="value-span"
          :class="`value-${formItem.type}-span`"
          :style="{ paddingLeft: `calc(${$attrs['label-width']} + 20px)`}">
          <img v-if="formItem.type == 'file'"
            class="img-icon"
            :src="require('@/assets/icon_imgs/file.png')"
            alt="文件">
          <!-- 如果是下拉框（不是远程下拉）远程下拉都会直接给中文 -->
          <span v-if="formItem.dataArr">
            {{ form[formItem.key] | findSelectedText(formItem.dataArr) }}
          </span>
          <!-- 时间（默认都是s的） -->
          <span v-else-if="formItem.type == 'time'">
            {{ form[formItem.key] | momentFormat('s', formItem.format) }}
          </span>
          <span v-else>
            {{ form[formItem.key] }}
          </span>
          <span v-if="formItem.unit" class="unit" v-html="formItem.unit"></span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 例子
/* const formArr = [
  { label: '最大起飞重量', key: 'max_takeoff_load', unit: 'kg'},
  { label: '抗风等级', key: 'windbreak_level', unit: ''},
  { label: '温度限制', split: '-', children: [
    { label: '低温', key: 'temp_lower_limit', unit: '&#8451;', col: 16, splitCol: 8},
    { label: '高温', key: 'temp_upper_limit', unit: '&#8451;', col: 16, splitCol: 8},
  ]},
  { label: '飞控PWM脉宽', split: '-', children: [
    { label: '上限', key: 'FC_pulse_width_min', unit: '', col: 12, splitCol: 12 },
    { label: '下限', key: 'FC_pulse_width_max', unit: '', col: 12, splitCol: 12},
  ]},
  { label: '飞行功率系数', key: 'flight_power_factor', unit: '', col: 24},
]; */
export default {
  name: 'LookPageForm',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    formArr: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.look-page-form {
  position: relative;
  .form-item-col {
    min-height: 36px;
  }
  label {
    width: 120px;
    display: inline-block;
    text-align: right;
    position: absolute;
    color: #505D75;
    opacity: 0.68;
    line-height: 36px;
    margin-right: 20px;
    vertical-align: middle;
  }
  .value-span {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding-left: calc(120px + 20px);
    line-height: 24px;
    padding: 6px 0;
    color: #505D75;
    float: left;
    &.value-file-span {
      padding: 12px 0;
    }
  }
  .img-icon {
    vertical-align: middle;
  }
  .unit, .split {
    padding: 0;
    opacity: 1;
  }
}
</style>
