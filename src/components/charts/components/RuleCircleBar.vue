<template>
  <v-chart
      :style="{width: width, height: height}"
      :option="options"
      autoresize/>
</template>

<script>
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {TitleComponent, TooltipComponent, LegendComponent, GridComponent} from 'echarts/components';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])
export default {
  name: "RuleCircleBar",
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
      type: Array,
      required: true
    },
  },
  data () {
    return {
      // mock: [
      //   {
      //     "value": 1,
      //     "name": "视频消费6"
      //   },
      //   {
      //     "value": 10,
      //     "name": "公共维度7"
      //   },
      //   {
      //     "value": 1,
      //     "name": "视频消费1"
      //   },
      //   {
      //     "value": 10,
      //     "name": "公共维度2"
      //   },
      //   {
      //     "value": 1,
      //     "name": "视频消费3"
      //   },
      //   {
      //     "value": 10,
      //     "name": "公共维度4"
      //   },        {
      //     "value": 1,
      //     "name": "视频消费5"
      //   },
      // ]
    }
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          icon: 'circle',
          textStyle: {
            fontSize: 12
          },

          // right: 'right',
          // y: 'center',
          // padding: [0, 5, 5, 0],
          // itemGap: 5,
          // top: '1%',
          // pageSize: 4,
          type: "scroll",
        },
        color: [
          // '#7e4ebf',
          // '#b87bf7',
          // '#b99df4',
          // '#e78a4a',
          // '#70b9d6',
          '#5f48c5',
          '#7e4ebf',
          '#b87bf7',
          '#e56464',
          '#f0c157',
          '#8dc572',
          '#536dbf',
        ],
        grid: {
          bottom: 10
        },
        series: [
          {
            top: '4%',
            // bottom: '1%',
            // right: '20%',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 5,
              borderWidth: 1,
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '22',
                fontWeight: 'bold',
                formatter: '{c}',
              }
            },
            labelLine: {
              show: false
            },
            data: this.data
            // data: this.mock
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>

