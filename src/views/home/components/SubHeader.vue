<template>
  <div class="sub-header-container">
    <div class="left">
      <bread-crumb></bread-crumb>
    </div>
    <div class="right">
      <span style="float: right" v-if="subHeaderTailContent">
        <el-button size="mini" type="text" @click="showIssueRecycleBin">{{ subHeaderTailContent + ">" }}
        </el-button>
      </span>
      <span style="float: right" v-if="grindGainStatisticsDuration && selectableMonthList">
        <span>
          统计时间:
        </span>
        <span class="grind-date-picker">
          <el-select v-model="beginMonth" @change="handleStatisticsDurationOnBlur" placeholder="请选择" size="mini"
                     style="width: 120px">
            <el-option
                v-for="item in selectableBeginMonth"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
          {{ "-" }}
          <el-select v-model="endMonth" @change="handleStatisticsDurationOnBlur" placeholder="请选择" size="mini"
                     style="width: 120px">
            <el-option
                v-for="item in selectableEndMonth"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/breadcrumb";
import {formatDateToUnix} from "@/utils"
import {createNamespacedHelpers} from "vuex";

const {mapActions} = createNamespacedHelpers('gain');

export default {
  name: "SubHeader",
  components: {
    BreadCrumb
  },
  data() {
    return {
      displayTitle: '',
      subHeader: '',
      subHeaderTailContent: '',
      grindGainStatisticsDuration: false,
      value2: null,
      nextMonth: 1,
      beginMonth: "2021/01-02月",
      // TODO 从后端拉可用日期列表数据?
      selectableMonthList: [
      //   {label: "2021/01-02月", begin: "2021/01/01 0:0:0", end: "2021/03/01 0:0:0"},
      //   {label: "2021/03-04月", begin: "2021/03/01 0:0:0", end: "2021/05/01 0:0:0"},
      //   {label: "2021/05-06月", begin: "2021/05/01 0:0:0", end: "2021/07/01 0:0:0"},
      //   {label: "2021/07-08月", begin: "2021/07/01 0:0:0", end: "2021/09/01 0:0:0"},
      //   {label: "2021/09-10月", begin: "2021/09/01 0:0:0", end: "2021/11/01 0:0:0"},
      //   {label: "2021/11-12月", begin: "2021/11/01 0:0:0", end: "2022/01/01 0:0:0"},
      ],
      endMonth: '',
    }
  },
  computed: {
    selectableEndMonth() {
      if (this.beginMonth && this.selectableMonthList.length) {
        return this.selectableMonthList.filter((item) => {
          return item.label >= this.beginMonth
        })
      }
      return this.selectableMonthList
    },
    selectableBeginMonth() {
      if (this.endMonth && this.selectableMonthList.length) {
        return this.selectableMonthList.filter((item) => {
          return item.label <= this.endMonth
        })
      }
      return this.selectableMonthList
    }
  },
  mounted() {
    switch (this.$route.meta.title) {
      case "issue": {
        this.subHeaderTailContent = "问题回收站"
        break
      }
      case "grind_gain": {
        this.grindGainStatisticsDuration = true
        break
      }
    }
    this._prepare()
  },

  methods: {
    ...mapActions(["setStatisticsDuration"]),
    _prepare() {
      this.getSelectableDoubleMonthData()
      this.handleStatisticsDurationOnBlur()
    },
    showIssueRecycleBin() {
      this.$storage.set('active_path', 'Issue')
      const breadCrumbItem = [
        {name: this.$t('menu.issue'), key: this.$t('menu.issue'), to: {path: '/issues'}},
        {name: this.$t('menu.issue_to_check.issue_recycle'), key: this.$t('menu.issue_to_check.issue_recycle'), to: {}}
      ]
      this.$store.dispatch('styles/setBreadCrumbItem', breadCrumbItem)
      this.$router.push({
        name: 'IssueRecycle'
      }).then(() => {
        this.$store.dispatch('styles/setAsideMenuActivePath', 'Issue')
      }).catch(() => {
      })
    },
    handleReturnUpperMenu() {
      if (this.$route.name === "IssueRecycle") {
        this.$router.push({
          name: "Issue"
        })
      }
    },
    handleStatisticsDurationOnBlur() {
      if (this.beginMonth && this.endMonth && this.selectableMonthList.length) {
        const begin_time = this.selectableMonthList.filter((item) => {
          return item.label === this.beginMonth
        })
        const end_time = this.selectableMonthList.filter((item) => {
          return item.label === this.endMonth
        })

        this.setStatisticsDuration([formatDateToUnix(begin_time[0].begin), formatDateToUnix(end_time[0].end)])
      }
    },
    // 获取截至目前为止的双月数据，从2021/1-2双月开始
    getSelectableDoubleMonthData() {
      // test timeUnix 1661961600000
      const current = new Date()
      const year = current.getFullYear(), month = current.getMonth() + 1
      for (let y = 2021; y <= year; ++y) {
        for (let mon = 1; (y < year && mon <= 11) || (y === year && mon <= month); mon += 2) {
          const beginTime = mon <= 9? "0" + mon : mon, endTime = (mon + 1 <= 9)? "0" + (mon + 1): (mon + 1)
          const end = (endTime === 12) ? y + 1 + "/01/01 0:0:0" : y + "/" + ((mon + 1 <= 9)? "0" + (mon + 2): (mon + 2)) + "/01 0:0:0"
          this.selectableMonthList.push({
            label: y + "/" + beginTime + "-"  + endTime + "月",
            begin: y + "/" + beginTime + "/" + "01 0:0:0",
            end: end
          })
        }
      }
      this.endMonth = this.selectableMonthList[this.selectableMonthList.length - 1].label
    }
  },
}
</script>

<style lang="less" scoped>
.sub-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    line-height: 56px;
    font-weight: bold;
    font-size: 18px;
  }

  .el-link.el-link--default {
    color: #000000;
    line-height: 56px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>

