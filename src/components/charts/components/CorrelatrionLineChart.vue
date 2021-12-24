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
import { UniversalTransition } from 'echarts/features';
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent
} from 'echarts/components';

use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

export default {
  name: "correlationLineChart",
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

  computed: {
    options () {
      return {
        title: {
          text: '',
          // subtext: '首帧耗时',
          // left: 30
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          left: 0
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: this.data.xTitle,
          nameLocation: 'middle',
          nameGap: 30,
          data: this.data.xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            snap: true
          },
          name: this.data.yTitle,
          nameTextStyle: 'verticalAlign',
          nameLocation: 'end',
          nameGap: 10,
          padding: [ 0, 0, 0, 5]
        },
        visualMap: {
          show: false,
          type: 'piecewise',
          dimension: 0,
          seriesIndex: 1,
          pieces: this.data.visualMapPieces
        },
        series: [
          {
            name: this.data.series[0].name,
            type: this.data.series[0].type,
            data: this.data.series[0].data,
            color: this.data.series[0].color,
          },
          {
            name: this.data.series[1].name,
            type: this.data.series[1].type,
            data: this.data.series[1].data,
            color: this.data.series[1].color,
            markPoint: {
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: {
                color: this.data.markPoint.color
              },
              data: this.data.markPoint.data
            },
            markLine: {
              lineStyle: {
                color: '#5F48C5'
              },
              data: [{ yAxis: this.data.range.average, name: this.data.range.name }],
              tooltip: {
                trigger: 'item',
                borderColor: '#ffffff',
                formatter: this.data.range.name + "均值:" + this.data.range.average +
                    "</br>区间:[" + this.data.range.min + "," + this.data.range.max + "]"
              },
            },
            markArea: {
              silent: true,
              itemStyle: {
                color: '#f5f5f5'
              },
              data: [
                [
                  {
                    name: '',
                    yAxis: this.data.range.min
                  },
                  {
                    name: '',
                    yAxis: this.data.range.max
                  }
                ]
              ]
            }
          },
        ]
      };
    }
  },
  mounted() {
  }
}
</script>


<style scoped>

</style>

