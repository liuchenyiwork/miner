<template>
  <div class="funnel-stripe-chart">
    <ul class="wrapper">
      <li class="stripe stripe-1">
        <div class="funnel-wrapper">
          <div class="funnel funnel-1" @click="handleClickFunnel('rule')">
            <div class="funnel-tag">
              <div><i class="el-icon-s-tools"/></div>
              <div>规则</div>
            </div>
          </div>
        </div>
        <el-row class="boxes">
          <el-col :span="8" class="box"> </el-col>
          <el-col :span="8" class="box">
            <div class="description" style="display: inline-block; justify-content: center; min-width: 90px">
              运行规则数
              <el-tooltip content="" placement="top">
                <span slot="content">指统计时间内，有任务运行过的规则数（若<br/>该规则运行了2次，也是有效计算+1）</span>
                <i class="el-icon-info"/>
              </el-tooltip>
            </div>
            <div class="value">{{ showRunningRules.toFixed(0) }}</div>
          </el-col>
          <el-col :span="8" class="box">
            <div class="description" style="display: inline-block; justify-content: center; min-width: 90px">
              运行任务数
              <el-tooltip content="指统计时间内运行过的任务数（若该任务运行了2次，也是有效计算+1）" placement="top">
                <span slot="content">指统计时间内运行过的任务数（若该任务运<br/>行了2次，也是有效计算+1）</span>
                <i class="el-icon-info"/>
              </el-tooltip>
            </div>
            <div class="value">{{ showRunningTasks.toFixed(0) }}</div>
          </el-col>
        </el-row>
      </li>
      <li class="stripe stripe-2">
        <div class="funnel-wrapper">
          <div class="funnel funnel-2" @click="handleClickFunnel('issue')">
            <div class="funnel-tag">
              <div><i class="el-icon-question"/></div>
              <div>问题</div>
            </div>
          </div>
        </div>
        <el-row class="boxes">
          <el-col :span="8" class="box">
            <div class="description">
              P0问题数
            </div>
            <div class="value">{{  showP0Issue.toFixed(0) }}</div>
          </el-col>
          <el-col :span="8" class="box">
            <div class="description">
              P1问题数
            </div>
            <div class="value">{{ showP1Issue.toFixed(0) }}</div>
          </el-col>
          <el-col :span="8" class="box">
            <div class="description">
              P2问题数
            </div>
            <div class="value">{{ showP2Issue.toFixed(0) }}</div>
          </el-col>
        </el-row>
      </li>
      <li class="stripe stripe-3">
        <div class="funnel-wrapper">
          <div class="funnel funnel-3" @click="handleClickFunnel('gain')">
            <div class="funnel-tag">
              <div><i class="el-icon-s-marketing"/></div>
              <div>收益</div>
            </div>
          </div>
        </div>
        <el-row class="boxes" style="min-width: 250px">
          <el-col :span="8" class="box">
            <div class="description">
              人均活跃天数
            </div>
            <div class="value">
              <span>{{"+"}}{{ showAverageActiveDay.toFixed(2)}} </span>
              <span style="font-size: 10px;font-weight: normal">{{averageActiveDayUnit}}</span></div>
          </el-col>
          <el-col :span="8" class="box">
            <div class="description">
              人均使用时长
            </div>
            <div class="value">
              <span>{{"+"}}{{ showAverageUseTime.toFixed(2)}} </span>
              <span style="font-size: 10px;font-weight: normal">{{averageUseTimeUnit}}</span></div>
          </el-col>
          <el-col :span="8" class="box">
            <div class="description">
              人均播放时长
            </div>
            <div class="value">
              <span>{{"+"}}{{ showAveragePlayTime.toFixed(2)}} </span>
              <span style="font-size: 10px;font-weight: normal">{{averagePlayTimeUnit}}</span></div>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: "FunnelStripe",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this._prepare()
  },
  data () {
    return {
      gainOrigin: {
        running_rules: 56,
        running_tasks: 99,
        p0_issues: 60,
        p1_issues: 50,
        p2_issues: 40,
        add: '+0.33',
        aut: '+0.08',
        apt: '+0.21'
      },
      runningRulesCount: 0,
      showRunningRules: 0,
      runningTasksCount: 0,
      showRunningTasks: 0,
      p0_issues: 0,
      showP0Issue: 0,
      p1_issues: 0,
      showP1Issue: 0,
      p2_issues: 0,
      showP2Issue: 0,
      averageActiveDay: 0,
      averageActiveDayUnit: '',
      showAverageActiveDay: 0,
      averageUseTime: 0,
      averageUseTimeUnit: '',
      showAverageUseTime: 0,
      averagePlayTime: 0,
      averagePlayTimeUnit: '',
      showAveragePlayTime: 0,
    }
  },
  // TODO
  watch: {
    runningRulesCount (value) {
      gsap.to(this, { duration: 0.6, showRunningRules: value })
    },
    runningTasksCount (value) {
      gsap.to(this, { duration: 0.6, showRunningTasks: value })
    },
    p0_issues (value) {
      gsap.to(this, { duration: 0.6, showP0Issue: value })
    },
    p1_issues (value) {
      gsap.to(this, { duration: 0.6, showP1Issue: value })
    },
    p2_issues (value) {
      gsap.to(this, { duration: 0.6, showP2Issue: value })
    },
    averageActiveDay (value) {
      gsap.to(this, { duration: 0.6, showAverageActiveDay: value })
    },
    averageUseTime (value) {
      gsap.to(this, { duration: 0.6, showAverageUseTime: value })
    },
    averagePlayTime (value) {
      gsap.to(this, { duration: 0.6, showAveragePlayTime: value })
    },
  },
  methods: {
    _prepare() {
      this.dealGainsConversionData()
    },
    dealGainsConversionData () {
      this.runningRulesCount = this.data.rules.operating_rule_num
      this.runningTasksCount = this.data.rules.operating_task_num

      this.p0_issues = this.data.issues["P0"]
      this.p1_issues = this.data.issues["P1"]
      this.p2_issues = this.data.issues["P2"]

      this.data.gains.forEach( item => {
        if (item.name === "人均活跃天数") {
          this.averageActiveDay = item.value
          this.averageActiveDayUnit = item.unit
        } else if (item.name === "人均使用时长") {
          this.averageUseTime = item.value
          this.averageUseTimeUnit = item.unit
        } else if (item.name === "人均播放时长") {
          this.averagePlayTime = item.value
          this.averagePlayTimeUnit = item.unit
        }
      })

    },
    handleClickFunnel (obj) {
      // this.$emit('click-funnel', obj)
      switch (obj) {
        case 'rule':
          this.$router.push({
            name: 'RulesDetail'
          })
          break
        case 'issue':
          this.$router.push({
            name: 'IssueManage'  // manage
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.funnel-stripe-chart {
  height: 260px;
  min-width: 500px;

  .wrapper {
    height: 100%;
    list-style: none;
    margin-block: unset;
    padding-inline: unset;

    display: flex;
    flex-direction: column;

    .stripe {
      flex: 1;
      margin-bottom: 6px;
      background-color: #f9f9f9;
      display: flex;
      border-radius: 3px;

      &:hover {
        background-color: #efefef;
      }

      .funnel-wrapper {
        flex: 1;

        width: 200px;
        display: flex;
        justify-content: center;

        .funnel {
          width: 220px;
          height: 0;
          border-top: 80px solid #5F48C5;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          cursor: pointer;
          display: flex;
          justify-content: center;
          transition: all 0.3s;

          &:hover {
            transform: scale(1.04);
          }

          .funnel-tag {
            font-weight: bold;
            font-size: 16px;
            color: white;
            margin: -64px 0 0 0;
            text-align: center;
          }
        }

        .funnel-2 {
          width: 180px;
          opacity: 0.75;
        }
        .funnel-3 {
          width: 140px;
          opacity: 0.5;
        }
      }

      .boxes {
        flex: 1.2;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0 10px;

        .box {
          margin: 0 6px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .description {
            font-size: 14px;
            transform: scale(0.8);
            color: gray;
          }
          .value {
            display: flex;
            justify-content: center;
            align-items:baseline;
            font-size: 24px;
            font-weight: bold;
          }
        }

      }
    }
    .stripe-1 {
    }
  }
}
</style>

