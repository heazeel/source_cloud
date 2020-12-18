/*
 * @Description: 工具库
 * @Author: linjia
 * @Date: 2020-04-11 16:14:46
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-18 15:22:52
 */
import store from '@/store';
import { repeatSearch } from '@/api/common.js';
/**
 * @description: 字符串长度校验
 * @param {Number} min
 * @param {Number} max
 * @return {type}
 */
const validStringLength = ({ min, max } = {}) => (rule, value, callback) => {
  let fixedPattern = '\^\\S\{' + min + '\,' + max;
  let fixedReg = new RegExp(fixedPattern + '\}\$', 'g');
  if (value && !fixedReg.test(value)) {
    return callback(new Error(`请输入长度${min}~${max}的非空白字符`));
  } else {
    return callback();
  }
};

/**
 * @description: 纯数字校验
 * @return {type}
 */
const validPureNumber = (rule, value, callback) => {
  if (value && !/^[0-9]+$/.test(value)) {
    return callback(new Error('请输入数字'));
  } else {
    return callback();
  }
};

/**
 * @description: 数值校验
 * @param {Number} moreThanNum 比大，比较值
 * @param {Number} lessThanNum 比小，比较值
 * @param {Number} fixedNum 保留几位小数
 * @return:
 */
const validNumber = ({ moreThanNum, lessThanNum, fixedNum } = {}) => (rule, value, callback) => {
  if (value && (value !== '0' || value !== 0) && !/^(\-|\+)?(0|[1-9][0-9]*)(\.\d+)?$/.test(value)) {
    return callback(new Error('请输入数字'));
  } else {
    // 大于某个值
    if ((moreThanNum || moreThanNum === 0) && value < moreThanNum) {
      return callback(new Error(`请输入大于${moreThanNum}的数字`));
    }
    // 小于某个值
    if ((lessThanNum || lessThanNum === 0) && value > lessThanNum) {
      return callback(new Error(`请输入小于${lessThanNum}的数字`));
    }
    // 保留几位小数 (正负、0-n位小数)
    let fixedPattern = '\^\(\\-\|\\+\)\?\(0\|\[1-9\]\[0-9\]\*\)\(\.\\d\{0,' + fixedNum;
    let fixedReg = new RegExp(fixedPattern + '\}\)\?\$', 'g');
    if (fixedNum > 0 && !fixedReg.test(value)) {
      return callback(new Error(`请保留1-${fixedNum}位小数`));
    } else if (fixedNum == 0 && !/^(\-|\+)?(0|[1-9][0-9]*)$/.test(value)) {
      return callback(new Error('请输入整数'));
    }
    return callback();
  }
};

/**
 * @description: 字母或数字组合的字符
 * @param {type}
 * @return {type}
 */
const validCode = (rule, value, callback) => {
  if (value && !/^[0-9a-zA-Z]+$/.test(value)) {
    return callback(new Error('请输入字母或数字组合的字符'));
  } else {
    return callback();
  }
};

/**
 * @description: 手机号校验
 * @param {Object} rule 规则
 * @param {Number|String} value 值
 * @param {Function} callback 回调
 * @return: 校验回调
 */
const validPhone = (rule, value, callback) => {
  if (value && !/^1[3-9]\d{9}$/.test(value)) {
    return callback(new Error('手机号格式不正确'));
  } else {
    return callback();
  }
};

/**
 * @description: 用户名校验
 * @param {Object} rule 规则
 * @param {Number|String} value 值
 * @param {Function} callback 回调
 * @return: 校验回调
 */
const validUsername = (rule, value, callback) => {
  if (value && !/^[a-zA-Z0-9]{3,20}$/.test(value)) {
    return callback(new Error('请输入3-20位，字母或数字组合的字符'));
  } else {
    return callback();
  }
};

/**
 * @description: 中英文姓名校验
 * @param {Object} rule 规则
 * @param {Number|String} value 值
 * @param {Function} callback 回调
 * @return: 校验回调
 */
const validName = (rule, value, callback) => {
  if (value && !/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/.test(value)) {
    return callback(new Error('请输入真实的中/英文姓名'));
  } else {
    return callback();
  }
};

/**
 * @description: 密码校验
 * @param {Object} rule 规则
 * @param {Number|String} value 值
 * @param {Function} callback 回调
 * @return: 校验回调
 */
const validPassword = (rule, value, callback) => {
  if (value && !/^[a-zA-Z0-9]{8,20}$/.test(value)) {
    return callback(new Error('请输入8-20位，字母或数字组合的字符'));
  } else {
    return callback();
  }
};

/**
 * @description: 多参数格式判断
 * @param {Number} nums 几个参数
 * @return: 校验回调
 */
const validMultipleParams = (nums) => (rule, value, callback) => {
  // if (type == 'number') { // 暂时加一个数字的校验，后续需要校验其他类型的值可以再加
  //   value.split(',').forEach(item => {
  //     if (item && !/^[0-9]+.?[0-9]*$/.test(item)) {
  //       return callback(new Error('请输入数字'));
  //     }
  //   });
  // }
  if (nums != value.split(',').length) {
    // 多参数 参数少了或者多了
    return callback(new Error(`请输入${nums}个参数，用英文“,”隔开`));
  } else {
    let hasNull = value.split(',').filter(item => item == '');
    if (hasNull.length > 0) {
      // 多参数 参数数量正确 参数或参数值中有空值
      return callback(new Error('“,”之间不可为空'));
    } else {
      return callback();
    }
  }
};

