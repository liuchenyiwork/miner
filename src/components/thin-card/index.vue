<template>
  <div class="thin-card">
    <el-card :style="{height: height}" :body-style="{padding: '6px 20px'}">
      <slot name="head">
        <div class="header">
          <span>
            <template v-if="headerIcon === 'gain_trend_icon'">
              <img style="height: 14px; width: 14px" src="@/assets/avatar.png" alt=""/>
            </template>
              <template v-if="headerIcon === 'gain_origin_icon'">
              <img style="height: 14px; width: 14px" src="@/assets/avatar.png" alt=""/>
            </template>
            <template v-else>
              <i :class="headerIcon"/>
            </template>
            {{ header }}
          </span>
          <span v-if="header === '规则运行数据'">
            <el-tooltip placement="top">
              <span slot="content">规则启用后，每双周运行1次，已运行时长指的是<br>当前产品线首次运行规则至今的时间，以月为单位</span>
              <i style="font-size: 14px;color: black" class="el-icon-info"/>
            </el-tooltip>
          </span>
          <span style="float: right" v-if="displayContent && tailIcon">
            <el-button size="mini" type="text" @click="showMoreDetail">{{ displayContent + ">" }}
            </el-button>
          </span>
          <span style="float: right;" v-if="grindGainTab">
            <el-tabs style="height: 35px;" v-model="grinGainTabActiveName" @tab-click="handleClickGrindGainTab">
              <el-tab-pane label="双月新增" name="doubleMonthAdd"></el-tab-pane>
              <el-tab-pane label="历史累计" name="historyCumulative"></el-tab-pane>
            </el-tabs>
          </span>
        </div>
      </slot>
      <slot/>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    header: {
      type: String,
      required: true
    },
    headerIcon: {
      type: String,
      required: true
    },
    tailIcon: {
      type: String,
      default: null
    },
    displayContent: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: "186px",
    },
    grindGainTab: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      grinGainTabActiveName: 'historyCumulative',
    }
  },
  methods: {
    showMoreDetail() {
      this.$emit("moregaindetail")
    },
    handleClickGrindGainTab() {
      this.$emit("changeGainTab", this.grinGainTabActiveName)
    }
  }
}
</script>

<style lang="less" scoped>
.thin-card {
  .header {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
    user-select: none;
    color: gray;
  }

  .link-content {
    font-size: 10px;
    font-weight: normal;
    text-decoration: none;
    color: #409EFF;

    &:hover {
      cursor: pointer;
    }
  }

  /deep/ .el-button--info {
    color: #FFF;
    background-color: lightgrey;
    border-color: lightgrey;
    padding: 3px
  }

  /deep/ .el-tabs__item {
    padding: 0 5px;
    font-size: 10px;
    color: gray;
    height: 25px;
    box-sizing: border-box;
    line-height: 20px;
    display: inline-block;
    list-style: none;
    font-weight: 500;
    position: relative;
  }
}
</style>

