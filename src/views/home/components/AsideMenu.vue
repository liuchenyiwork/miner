<template>
  <div class="menu-container">
    <el-menu
        :default-active="activePath"
        :collapse="isMenuCollapsed"
        @select="handleSelectMenu"
        :collapse-transition="false">
      <el-menu-item index="GrindGain">
        <i class="el-icon-s-marketing" style="font-size: 14px"/>
        <span slot="title">{{ $t('menu.grind_gain') }}</span>
      </el-menu-item>
<!--      <el-menu-item index="Issue">-->
<!--        <i class="el-icon-s-check" style="font-size: 14px"/>-->
<!--        <span slot="title">{{ $t('menu.issue') }}</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="IssueManage">
        <i class="el-icon-menu" style="font-size: 14px"/>
        <span slot="title">{{ $t('menu.issue_manage') }}</span>
      </el-menu-item>
<!--      <el-menu-item index="RulesDetail">-->
<!--        <i class="el-icon-s-tools" style="font-size: 14px"/>-->
<!--        <span slot="title">{{ $t('menu.rules_detail') }}</span>-->
<!--      </el-menu-item>-->

<!--      <el-menu-item index="Dashboard">-->
<!--        <i class="el-icon-s-home"/>-->
<!--        <span slot="title">Dashboard</span>-->
<!--      </el-menu-item>-->

<!--      <el-menu-item index="CustomQuery" disabled>-->
<!--        <i class="el-icon-s-help"/>-->
<!--        <span slot="title">{{ $t('menu.custom_query') }}</span>-->
<!--      </el-menu-item>-->


<!--      <el-submenu index="Management" disabled>-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-menu" />-->
<!--          <span >{{ $t('menu.management') }}</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="Dimension">{{ $t('menu.management.dimension_config') }}</el-menu-item>-->
<!--          <el-menu-item index="Indicator">{{ $t('menu.management.indicator_config') }}</el-menu-item>-->
<!--          <el-menu-item index="DataType">{{ $t('menu.management.data_type') }}</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
      <div class="collapse-btn">
        <el-button type="text"
                   @click="toggleMenuCollapse">
          <span class="icon" v-if="isMenuCollapsed"><i class="el-icon-s-unfold"/> </span>
          <span class="icon" v-else><i class="el-icon-s-fold"/> </span>
        </el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Menu",
  data () {
    return {
      isMenuCollapsed: false,
      role_id : 0
    }
  },
  computed: {
    activePath: {
      get() {
        return this.$store.state.styles.asideMenuActivePath
      },
      set(value) {
        this.$store.dispatch('styles/setAsideMenuActivePath', value)
      }
    }
  },
  mounted() {
    // active path
    this.isMenuCollapsed = this.$storage.getBoolean('menu_collapsed')
    this.activePath = (this.$route.name === 'IssueRecycle' ? 'Issue' : this.$route.name)|| 'Dashboard'

    // const userInfo = Vue.$cookies.get('User-Info')
    // this.role_id = userInfo.role_id
  },
  methods: {
    handleSelectMenu (index) {
      this.$storage.set('active_path', index)
      this.$router.push({
        name: index,
      }).then(() => {
        this.$store.dispatch('styles/setAsideMenuActivePath', index)
        this.$store.dispatch('styles/setSubHeaderTailContent', "")
        // 问题审批页面需要加上 tailContent
        if (index === "Issue") {
          this.$store.dispatch('styles/setSubHeaderTailContent', "问题回收站")
        }

      }).catch(()=>{})
    },
    toggleMenuCollapse () {
      this.isMenuCollapsed = !this.isMenuCollapsed
      this.$storage.setBoolean('menu_collapsed', this.isMenuCollapsed)
      this.$emit('collapse', this.isMenuCollapsed)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-container {
  height: 100%;
  position: relative;
  overflow:hidden;

  .el-menu {
    height: 100%;
    border: .5px solid #f5f5f5;

    .collapse-btn {
      position: absolute;
      right: 20px;
      bottom: 0;

      .icon {
        font-size: 22px;
        color: gray;

        &:hover {
          color: #5F48C5;
        }
      }
    }
  }
}

/deep/ .el-menu-item.is-active {
  font-weight: bold;
}
</style>

