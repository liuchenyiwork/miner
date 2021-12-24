<template>
  <div class="detail-drawer" v-loading="issueDetailLoading">
    <template v-if="issueDetail">
      <div class="detail-header">
        <div class="header-item">
          <span class="detail-header-id">问题ID</span>
          <span class="detail-header-id">{{ issue_id }}</span>
          <el-tag class="header-tags" style="border-radius: 30px" :type="issueDetail.status | statusTagType"
                  size="small" effect="dark" :enterable="false">
            {{ issueDetail.status | statusTransfer }}
          </el-tag>
          <el-tag class="header-tags" style="border-radius: 30px" :type="issueDetail.priority | levelColor" size="small"
                  effect="dark">
            {{ issueDetail.priority || '-' }}
          </el-tag>
        </div>
        <div class="header-close-btn">
          <el-button type="text" icon="el-icon-close" @click="handleClickCloseDrawer"></el-button>
        </div>
      </div>

      <div class="detail-body">
        <div class="basic-information-upper">
          <div class="information-header">
            <span style="padding: 10px 0 10px 5px"> 问题详情</span>
          </div>
          <div class="information-module">
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">问题描述:</el-col>
              <el-col class="value" :span="20">{{ issueDetail.description | dataEmptyFilter}}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">国家/地区:</el-col>
              <el-col class="value" :span="20">{{ issueDetail.region | dataEmptyFilter }}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">分类:</el-col>
              <el-col class="value" :span="20">{{ issueDetail.category_name | dataEmptyFilter }}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">匹配规则:</el-col>
              <el-col class="value" :span="20">{{ issueDetail.rule_name | dataEmptyFilter }}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">发现时间:</el-col>
              <el-col class="value" :span="20">
                <i class="el-icon-date"/> {{ issueDetail.create_time | fullFormatTime }}
              </el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">异常点个数:</el-col>
              <el-col class="value" :span="20">{{ unexpected_pos_num }}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">数据图:</el-col>
              <el-col class="value" :span="20">
                <match-result-issue-line-chart :data="issueDetail.data_graph"/>
              </el-col>
            </el-row>
            <div v-if="people_if">
              <el-row class="item" :gutter="20">
                <el-col class="title" :span="4">跟进人:</el-col>
                <el-col class="value" :span="20">
                  <div class="person-info-wrapper">
                    <img class="avatar" src="@/assets/avatar.png" alt=""/>
                    <div style="padding-left: 5px">{{ issueDetail.follow_person | filterFollowPeople }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="item" :gutter="20">
                <el-col class="title" :span="4">处理人:</el-col>
                <el-col class="value" :span="20">
                  <div v-if="issueDetail.handle_people.length">
                    <div style="display: inline-block; margin-right: 8px" v-for="(hp, idx) in issueDetail.handle_people"
                         :key="idx">
                      <div class="person-info-wrapper">
                        <img class="avatar" src="@/assets/avatar.png" alt=""/>
                        <div style="padding-left: 5px">{{ hp }}</div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    {{ "无" }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <el-row v-if="exp_link_if" class="item" :gutter="20">
              <el-col class="title" :span="4">实验链接:</el-col>
              <el-col class="value" :span="20">
                <a v-if="issueDetail.experiment_link" class="table-cell-url" :href="issueDetail.experiment_link"
                   target="_blank"><i class="el-icon-link">链接</i></a>
                <span v-else>无</span>
              </el-col>
            </el-row>

            <el-row v-if="exp_report_if" class="item" :gutter="20">
              <el-col class="title" :span="4">实验报告:</el-col>
              <el-col class="value" :span="20">
                <a v-if="issueDetail.experiment_report_link" class="table-cell-url"
                   :href="issueDetail.experiment_report_link" target="_blank"><i class="el-icon-link">链接</i></a>
                <span v-else>无</span>
              </el-col>
            </el-row>

            <el-row v-if="min_link_if" class="item" :gutter="20">
              <el-col class="title" :span="4">挖掘报告:</el-col>
              <el-col class="value" :span="20">
                <a v-if="issueDetail.mining_report_link" class="table-cell-url" :href="issueDetail.mining_report_link"
                   target="_blank"><i class="el-icon-link">链接</i></a>
                <span v-else>无</span>
              </el-col>
            </el-row>
          </div>

          <template v-if="issueDetail.gain_status">
            <div class="information-header">
              <span style="padding: 10px 0 10px 5px"> 收益详情</span>
            </div>
            <div class="information-module">
              <el-row class="item" :gutter="20">
                <el-col class="title" :span="4">性能收益:</el-col>
                <el-col class="value" :span="20">
                  <el-table
                      v-if="perfGainTable"
                      size="mini"
                      :data="perfGainTable"
                      empty-text="无结果"
                      row-class-name="value"
                  >
                    <el-table-column v-for="(item, idx) in issueDetail.performance_gain"
                                     :key="idx"
                                     :label="item.indicator"
                                     :prop="item.indicator"
                    >
                    </el-table-column>
                  </el-table>
                  <span v-else>无</span>
                </el-col>
                <!--                <el-col class="value" :span="20">{{ issueDetail.performance_gain || '无' }}</el-col>-->
              </el-row>
              <el-row class="item" :gutter="20">
                <el-col class="title" :span="4">业务收益:</el-col>
                <!--                <el-col class="value" :span="20">{{ issueDetail.business_gain || '无' }}</el-col>-->
                <el-col class="value" :span="20">
                  <el-table
                      v-if="bizGainTable"
                      size="mini"
                      :data="bizGainTable"
                      empty-text="无结果"
                      row-class-name="value"
                  >
                    <el-table-column v-for="(item, idx) in issueDetail.business_gain"
                                     :key="idx"
                                     :label="item.indicator"
                                     :prop="item.indicator"
                    >
                    </el-table-column>
                  </el-table>
                  <span v-else>无</span>
                </el-col>
              </el-row>
              <el-row class="item" :gutter="20">
                <el-col class="title" :span="4">大盘覆盖率:</el-col>
                <el-col class="value" :span="20">{{ issueDetail.coverage_rate | formatPercent }}</el-col>
              </el-row>
              <el-row class="item" :gutter="20">
                <el-col class="title" :span="4">获得收益时间:</el-col>
                <el-col class="value" :span="20">
                  <i class="el-icon-date"/> {{ issueDetail.gain_time | shortFormatTime }}
                </el-col>
              </el-row>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <el-empty/>
    </template>
  </div>
</template>

<script>
import MatchResultIssueLineChart from "@/components/charts/components/MatchResultLineChart";
import issue from "@/api/issue";
import {
  shortFormatDateTime,
  fullFormatDateTime,
  levelColor,
  statusTagType,
  statusTransfer,
  toPercent,
  dataEmptyFilter
} from "@/utils";

const
    people = 1,
    minLink = 1 << 1,
    expLink = 1 << 2,
    expReport = 1 << 3

export default {
  name: "ViewIssueDetail",
  components: {
    MatchResultIssueLineChart
  },
  props: {
    issue_id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      issueDetail: null,
      perfGainTable: null,
      bizGainTable: null,
      issueDetailLoading: false
    }
  },
  computed: {
    unexpected_pos_num() {
      let unexpected_pos = this.issueDetail.data_graph.unexpected_pos
      if (unexpected_pos) {
        return unexpected_pos.length
      }
      return 0
    },
    people_if() {
      return this.status_code & people
    },
    min_link_if() {
      return this.status_code & minLink
    },
    exp_link_if() {
      return this.status_code & expLink
    },
    exp_report_if() {
      return this.status_code & expReport
    },
    status_code() {
      switch (this.issueDetail.status) {
        case "solving":
          return people
        case 'solved':
          return people
        case 'experiment':
          return people | expLink
        case 'closed':
          return people | expLink | expReport | minLink
        case 'recycled':
          return 0
        case 'pending':
          return 0
        default:
          return 0
      }
    }
  },
  filters: {
    fullFormatTime(val) {
      if (!val) return '无'
      return fullFormatDateTime(val * 1000)
    },
    shortFormatTime(val) {
      if (!val) return '无'
      return shortFormatDateTime(val * 1000)
    },
    formatPercent(val) {
      return toPercent(val, 3)
    },
    formatGain(val) {
      return val['sign'] + val.number.toString() + val.unit
    },
    levelColor,
    statusTagType,
    statusTransfer,
    dataEmptyFilter,
    filterFollowPeople(val) {
      if (val && val.length === 1) {
        return val[0]
      } else {
        return '-'
      }
    }
  },
  mounted() {
    this._prepare()
  },
  methods: {
    _prepare() {
      this.issueDetail = null
      this.perfGainTable = null
      this.bizGainTable = null
      if (this.issue_id) {
        this.fetchIssueDetail()

      }
    },
    fetchIssueDetail() {
      this.issueDetailLoading = true
      issue.retrieveIssue(this.issue_id).then(({data: res}) => {
        if (res.data.performance_gain) {
          let perfGainFormat = {};
          res.data.performance_gain.forEach(g => {
            perfGainFormat[g.indicator] = g.sign + g.number + g.unit
          })
          if (Object.keys(perfGainFormat).length) {
            this.perfGainTable = [perfGainFormat];
          }
        }

        if (res.data.business_gain) {
          let bizGainFormat = {};
          res.data.business_gain.forEach(g => {
            bizGainFormat[g.indicator] = g.sign + g.number + g.unit
          })
          if (Object.keys(bizGainFormat).length) {
            this.bizGainTable = [bizGainFormat];
          }
        }

        this.issueDetail = res.data;
      }).catch(err => {
        this.$message.error("获取问题详情异常！请稍后重试")
        console.log("获取问题详情异常！" + err.toString())
      }).finally(() => {
        this.issueDetailLoading = false
      })
    },
    handleSelectPriority(cmd) {
      if (this.issueDetail.level === cmd) return;
      this.issueDetail.level = cmd;
      // TODO request to PATCH
      this.$notify({
        title: '提示',
        type: 'success',
        message: `修改「${this.issueDetail.desc}」优先级成功！`
      })
    },
    handleSelectStatus(cmd) {
      if (cmd === this.issueDetail.status) return;
      this.issueDetail.status = cmd;
      this.$notify({
        title: '提示',
        type: 'success',
        message: `修改「${this.issueDetail.desc}」状态成功！`
      })
    },
    formatGain(row, column) {
      let val = column.key
      return val['sign'] + val.number.toString() + val.unit
    },
    handleClickCloseDrawer() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="less" scoped>
.detail-drawer {
  margin: 10px 20px;

  .detail-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-item {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    .header-tags {
      margin: 0 10px 0 10px;
    }

    .header-close-btn {
      color: white;
    }

    .detail-header-id {
      margin-right: 5px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .information-module {
    padding-top: 20px;

    .item {
      font-size: 10px;
      margin-bottom: 20px;

      .title {
        font-weight: bold;
        color: #2c2c2c;
        text-align: end;
      }

      .value {
        .person-info-wrapper {
          display: flex;
          align-items: center;
          padding: 0 4px;

          .avatar {
            width: 20px;
            height: 20px;
            background-color: gainsboro;
            border-radius: 50%;
          }
        }


        .status-cell {
          display: flex;
          align-items: center;

          .status-indicator {
            height: 8px;
            width: 8px;
            border-radius: 50%;
            background-color: gray;
            margin-right: 6px;

            &.status-indicator-color-0 {
              background-color: #5F48C5;
            }

            &.status-indicator-color-1 {
              background-color: #02b802;
            }
          }
        }

        .user-cell-wrapper {
          display: inline-block;
          margin-right: 12px;

          .user-cell {
            display: flex;
            align-items: center;

            .user-cell-item {
              display: inline-block;

              &.avatar {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background-color: #dedede;
                margin-right: 6px;
              }
            }
          }
        }
      }
    }
  }

  .detail-body {
    .basic-information-upper {
      padding: 10px 0 0 0;
    }

    .information-header {
      width: 100%;
      background-color: #f5f5f5;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 3px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.selected-priority, .selected-item {
  display: flex;
  align-items: center;

  padding: 1px 3px;
  border-radius: 3px;
  cursor: pointer;
  border: .3px solid #f5f5f5;

  .arrow {
    margin-left: 5px;
  }
}

/deep/ th.el-table__cell {
  padding: 0 0 3px 0 !important;
}

/deep/ .el-table__row > td {
  color: black;
}
</style>

