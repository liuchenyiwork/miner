<template>
  <div v-if="this.data.x_axis.data">
    <v-chart
        :style="{width: width, height: height}"
        :option="options"
        autoresize
    />
  </div>
  <div v-else>
    {{'无'}}
  </div>

</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  MarkAreaComponent } from 'echarts/components';


use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  MarkAreaComponent,
  LineChart,
  CanvasRenderer,
])

export default {
  name: "MatchResultLineChart",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "250px"
    },
    data: {
      type: Object,
      require: true
    }
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
      let visualMapPiece = this.data.x_axis.data.filter(t => t).map(
          (t, idx) => this.data.unexpected_pos.indexOf(t) === -1
              ? {
                gte: idx,
                lt: idx + 1,
                color: '#5F48C5',
              }
              : {
                gte: idx,
                lt: idx + 1,
                color: '#fa7c6b',
              }
      )
      return {
        title: {
          // text: 'Distribution of Electricity',
          // subtext: 'Fake Data'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          itemStyle: {
            borderType:'dash'
          }
          ,
          data: [
            { name:  this.data.series.name,
              lineStyle: {
                type: 'solid'
              },
              itemStyle: {
                borderType: 'inherit'
              }
            },
          ],
          left: 0,
        },

        toolbox: {
          show: true,

        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: this.data.x_axis.name,
          nameLocation: 'middle',
          nameGap: 30,
          data: this.data.x_axis.data,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          },
          axisPointer: {
            snap: true
          },
          name: this.data.y_axis.name,
          nameTextStyle: 'verticalAlign',
          nameLocation: 'end',
          nameGap: 10,
          padding: [ 0, 0, 0, 5]
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: visualMapPiece
        },
        series: [
          {
            name: this.data.series.name,
            type: 'line',
            smooth: false,
            data:  this.data.series.data,
          },
        ]
      }
    }
  },
  mounted() {
    // console.log(">>>DataGraph", this.data)
  }
}
</script>

<style scoped>

</style>

