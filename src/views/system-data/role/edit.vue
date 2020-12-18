<!--
 * @Description: 角色编辑
 * @Author: linjia
 * @Date: 2020-04-11 10:40:02
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-10-21 14:54:45
 -->
<template>
  <drawer-right class="role-edit"
    :title="`角色${action.title}`"
    width="800px"
    :submit-func="handleSubmit"
    @open="init"
    @cancel="$router.back()">
    <el-form ref="form"
      class="form-drawer"
      :model="form"
      label-width="60px"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit">
      <el-form-item label="名称"
        prop="name"
        class="block"
        :rules="[{ required: true, message: '请输入名称'}, $tools.formRules.repeatCheck({value: form.name, id: form.id, module: 'role', field: 'name'})]">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item prop="permission_ids" class="block" label-width="0px">
        <el-tree ref="tree"
          class="menu-tree"
          style="background: #F9F9F9;"
          :data="treeData"
          :props="props"
          node-key="id"
          show-checkbox
          default-expand-all
          highlight-current>
        </el-tree>
      </el-form-item>
    </el-form>
  </drawer-right>
</template>

<script>
import { search as permissionSearch } from '@/api/permission.js';
import { create as roleCreate, update as roleUpdate, detailSearch as roleDetailSearch } from '@/api/role.js';
const type = {
  create: { title: '新建', type: 'create', submitFunc: roleCreate },
  update: { title: '修改', type: 'update', submitFunc: roleUpdate },
};
export default {
  name: 'RoleEdit',
  data () {
    return {
      action: type.create,
      props: {
        label: 'menu_name',
        children: 'children',
      },
      treeData: [],
      form: {name: null, permission_ids: []},
    };
  },
  watch: {
    '$route.query.id': {
      handler (newVal) {
        console.log(newVal);
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
        await this.permissionSearch();
      } else if (this.action.type === 'update') {
        let res = await roleDetailSearch({
          id: this.action.id,
        }, {loading: true});
        if (res.code !== 200) {
          this.form = [];
          this.treeData = [];
          this.$refs.tree.setCheckedKeys([]);
          // TODO 错误处理
          return;
        }
        this.form = res.content;
        this.treeData = res.content.permissions;
        this.$refs.tree.setCheckedKeys(res.content.permission_ids);
      }
    },
    // 查询所有权限数据
    async permissionSearch () {
      let res = await permissionSearch({}, {loading: true});
      if (res.code !== 200) {
        this.treeData = [];
        return;
      }
      this.treeData = res.content;
    },
    async handleSubmit () {
      try {
        let valid = await this.$refs.form.validate();
        if (!valid) { return; }
        let params = {
          name: this.form.name,
          permission_ids: JSON.stringify(this.$refs.tree.getCheckedKeys()),
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
