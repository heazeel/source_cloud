<!--
 * @Description: 紧急更新
 * @Author: linjia
 * @Date: 2020-09-04 14:20:24
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-19 14:35:17
-->
<template>
  <dialog-sc
    ref="drone-force-update"
    title="紧急更新"
    size="small"
    @cancel="$router.back()"
    @submit="handleSubmit">
    <el-form ref="form"
      class="form-dialog"
      :model="form"
      :rules="rules"
      label-width="80px">
      <el-form-item label="版本" prop="version" class="block">
        <el-input v-model="form.version" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="version_no" class="block">
        <el-input v-model="form.version_no"></el-input>
      </el-form-item>
      <template v-slot:footer>
        <button-sc size="small" type="secondary" @click="$router.back()">
          取消
        </button-sc>
        <button-sc size="small" @click="handleSubmit">
          更新
        </button-sc>
      </template>
    </el-form>
  </dialog-sc>
</template>

<script>
import { forceUpdate, percentSearch, deviceCmd } from '@/api/firmware.js';
const form = {
  version: '',
  version_no: '',
  file_name: '',
};
let loading;
export default {
  name: 'ForceUpdate',
  data () {
    return {
      form: this.$lodash.cloneDeep(form),
      rules: {
        version: [{required: true, message: '请选择版本'}],
        version_no: [{required: true, message: '请选择版本号'}],
      },
      processTimeOut: null,
    };
  },
  destroyed () {
    this.clearSearchProcess();
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) { return; }
        let params = {
          device_type: this.$route.query.device_type,
          device_id: Number(this.$route.query.device_id),
          version: this.form.version,
          version_no: this.form.version_no,
          file_name: this.form.file_name,
        };
        let res = await forceUpdate(params, { loading: true });
        if (res.code !== 200) {
          // TODO 错误处理
          return;
        }
        this.getProcess(); // 选择更新成功之后就去获取进度
      });
    },
    // 获取更新进度
    async getProcess () {
      let res = await percentSearch({
        device_type: this.$route.query.device_type,
        device_id: Number(this.$route.query.device_id),
      });
      if (res.code !== 200) {
        // TODO 错误处理
        this.clearSearchProcess();
        return;
      }
      if (res.content.percent < 100) {
        if (!loading) {
          loading = this.$loading({
            lock: true,
            text: `已下载${res.content.percent}%, 下载速度${res.content.speed.toFixed(2)}kb/s`,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
        } else {
          loading.setText(`已下载${res.content.percent}%, 下载速度${res.content.speed.toFixed(2)}kb/s`);
        }
        this.processTimeOut = setTimeout(() => {
          this.getProcess();
        }, 5 * 1000);
      } else {
        this.clearSearchProcess();
        this.reloadCheck(); // 下载完成就关闭弹框，去重启
      }
    },
    // 重启
    reloadCheck () {
      const _this = this;
      this.$confirm('更新完成，是否重启?', '紧急更新', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async function (action, instance, done) {
          if (action === 'confirm') {
            let res = await deviceCmd({
              token: localStorage.getItem('token'),
              device_type: this.$route.query.device_type,
              device_id: Number(this.$route.query.device_id),
            }, { isLoading: true });
            if (res.code != 200) {
              // TODO 错误处理
              return;
            }
            this.$message({
              type: 'success',
              message: '操作成功!',
              containerType: 'message-box',
              onClose: () => {
                done();
                _this.$router.back();
              },
            });
          } else {
            done();
          }
        },
      }).catch(() => { /*  */ });
    },
    // 停止查询更新进度
    clearSearchProcess () {
      if (loading) { loading.close(); }
      if (this.processTimeOut) {
        clearTimeout(this.processTimeOut);
        this.processTimeOut = null;
      }
    },
  },
};
</script>

<style>

</style>
