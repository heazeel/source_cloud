/*
 * @Description: 一些常量
 * @Author: linjia
 * @Date: 2020-04-16 13:52:08
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 10:34:44
 */

/* --- 各种错误码 --- */
export const errorCode = new Map([
  ['d001', { type: '设备未在线或心跳异常', text: '设备未在线或心跳异常' }],
  ['d002', { type: '控制指令发送失败', text: '控制指令发送失败' }],
  ['d003', { type: '未收到设备的消息回复', text: '未收到设备的消息回复' }],
  ['d004', { type: '设备执行失败', text: '设备执行失败' }],
  ['u001', { type: '用户不存在', text: '账号不存在' }],
  ['u002', { type: '账号被禁用', text: '账号被禁用，请联系企业管理员' }],
  ['u003', { type: '手机号码不存在', text: '手机号不存在，请与企业管理员确认已有账户' }],
  ['u004', { type: '验证码失效', text: '验证码已失效，请重新获取' }],
  ['u005', { type: '验证码错误', text: '验证码错误，请重新输入' }],
  ['u006', { type: '密码错误', text: '密码错误，请核对大小写是否正确' }],
  ['u007', { type: '验证码发送频繁', text: '验证码发送太频繁，60s后再试' }],
  ['m001', { type: '已被无人机使用', text: '已有无人机使用此型号，请先删除对应无人机！' }],
  ['m002', { type: '已被无人机型号使用', text: '已有无人机型号使用此型号，请先解绑对应无人机型号！' }],
  ['m003', { type: '已被电池使用', text: '已有电池使用此型号，请先删除对应电池！' }],
]);

// 设备类型
export const DEV_TYPE = [
  { key: 'uav', text: '无人机' },
  { key: 'uap', text: '无人站' },
  { key: 'src', text: '导控器' },
  // { key: 'h-uap', text: '人工站' },
];

// 无人机生命周期状态
export const DEV_DRONE_LIFE_STATUS = [
  { key: 1, text: '生产' },
  { key: 2, text: '测试' },
  { key: 3, text: '运行' },
  { key: 4, text: '维修' },
];

// 无人站配置文件状态
export const DEV_USTATION_CONFIG_FILE_STATUS = [
  {key: 0, text: '未更新'},
  {key: 1, text: '已更新'},
];

// 货箱生命周期状态
export const DEV_BOX_LIFE_STATUS = [
  { key: 1, text: '在库' },
  { key: 2, text: '商业运营' },
  { key: 3, text: '返厂维修' },
  { key: 4, text: '报废' },
];

// 流量卡生命周期状态
export const DEV_C_CARD_LIFE_STATUS = [
  { key: 1, text: '在库' },
  { key: 2, text: '使用中' },
  { key: 3, text: '报废' },
];

// 供应商
export const SUPPLIER_TYPE = [
  { key: '聚以', text: '聚以' },
  { key: '乐尧', text: '乐尧' },
  { key: '移动', text: '移动' },
];

// 运营商
export const PROVIDER_TYPE = [
  { key: '电信', text: '电信' },
  { key: '移动', text: '移动' },
  { key: '联通', text: '联通' },
];

// 无人机固件ip_port
export const DRONE_IP_PORT = {
  sys: [{ key: '47.97.122.140:8000', text: '正式' }, { key: '47.97.122.140:8003', text: '测试' }],
  lib: [{ key: '47.97.122.140:8001', text: '正式' }, { key: '47.97.122.140:8004', text: '测试' }],
  app: [{ key: '47.97.122.140:8002', text: '正式' }, { key: '47.97.122.140:8005', text: '测试' }],
};

// 无人站固件ip_port
export const USTATION_IP_PORT = {
  sys: [{ key: '47.97.122.140:8100', text: '正式' }, { key: '47.97.122.140:8103', text: '测试' }],
  lib: [{ key: '47.97.122.140:8101', text: '正式' }, { key: '47.97.122.140:8104', text: '测试' }],
  app: [{ key: '47.97.122.140:8102', text: '正式' }, { key: '47.97.122.140:1005', text: '测试' }],
};

// 告警相应等级
export const ALARM_LEVEL = [
  { key: 'A', text: 'A 应急迫降' },
  { key: 'B', text: 'B 应急暂停' },
  { key: 'C', text: 'C 应急备降' },
  { key: 'D', text: 'D 远程操控' },
  { key: 'E', text: 'E 地面处理' },
];

// 告警类型
export const ALARM_TYPE = [
  { key: 1, text: '1 瞬态功率' },
  { key: 2, text: '2 航路飞行' },
  { key: 3, text: '3 飞行能量' },
  { key: 4, text: '4 定点着陆' },
  { key: 5, text: '5 一般功能' },
];

// 告警是否忽略
export const ALARM_IGNORED = [
  { key: 0, text: '否' },
  { key: 1, text: '是' },
];

// 告警状态
export const ALARM_DISABLED = [
  { key: 0, text: '启用' },
  { key: 1, text: '禁用' },
];
// 版本
export const VERSION = [
  { key: 'alpha', text: '测试' },
  { key: 'beta', text: '预发布' },
  { key: 'prod', text: '发布' },
];

// 固件上传进度
export const UPLOAD_STATUS = [
  { key: '01', text: '上传中' },
  { key: '02', text: '上传失败' },
  { key: '03', text: '上传成功' },
];
