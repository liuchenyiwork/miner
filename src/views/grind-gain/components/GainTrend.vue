<template>
  <template>
    <div class="gain-trend-container" v-loading="grindGainTrendLoading">
      <thin-card
          :grindGainTab="true"
          :header="$t('gain.gain_trend')"
          headerIcon="el-icon-s-data"
          @changeGainTab="handleChangeGainTab"
          height="300px">
        <div class="gain-trend-container-info" v-if="grindGainTrendData">
          <mix-line-bar-chart :data="grindGainTrendData" height="300px"/>
        </div>
      </thin-card>
    </div>
  </template>

  <script>
    import gainApi from "@/api/gain";
    import ThinCard from "@/components/thin-card";
    import MixLineBarChart from "@/components/charts/components/MixLineBarChart";
    import {mapGetters} from "vuex";

    export default {
      name: "DiscoveredIssueTrend",
      props: {},
      data() {
        return {
          queryInfo: {
            product_id: 1,
          },
          grindGainTrendData: null,
          grindGainTrendLoading: false,
          activeTab: 'historyCumulative'
        }
      },
      components: {
        MixLineBarChart,
        ThinCard,
      },
      computed: {
        ...mapGetters(["gainStatisticsDuration"])
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
      mounted() {
        // this._prepare()
      },
      methods: {
        _prepare() {
          this.fetchGrindGainTrendData()
        },
        fetchGrindGainTrendData() {
          this.grindGainTrendLoading = true
          const gainApiFunc = this.activeTab === "historyCumulative" ? gainApi.accumulation : gainApi.addition

          gainApiFunc(this.queryInfo).then(({data: res}) => {
            if (res.meta.code !== 0) {
              this.$message.error("获取收益趋势数据失败！")
              return
            }
            this.grindGainTrendData = res.data
            this.grindGainTrendData.series = this.grindGainTrendData.series.map((item) => {
              return {
                name: item.name,
                unit: item.unit,
                data: item.data.map((t)=> Number(t.toFixed(3)))
              }
            })
          }).catch(err => {
            this.$message.error("获取收益趋势数据异常！")
            console.log("获取收益趋势数据异常！" + err.toString())
          }).finally(() => {
            this.grindGainTrendLoading = false
          })
        },
        handleChangeGainTab(tab) {
          this.activeTab = tab
          this.fetchGrindGainTrendData()
        }
      },
    }
  </script>

  <style lang="less" scoped>
    .gain-trend-container {
      .header {
        color: gray;
        font-size: 14px;
        font-weight: bold;
        display: flex;

        > div:nth-child(2) {
          margin: 0 10px;
        }
      }
    }
  </style>


</template>

<script>
export default {
  name: "GainTrend"
}
</script>

<style scoped>

</style>
