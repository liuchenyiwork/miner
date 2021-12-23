<template>
<div class="main-layout">
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <div class="layout-body">
        <router-view />
      </div>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="less" scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

</style>
