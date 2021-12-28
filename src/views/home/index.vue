<template>
  <div class="home-container">
    <el-container class="main-container">
      <el-aside :width="asideWidth" style="height: 100%;">
        <aside-menu @collapse="handleMenuCollapse"/>
      </el-aside>
      <el-container class="content-container">
        <el-header :class="{'active': displaySubheader}" style="font-size: 14px">
          <sub-header/>
        </el-header>
<!--        <el-main style="background-color: #f8f8f7" @scroll.native="handleMainScroll">-->
        <el-main style="background-color: #f8f8f7">
          <div class="content" ref="mainContentRef">
            <router-view :key="$route.fullPath"/>
          </div>
          <div class="footer">
            <span>- IESQA-基础体验 -</span>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "@/views/home/components/AsideMenu";
import SubHeader from "@/views/home/components/SubHeader";
import {debounce} from "@/utils";


export default {
  name: "index",
  components: {
    AsideMenu,
    SubHeader
  },
  data () {
    return {
      asideWidth: '200px',
      displaySubheader: true,
      prevScrollTop: 0,
      // handleScroll: debounce(() => {
      //   const mainContent = this.$refs.mainContentRef;
      //   const scrollTop = mainContent.getBoundingClientRect().top;
      //   const delta = this.prevScrollTop - scrollTop;
      //   this.prevScrollTop = scrollTop;
      //
      //   this.displaySubheader = delta < 0;
      // }, 50)
    }
  },
  mounted() {
    this.asideWidth = this.$storage.getBoolean('menu_collapsed') ? '64px' : '200px'
  },
  methods: {
    handleMenuCollapse (collapsed) {
      this.asideWidth = collapsed ? '64px' : '200px'
    },
    handleMainScroll() {
      this.handleScroll()
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;

  .main-container {
    height: 100%;

    .content-container {
      //.el-header {
      //  margin-top: -60px;
      //  border-bottom: .5px solid #f5f5f5;
      //
      //  transition: all 0.2s ease-in-out;
      //
      //  &.active {
      //    margin-top: 0;
      //  }
      //}

      .el-main .footer {
        text-align: center;
        color: #cacaca;
        font-size: 12px;
        user-select: none;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>

