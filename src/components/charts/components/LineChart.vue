<template>
  <v-chart
      :style="{width: width, height: height}"
      :option="options"
      autoresize
  />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';


use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

export default {
  name: "LineChart",
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
    },
    shadow: {
      type: Boolean,
      default: true
    },
    xAxisShow: {
      type: Boolean,
      default: true
    },
    yAxisShow: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      mocked: [
        {}
      ]
    }
  },
  computed: {
    options () {
      let areaStyle = this.shadow ? {
        shadowColor: "#5F48C5",
        opacity: 0.1,
      } : null;

      return {
        xAxis: {
          show: this.xAxisShow,
          type: 'category',
          // data: ['2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10'],
          data: this.data.x_axis,
          axisTick: {
            show: false,
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
          top: '5%',
          right: '-3%',
          left: '6%',
          borderWidth: 0
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          confine: true
        },
        yAxis: {
          show: this.yAxisShow,
          type: 'value',
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
        series: [
          {
            // data: [52, 90, 66, 72, 99, 133, 102],
            name: "问题数",
            data: this.data.series[0].data,
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: areaStyle
          }
        ],
        lineStyle: {
          color: "#5F48C5"
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

