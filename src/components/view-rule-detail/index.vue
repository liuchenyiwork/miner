<template>
  <div class="detail-drawer" v-loading="ruleDataDetailLoading">
    <template v-if="ruleDataDetail">
      <div class="detail-header">
        <div class="header-item">
          <span class="detail-header-id">规则ID</span>
          <span class="detail-header-id">{{ id }}</span>
          <span style="font-size: 14px; padding-left: 10px">
            <indicator :type="ruleDataDetail.status | activateStatusDesc"
                       :content="ruleDataDetail.status | activateStatusTransfer"/>
          </span>
        </div>
        <div class="header-close-btn">
          <el-button type="text" icon="el-icon-close" @click="handleClickCloseDrawer"></el-button>
        </div>
      </div>

      <div class="detail-body">
        <div class="basic-information-upper">
          <div class="information-header">
            <span style="padding: 10px 0 10px 5px"> 基本信息</span>
          </div>
          <div class="information-module">
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">规则描述:</el-col>
              <el-col class="value" :span="20">{{ ruleDataDetail.rule_description | dataEmptyFilter}}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">所属分类:</el-col>
              <el-col class="value" :span="20">{{ ruleDataDetail.category_name | dataEmptyFilter }}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">所属维度:</el-col>
              <el-col class="value" :span="20">{{ ruleDataDetail.dimension_name | dataEmptyFilter }}</el-col>
            </el-row>
            <el-row class="item" :gutter="20">
              <el-col class="title" :span="4">说明:</el-col>
              <el-col class="value" :span="20">
                {{ ruleDataDetail.info || '无' }}
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="related-task">
          <div class="information-header">
            <span style="padding: 10px 0 10px 5px"> 关联任务</span>
          </div>
          <div class="information-module" v-loading="relatedTaskDataLoading">
            <el-table
                size="mini"
                :data="relatedTaskData"
                empty-text="无结果"
                row-class-name="value"
            >
              <el-table-column prop="description" label="任务描述"></el-table-column>
              <el-table-column prop="status" label="状态" width="120">
                <template slot-scope="scope">
                  <indicator :type="scope.row.status | activateStatusDesc"
                             :content="scope.row.status | activateStatusTransfer"/>
                </template>
              </el-table-column>
              <el-table-column width="100" label="操作">
                <template slot-scope="scope">
                  <el-button
                      disabled
                      @click.native.prevent="showRelatedTaskDetail(scope.row)"
                      type="text"
                      size="small">
                    <i class="el-icon-view"/> {{ $t('issue.view') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table-pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="queryInfo.page_size"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <el-empty/>
    </template>
  </div>
</template>

<script>
import Indicator from "@/components/indicator";
import ruleApi from "@/api/rule";
import taskApi from "@/api/task";
import {
  activateStatusDesc,
  activateStatusTransfer,
  dataEmptyFilter
} from "@/utils";


export default {
  name: "ViewRuleDetail",
  components: {
    Indicator
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ruleDataDetail: null,
      relatedTaskData: null,
      total: 0,
      queryInfo: {
        rule_data_id: this.id,
        page: 1,
        page_size: 10
      },
      ruleDataDetailLoading: false,
      relatedTaskDataLoading: false
    }
  },
  computed: {},
  filters: {
    activateStatusDesc,
    activateStatusTransfer,
    dataEmptyFilter
  },
  mounted() {
    this._prepare()
  },
  methods: {
    _prepare() {
      this.fetchRuleDataDetail()
    },
    fetchRuleDataDetail() {
      this.ruleDataDetailLoading = true
      ruleApi.getRuleData(this.id).then(({data: res}) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取规则数据详情失败！请稍后重试" + res.meta.message)
          return
        }
        this.ruleDataDetail = res.data;
        this.fetchRelateTaskData()
      }).catch(err => {
        this.$message.error("获取规则数据详情异常！请稍后重试")
        console.log("获取规则数据详情异常！" + err.toString())
      }).finally(() => {
        this.ruleDataDetailLoading = false
      })
    },
    fetchRelateTaskData() {
      this.relatedTaskDataLoading = true
      taskApi.getTaskList(this.queryInfo).then(({data: res}) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取关联任务数据失败！请稍后重试" + res.meta.message)
          return
        }
        this.relatedTaskData = res.data.results
        this.total = res.data.total
      }).catch(err => {
        this.$message.error("获取关联任务数据异常！请稍后重试")
        console.log("获取关联任务数据异常！" + err.toString())
      }).finally(() => {
        this.relatedTaskDataLoading = false
      })
    },
    handleClickCloseDrawer() {
      this.$emit("close")
    },
    showRelatedTaskDetail(subTask) {
      console.log("<<<", subTask)
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.fetchRelateTaskData()
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
            //background-color: gainsboro;
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

    .related-task {
      padding: 0;

      .table-pagination {
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
      }
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

/deep/ th.el-table__cell {
  padding: 0 0 3px 0 !important;
}

/deep/ .el-table__row > td {
  color: black;
}
</style>

