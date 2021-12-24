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
      required: true,
    }
  },
  mounted() {
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
      return {
        title: {
          // text: 'Distribution of Electricity',
          // subtext: 'Fake Data'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          left: 0,
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: this.data.xTitle,
          nameLocation: 'middle',
          nameGap: 30,
          data: this.data.xAxis,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} '
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
        series: this.data.series,
      }
    }
  }
}
</script>

<style scoped>

</style>

