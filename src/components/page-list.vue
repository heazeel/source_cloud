<!--
 * @Description: 列表页（搜索栏 按钮操作栏 表格 分页）
 * @Author: linjia
 * @Date: 2020-04-20 15:05:14
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-09 15:56:06
 -->
<template>
  <div class="page-list">
    <el-row ref="operate-top" class="operate-top">
      <el-col :span="searchCol">
        <!-- 搜索区域 -->
        <el-form
          v-show="Object.keys(searchForm).length > 0"
          ref="search-form"
          inline
          class="search-form"
          :model="searchForm"
          @submit.native.prevent
          @keyup.enter.native="handleSearch">
          <slot name="search-form"></slot>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              class="search-btn"
              @click="handleSearch"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="operateCol" class="operate-part">
        <!-- 操作按钮 -->
        <slot name="operate-btns"></slot>
      </el-col>
    </el-row>
    <slot></slot>
    <div class="table-part">
      <!-- 表格内容 -->
      <el-table ref="table"
        :data="tableData"
        :max-height="tableMaxHeight"
        style="width: 100%;"
        :style="{'max-height': `${tableMaxHeight}px`}">
        <slot name="table"></slot>
      </el-table>
    </div>
    <el-footer>
      <pagination :total="totalCount" :reset="pageReset" @page-change="handleListSearch"></pagination>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'PageList',
  components: {
    'pagination': () => import(/* webpackChunkName: "pagination" */ '@c/pagination.vue'),
  },
  props: {
    searchForm: {
      type: Object,
      default: () => ({}),
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: () => 0,
    },
    searchCol: { // 左侧搜索栏的范围
      type: Number,
      default: () => 18,
    },
    operateCol: {// 右侧操作栏的范围
      type: Number,
      default: () => 6,
    },
    routerName: { // 列表路由name，为了判断什么时候去获取列表数据
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      pageReset: false, // 如果点击了搜索的话，那么查询第一页
      pageObj: {page_size: 10, page_no: 1},
      tableMaxHeight: 735,
    };
  },
  watch: {
    $route: {
      handler (newVal, oldVal) {
        if (this.routerName && newVal.name == this.routerName) {
          this.handleListSearch();
        }
      },
    },
  },
  mounted () {
    let table = this.$refs.table.$el;
    let observerOptions = {
      attributes: true, // 观察属性变动
    };
    let observer = new MutationObserver(() => {
      let toTop = table.offsetTop;
      let containerHeight = table.offsetParent.offsetHeight;
      this.tableMaxHeight = containerHeight - toTop - 50;
      observer.disconnect(); // 较少损耗
    });
    observer.observe(table, observerOptions);
  },
  methods: {
    handleSearch () {
      this.pageReset = true;
      // 切回来
      this.$nextTick(() => {
        this.pageReset = false;
      });
    },
    handleListSearch (pageObj = this.pageObj) {
      this.pageObj = pageObj;
      this.$emit('list-search', this.pageObj);
    },
  },
};
</script>

<style lang="less" scoped>
.page-list {
  height: 100%;
  background: white;
  position: relative;
  .operate-top {
    padding: 16px 20px 0;
    // border-bottom: 1px solid #D1DAEB;
    .search-btn {
      width: 43px;
      height: 30px;
      border-radius: 21px;
      padding: 0 12px;
      background-color: #505D75;
      border-color: #505D75;
    }
    .operate-part {
      text-align: right;
    }
  }
  .table-total-data-tips {
    background: #F5F5F5; color: #949DB0; line-height: 20px; padding: 4px 20px;
  }
  .table-part {
    padding: 0 20px;
    overflow: auto;
    border-top: 1px solid #D1DAEB;
  }
  .el-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    height: 48px !important;
    background: white;
    z-index: 200;
  }
}
</style>
