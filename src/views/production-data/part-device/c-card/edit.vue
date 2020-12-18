<!--
 * @Description: 通信卡编辑
 * @Author: linjia
 * @Date: 2020-09-22 11:55:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 11:07:42
-->
<template>
  <drawer-right
    class="ccard-edit"
    :title="`通信卡${action.title}`"
    width="800px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="120px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="卡号"
        prop="card_no"
        :rules="[{ required: true, message: '请输入卡号'},$tools.formRules.code, $tools.formRules.repeatCheck({value: form.code, id: form.id, module: 'communicationcard', field: 'card_no'})]">
        <el-input v-model="form.card_no" placeholder="请输入数字、字母组合"></el-input>
      </el-form-item>
      <el-form-item label="运营商" prop="provider">
        <el-select v-model="form.provider"
          placeholder="请选择运营商"
          clearable
          @change="getTotal">
          <el-option
            v-for="item in PROVIDER_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price" placeholder="请输入大于0的数字"></el-input>
      </el-form-item>
      <el-form-item label="当前设备">
        <el-col :span="12">
          <el-form-item>
            <el-select v-model="form.device_type"
              placeholder="类别"
              clearable
              @change="clearDeviceId"
              @clear="hideSelectionBox">
              <el-option
                v-for="item in DEV_TYPE"
                :key="item.key"
                :label="item.text"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.device_type !== null" :span="12">
          <el-form-item prop="device_id">
            <select-remote
              v-model="form.device_id"
              label-key="no"
              :params="{device_type: form.device_type}"
              :api-key-obj="{type: 'cCard', funcName: 'remoteSelectSearch'}"
              placeholder="编号"
              clearable></select-remote>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="套餐总量">
        {{ total.package_total_sum | kbToMb }} M
      </el-form-item>
      <el-form-item label="剩余流量">
        {{ total.remaining_flow_sum | kbToMb }} M
      </el-form-item>
      <el-form-item label="已用流量">
        {{ total.used_flow_sum | kbToMb }} M
      </el-form-item>
      <el-form-item label="昨天使用流量">
        {{ total.yesterday_use_flow_sum | kbToMb }} M
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-select v-model="form.supplier"
          placeholder="请选择供应商"
          clearable
          @change="getTotal">
          <el-option
            v-for="item in SUPPLIER_TYPE"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="flow_pool_id" label="流量池">
        <select-remote v-model="form.flow_pool_id"
          :label="form.flow_pool"
          :api-key-obj="{type: 'flowPool', funcName: 'remoteSelectSearch'}"
          placeholder="请选择流量池"
          @input="getTotal"></select-remote>
      </el-form-item>
      <el-form-item prop="purchase_time" label="采购时间">
        <el-date-picker
          v-model="form.purchase_time"
          type="date"
          value-format="timestamp"
          :editable="false"
          placeholder="选择日期"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-select v-model="form.status" placeholder="状态">
          <el-option
            v-for="item in DEV_C_CARD_LIFE_STATUS"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { create, update, detailSearch, totalSearch} from '@/api/c-card.js';
