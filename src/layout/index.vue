<template>
<div class="main-layout">
  我是标题
  <div class="layout-body">
    <router-view />
  </div>
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
