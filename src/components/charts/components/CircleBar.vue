<template>
  <v-chart
      :style="{width: width, height: height}"
      :option="options"
      autoresize/>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

export default {
  name: "CircleBar",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%"
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // mocked: [
      //   {value: 42, name: 'P0'},
      //   {value: 30, name: 'P1'},
      //   {value: 28, name: 'P2'},
      // ]
    }
  },
  computed: {
    options () {
      return {
        title: {
          text: '问题优先级占比',
          textStyle: {
            fontSize: 12,
          },
          x: 'center',
          bottom: 10
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          icon: 'circle',
          right: 'right',
          bottom: 40,
        },
        color: [
          '#7e4ebf',
          '#f08e4a',
          '#a39e9e',
          // '#5f48c5',
        ],
        series: [
          {
            name: '统计',
            type: 'pie',
            radius: ['40%', '66%'],
            center: ['50%', '36%'],
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 5,
              // borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>

