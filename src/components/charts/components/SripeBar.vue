<template>
  <v-chart
      :style="{width: width, height: height}"
      :option="options"
      autoresize/>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';


use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

export default {
  name: "StripeBar",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "140px"
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    options () {
      return {
        xAxis: {
          type: 'category',
          // data: ['播放体验', '操作体验', '社交', '电商', '生活服务', '端体验', '愉悦度'],
          data: this.data.x_axis,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          axisLine: {
            show: false
          },
          boundaryGap: true,
        },
        grid: {
          x: 0,
          y: 0,
          y2: 20,
          x2: 20,
          left: '6%',
          top: '5%',
          borderWidth: 0
        },
        yAxis: {
          type: 'value',
          show: true,
          splitLine: false,
          axisLabelShow: false,
          axisTick: {
            show: false,
            axisLine: {
              show: false,
            }
          },
          min: 'dataMin',
          // max: 'dataMax',
          splitNumber: 2
        },
        tooltip: {
          // show: true,
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [
          {
            name: this.data.series[2].name,
            type: 'bar',
            stack: 'Ad',
            barWidth : 25,
            color: "#a39e9e",
            data: this.data.series[2].data
          },
          {
            name: this.data.series[1].name,
            type: 'bar',
            stack: 'Ad',
            barWidth : 25,
            color: "#f08e4a",
            data: this.data.series[1].data
          },
          {
            name: this.data.series[0].name,
            type: 'bar',
            stack: 'Ad',
            barWidth : 25,
            color: "#7e4ebf",
            data: this.data.series[0].data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>

