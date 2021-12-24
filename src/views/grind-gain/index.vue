<template>
  <div class="grind-container">
    <div class="wrapper">
      <div class="grinder-upper">
        <el-row :gutter="10" style="margin-left: 0; margin-right: 0">
          <el-row :gutter="10">
            <el-col :span="12">
              <gain-trend/>
            </el-col>
            <el-col :span="12">
              <gain-conversion/>
            </el-col>
          </el-row>
        </el-row>
      </div>
      <div class="grind-lower">
        <el-row :gutter="10" style="margin: 10px 0 0 0">
          <gain-list/>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
import GainList from "@/views/grind-gain/components/GainList";
import GainTrend from "@/views/grind-gain/components/GainTrend";
import GainConversion from "@/views/grind-gain/components/GainConversion";
import gainApi from "@/api/gain";
import {moreShortFormatDateTime, toPercent} from "@/utils";

export default {
  name: "GrindGain",
  components: {
    GainTrend,
    GainConversion,
    GainList,
  },
  data() {
    return {
      optimiseGainDetailLoading: false,
      product_id: null,
      queryInfo: {
        page: 1,
        page_size: 10,
        product_id: 1,
        order: "-gain_time"
      },
      optimiseGainDetailList: null,
      total: null,
      selectedBusiness: '',
      selectedDate: '',
      gainDetailDrawerVisible: false,
      issue_id: null
    }
  },
  filters: {
    formatTime(val) {
      if (!val) return '无'
      return moreShortFormatDateTime(val * 1000)
    },
    formatPercent(val) {
      return toPercent(val, 3)
    },
  },
  created() {
    this.$store.dispatch('styles/setBreadCrumbItem', '')
  },
  mounted() {
    // page titles
    document.title = this.$t('menu.' + this.$route.meta.title) + ' - Grinder 数据挖掘分析平台'
    const breadCrumbItem = [{
      name: this.$t('menu.' + this.$route.meta.title),
      key: this.$t('menu.' + this.$route.meta.title),
      to: {}
    }]
    this.$store.dispatch('styles/setBreadCrumbItem', breadCrumbItem)

    // this._prepare()
  },
  methods: {
    _prepare() {
      this.fetchGrindGainDetailList()
    },
    fetchGrindGainDetailList() {
      this.optimiseGainDetailLoading = true

      gainApi.list(this.queryInfo).then(({data: res}) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取挖掘收益列表失败！" + res.meta.message)
          return
        }
        this.optimiseGainDetailList = res.data.results
        this.total = res.data.total
      }).catch(err => {
        this.$message.error("获取问题异常！请稍后重试")
        console.log("获取问题异常!" + err.toString())
      }).finally(() => {
        this.optimiseGainDetailLoading = false
      })
    },
    handleClickGainQuery(queryInfo) {
      this.queryInfo = queryInfo
      this.fetchGrindGainDetailList()
    },
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
      this.fetchGrindGainDetailList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.fetchGrindGainDetailList()
    },
    showViewGainDetailSideDrawer(data) {
      this.gainDetailDrawerVisible = true
      this.issue_id = data.issue_id
    },
    handleGainDrawerClose() {
      this.gainDetailDrawerVisible = false
      this.issue_id = null
    },
    handleClickSortChange(column) {
      switch (column.order) {
        case "ascending":
          this.queryInfo.order = column.prop
          break
        case "descending":
          this.queryInfo.order = "-" + column.prop
          break
        default:
          this.queryInfo.order = '-gain_time'
      }
      this.fetchGrindGainDetailList()
    },
  }
}
</script>

<style lang="less" type="text/less" scoped>
.grind-container {
  .wrapper {
    .grinder-upper {
    }

    .grind-lower {
      //margin-top: 20px;
    }
  }
}

.grind-gain-container {
  .grind-gain-query-box {
    font-size: 13px;
    color: black;
    //width: 100%;
    height: 200px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //margin: 10px 0;
  }

  .grind-gain-table {
    padding-top: 10px;
    width: 100%;
    font-size: 13px;

    .table-cell-url {
      text-decoration: none;
      color: #5F48C5;;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.grind-gain-pagination {
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.gain-card-header {
  display: flex;
  justify-content: space-between;

  .header-right {
    display: flex;

    .right-item {
      margin-left: 16px;
    }

    .business-dropdown {
      height: 100%;
      display: flex;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      padding: 0 12px;
      border-radius: 3px;

      &:hover {
        background-color: #f5f5f5;
      }
    }

    .custom-date-picker.el-input__inner {
      width: 300px;
      border: none !important;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }

      .el-range-input {
        font-weight: bold;
        cursor: pointer;

        &:hover {
          background-color: #f5f5f5;
        }
      }

      .el-range-separator {
        font-weight: bold !important;
      }
    }

    .business-selector {
      width: 140px;
    }

    .search-input {
      width: 220px;
    }
  }
}

/deep/ .el-link.el-link--primary {
  color: #409EFF;
  font-size: 13px;
}

/deep/ .el-table__row > td {
  //border: none;
  color: black;
}
</style>

