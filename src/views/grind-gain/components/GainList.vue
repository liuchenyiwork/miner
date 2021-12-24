<template>
  <div class="grind-gain-container" v-loading="grindGainListLoading">
    <el-card class="grind-gain-box-card">
      <div class="gain-card-sub-title">
        收益列表
      </div>
      <!--      <div class="grind-gain-query-box">-->
      <!--&lt;!&ndash;        <grind-gain-query :queryInfo="queryInfo" @click-grind-gain-query="handleClickGainQuery"/>&ndash;&gt;-->
      <!--      </div>-->
      <div class="grind-gain-table">
        <el-table
            :data="grindGainListData"
            :default-sort="{prop: 'gain_time', order: 'descending'}"
            @sort-change="handleClickSortChange"
            empty-text="无结果"
            :row-style="{height:'57px'}"
        >
          <!--          <el-table-column prop="id" label="序号" width="50px"></el-table-column>-->
          <el-table-column prop="business_gain" label="业务收益" min-width="280px"></el-table-column>
          <el-table-column prop="performance_gain" label="性能收益" min-width="280px"></el-table-column>
          <el-table-column prop="issue_description" label="来源问题" min-width="280px"></el-table-column>
          <el-table-column prop="coverage_rate" label="大盘覆盖率" width="90px">
            <template v-slot="scope">
              {{ scope.row.coverage_rate | formatPercent }}
            </template>
          </el-table-column>
          <el-table-column prop="category_name" label="分类" width="80px"></el-table-column>
          <el-table-column prop="region" label="国家/地区" width="90px">
            <template v-slot="scope">
              {{ scope.row.region | dataEmptyFilter }}
            </template>
          </el-table-column>
          <el-table-column prop="experiment_report_link" label="实验报告" width="80px">
            <template slot-scope="scope">
              <a v-if="scope.row.experiment_report_link" class="table-cell-url" :href="scope.row.experiment_report_link"
                 target="_blank"><i class="el-icon-link"/>链接</a>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="experiment_link" label="实验链接" width="80px">
            <template slot-scope="scope">
              <a class="table-cell-url" :href="scope.row.experiment_link" target="_blank"><i
                  class="el-icon-link"/>链接</a>
            </template>
          </el-table-column>
          <el-table-column prop="mining_report_link" label="挖掘报告" width="80px">
            <template slot-scope="scope">
              <a class="table-cell-url" :href="scope.row.mining_report_link" target="_blank"><i class="el-icon-link"/>链接</a>
            </template>
          </el-table-column>
          <el-table-column prop="gain_time" sortable="custom" label="取得收益时间" width="130px">
            <template slot-scope="scope">
              {{ scope.row.gain_time | formatTime }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" :label="$t('issue.operation')" width="60px">
            <template v-slot="scope">
              <el-button type="text" size="mini" @click="showViewGainDetailSideDrawer(scope.row)">
                <i class="el-icon-view"/>{{ $t('issue.view') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="grind-gain-pagination">
        <el-pagination
            @size-change.="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[10, 20, 40, 100]"
            :page-size="queryInfo.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </el-card>

    <div class="grind-gain-detail-drawer">
      <el-drawer
          :with-header="false"
          :visible.sync="gainDetailDrawerVisible"
          direction="rtl"
          size="900px"
          :before-close="handleGainDrawerClose">
        <view-issue-detail v-if="gainDetailDrawerVisible" :issue_id="issue_id" @close="handleGainDrawerClose"/>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import ViewIssueDetail from "@/components/view-issue-detail";
import gainApi from "@/api/gain";
import {moreShortFormatDateTime, toPercent, dataEmptyFilter} from "@/utils";
import {mapGetters} from "vuex"

export default {
  name: "GainList",
  components: {
    ViewIssueDetail
  },
  data() {
    return {
      grindGainListLoading: false,
      product_id: null,
      queryInfo: {
        page: 1,
        page_size: 10,
        product_id: 1,
        order: "-gain_time",
      },
      grindGainListData: null,
      total: null,
      selectedBusiness: '',
      selectedDate: '',
      gainDetailDrawerVisible: false,
      issue_id: null
    }
  },
  computed: {
    ...mapGetters(['gainStatisticsDuration']),
  },
  watch: {
    gainStatisticsDuration() {
      if (this.queryInfo.begin_gain_time || this.queryInfo.end_gain_time) {
        this.queryInfo.begin_gain_time = this.gainStatisticsDuration[0]
        this.queryInfo.end_gain_time = this.gainStatisticsDuration[1]
      } else {
        Object.assign(this.queryInfo, {
          begin_gain_time: this.gainStatisticsDuration[0],
          end_gain_time: this.gainStatisticsDuration[1]
        })
      }
      this._prepare()
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
    dataEmptyFilter
  },
  mounted() {
    // this._prepare()
  },
  methods: {
    _prepare() {
      this.fetchGrindGainDetailList()
    },
    fetchGrindGainDetailList() {
      this.grindGainListLoading = true

      gainApi.list(this.queryInfo).then(({data: res}) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取挖掘收益列表失败！" + res.meta.message)
          return
        }
        this.grindGainListData = res.data.results
        this.total = res.data.total
      }).catch(err => {
        this.$message.error("获取问题异常！请稍后重试~")
        console.log("获取问题异常!" + err.toString())
      }).finally(() => {
        this.grindGainListLoading = false
      })
    },
    handleClickGainQuery(queryInfo) {
      this.queryInfo = queryInfo
      this.queryInfo.page = 1
      this.fetchGrindGainDetailList()
    },
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
      this.queryInfo.page = 1
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

<style lang="less" scoped>
.grind-gain-container {
  .gain-card-sub-title {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .grind-gain-query-box {
    font-size: 13px;
    color: black;
    //width: 100%;
    height: 150px;
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

