/*
 * @Description: api接口的统一出口
 * @Author: linjia
 * @Date: 2020-03-26 14:50:52
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-07 14:05:15
 */
import * as common from './common'; // 公共
import * as login from './login'; // 登录
import * as permission from './permission';
import * as user from './user';
import * as role from './role';
import * as drone from './drone';
import * as ustation from './ustation';
import * as hstation from './hstation';
import * as rcd from './rcd';
import * as box from './box';
import * as battery from './battery';
import * as cCard from './c-card';
import * as delivery from './delivery';
import * as firmware from './firmware';
import * as flowPool from './flow-pool';
import * as baseModel from './base-model';
import * as hardVersion from './hard-version';
import * as commonParts from './common-parts';
import * as firmwareRelease from './firmware-release';
// 其他模块的接口……

// 导出接口
export default {
  common,
  login,
  permission,
  user,
  role,
  drone,
  ustation,
  hstation,
  rcd,
  box,
  battery,
  cCard,
  delivery,
  firmware,
  flowPool,
  baseModel,
  hardVersion,
  commonParts,
  firmwareRelease,
};
