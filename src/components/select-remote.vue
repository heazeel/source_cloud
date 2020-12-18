<!--
 * @Description: 远程下拉框
 * @Author: linjia
 * @Date: 2020-05-13 13:45:14
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-18 15:25:15
 -->
<template>
  <el-select
    :value="value"
    class="select-remote"
    filterable
    remote
    autocomplete
    reserve-keyword
    default-first-option
    v-bind="$attrs"
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="multiple"
    @focus="handleFocus"
    @change="handleChange">
    <el-option
      v-for="item in lists"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import api from '@/api/index.js';

export default {
  name: 'RemoteSelect',
  props: {
    value: {
      type: [Number, String, Array], // 值
      default: () => null,
    },
    label: { // 如果有值的话，把值传过来，用于初始化查询
      type: [Number, String, Array],
      default: () => '',
    },
    labelKey: { // 查询的字段
      type: String,
      default: () => 'name',
    },
    valueKey: {
      type: String, // 一般都是用id作为value的key，这个可以支持用别的值作为value的key
      default: () => 'id',
    },
    apiKeyObj: { // 查询的接口key
      type: Object,
      default: () => ({type: '', funcName: ''}), // type是类别， name是api函数名
    },
    params: {
      type: Object, // 其他查询条件
      default: () => ({}),
    },
    multiple: { // 是否多选
      type: Boolean,
      default: () => false,
    },
    isLoadAll: { // 是否加载全部数据
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      lists: [],
      dataAllInfoList: [],
      loading: false,
      isFirstFoucs: true,
    };
  },
  watch: {
    label: {
      handler (newVal, oldVal) {
        if (!this.isFirstFoucs) {
          if (Array.isArray(this.label)) { // 多选的时候不带条件
            this.remoteMethod();
          } else {
            this.remoteMethod(this.label);
          }
        } else {
          // 如果还没有被选中的话那就是传过来的默认值显示，不去查接口
          if (Array.isArray(this.label)) { // 多选
            this.lists = this.label.map((labelItem, index) => ({value: this.value[index], label: labelItem}));
          } else {
            this.lists = [{value: this.value, label: this.label}];
          }
        }
      },
      immediate: true,
    },
    params: {
      handler (newVal) {
        if (!this.isFirstFoucs) {
          if (Array.isArray(this.label)) { // 多选的时候不带条件
            this.remoteMethod();
          } else {
            this.remoteMethod(this.label);
          }
        }
      },
    },
    value: {
      handler (newVal, oldVal) {
        // 为了确保值和label改变，但是没有进行选中之前都能够保证有值显示和选中。最好都赋值一下。
        if (this.isFirstFoucs) {
          if (Array.isArray(this.value)) { // 多选
            this.lists = this.value.map((valueItem, index) => ({value: valueItem, label: this.label[index]}));
          } else {
            this.lists = [{value: this.value, label: this.label}];
          }
        }
      },
      immediate: true,
    },
  },
  destroyed () {
    // 销毁时需要把值设置成空，和最初一样。为啥初始化的时候value没有触发值改变也很奇怪。所以为保证一样暂时先在销毁时置为null
    if (Array.isArray(this.value)) {
      this.$emit('input', []);
    } else {
      this.$emit('input', null);
    }
  },
  methods: {
    handleFocus () {
      if (this.isFirstFoucs) {
        if (Array.isArray(this.label)) { // 多选的时候不带条件
          this.remoteMethod();
        } else {
          this.remoteMethod(this.label);
        }
      }
      this.isFirstFoucs = false;
    },
    async remoteMethod (query) {
      console.log(query);
      this.loading = true;
      let params = {
        token: localStorage.getItem('token'),
      };
      if (!this.isLoadAll) { // 默认不加载全部
        params.count = 10;
      }
      if (query !== '' && query) {
        params[this.labelKey] = query;
      }
      // console.log('params is ', this.params);
      if (Object.keys(this.params).length > 0 && this.params) { // 如果有查询条件限制
        params = {...params, ...this.params};
      }
      let res = await api[this.apiKeyObj.type][this.apiKeyObj.funcName](params);
      if (res && res.code == 200 && Array.isArray(res.content) && res.content.length > 0) {
        this.loading = false;
        this.lists = res.content.map(item => ({ label: item[this.labelKey], value: item[this.valueKey] }));
        this.dataAllInfoList = res.content;
      } else {
        this.loading = false;
        this.lists = [];
        this.dataAllInfoList = [];
      }
    },
    handleChange (value) {
      // 因为下拉框形式确定，接口只返回选择的下拉框值，所以我们无法从这里拿到其他的值,如果之后需要再放出来
      // 将多余的参数返回给父组件，可扩展添加其他参数 X
      let currentItem = this.dataAllInfoList.find(item => item[this.valueKey] == value);
      this.$emit('input', value);
      this.$emit('change', {item: currentItem});
    },
  },
};
</script>

<style lang="less">
.select-remote { // 为了加一个下拉的效果 😑
  .el-input__suffix .el-icon-::before {
    content: "\e78f";
  }
  .is-focus .el-input__suffix .el-icon- {
    transform: rotateZ(0);
  }
}
</style>