/**
 * @description: 多参数，用回车换行区分
 * @param {Number} nums 几个参数
 * @return: 校验回调
 */
const validMultipleParamsSplitWrap = nums => (rule, value, callback) => {
  if (value) {
    let valueArr = value.split('\n');
    let pass = true;
    if (nums && valueArr.length != nums) {
      return callback(new Error(`请输入${nums}个参数，用英文“,”隔开`));
    }
    valueArr.map(item => {
      let _value = item.split(':');
      if (_value.length != 2) {
        pass = false;
        return callback(new Error(`格式：参数:数值，当前${item}格式不正确`));
      } else {
        let isEmpty = _value.filter(ele => ele == '');
        if (isEmpty.length > 0) {
          pass = false;
          return callback(new Error(`${item}参数或者数值不可为空`));
        }
      }
    });
    if (pass) {
      return callback();
    }
  } else {
    return callback();
  }
};


/**
 * @description: 字段值唯一性校验
 * @param {Number} id id
 * @param {String} module 表名
 * @param {String} field 列名
 * @return: 校验回调
 */
const validRepeatCheck = ({ id, module, field = 'code' }) => async (rule, value, callback) => {
  let res = await repeatSearch({
    value, id, module, field,
  });
  console.log(value, id, module, field, res);
  if (res.code != 200) {
    return;
  }
  if (res.content.count > 0) {
    return callback(new Error(`已有“${value}”，请勿重复`));
  } else {
    return callback();
  }
};

/* 校验对象合集 */
export const formRules = {
  default: { validator: validStringLength({min: 1, max: 32}) },
  phone: { validator: validPhone },
  username: {validator: validUsername},
  name: { validator: validName },
  code: { validator: validCode },
  password: { validator: validPassword },
  stringRange: ({ min, max }) => ({ validator: validStringLength({min, max}) }),
  number: { validator: validNumber() },
  pureNumber: { validator: validPureNumber },
  numberInt: { validator: validNumber({ fixedNum: 0 }) }, // 整数
  numberFixed: (nums = 2) => ({ validator: validNumber({ fixedNum: nums }) }), // 保留几位小数
  numberMoreThan: (nums = 0) => ({ validator: validNumber({ moreThanNum: nums }) }), // 大于nums
  numberLessThan: (nums = 0) => ({ validator: validNumber({ lessThanNum: nums }) }), // 小于nums
  repeatCheck: ({ value, id, module, field }) => ({validator: validRepeatCheck({ value, id, module, field }), trigger: 'blur'}),
  multipleParams: (nums, type) => ({ validator: validMultipleParams(nums, type) }),
  multipleParamsSplitWrap: (nums) => ({ validator: validMultipleParamsSplitWrap(nums) }),
};


/**
 * @description: 移除对象的空值
 * @param {Object} obj
 * @return: obj
 */
export const deleteEmptyProperty = obj => {
  let object = obj;
  let _this = this;
  Object.keys(object).forEach((key, index) => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      if (Array.isArray(object[key])) {
        if (object[key].length == 0) {
          delete object[key];
        }
      }
      deleteEmptyProperty(object[key]);
    } else {
      if (object[key] === '' || object[key] === null || object[key] === undefined) {
        delete object[key];
      }
    }
  });
  return object;
};


/**
 * @description: 鉴别是否有这个权限
 * @param {String} permissionName
 * @return: Boolean
 */
export const checkPermission = permissionName => {
  let permissionRoute = store.state.app.permissionRouteFlatArr.find(route => route.name == permissionName);
  if (permissionRoute) {
    return true;
  } else {
    return false;
  }
};


/**
 * @description: 多参数回车换行 转成 对象
 * @param {String} paramsStr
 * @return {Object} paramObj
 */
export const paramsStrTransToObj = paramsStr => {
  let paramsStrArr = paramsStr.split('\n');
  let paramObj = {};
  paramsStrArr.forEach(param => {
    const [key, value] = param.split(':');
    paramObj[key] = value;
  });
  return paramObj;
};

/**
 * @description: 对象 转成 多参数回车换行字符串
 * @param {Object} paramObj
 * @return {String} paramsStr
 */
export const paramsObjTransStr = paramObj => {
  let paramsStr = '';
  Object.keys(paramObj).forEach((keys, index) => {
    paramsStr += `${keys}:${paramObj[keys]}`;
    if (index < Object.keys(paramObj).length - 1) {
      paramsStr += '\n';
    }
  });
  return paramsStr;
};

/**
 * @description: 设备类型名称转换
 * @param {String} deviceType
 * @return {String}
 */
export const deviceTypeNameConversion = deviceType => {
  const DEV_TYPE_MAP = new Map([['drone', 'uav'], ['rcd', 'src'], ['ustation', 'uap']]);
  if (DEV_TYPE_MAP.has(deviceType)) {
    return DEV_TYPE_MAP.get(deviceType);
  }
  return deviceType;
};
