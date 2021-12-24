<template>
  <div class="grind-gain-query-container">
    <div class="query-box">
      <el-form :inline="true" label-position="right" label-width="100px" style="padding: 40px 0 10px 20px;width: 100%">
        <el-form-item label="来源问题:" style="height: 20px;">
          <el-input size="mini" style="width: 200px"
                    v-model="matchIssueDescription"
                    maxlength="100"
                    placeholder="输入来源问题">
          </el-input>
        </el-form-item>
        <el-form-item label="分类:" style="padding-left: 20px;height: 20px">
          <el-select
              style="width: 150px; height: 40px"
              multiple
              collapse-tags
              size="mini"
              v-model="selectCategoryLine"
              placeholder="全部">
            <el-option
                v-for="line in categoryLineList"
                :key="line.id"
                :label="line.name"
                :value="line.id">
            </el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="业务收益:" style="height: 20px;">
          <el-input size="mini" style="width: 200px"
                    v-model="matchBusinessGain"
                    maxlength="100"
                    placeholder="输入业务收益">
          </el-input>
        </el-form-item>
        <el-form-item label="性能收益:" style="padding-left: 20px;height: 20px">
          <el-input size="mini" style="width: 200px"
                    v-model="matchPerformanceGain"
                    maxlength="100"
                    placeholder="输入性能收益">
          </el-input>
        </el-form-item>
        <el-form-item label="收益ID:" style="padding-left: 20px;height: 20px">
          <el-input size="mini" style="width: 200px"
                    v-model="matchGainID"
                    maxlength="100"
                    placeholder="输入收益ID">
          </el-input>
        </el-form-item>
        <br/>
        <el-form-item style="padding-left:100px">
          <el-button size="mini" style=";margin: 0 0 10px 0;background-color: #5F48C5;color: white;"
                     @click="handleClickIssueCheckQuery">确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import categoryApi from "@/api/category";

export default {
  name: "GrindGainQuery",
  props: {
    queryInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      formLabelAlign: {
        name: '',
        region: '',
        type: ""
      },
      gainTime: [],
      matchIssueDescription: null,
      matchGainID: null,
      categoryLineList: null,
      selectCategoryLine: [],
      matchBusinessGain: null,
      matchPerformanceGain: null
    }
  },
  mounted() {
    this._prepare()
  }
  ,
  methods: {
    _prepare() {
      this.fetchCategoryLineList()
    }
    ,
    fetchCategoryLineList() {
      categoryApi.retrieve(this.queryInfo.product_id).then(({data: res}) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取分类数据失败！" + res.meta.message)
          return
        }
        this.categoryLineList = res.data
      }).catch(err => {
        this.$message.error("获取分类数据异常！")
        console.log("获取分类数据异常！" + err.toString())
      }).finally(() => {
        // todo
      })
    },
    handleClickIssueCheckQuery() {
      // if (this.gainTime && this.gainTime.length > 1) {
      //   Object.assign(this.queryInfo, {
      //         begin_gain_time: this.gainTime[0] / 1000,
      //         end_gain_time: this.gainTime[1] / 1000 + 86400,
      //       }
      //   )
      // } else {
      //   delete this.queryInfo["begin_gain_time"]
      //   delete this.queryInfo["end_gain_time"]
      // }
      if (this.matchIssueDescription && this.matchIssueDescription.trim()) {
        Object.assign(this.queryInfo, {issue_description: this.matchIssueDescription.trim()})
      } else {
        delete this.queryInfo["issue_description"]
      }

      if (this.matchGainID && this.matchGainID.trim()) {
        Object.assign(this.queryInfo, {gain_id: this.matchGainID.trim()})
      } else {
        delete this.queryInfo["gain_id"]
      }

      if (this.selectCategoryLine && this.selectCategoryLine.length > 0) {
        Object.assign(this.queryInfo, {category_id: this.selectCategoryLine.join(',')})
      } else {
        delete this.queryInfo["category_id"]
      }

      if (this.matchBusinessGain && this.matchBusinessGain.trim()) {
        Object.assign(this.queryInfo, {business_gain: this.matchBusinessGain.trim()})
      } else {
        delete this.queryInfo["business_gain"]
      }

      if (this.matchPerformanceGain && this.matchPerformanceGain.trim()) {
        Object.assign(this.queryInfo, {performance_gain: this.matchPerformanceGain.trim()})
      } else {
        delete this.queryInfo["performance_gain"]
      }

      this.$emit("click-grind-gain-query", this.queryInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.grind-gain-query-container {
  width: 100%;

  .query-box {
    justify-content: center;
    align-content: center;
    line-height: 28px;
    width: 100%;
    //height: 300px;

    .title {
      //align-items: center;
      text-align: end;
      font-size: 13px;
      margin: 0 auto;
      //height: 28px;
    }
  }
}

</style>

