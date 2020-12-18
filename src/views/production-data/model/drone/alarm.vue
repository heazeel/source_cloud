<!--
 * @Description: 无人机告警配置
 * @Author: linjia
 * @Date: 2020-09-11 13:54:52
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 14:54:40
-->
<template>
  <dialog-sc
    ref="drone-alarm"
    class="drone-alarm"
    title="无人机告警配置"
    @open="init"
    @cancel="$router.back()"
    @submit="handleSubmit">
    <el-table
      ref="multipleTable"
      class="gray-primary-table"
      size="middle"
      style="width: 100%"
      height="648"
      :data="alarms"
      :row-style="disabledRowStyle">
      <el-table-column
        width="90"
        label="是否显示">
        <template slot-scope="scope">
          <el-checkbox
            v-if="!scope.row.status"
            :checked="Boolean(scope.row.if_show)"
            @change="handleSelect($event, scope.$index, scope.row)"></el-checkbox>
          <span
            v-else
            class="disabled-span"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="告警名称"></el-table-column>
      <el-table-column
        prop="name_en"
        width="206"
        label="告警名称(英文)"></el-table-column>
      <el-table-column
        prop="alarm_type"
        width="90"
        label="告警类型"></el-table-column>
      <el-table-column
        prop="level"
        width="90"
        label="响应等级"></el-table-column>
      <el-table-column
        prop="ignored"
        width="130"
        label="是否允许忽略">
        <template slot-scope="scope">
          {{ scope.row.ignored && '是' || '否' }}
        </template>
      </el-table-column>
    </el-table>
  </dialog-sc>
</template>

