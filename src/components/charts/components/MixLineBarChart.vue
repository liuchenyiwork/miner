<template>
  <div class="chart-container">
    <div class="mix-line-bar-chart" v-if="data.x_axis.length">
      <v-chart
          :style="{width: width, height: height}"
          :option="options"
          autoresize
      />
    </div>
    <div v-else style="text-align: center; ">
      <el-empty :image-size="100" style="width: 100%" description="暂无数据"></el-empty>
    </div>
  </div>
</template>

<script>
import {use} from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import {BarChart, LineChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';


use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

export default {
  name: "MixLineBarChart",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "140x"
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
  data() {
    return {
      unit: 'unit'
    }
  },
  computed: {
    options() {
      const legendName = this.data.series.map((item) => {
        return item.name
      })
      const units = [this.data.series[0].unit, this.data.series[1].unit]
      return {
        tooltip: {
          trigger: 'axis',
          confine: true,
          // formatter: '{a0}:{b0}{c0}{e0}'
          formatter: function (params) {
            let relVal = params[0].name
            for (let i = 0; i < params.length; i++) {
              let unit = (i === 0 ? units[0] : units[1])
              relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + unit
            }
            return relVal
          }
        },
        grid: {
          // x: 0,
          // y: 0,
          // y2: 10,
          // x2: 20,
          left: '5%',
          right: '5%',
          // top: '-5%'
        },
        legend: {
          data: legendName,
          top: '2%',
        },
        xAxis: [
          {
            type: 'category',
            data: this.data.x_axis,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.data.series[1].unit,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            },
            splitNumber: 3,
            // min: Math.min(...yaxisData),
            // max: Math.max(...yaxisData)
          },
          {
            type: 'value',
            name: this.data.series[0].unit,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}'
            },
            splitNumber: 2
          },
        ],
        series: [
          {
            name: this.data.series[0].name,
            color: '#5F48C5',
            type: 'bar',
            barWidth: 50,
            data: this.data.series[0].data,
          },
          {
            name: this.data.series[1].name,
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            areaStyle: {
              opacity: 0.1
            },
            data: this.data.series[1].data,
          },
          {
            name: this.data.series[2].name,
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            areaStyle: {
              opacity: 0.1
            },
            data: this.data.series[2].data,
          },
          {
            name: this.data.series[3].name,
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            areaStyle: {
              opacity: 0.1
            },
            data: this.data.series[3].data,
          },
        ]
      };
    }
  }
}
</script>

<style scoped>

</style>

