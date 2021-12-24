
<template>
  <div class="grains-origin" v-loading="gainsConversionLoading">
    <thin-card
        header-icon="el-icon-s-grid"
        :header="$t('gain.gain_origin')"
        height="300px">
      <div class="gain-conversion-info" v-if="gainsConversionData">
        <funnel-stripe :data="gainsConversionData"/>
      </div>
    </thin-card>
  </div>
</template>

<script>
import ThinCard from "@/components/thin-card";
import gainApi from "@/api/gain";
import FunnelStripe from "@/components/charts/components/FunnelStripe";
import {mapGetters} from "vuex";

export default {
  name: "GainsOrigin",
  components: {
    FunnelStripe,
    ThinCard
  },
  data() {
    return {
      queryInfo: {
        product_id: 1,
      },
      gainsConversionData: null,
      gainsConversionLoading: false,
      pieData: []
    }
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
      this.fetchGainsConversionData()
    },
    fetchGainsConversionData() {
      this.gainsConversionLoading = true

      gainApi.conversion(this.queryInfo).then(({data: res}) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取收益来源数据失败！" + res.meta.message)
          return
        }
        this.gainsConversionData = res.data
      }).catch(err => {
        this.$message.error("获取收益来源数据异常！")
        console.log("获取收益来源数据异常！" + err.toString())
      }).finally(() => {
        this.gainsConversionLoading = false
      })
    },
    dealGainsConversionData() {
      let tmp = []
      this.gainsConversionData.gain_source.forEach((item) => {
        let t = {
          name: item.name,
          value: item.gain_number
        }
        tmp.push(t)
      })
      tmp.sort((a, b) => {
        return a.value - b.value
      })
      this.gainsConversionData.gain_source = tmp
    },
  }
}
</script>

<style lang="less" scoped>
.statistics-duration {
  font-weight: bold;
}

</style>

