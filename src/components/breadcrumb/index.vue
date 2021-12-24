<template>
  <div class="breadcrumb-container">
    <el-breadcrumb :separator="separator">
      <el-breadcrumb-item v-if="breadcrumbItems" :to="breadcrumbItems[0].to">{{ breadcrumbItems[0].name }}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, idx) in otherBreadCrumbItems" :key="idx" :to="item.to">
        <slot :name="item.key">{{item.name}}</slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    separator: {
      type: String,
      default: '>'
    },
    // breadcrumbItems: {
    //   type: Array,
    //   required: true
    // },
    blank: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    breadcrumbItems: {
      get() {
        return this.$store.state.styles.breadCrumbItem
      },
      set(val) {
        this.$store.dispatch('styles/setBreadCrumbItem', val)
      }
    }
  },
  data () {
    return {
      otherBreadCrumbItems: []
    }
  },
  mounted() {
    // 若有二、三级面包屑在此拼接
    for (let i = 1; i < this.breadcrumbItems.length; ++i) {
      this.otherBreadCrumbItems.push(this.breadcrumbItems[i])
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb-container {
  //line-height: 56px;
  font-weight: bold;
  font-size: 18px;
}
.el-breadcrumb {
  color: #000000;
  line-height: 56px;
  font-weight: bold;
  font-size: 18px;
  padding-top: 5px;

}
//.el-breadcrumb {
//  font-size: 14px;
//  height: 100%;
//}
//.el-breadcrumb__item {
//  float: left;
//  height: 100%;
//}

</style>

