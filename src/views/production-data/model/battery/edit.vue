<!--
 * @Description: 型号（电池）新增/编辑
 * @Author: linjia
 * @Date: 2020-07-14 14:56:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 18:01:08
-->
<template>
  <drawer-right class="model-battery-edit"
    :title="`电池型号${action.title}`"
    width="800px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :rules="rules"
      :model="form"
      label-width="180px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="型号名称"
        prop="code">
        <el-input v-model="form.code" placeholder="请输入3-32位字符"></el-input>
      </el-form-item>
      <el-form-item label="电池重量" prop="weight">
        <el-input v-model="form.weight" placeholder="请输入数字，保留2位小数">
          <span slot="suffix" class="unit">kg</span>
        </el-input>
      </el-form-item>
      <el-form-item label="额定容量" prop="rated_cap">
        <el-input v-model="form.rated_cap" placeholder="请输入整数">
          <span slot="suffix" class="unit">Wh</span>
        </el-input>
      </el-form-item>
      <el-form-item label="标称容量" prop="nominal_cap">
        <el-input v-model="form.nominal_cap" placeholder="请输入整数">
          <span slot="suffix" class="unit">Ah</span>
        </el-input>
      </el-form-item>
      <el-form-item label="最大可循环次数" prop="max_cycle_count">
        <el-input v-model="form.max_cycle_count" placeholder="请输入整数">
          <span slot="suffix" class="unit">次</span>
        </el-input>
      </el-form-item>
      <el-form-item label="定检时间周期" prop="time_check_period">
        <el-input v-model="form.time_check_period" placeholder="请输入整数">
          <span slot="suffix" class="unit">天</span>
        </el-input>
      </el-form-item>
      <el-form-item label="标称截止电压" prop="cut_off_volt">
        <el-input v-model="form.cut_off_volt" placeholder="请输入数字，保留2位小数">
          <span slot="suffix" class="unit">V</span>
        </el-input>
      </el-form-item>
      <el-form-item label="定检使用周期" prop="use_check_period">
        <el-input v-model="form.use_check_period" placeholder="请输入整数">
          <span slot="suffix" class="unit">h</span>
        </el-input>
      </el-form-item>
      <el-form-item label="测量电压">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="0" prop="min_measured_volt">
              <el-input v-model="form.min_measured_volt" placeholder="最小">
                <span slot="suffix" class="unit">V</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align:center;">
            -
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0" prop="max_measured_volt">
              <el-input v-model="form.max_measured_volt" placeholder="最大">
                <span slot="suffix" class="unit">V</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="标称满电电压" prop="full_power_volt">
        <el-input v-model="form.full_power_volt"
          placeholder="请输入数字">
          <span slot="suffix" class="unit">V</span>
        </el-input>
      </el-form-item>
      <el-form-item label="容量衰减系数" prop="power_decay_factor">
        <el-input v-model="form.power_decay_factor" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="单电池循环平均时长" prop="cycle_average_duration">
        <el-input v-model="form.cycle_average_duration" placeholder="请输入数字">
          <span slot="suffix" class="unit">h</span>
        </el-input>
      </el-form-item>
      <el-form-item label="健康状态标准参数" prop="standard_parameters">
        <el-input v-model="form.standard_parameters" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="最低可用软件版本" prop="lowest_software_version">
        <el-input v-model="form.lowest_software_version" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="健康状态临界参数" prop="critical_parameters">
        <el-input v-model="form.critical_parameters" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="出厂价格" prop="price">
        <el-input v-model="form.price" placeholder="请输入大于0的数字">
          <span slot="suffix" class="unit">元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="电压带载转空载换算系数" prop="conversion_factor" class="block">
        <el-input v-model="form.conversion_factor" placeholder="顺序输入2个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="电容-电压曲线" prop="volt_cap_relation" class="block">
        <el-input v-model="form.volt_cap_relation" placeholder="顺序输入11个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="电容-温度曲线" prop="temp_cap_relation" class="block">
        <el-input v-model="form.temp_cap_relation" placeholder="顺序输入3个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment" class="block">
        <el-input v-model="form.comment" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { modelCreate, modelUpdate, modelDetailSearch } from '@/api/battery.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: modelCreate },
  update: { title: '修改', type: 'update', submitFunc: modelUpdate },
};
const form = {
  code: null,
  weight: null,
  rated_cap: 340,
  nominal_cap: 340,
  max_cycle_count: 400,
  time_check_period: 30,
  cut_off_volt: null,
  use_check_period: 100,
  full_power_volt: 300,
  min_measured_volt: null,
  max_measured_volt: null,
  power_decay_factor: null,
  cycle_average_duration: null,
  standard_parameters: null,
  lowest_software_version: null,
  critical_parameters: null,
  price: null,
  conversion_factor: null,
  volt_cap_relation: null,
  temp_cap_relation: null,
  comment: null,
};
export default {
  name: 'ModelBatteryEdit',
  data () {
    const mersuredMinVoltRule = (rule, value, callback) => {
      if (this.form.max_measured_volt < value) {
        return callback(new Error('最小值不可大于最大值'));
      }
      else {
        return callback();
      }
    };
    const mersuredMaxVoltRule = (rule, value, callback) => {
      if (value < this.form.min_measured_volt) {
        return callback(new Error('最大值不可小于最小值'));
      }
      else {
        this.$refs.form.validateField('min_measured_volt');
        return callback();
      }
    };
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        code: [{ required: true, message: '请输入型号名称'}, this.$tools.formRules.stringRange({min: 3, max: 32}), this.$tools.formRules.repeatCheck({id: this.$route.query.id, module: 'batterymodel', field: 'code'})],
        weight: [{ required: true, message: '请输入电池重量'}, this.$tools.formRules.numberFixed(2)],
        rated_cap: [{ required: true, message: '请输入额定容量'}, this.$tools.formRules.numberInt],
        nominal_cap: [{ required: true, message: '请输入标称容量'}, this.$tools.formRules.numberInt],
        max_cycle_count: [{ required: true, message: '请输入最大可循环次数'}, this.$tools.formRules.numberInt],
        time_check_period: [{ required: true, message: '请输入定检时间周期'}, this.$tools.formRules.numberInt],
        cut_off_volt: [{ required: true, message: '请输入标称截止电压'}, this.$tools.formRules.numberFixed(2)],
        use_check_period: [{ required: true, message: '请输入定检使用周期'}, this.$tools.formRules.numberInt],
        full_power_volt: [{ required: true, message: '请输入标称满电电压'}, this.$tools.formRules.number],
        power_decay_factor: [{ required: true, message: '请输入容量衰减系数'}, this.$tools.formRules.number],
        cycle_average_duration: [{ required: true, message: '请输入单电池循环平均时长'}, this.$tools.formRules.number],
        standard_parameters: [{ required: true, message: '请输入健康状态标准参数'}, this.$tools.formRules.number],
        lowest_software_version: [{ required: true, message: '请输入最低可用软件版本'}],
        critical_parameters: [{ required: true, message: '请输入健康状态临界参数'}, this.$tools.formRules.number],
        price: [{ required: true, message: '请输入出厂价格'}, this.$tools.formRules.numberMoreThan(0)],
        conversion_factor: [{ required: true, message: '请输入电压带载转空载换算系数'}, this.$tools.formRules.multipleParams(2)],
        volt_cap_relation: [{ required: true, message: '请输入电容-电压曲线'}, this.$tools.formRules.multipleParams(11)],
        temp_cap_relation: [{ required: true, message: '请输入电容-温度曲线'}, this.$tools.formRules.multipleParams(3)],
        min_measured_volt: [{ required: true, message: '请输入最小值'}, this.$tools.formRules.number, {validator: mersuredMinVoltRule}],
        max_measured_volt: [{ required: true, message: '请输入最大值'}, this.$tools.formRules.number, {validator: mersuredMaxVoltRule}],
      },
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
  },
  methods: {
    async init () {
      if (this.action.type === 'create') {
        this.form = this.$lodash.cloneDeep(form);
      } else if (this.action.type === 'update') {
        let res = await modelDetailSearch({
          id: this.action.id,
        }, {loading: true});
        if (res.code !== 200) {
          this.form = this.$lodash.cloneDeep(form);
          return;
        }
        this.form = res.content;
      }
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          code: this.form.code,
          weight: Number(this.form.weight),
          rated_cap: Number(this.form.rated_cap),
          nominal_cap: Number(this.form.nominal_cap),
          max_cycle_count: Number(this.form.max_cycle_count),
          time_check_period: Number(this.form.time_check_period),
          cut_off_volt: Number(this.form.cut_off_volt),
          use_check_period: Number(this.form.use_check_period),
          full_power_volt: Number(this.form.full_power_volt),
          min_measured_volt: Number(this.form.min_measured_volt),
          max_measured_volt: Number(this.form.max_measured_volt),
          power_decay_factor: Number(this.form.power_decay_factor),
          cycle_average_duration: Number(this.form.cycle_average_duration),
          standard_parameters: Number(this.form.standard_parameters),
          lowest_software_version: Number(this.form.lowest_software_version),
          critical_parameters: Number(this.form.critical_parameters),
          price: Number(this.form.price),
          conversion_factor: this.form.conversion_factor,
          volt_cap_relation: this.form.volt_cap_relation,
          temp_cap_relation: this.form.temp_cap_relation,
          comment: this.form.comment,
        };
        if (this.action.type === 'update') {
          params.id = this.action.id;
        }
        let res = await this.action.submitFunc(params, {loading: true});
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
  },
};
</script>

<style>

</style>
