<template>
  <div class="set-tarmacs">
    <div class="header-title">
      <span class="title">停机位信息</span>
      <span v-show="!readOnly"
        class="color-primary"
        style="float: right;cursor: pointer;"
        @click="$emit('add-item')">
        增加停机位
        <i class="iconfont iconsc-icon-add"></i>
      </span>
    </div>
    <el-form
      ref="tarmacs-form"
      :model="form"
      size="small"
      v-bind="$attrs"
      inline
      label-width="120px"
      :disabled="readOnly"
      :class="[{'read-only': readOnly}]"
      @submit.native.prevent>
      <div v-for="(tarmac, index) in form.tarmacs" :key="tarmac.no" class="tarmacs-card">
        <div class="title">
          <span><i class="iconfont iconsc-icon-point color-primary"></i>{{ tarmac.no }}号停机位</span>
          <i v-show="!readOnly" class="iconfont iconsc-icon-delete" @click="$emit('delete-item', {index: index, id: tarmac.tarmac_id})"></i>
        </div>
        <el-form-item :prop="`tarmacs.${index}.vision_feature`" :rules="rules.vision_feature" label="靶标名称">
          <span slot="label">
            靶标名称
            <el-tooltip placement="top" effect="light">
              <div slot="content">
                <p><span style="width: 34px;display:inline-block;">RB01</span>：红蓝靶标</p>
                <p><span style="width: 34px;display:inline-block;">LG01</span>：原始LOGO，用于人工站</p>
                <p><span style="width: 34px;display:inline-block;">LG02</span>：LOGO靶标带杠，用于无人站</p>
                <p><span style="width: 34px;display:inline-block;">XU01</span>：【迅】字靶标</p>
                <p><span style="width: 34px;display:inline-block;">YI01</span>：【蚁】字靶标</p>
                <p><span style="width: 34px;display:inline-block;">EM01</span>：应急靶标</p>
              </div>
              <span class="img-icon question-icon"></span>
              <!-- <img :src="require('@/assets/icon_imgs/question.png')" alt="提示" style="vertical-align: middle;cursor: pointer;"> -->
            </el-tooltip>
          </span>
          <el-select v-model="tarmac.vision_feature" style="width: 100%">
            <el-option label="RB01" :value="1"></el-option>
            <el-option label="LG01" :value="2"></el-option>
            <el-option label="LG02" :value="3"></el-option>
            <el-option label="XU01" :value="4"></el-option>
            <el-option label="YI01" :value="5"></el-option>
            <el-option label="EM01" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :prop="`tarmacs.${index}.identify_type`" :rules="rules.identify_type" label="辅助识别类型">
          <el-select v-model="tarmac.identify_type" style="width: 100%">
            <el-option label="无辅助识别类型" :value="1"></el-option>
            <el-option label="频闪LED" :value="2"></el-option>
            <el-option label="红外信息" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :prop="`tarmacs.${index}.usage_scenario`" :rules="rules.usage_scenario" label="使用场景">
          <el-select v-model="tarmac.usage_scenario" style="width: 100%">
            <el-option label="白天" :value="1"></el-option>
            <el-option label="黑夜" :value="2"></el-option>
            <el-option label="通用" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :prop="`tarmacs.${index}.fall_type`" :rules="rules.fall_type" label="属性">
          <el-select v-model="tarmac.fall_type" style="width: 100%">
            <el-option label="1-正常地面起飞/降落" :value="1" :disabled="type == 'ustation'"></el-option>
            <el-option label="2-静止平台起飞/降落" :value="2" :disabled="type == 'ustation'"></el-option>
            <el-option label="3-移动平台起飞/降落" :value="3" :disabled="type == 'ustation'"></el-option>
            <el-option label="4-自动机场起飞/降落" :value="4" :disabled="type == 'hstation'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :prop="`tarmacs.${index}.retry_times`" :rules="rules.retry_times" label="降落参数">
          <el-select v-model="tarmac.retry_times" style="width: 100%">
            <el-option label="5" :value="0"></el-option>
            <el-option label="无限重试" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :prop="`tarmacs.${index}.angle`" :rules="rules.angle(index)" label="角度">
          <el-input
            v-model="tarmac.angle"
            v-input-number-prevent-wheel
            type="number"
            placeholder="0~359之间的数字"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SetTarmacs',
  props: {
    type: {
      type: String,
      default: () => 'ustation',
    },
    form: {
      type: Object,
      default: () => ({
        tarmacs: [],
      }),
    },
    readOnly: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    rules () {
      const isRepeat = (index) => (rule, value, callback) => {
        let repeat = false;
        this.form.tarmacs.find((ele, _index) => {
          if (ele.angle == value && _index != index) {
            repeat = true;
          }
          return repeat;
        });
        if (repeat) {
          return callback(new Error('角度不可重复'));
        } else {
          return callback();
        }
      };
      if (this.readOnly) {
        return {
          vision_feature: [],
          identify_type: [],
          usage_scenario: [],
          fall_type: [],
          retry_times: [],
          angle: (index) => [],
        };
      }
      let rules = {
        vision_feature: [{required: true, message: '请选择视觉类型特征'}], // 视觉类型特征
        identify_type: [{required: true, message: '请选择辅助识别类型'}], // 辅助识别类型
        usage_scenario: [{required: true, message: '请选择使用场景'}], // 使用场景
        fall_type: [{required: true, message: '请选择属性'}], // 属性
        retry_times: [{required: true, message: '请选择降落参数'}], // 降落参数
        angle: (index) => [
          {required: true, message: '请输入角度'},
          this.$tools.formRules.numberMoreThan(0),
          this.$tools.formRules.numberLessThan(359),
          {validator: isRepeat(index), trigger: 'change'},
        ], // 角度
      };
      return rules;
    },
  },
  methods: {
    deleteRow (index, id) {
      this.$emit('delete-row', {index: index, id: id});
    },
    submitForm () {
      return new Promise((resolve, reject) => {
        this.$refs['tarmacs-form'].validate((valid) => {
          resolve(valid);
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-title {
  line-height: 40px;
  border-bottom: 1px solid #E0E6E6;
  margin-bottom: 16px;
  .title {
    font-weight: bold;
  }
}

.tarmacs-card {
  width: calc(100% - 8px);
  margin: auto;
  background: #FFFFFF;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 16px;
  .title {
    line-height: 40px;
    margin: 0 15px 16px;
    border-bottom: 1px solid #E0E6E6;
    .iconsc-icon-delete {
      float: right;
      cursor: pointer;
    }
  }
}
.read-only {
  .el-input.is-disabled .el-input__inner {
    background: none;
  }
}
</style>