import { SUPPLIER_TYPE, PROVIDER_TYPE, DEV_C_CARD_LIFE_STATUS, DEV_TYPE } from '@/utils/consts.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: create },
  update: { title: '修改', type: 'update', submitFunc: update },
};
const form = {
  card_no: null, // 卡号
  supplier: null, // 供应商
  price: null, // 价格
  device_type: null, // 设备类别
  device_id: null, // 设备id
  provider: null, // 运营商
  flow_pool_id: null, // 流量池
  purchase_time: null, // 采购时间
  status: null, // 状态
  comment: null, // 备注
};
let id = 0;
export default {
  name: 'CCardEdit',
  data () {
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        card_no: [{ required: true, message: '请输入卡号'}, this.$tools.formRules.code, this.$tools.formRules.repeatCheck({value: form.code, id: form.id, module: 'communicationcard', field: 'card_no'})],
        device_id: [{ required: true, message: '请选择编号'}],
        provider: [{required: true, message: '请选择运营商'}],
        supplier: [{required: true, message: '请选择供应商'}],
        price: [{required: true, message: '请输入价格'}, this.$tools.formRules.numberMoreThan()],
        flow_pool_id: [{required: true, message: '请选择流量池'}],
        purchase_time: [{required: true, message: '请选择时间'}],
        status: [{required: true, message: '请选择状态'}],
        comment: [{required: true, message: '请输入备注'}],
      },
      total: {
        package_total_sum: null,
        remaining_flow_sum: null,
        used_flow_sum: null,
        yesterday_use_flow_sum: null,
      },
      SUPPLIER_TYPE,
      PROVIDER_TYPE,
      DEV_C_CARD_LIFE_STATUS,
      DEV_TYPE,
    };
  },
  watch: {
    '$route.query.id': {
      handler (newVal) {
        if (!newVal && newVal !== 0) {
          this.action = type.create;
        } else {
          this.action = { ...type.update, id: newVal };
        }
      },
      immediate: true,
    },
    'form.supplier': {
      handler (newVal, oldVal) {
        this.PROVIDER_TYPE = PROVIDER_TYPE.filter(function (item) {
          if (newVal === '聚以') {
            return (item.key === '移动' || item.key === '电信');
          }
          else if (newVal === '乐尧') {
            return item.key === '电信';
          }
          else if (newVal === '移动') {
            return item.key === '移动';
          }
          return true;
        });
      },
    },
    'form.provider': {
      handler (newVal, oldVal) {
        this.SUPPLIER_TYPE = SUPPLIER_TYPE.filter(function (item) {
          if (newVal === '电信') {
            return (item.key === '聚以' || item.key === '乐尧');
          }
          else if (newVal === '移动') {
            return (item.key === '聚以' || item.key === '移动');
          }
          else if (newVal === '联通') {
            return false;
          }
          return true;
        });
      },
    },
  },
  methods: {
    async init () {
      if (this.action.type === 'create') {
        this.form = this.$lodash.cloneDeep(form);
        this.form.purchase_time = Date.parse(new Date());
      } else if (this.action.type === 'update') {
        let res = await detailSearch({
          id: this.action.id,
        }, {loading: true});
        if (res.code !== 200) {
          this.form = this.$lodash.cloneDeep(form);
          return;
        }
        this.form = res.content;
        this.form.purchase_time = parseInt(res.content.purchase_time * 1000);
        this.getTotal();
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          card_no: this.form.card_no, // 卡号
          provider: this.form.provider, // 运营商
          price: this.form.price, // 价格
          device_type: this.form.device_type,
          device_id: this.form.device_id,
          supplier: this.form.supplier, // 供应商
          flow_pool_id: this.form.flow_pool_id, // 流量池
          purchase_time: parseInt(this.form.purchase_time / 1000), // 采购时间
          status: this.form.status, // 状态
          comment: this.form.comment, // 备注
        };
        if (this.action.type === 'update') {
          params.id = this.form.id;
        }
        let res = await this.action.submitFunc(params, { loading: true });
        if (res.code !== 200) {
        // TODO 错误处理
          return;
        }
        this.$message({
          message: `${this.action.title}成功！`,
          type: 'success',
          containerType: 'drawer',
          onClose: () => {
            this.$router.back();
          },
        });
      }
      catch (e) {
        return e;
      }
    },

    // 查询套餐总量
    async getTotal () {
      let res = await totalSearch({
        card_no: this.form.card_no,
        provider: this.form.provider,
        supplier: this.form.supplier,
        flow_pool_id: this.form.flow_pool_id,
      }, { loading: true });
      if (res.code != 200) { return; }
      this.total = res.content;
    },

    // 清除device_id
    clearDeviceId () {
      this.form.device_id = null;
    },

    // 隐藏设备编号选择框
    hideSelectionBox () {
      this.form.device_id = null;
      this.form.device_type = null;
    },
  },
};
</script>

<style>

</style>
