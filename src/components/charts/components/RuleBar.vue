<template>
  <v-chart
      :style="{width: width, height: height, minWidth: '200px'}"
      :option="options"
      autoresize/>
</template>

<script>
import {use} from 'echarts/core';
import {GridComponent} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';


use([
  GridComponent,
  BarChart,
  CanvasRenderer
])

export default {
  name: "RuleBar",
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
    }
  },
  data() {
    return {}
  },
  computed: {
    options() {
      let y_axis_data = this.data.map((item) => item.value)
      let x_axis_data = this.data.map((item) => item.name)

      y_axis_data = y_axis_data.filter((item, index) => {
        if (item === 0) {
          x_axis_data.splice(index, 1)
        }
        return item !== 0
      })
      return {
        xAxis: {
          type: 'category',
          data: x_axis_data,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          splitLine: false,
          axisLabelShow: false,
          splitNumber: 2,
        },
        grid: {
          top: '3%',
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            data: y_axis_data,
            type: 'bar',
            // left: '5%',
            color: '#7e4ebf',
            textStyle: {
              fontSize: 8
            }
          }
        ]
      };
    }
  }
}
</script>

<style scoped>

</style>