<script>
import { alarmSearch, alarmUpdate } from '@/api/drone.js';
// const alarms = [{'name': 'UAV_ALARM_PITCH_ABNORMAL', 'name_ch': '俯仰角异常', 'alarm_type': 1, 'level': 'B', 'ignored': 0, 'status': 1, 'if_show': 0, 'alarm_id': 30}, {'name': 'UAV_ALARM_ROLL_ABNORMAL', 'name_ch': '滚转角异常', 'alarm_type': 1, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 32}, {'name': 'UAV_ALARM_THROTTLE_HIGH_ABNORMAL', 'name_ch': '油门过高异常', 'alarm_type': 1, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 64}, {'name': 'UAV_ALARM_CANNOT_FOLLOW_REF_POINT', 'name_ch': '控制跟随异常', 'alarm_type': 1, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 56}, {'name': 'UAV_ALARM_CANNOT_FIND_TARGET', 'name_ch': '对准识别不到靶标', 'alarm_type': 4, 'level': 'D', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 59}, {'name': 'UAV_ALARM_LANDING_IMAGE_IDENTIFY_FREQ_LOW', 'name_ch': '降落识别频率低', 'alarm_type': 4, 'level': 'D', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 61}, {'name': 'UAV_ALARM_HEIGHT_DIFF_NOT_ACCURATE', 'name_ch': '高度差偏差大', 'alarm_type': 4, 'level': 'D', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 63}, {'name': 'UAV_ALARM_RECOVER_FLY_AFTER_SOFTWARE_CRUSH', 'name_ch': '热启动恢复飞行', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 58}, {'name': 'UAV_ALARM_SUB_CONTROLLER_NOT_DETECTED', 'name_ch': '未检测到投放控制器', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 57}, {'name': 'UAV_ALARM_SLAVER_TO_MASTER_ABNORMAL', 'name_ch': '舵机到主控通信异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 65}, {'name': 'UAV_ALARM_AUTO_DROP_FINISH_STATE', 'name_ch': '货箱投放完成状态', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 55}, {'name': 'UAV_ALARM_AUTO_DROP_YAW_ERROR_HIGH', 'name_ch': '投放时航向误差偏大', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 54}, {'name': 'UAV_ALARM_GPS_SATELLITES_VISIBLE_NOT_ENOUGH', 'name_ch': 'GPS卫星数低', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 53}, {'name': 'UAV_ALARM_GPS_LOCATION_JUMP', 'name_ch': 'GPS位置跳变', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 52}, {'name': 'UAV_ALARM_BATTERY_VOL_LOW', 'name_ch': '电池电压低', 'alarm_type': 3, 'level': 'C', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 51}, {'name': 'UAV_ALARM_MASTER_TO_SLAVER_ABNORMAL', 'name_ch': '主控到舵机通信异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 66}, {'name': 'UAV_ALARM_FCU_TO_OBC_ABNORMAL', 'name_ch': 'FCUToOBC异常', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 50}, {'name': 'UAV_ALARM_OBC_TO_FCU_ABNORMAL', 'name_ch': 'OBCToFCU异常', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 49}, {'name': 'UAV_ALARM_ROTOR_STOP_RISK_DETECTED', 'name_ch': '飞行航向控制异常', 'alarm_type': 1, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 48}, {'name': 'UAV_ALARM_PLATFORM_LANDING_RETRY', 'name_ch': '平台降落重试', 'alarm_type': 4, 'level': 'C', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 47}, {'name': 'UAV_ALARM_YAW_TORSION_DIFF', 'name_ch': '航向扭矩偏置', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 46}, {'name': 'UAV_ALARM_LANDING_FAILED', 'name_ch': '降落失败', 'alarm_type': 4, 'level': 'C', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 45}, {'name': 'UAV_ALARM_LOSE_CONTROL', 'name_ch': '姿态失控', 'alarm_type': 1, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 44}, {'name': 'UAV_ALARM_BATTERY_FAILED', 'name_ch': '飞机电源故障', 'alarm_type': 1, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 43}, {'name': 'UAV_ALARM_LOSE_NAVIGATOR', 'name_ch': '飞机定位功能失效', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 42}, {'name': 'UAV_ALARM_FCU_INTERNAL_WARNING', 'name_ch': '飞控内部告警', 'alarm_type': 2, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 40}, {'name': 'UAV_ALARM_HARD_CONFIG_NOT_MATCH', 'name_ch': '飞机硬配置信息不匹配', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 39}, {'name': 'UAV_ALARM_MQTT_TOPIC_PARSE_FAULT', 'name_ch': 'MQTT主题解析错误', 'alarm_type': 2, 'level': 'C', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 38}, {'name': 'UAV_ALARM_IMAGE_IDENTIFY_FILTERED', 'name_ch': '图像识别结果被过滤', 'alarm_type': 4, 'level': 'D', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 37}, {'name': 'UAV_ALARM_TF_MANUAL_THROTTLE_DETECTED', 'name_ch': '起飞前检测到遥控油门杆量', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 80}, {'name': 'UAV_ALARM_CABIN_TEMP_HIGH_ABNORMAL', 'name_ch': '机舱温度过高异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 36}, {'name': 'UAV_ALARM_WAYROUTE_TEMP_DIFF_LARGE', 'name_ch': '航路温度差异大', 'alarm_type': 4, 'level': 'D', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 35}, {'name': 'UAV_ALARM_SUB_MODE_LOSE_CONTROL', 'name_ch': '失控状态异常', 'alarm_type': 2, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 34}, {'name': 'UAV_ALARM_BATTERY_VOL_DIFF_LARGE', 'name_ch': '电池电压差异大', 'alarm_type': 3, 'level': 'C', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 33}, {'name': 'UAV_ALARM_BATTERY_LIFE_CYCLE_DIFF_LARGE', 'name_ch': '电池寿命差异大', 'alarm_type': 3, 'level': 'C', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 31}, {'name': 'UAV_ALARM_THROTTLE_LOW_ABNORMAL', 'name_ch': '油门过低异常', 'alarm_type': 1, 'level': 'B', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 28}, {'name': 'UAV_ALARM_CABIN_TEMP_LOW_ABNORMAL', 'name_ch': '机舱温度过低异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 26}, {'name': 'UAV_ALARM_CABIN_TEMP_NOT_DETECTED', 'name_ch': '未检测到机舱温度', 'alarm_type': 5, 'level': 'E', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 27}, {'name': 'UAV_ALARM_BMS_BATTERY_INFO_NOT_UPDATED', 'name_ch': 'BMS电池信息未更新', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 67}, {'name': 'UAV_ALARM_FCU_FIRMWARE_VERSION_UNKNOW', 'name_ch': '飞控固件版本未知', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 68}, {'name': 'UAV_ALARM_OBC_FIRMWARE_AUTO_UPDATE_FAIL', 'name_ch': '主控固件自动更新失败', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 69}, {'name': 'UAV_ALARM_FCU_SOFT_REBOOT_FAIL', 'name_ch': '飞控软重启失败', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 70}, {'name': 'UAV_ALARM_ROLLOVER_RISK_DETECTED', 'name_ch': '监测到侧翻风险', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 71}, {'name': 'UAV_ALARM_BMS_BATT_FAILED', 'name_ch': 'BMS电池故障', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 72}, {'name': 'UAV_ALARM_RD_DEBUG', 'name_ch': '研发调试告警', 'alarm_type': 1, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 73}, {'name': 'UAV_ALARM_DYNAMIC_FAILURE_FAULT', 'name_ch': '动力失效故障', 'alarm_type': 1, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 74}, {'name': 'UAV_ALARM_FCU_RC_IN_ABNORMAL', 'name_ch': '飞控遥控接收机异常', 'alarm_type': 1, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 75}, {'name': 'UAV_ALARM_GPS_UPDATE_FREQ_LOW', 'name_ch': 'GPS更新频率低', 'alarm_type': 1, 'level': 'C', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 76}, {'name': 'UAV_ALARM_BATTERY_CELL_ABNORMAL', 'name_ch': '电池电芯异常', 'alarm_type': 1, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 77}, {'name': 'UAV_ALARM_BATTERY_CHARGE_ABNORMAL', 'name_ch': '电池充电异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 78}, {'name': 'UAV_ALARM_BATTERY_ADVANCE_ABNORMAL', 'name_ch': '电池高级扩展异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 79}, {'name': 'UAV_ALARM_FCU_PARAM_NON_STANDARD', 'name_ch': '飞控参数非标', 'alarm_type': 5, 'level': 'E', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 81}, {'name': 'UAV_ALARM_GPS1_FAULT', 'name_ch': 'GPS1故障', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 82}, {'name': 'UAV_ALARM_GPS2_FAULT', 'name_ch': 'GPS2故障', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 83}, {'name': 'UAV_ALARM_SONAR_DATA_ABNORMAL', 'name_ch': '超声波数据异常', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 84}, {'name': 'UAV_ALARM_STOP_USE_SONAR_DATA', 'name_ch': '停用超声波数据', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 85}, {'name': 'UAV_ALARM_EMERGENCY_BY_TOKEN_REQ_FAILED', 'name_ch': '飞机应急因令牌请求失败', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 86}, {'name': 'UAV_ALARM_NAVIGATION_POS_ABNORMAL', 'name_ch': '飞机导航定位异常', 'alarm_type': 5, 'level': 'A', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 87}, {'name': 'UAV_ALARM_FCU_PREFLIGHT_FAIL', 'name_ch': '飞控起飞解锁失败', 'alarm_type': 5, 'level': 'E', 'ignored': 0, 'status': 0, 'if_show': 0, 'alarm_id': 88}, {'name': 'UAV_ALARM_OBC_VOL_ABNORMAL', 'name_ch': '核心板供电电压异常', 'alarm_type': 1, 'level': 'E', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 89}, {'name': 'UAV_ALARM_FCU_SUPPLY_VOL_ABNORMAL', 'name_ch': '飞控供电电压异常', 'alarm_type': 3, 'level': 'E', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 90}, {'name': 'UAV_ALARM_PERSON_DETECTED', 'name_ch': '飞机检测到人', 'alarm_type': 5, 'level': 'E', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 91}, {'name': 'UAV_ALARM_VISION_NODE_WORK_ABNORMAL', 'name_ch': '视觉功能失效', 'alarm_type': 5, 'level': 'E', 'ignored': 1, 'status': 0, 'if_show': 0, 'alarm_id': 92}];
export default {
  name: 'DroneAlarm',
  data () {
    return {
      alarms: [],
    };
  },
  methods: {
    async init () {
      let res = await alarmSearch({
        id: this.$route.query.id,
      }, {isLoading: true});
      if (res.code !== 200) {
        this.alarms = [];
        // TODO 错误处理
        return;
      }
      this.alarms = res.content;
      this.alarms.sort((a, b) => { // 显示的告警在前，不显示在后
        b.if_show - a.if_show;
      });
    },
    async handleSubmit () {
      const alarms = this.alarms.map(item => ({alarm_id: item.alarm_id, if_show: item.if_show}));
      let res = await alarmUpdate({
        id: this.$route.query.id,
        alarms: JSON.stringify(alarms),
      }, {isLoading: true});
      if (res.code !== 200) {
        // TODO 错误处理
        return;
      }
      this.$message({
        message: '无人机配置告警成功！',
        type: 'success',
        containerType: 'dialog',
        onClose: () => {
          this.$router.back();
        },
      });
    },
    handleSelect (value, index, row) {
      this.alarms[index].if_show = value ? 1 : 0;
    },
    disabledRowStyle ({row, rowIndex}) {
      if (row.status) {
        return {color: '#5C5D79', opacity: 0.48};
      }
    },
  },
};
</script>

<style lang="less" scoped>
.disabled-span {
  width: 11px;
  height: 11px;
  border: 1px solid #D0D0D0;
  display: block;
  overflow: hidden;
  &::before {
    content: '';
    width: 15px;
    height: 15px;
    border-right: 1px solid #D0D0D0;
    display: block;
    transform: rotate(45deg) translateX(-10.5px);
  }
}
.gray-bg-table.el-table th {
  color: #2F394A;
}
</style>
