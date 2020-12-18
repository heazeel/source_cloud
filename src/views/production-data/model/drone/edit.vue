<!--
 * @Description: 型号（无人机）新增/编辑
 * @Author: linjia
 * @Date: 2020-07-14 09:22:11
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-10 11:05:09
-->
<template>
  <drawer-right class="model-drone-edit"
    :title="`无人机型号${action.title}`"
    width="900px"
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
        <el-input v-model="form.code"
          placeholder="请输入3-32位字符"></el-input>
      </el-form-item>
      <el-form-item label="电池型号"
        prop="bty_md_id">
        <select-remote v-model="form.bty_md_id"
          :label="form.bty_md_name"
          label-key="code"
          :api-key-obj="{type: 'battery', funcName: 'remoteSelectSearch'}"></select-remote>
      </el-form-item>
      <el-form-item label="空机重量（不含电池）"
        prop="weight">
        <el-input v-model="form.weight"
          type="number"
          placeholder="请输入数字，保留1位小数">
          <span slot="suffix"
            class="unit">kg</span>
        </el-input>
      </el-form-item>
      <el-form-item label="定检时间周期"
        prop="time_check_period">
        <el-input v-model="form.time_check_period"
          type="number"
          placeholder="请输入整数">
          <span slot="suffix"
            class="unit">天</span>
        </el-input>
      </el-form-item>
      <el-form-item label="最大起飞重量"
        prop="max_takeoff_load">
        <el-input v-model="form.max_takeoff_load"
          type="number"
          placeholder="请输入数字，保留1位小数">
          <span slot="suffix"
            class="unit">kg</span>
        </el-input>
      </el-form-item>
      <el-form-item label="定检使用周期"
        prop="use_check_period">
        <el-input v-model="form.use_check_period"
          type="number"
          placeholder="请输入整数">
          <span slot="suffix"
            class="unit">h</span>
        </el-input>
      </el-form-item>
      <el-form-item label="防雨等级"
        prop="waterproof_level">
        <el-select v-model="form.waterproof_level"
          placeholder="请选择">
          <el-option label="小雨"
            value="1"></el-option>
          <el-option label="中雨"
            value="2"></el-option>
          <el-option label="大雨"
            value="3"></el-option>
          <el-option label="暴雨"
            value="4"></el-option>
          <el-option label="特大暴雨"
            value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抗风等级"
        prop="windbreak_level">
        <el-select v-model="form.windbreak_level"
          placeholder="请选择">
          <el-option v-for="level in 14"
            :key="level"
            :label="level"
            :value="level"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="温度限制">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="temp_lower_limit">
              <el-input v-model="form.temp_lower_limit"
                type="number"
                placeholder="下限">
                <span slot="suffix"
                  class="unit">&#8451;</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4"
            style="text-align:center;">
            -
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="temp_upper_limit">
              <el-input v-model="form.temp_upper_limit"
                type="number"
                placeholder="上限">
                <span slot="suffix"
                  class="unit">&#8451;</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="海拔限制"
        prop="alt_upper_limit">
        <el-input v-model="form.alt_upper_limit"
          type="number"
          placeholder="请输入整数"></el-input>
      </el-form-item>
      <el-form-item label="总重截止电压关系参数"
        prop="weight_end_volt_relation">
        <el-input v-model="form.weight_end_volt_relation"
          placeholder="顺序输入4个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="安全悬停时间阈值"
        prop="safe_hover_time">
        <el-input v-model="form.safe_hover_time"
          type="number"
          placeholder="请输入整数"></el-input>
      </el-form-item>
      <el-form-item label="机载电池数量"
        prop="battery_count">
        <el-input v-model="form.battery_count"
          type="number"
          placeholder="请输入整数">
          <span slot="suffix"
            class="unit">块</span>
        </el-input>
      </el-form-item>
      <el-form-item label="飞机待机功率"
        prop="standby_power">
        <el-input v-model="form.standby_power"
          type="number"
          placeholder="请输入整数">
          <span slot="suffix"
            class="unit">W</span>
        </el-input>
      </el-form-item>
      <el-form-item label="电机轴数"
        prop="motor_shaft_count">
        <el-input v-model="form.motor_shaft_count"
          type="number"
          placeholder="请输入整数">
          <span slot="suffix"
            class="unit">轴</span>
        </el-input>
      </el-form-item>
      <el-form-item label="起飞重量检测高度区间">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="weight_height_min">
              <el-input v-model="form.weight_height_min" type="number" placeholder="上限">
                <span slot="suffix"
                  class="unit">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4"
            style="text-align:center;">
            -
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="weight_height_max">
              <el-input v-model="form.weight_height_max" type="number" placeholder="下限">
                <span slot="suffix"
                  class="unit">m</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="飞控PWM脉宽">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="FC_pulse_width_min">
              <el-input v-model="form.FC_pulse_width_min" type="number" placeholder="上限"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4"
            style="text-align:center;">
            -
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="FC_pulse_width_max">
              <el-input v-model="form.FC_pulse_width_max" type="number" placeholder="下限"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="电调最小响应PWM脉宽"
        prop="PWM_pulse_width_min">
        <el-input v-model="form.PWM_pulse_width_min"
          type="number"
          placeholder="请输入整数"></el-input>
      </el-form-item>
      <el-form-item label="飞机应急下降速度"
        prop="emergency_land_speed">
        <el-input v-model="form.emergency_land_speed"
          type="number"
          placeholder="请输入数字，保留2位小数">
          <span slot="suffix"
            class="unit">m/s</span>
        </el-input>
      </el-form-item>
      <el-form-item label="起落架长*宽">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="undercarriage_length">
              <el-input v-model="form.undercarriage_length"
                type="number"
                placeholder="长">
                <span slot="suffix"
                  class="unit">mm</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4"
            style="text-align:center;">
            *
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0px" prop="undercarriage_width">
              <el-input v-model="form.undercarriage_width"
                type="number"
                placeholder="宽">
                <span slot="suffix"
                  class="unit">mm</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="起落架与货箱距离"
        prop="under_offset">
        <el-input v-model="form.under_offset"
          type="number"
          placeholder="请输入数字，保留2位小数">
          <span slot="suffix"
            class="unit">mm</span>
        </el-input>
      </el-form-item>
      <el-form-item label="起落架前后偏移"
        prop="fb_offset">
        <el-input v-model="form.fb_offset"
          type="number"
          placeholder="请输入数字，保留2位小数">
          <span slot="suffix"
            class="unit">mm</span>
        </el-input>
      </el-form-item>
      <el-form-item label="起落架左右偏移"
        prop="lr_offset">
        <el-input v-model="form.lr_offset"
          type="number"
          placeholder="请输入数字，保留2位小数">
          <span slot="suffix"
            class="unit">mm</span>
        </el-input>
      </el-form-item>
      <el-form-item label="悬停功率系数"
        prop="hover_power_factor"
        class="block">
        <el-input v-model="form.hover_power_factor"
          placeholder="顺序输入4个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="飞行功率系数"
        prop="flight_power_factor"
        class="block">
        <el-input v-model="form.flight_power_factor"
          placeholder="顺序输入6个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="等效悬停单轴拉力计算系数"
        prop="equal_hover_uniaxial_tension_factor"
        class="block">
        <el-input v-model="form.equal_hover_uniaxial_tension_factor"
          placeholder="顺序输入7个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="实时单轴拉力计算系数"
        prop="real_time_uniaxial_tension_factor"
        class="block">
        <el-input v-model="form.real_time_uniaxial_tension_factor"
          placeholder="顺序输入6个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="飞机实时功率系数"
        prop="real_time_power_factor"
        class="block">
        <el-input v-model="form.real_time_power_factor"
          placeholder="顺序输入4个数字，用“,”隔开"></el-input>
      </el-form-item>
      <el-form-item label="备注"
        prop="comment"
        class="block">
        <el-input v-model="form.comment"
          type="textarea"
          placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { modelCreate, modelUpdate, modelDetailSearch } from '@/api/drone.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: modelCreate },
  update: { title: '修改', type: 'update', submitFunc: modelUpdate },
};
const form = {
  code: null,
  bty_md_id: null,
  bty_md_name: null,
  weight: null,
  time_check_period: null,
  max_takeoff_load: null,
  use_check_period: null,
  waterproof_level: null,
  windbreak_level: null,
  temp_lower_limit: null,
  temp_upper_limit: null,
  alt_upper_limit: null,
  weight_end_volt_relation: null,
  safe_hover_time: null,
  battery_count: null,
  standby_power: null,
  motor_shaft_count: null,
  weight_height_min: null,
  weight_height_max: null,
  FC_pulse_width_min: null,
  FC_pulse_width_max: null,
  PWM_pulse_width_min: null,
  emergency_land_speed: null,
  undercarriage_length: null,
  undercarriage_width: null,
  under_offset: null,
  fb_offset: null,
  lr_offset: null,
  hover_power_factor: null,
  flight_power_factor: null,
  equal_hover_uniaxial_tension_factor: null,
  real_time_uniaxial_tension_factor: null,
  real_time_power_factor: null,
  comment: null,
};
export default {
  name: 'ModelDroneEdit',
  data () {
    const tempLowerLimitRule = (rules, value, callback) => {
      if (Number(this.form.temp_upper_limit) < Number(value)) {
        return callback(new Error('低温不可大于高温'));
      }
      else {
        return callback();
      }
    };
    const tempUpperLimitRule = (rules, value, callback) => {
      if (Number(value) < Number(this.form.temp_lower_limit)) {
        return callback(new Error('高温不可小于低温'));
      }
      else {
        this.$refs.form.validateField('temp_lower_limit');
        return callback();
      }
    };
    const weightHeighMinRule = (rules, value, callback) => {
      if (Number(this.form.weight_height_max) < Number(value)) {
        return callback(new Error('上限不可大于下限'));
      }
      else {
        return callback();
      }
    };
    const weightHeighMaxRule = (rules, value, callback) => {
      if (Number(value) < Number(this.form.weight_height_min)) {
        return callback(new Error('下限不可小于上限'));
      }
      else {
        this.$refs.form.validateField('weight_height_min');
        return callback();
      }
    };
    const FCPulseMinRule = (rules, value, callback) => {
      if (Number(this.form.FC_pulse_width_max) < Number(value)) {
        return callback(new Error('上限不可大于下限'));
      }
      else {
        return callback();
      }
    };
    const FCPulseMaxRule = (rules, value, callback) => {
      if (Number(value) < Number(this.form.FC_pulse_width_min)) {
        return callback(new Error('下限不可小于上限'));
      }
      else {
        this.$refs.form.validateField('FC_pulse_width_min');
        return callback();
      }
    };
    return {
      action: type.create,
      form: this.$lodash.cloneDeep(form),
      rules: {
        code: [{ required: true, message: '请输入型号名称'}, this.$tools.formRules.stringRange({min: 3, max: 32}), this.$tools.formRules.repeatCheck({id: this.$route.query.id, module: 'dronemodel', field: 'code'})],
        bty_md_id: [{ required: true, message: '请选择电池型号'}],
        weight: [{ required: true, message: '请输入空机重量（不含电池）'}, this.$tools.formRules.numberFixed(1)],
        time_check_period: [{ required: true, message: '请输入定检时间周期'}, this.$tools.formRules.numberInt],
        max_takeoff_load: [{ required: true, message: '请输入最大起飞重量'}, this.$tools.formRules.numberFixed(1)],
        use_check_period: [{ required: true, message: '请输入定检使用周期'}, this.$tools.formRules.numberInt],
        waterproof_level: [{ required: true, message: '请选择防雨等级'}],
        windbreak_level: [{ required: true, message: '请选择抗风等级'}],
        temp_lower_limit: [{ required: true, message: '请输入低温'}, this.$tools.formRules.numberInt, {validator: tempLowerLimitRule}],
        temp_upper_limit: [{ required: true, message: '请输入高温'}, this.$tools.formRules.numberInt, {validator: tempUpperLimitRule}],
        alt_upper_limit: [{ required: true, message: '请输入海拔限制'}, this.$tools.formRules.numberInt],
        weight_end_volt_relation: [{ required: true, message: '请输入总重截止电压关系参数'}, this.$tools.formRules.multipleParams(4)],
        safe_hover_time: [{ required: true, message: '请输入安全悬停时间阈值'}, this.$tools.formRules.numberInt],
        battery_count: [{ required: true, message: '请输入机载电池数量'}, this.$tools.formRules.numberInt],
        standby_power: [{ required: true, message: '请输入飞机待机功率'}, this.$tools.formRules.numberInt],
        motor_shaft_count: [{ required: true, message: '请输入电机轴数'}, this.$tools.formRules.numberInt],
        weight_height_min: [{ required: true, message: '请输入上限'}, this.$tools.formRules.numberInt, {validator: weightHeighMinRule}],
        weight_height_max: [{ required: true, message: '请输入下限'}, this.$tools.formRules.numberInt, {validator: weightHeighMaxRule}],
        FC_pulse_width_min: [{ required: true, message: '请输入上限'}, this.$tools.formRules.numberInt, {validator: FCPulseMinRule}],
        FC_pulse_width_max: [{ required: true, message: '请输入下限'}, this.$tools.formRules.numberInt, {validator: FCPulseMaxRule}],
        PWM_pulse_width_min: [{ required: true, message: '请输入电调最小响应PWM脉宽'}, this.$tools.formRules.numberInt],
        emergency_land_speed: [{ required: true, message: '请输入飞机应急下降速度'}, this.$tools.formRules.numberFixed(2)],
        undercarriage_length: [{ required: true, message: '请输入长'}, this.$tools.formRules.numberFixed(2)],
        undercarriage_width: [{ required: true, message: '请输入宽'}, this.$tools.formRules.numberFixed(2)],
        under_offset: [{ required: true, message: '请输入起落架与货箱距离'}, this.$tools.formRules.numberFixed(2)],
        fb_offset: [{ required: true, message: '请输入起落架前后偏移'}, this.$tools.formRules.numberFixed(2)],
        lr_offset: [{ required: true, message: '请输入起落架左右偏移'}, this.$tools.formRules.numberFixed(2)],
        hover_power_factor: [{ required: true, message: '请输入悬停功率系数'}, this.$tools.formRules.multipleParams(4)],
        flight_power_factor: [{ required: true, message: '请输入飞行功率系数'}, this.$tools.formRules.multipleParams(6)],
        equal_hover_uniaxial_tension_factor: [{ required: true, message: '请输入等效悬停单轴拉力计算系数'}, this.$tools.formRules.multipleParams(7)],
        real_time_uniaxial_tension_factor: [{ required: true, message: '请输入实时单轴拉力计算系数'}, this.$tools.formRules.multipleParams(6)],
        real_time_power_factor: [{ required: true, message: '请输入飞机实时功率系数'}, this.$tools.formRules.multipleParams(4)],
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
          bty_md_id: Number(this.form.bty_md_id),
          weight: Number(this.form.weight),
          time_check_period: Number(this.form.time_check_period),
          max_takeoff_load: Number(this.form.max_takeoff_load),
          use_check_period: Number(this.form.use_check_period),
          waterproof_level: Number(this.form.waterproof_level),
          windbreak_level: Number(this.form.windbreak_level),
          temp_lower_limit: Number(this.form.temp_lower_limit),
          temp_upper_limit: Number(this.form.temp_upper_limit),
          alt_upper_limit: Number(this.form.alt_upper_limit),
          weight_end_volt_relation: this.form.weight_end_volt_relation,
          safe_hover_time: Number(this.form.safe_hover_time),
          battery_count: Number(this.form.battery_count),
          standby_power: Number(this.form.standby_power),
          motor_shaft_count: Number(this.form.motor_shaft_count),
          weight_height_min: Number(this.form.weight_height_min),
          weight_height_max: Number(this.form.weight_height_max),
          FC_pulse_width_min: Number(this.form.FC_pulse_width_min),
          FC_pulse_width_max: Number(this.form.FC_pulse_width_max),
          PWM_pulse_width_min: Number(this.form.PWM_pulse_width_min),
          emergency_land_speed: Number(this.form.emergency_land_speed),
          undercarriage_length: Number(this.form.undercarriage_length),
          undercarriage_width: Number(this.form.undercarriage_width),
          under_offset: Number(this.form.under_offset),
          fb_offset: Number(this.form.fb_offset),
          lr_offset: Number(this.form.lr_offset),
          hover_power_factor: this.form.hover_power_factor,
          flight_power_factor: this.form.flight_power_factor,
          equal_hover_uniaxial_tension_factor: this.form.equal_hover_uniaxial_tension_factor,
          real_time_uniaxial_tension_factor: this.form.real_time_uniaxial_tension_factor,
          real_time_power_factor: this.form.real_time_power_factor,
          comment: this.form.comment,
        };
        if (this.action.type === 'update') {
          params.id = this.action.id;
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
  },
};
</script>

<style>
</style>
