<template>
  <v-chart
      :style="{width: width, height: height}"
      :option="options"
      autoresize/>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';


use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

export default {
  name: "NightingalePie",
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
  computed: {
    options () {
      let extraPieData = []
      this.data.forEach(() => {
        extraPieData.push({
          value:0,
          name:'',
          silent: true,
          itemStyle: {color: 'rgba(0,0,0,0)'}
        })
      })

      return {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // },
        grid: {
          x: 0,
          y: 0,
          y2: 0,
          x2: 0,
          borderWidth: 0
        },
        series: [
          {
            type: 'pie',
            radius : ['20%', '160%'],
            center: ['50%', '90%'],
            startAngle: 180,
            roseType: 'area',
            data:[
              // {value:15, name:'分类1'},
              // {value:20, name:'分类2'},
              // {value:27, name:'分类3'},
              // {value:36, name:'分类4'},
              // {value:42, name:'分类5'},
              // {value:51, name:'分类6'},
              ...this.data,
              ...extraPieData
              // {value:0, name:'', silent: true, itemStyle: {color: 'rgba(0,0,0,0)'}},
              // {value:0, name:'', silent: true, itemStyle: {color: 'rgba(0,0,0,0)'}},
              // {value:0, name:'', silent: true, itemStyle: {color: 'rgba(0,0,0,0)'}},
              // {value:0, name:'', silent: true, itemStyle: {color: 'rgba(0,0,0,0)'}},
              // {value:0, name:'', silent: true, itemStyle: {color: 'rgba(0,0,0,0)'}},
              // {value:0, name:'', silent: true, itemStyle: {color: 'rgba(0,0,0,0)'}}
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>

