<!--
 * @Description: 右拉抽屉
 * @Author: linjia
 * @Date: 2020-04-23 17:52:00
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 19:20:55
 -->
<template>
  <el-drawer
    ref="drawer"
    :wrapper-closable="false"
    :close-on-press-escape="false"
    :title="title"
    :visible="visible"
    :size="$attrs.width"
    v-bind="$attrs"
    direction="rtl"
    custom-class="drawer-right"
    :before-close="handleClose"
    @opened="handleFuc('open');"
    @close="handleClose"
    @closed="handleFuc('closed');">
    <div class="drawer-right__content">
      <slot></slot>
    </div>
    <div class="drawer-right__footer">
      <slot name="footer">
        <button-sc type="secondary" @click="handleClose">
          取消
        </button-sc>
        <button-submit :click-func="submitFunc">
          提交
        </button-submit>
      </slot>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'DrawerRight',
  components: {
    'button-sc': () => import(/* webpackChunkName: "button-sc" */ '@c/button-sc.vue'),
    'button-submit': () => import(/* webpackChunkName: "button-sc" */ '@c/button-submit.vue'),
  },
  props: {
    title: { // 用props的原因是因为如果用attrs传值的话会导致鼠标放在抽屉的任何地方总会有一个标题内容显示出来
      type: String,
      default: () => '标题',
    },
    submitFunc: { type: Function, required: true },
  },
  data () {
    return {
      visible: false,
    };
  },
  mounted () {
    // 下面这段注释掉是因为drawer组件会监听visible的变化，当visible变为true的时候就会执行open，不需要在该页面挂载完成后再执行一次open
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
      this.$emit(type);
    },
  },
};
</script>

<style>

</style>
