<!--
 * @Description: 分页
 * @Author: linjia
 * @Date: 2020-04-21 11:27:39
 * @LastEditors: linjia
 * @LastEditTime: 2020-04-28 18:25:14
 -->
<!--
 * @Description: 分页
 * @Author: linjia
 * @Date: 2019-07-06 15:15:01
 * @LastEditors  : linjia
 * @LastEditTime : 2020-02-03 21:12:24
 -->
<template>
  <el-pagination
    background
    :current-page.sync="pageNo"
    :page-sizes="[10, 15, 20, 25]"
    :page-size="pageSize"
    layout="total, prev, pager, next, sizes"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: () => 0,
    },
    reset: {
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      pageNo: 1,
      pageSize: this.$attrs.pageSize ? Number(this.$attrs.pageSize) : 10,
    };
  },
  watch: {
    reset (newVal) {
      if (newVal) {
        this.pageNo = 1;
        this.$emit('page-change', {page_size: this.pageSize, page_no: this.pageNo});
      }
    },
  },
  created () {
    this.$emit('page-change', {page_size: this.pageSize, page_no: this.pageNo});
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val;
      this.$emit('page-change', {page_size: this.pageSize, page_no: this.pageNo});
    },
    handleCurrentChange (val) {
      this.pageNo = val;
      this.$emit('page-change', {page_size: this.pageSize, page_no: this.pageNo});
    },
  },
};
</script>
