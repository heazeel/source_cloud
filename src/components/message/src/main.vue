<!--
 * @Description: 局部message
 * @Author: linjia
 * @Date: 2020-04-28 09:49:53
 * @LastEditors: linjia
 * @LastEditTime: 2020-04-28 14:00:40
 -->
<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="message-part"
      :class="[
        'el-message',
        'is-center',
        type && !iconClass ? `el-message--${ type }` : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <i v-if="iconClass" :class="iconClass"></i>
      <i v-else :class="typeClass"></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">
          {{ message }}
        </p>
        <p v-else class="el-message__content" v-html="message"></p>
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};
export default {
  data () {
    return {
      visible: false,
      message: '',
      duration: 1000,
      type: '',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 64,
      horizontalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
    };
  },
  computed: {
    typeClass () {
      return this.type && !this.iconClass
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : '';
    },
    positionStyle () {
      return {
        'top': `${this.verticalOffset}px`,
        'marginLeft': `${this.horizontalOffset}`,
      };
    },
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },
  mounted () {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown);
  },
  methods: {
    handleAfterLeave () {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close () {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clearTimer () {
      clearTimeout(this.timer);
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown (e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    },
  },
};
</script>
