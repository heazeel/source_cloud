<!--
 * @Description: 带动效的输入框(仅UI组件)
 * @Author: linjia
 * @Date: 2020-04-14 17:48:42
 * @LastEditors: linjia
 * @LastEditTime: 2020-05-14 09:52:36
 -->
<template>
  <div class="input-animation">
    <label>
      <small class="info"
        :class="{'is-focus': isFocus || inputValue, 'has-error': errorInfo && inputValue}">{{ [$attrs.label, errorInfo, inputValue] | info }}</small>
      <input v-model="inputValue"
        v-bind="$attrs"
        @input="$emit('input', inputValue)"
        @focus="isFocus = true; $emit('focus')"
        @blur="isFocus = false; $emit('blur')">
      <slot></slot>
      <div class="line" :class="{'is-focus': isFocus}"></div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputAnimation',
  filters: {
    info ([label, error, inputValue]) {
      if (error && inputValue) { // 因为没有值的时候下方按钮不会亮，所以为空时是不需要提示的
        return error;
      } else {
        return label;
      }
    },
  },
  props: {
    value: {
      type: String,
      default: () => '',
    },
    errorInfo: {
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      inputValue: null,
      isFocus: false,
    };
  },
  watch: {
    value: {
      handler () {
        this.inputValue = this.value;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import '../styles/base.less';
.input-animation {
  width: 100%;
  height: 63px;
  box-sizing: border-box;
  padding-top: 10px;
  margin-bottom: 8px;
  position: relative;
  .info {
    color: #26415b;
    display: block;
    line-height: 20px;
    font-size: 14px;
    transform: translateY(20px);
    transition: transform .2s ease-out;
    &.is-focus {
      transform: translateY(0px);
    }
    &.has-error {
      color: @danger-color;
    }
  }
  input {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 4px 0 4px;
    color: #26415b;
    font-size: 16px;
    line-height: 22px;
    outline: none;
    font-weight: bold;
    border: none;
    border-bottom: 1px solid #E5ECF3;
    caret-color: @assist-color;
    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: rgba(38, 65, 91, 0.4);
    }
    &::-moz-placeholder {
      /* Firefox 19+ */
      color: rgba(38, 65, 91, 0.4);
    }
    &:-ms-input-placeholder {
      /* IE 10+ */
      color: rgba(38, 65, 91, 0.4);
    }
    &:-moz-placeholder {
      /* Firefox 18- */
      color: rgba(38, 65, 91, 0.4);
    }
  }
  .line {
    height: 0px;
    position: absolute;
    bottom: 0;
    width: 0;
    border-top: 1px solid @primary-color;
    transition: width .5s ease-out;
    &.is-focus {
      width: 100%;
    }
  }
}
</style>
