/*
 * @Description: 主设备状态选择限制
 * @Author: hezhijie
 * @Date: 2020-11-04 10:43:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-04 18:24:50
 */

import { DEV_DRONE_LIFE_STATUS } from '@/utils/consts.js';
export const mainDeviceStatus = {
  watch: {
    '$route.query': {
      handler (newVal) {
        if (!newVal.id && newVal.id!== 0) { // create
          this.statusArr = DEV_DRONE_LIFE_STATUS.slice(0, 2); // 新建时只可选择生产和测试
        }
        else { // update
          if (newVal.status !== 3 && newVal.status !== 4) { // 编辑时，如果不处于运行和维修状态，则只可以选择生产和测试
            this.statusArr = DEV_DRONE_LIFE_STATUS.slice(0, 2);
          }
          else if (newVal.status === 3) { // 处于运行状态，什么都选择不了
            this.statusArr = DEV_DRONE_LIFE_STATUS.slice(2, 3);
          }
          else if (newVal.status === 4) { // 处于维修状态，可选择生产和测试
            this.statusArr = DEV_DRONE_LIFE_STATUS;
            this.statusArr.splice(-2, 1);
          }
        }
      },
      immediate: true,
    },
  },
};
