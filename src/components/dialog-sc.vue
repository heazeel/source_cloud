<!--
 * @Description: dialog 弹窗
 * @Author: linjia
 * @Date: 2020-04-24 14:39:21
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-21 19:23:44
 -->
<template>
  <el-dialog
    class="dialog-sc"
    v-bind="$attrs"
    :class="[`dialog-${size}`, {'read-only': readOnly}]"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :before-close="handleClose"
    @open="handleFuc('open');"
    @opened="handleFuc('opened');"
    @close="handleClose"
    @closed="handleFuc('closed');">
    <div slot="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <slot></slot>
    <span v-show="!readOnly" slot="footer" class="dialog-footer">
      <slot name="footer">
        <button-sc size="small" type="secondary" @click="handleClose">取消</button-sc>
        <button-sc size="small" @click="$emit('submit')">提交</button-sc>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogSc',
  components: {
    'button-sc': () => import(/* webpackChunkName: "button-sc" */ '@c/button-sc.vue'),
  },
  props: {
    size: {
      type: String,
      default: () => '', // ''默认大弹窗 | small小弹窗
    },
    title: { // 用props的原因是因为如果用attrs传值的话会导致鼠标放在抽屉的任何地方总会有一个标题内容显示出来
      type: String,
      default: () => '标题',
    },
    readOnly: { // 只读弹窗，就是没有下面的两个按钮
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      visible: false,
    };
  },
  mounted () {
    // 下面这段注释掉是因为dialog组件会监听visible的变化，当visible变为true的时候就会执行open，不需要在该页面挂载完成后再执行一次open
    // this.$nextTick(() => {
    //   // 官方文档说。在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上，因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。
    //   // 我们默认是打开状态，所以我们再等一次render之后我们模拟发送一个open事件。初始化的事情就可以在这个事件触发之后做了。
    //   this.$emit('open');
    // });
    this.visible = true;
  },
  methods: {
    handleClose () {
      this.$emit('cancel');
    },
    handleFuc (type) {
      console.log(type);
      this.$emit(type);
    },
  },
};
</script>

<style>

</style>
