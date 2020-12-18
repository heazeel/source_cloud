<!--
 * @Description: 角色查看
 * @Author: linjia
 * @Date: 2020-05-25 15:43:02
 * @LastEditors: linjia
 * @LastEditTime: 2020-09-07 13:47:24
-->
<template>
  <dialog-sc read-only
    title="角色查看"
    @cancel="$router.back()"
    @open="getInfo">
    <p>{{ name }}</p>
    <el-tree ref="tree"
      class="menu-tree"
      style="background: #F9F9F9; margin-top: 14px;"
      :data="treeData"
      :props=" {label: 'menu_name',children: 'children'}"
      node-key="id"
      default-expand-all>
    </el-tree>
  </dialog-sc>
</template>

<script>
import { detailSearch } from '@/api/role.js';
export default {
  name: 'RoleLook',
  data () {
    return {
      treeData: [],
      name: null,
    };
  },
  methods: {
    async getInfo () {
      let res = await detailSearch({
        id: this.$route.query.id,
      }, { loading: true });
      if (res.code !== 200) {
        this.treeData = [];
        this.name = null;
        // TODO 错误处理
        return;
      }
      this.name = res.content.name;
      // this.treeData = res.content.permissions;
      this.treeData = this.getSelectTreeData(res.content.permission_ids, res.content.permissions);
    },
    getSelectTreeData (selectIds, permissions) {
      let _this = this;
      let permissionRoutes = [];
      permissions.map(route => {
        if (route.hasOwnProperty('children')) {
          let childrenRoute = this.getSelectTreeData(selectIds, route.children);
          if (childrenRoute && childrenRoute.length > 0) {
            route.children = childrenRoute;
            permissionRoutes.push(route);
          }
        } else {
          if (selectIds.includes(route.id)) {
            permissionRoutes.push(route);
          }
        }
      });
      return permissionRoutes;
    },
  },
};
</script>

<style>
</style>
