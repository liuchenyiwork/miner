<template>
  <div class="line-chart-container" v-if="data">
    <div v-if="data.type === 'line chart'">
      <issue-detail-line-chart :data="data.chartData"/>
    </div>
    <div v-if="data.type === 'correlation_line_chart'">
      <correlation-line-chart :data="data.chartData" />
    </div>
  </div>
</template>

<script>
import IssueDetailLineChart from "@/components/charts/components/IssueDetailLineChart";
import CorrelationLineChart from "@/components/charts/components/CorrelationLineChart";
export default {
  name: "index",
  components: {
    IssueDetailLineChart,
    CorrelationLineChart
  },
  props: {
    data: {
      type: Object,
      require: true,
      default: null
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>

