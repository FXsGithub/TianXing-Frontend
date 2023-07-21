<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
import { nextTick } from "vue";

onMounted(() => {
  nextTick(() => {
    let myChart = echarts.init(document.getElementById("chart1"));
    myChart.setOption({
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["2022年2月", "2022年3月", "2022年2月", "Direct", "Search Engine"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "2022年2月",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
  });
});
</script>

<template>
  <div class="pageContent">
    <h1>2023年7月21日ENSO预报结果</h1>
    <el-tabs type="border-card">
      <el-tab-pane label="指数预测">
        <p>内容1</p>
        <p>测试内容</p>
        <div class="chart" id="chart1"></div>
      </el-tab-pane>
      <el-tab-pane label="模态预测">
        <p>内容2</p>
      </el-tab-pane>
    </el-tabs>
    <div id="echarts-demo"></div>
    <div id="echarts-demo"></div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  height: 200px;
}
</style>
