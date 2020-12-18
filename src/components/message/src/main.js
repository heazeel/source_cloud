/*
 * @Description:
 * @Author: linjia
 * @Date: 2020-04-28 09:49:44
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-09 18:18:59
 */
import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'element-ui/src/utils/popup';
import { isVNode } from 'element-ui/src/utils/vdom';
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = function (options) {
  if (Vue.prototype.$isServer) { return; }
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options,
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function () {
    Message.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options,
  });
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
  let verticalOffset = options.offset || 64; // 垂直偏移
  let horizontalOffset = 0; // 水平偏移
  // 弹窗和抽屉的提示语
  if (options.containerType == 'drawer') {
    let container = this.$vnode.elm.getElementsByClassName('el-drawer')[0];
    horizontalOffset = `calc(${container.offsetLeft}px - 50% + ${container.offsetWidth / 2}px)`;
  } else if (options.containerType == 'dialog') {
    let container = this.$vnode.elm.getElementsByClassName('el-dialog')[0];
    verticalOffset += container.offsetTop;
  } else if (options.containerType == 'message-box') {
    if (this.$el) {
      let container = this.$el.firstChild;
      verticalOffset += container.offsetTop;
    }
  }
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.horizontalOffset = horizontalOffset;
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex() + 1000;
  instances.push(instance);
  return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function (id, userOnClose) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) { return; }
  for (let i = index; i < len - 1 ; i++) {
    let dom = instances[i].$el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
