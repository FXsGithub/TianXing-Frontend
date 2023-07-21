<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
import { nextTick } from "vue";

onMounted(() => {
  nextTick(() => {
    let myChart = echarts.init(document.getElementById("chart1"));
    myChart.setOption({
      title: {
        text: "预报结果逐月对比",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          "2022年2月",
          "2022年3月",
          "2022年4月",
          "2022年5月",
          "气候中心Nino3.4指数记录",
        ],
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
        data: [
          "Feb-22",
          "Mar-22",
          "Apr-22",
          "May-22",
          "Jun-22",
          "Jul-22",
          "Aug-22",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "2022年2月",
          type: "line",
          stack: "Total",
          lineStyle: {
            type: "dashed", // 将线条类型改为虚线
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "2022年3月",
          type: "line",
          stack: "Total",
          lineStyle: {
            type: "dashed", // 将线条类型改为虚线
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "2022年4月",
          type: "line",
          stack: "Total",
          lineStyle: {
            type: "dashed", // 将线条类型改为虚线
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "2022年5月",
          type: "line",
          stack: "Total",
          lineStyle: {
            type: "dashed", // 将线条类型改为虚线
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "气候中心Nino3.4指数记录",
          type: "line",
          stack: "Total",
          lineStyle: {
            color: "black", // 将颜色改为红色（你可以使用任何CSS颜色值）
            width: 4, // 将线条宽度改为3
            // 根据需求添加更多样式属性
          },
          itemStyle: {
            // 添加itemStyle属性来自定义节点样式
            color: "black", // 将节点颜色改为黑色
          },
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
      <el-tab-pane label="逐月比对">
        <p>内容1</p>
        <p>测试内容</p>
        <div class="chart" id="chart1"></div>
      </el-tab-pane>
      <el-tab-pane label="预报误差">
        <p>内容2</p>
      </el-tab-pane>
      <el-tab-pane label="误差分析">
        <p>内容3</p>
      </el-tab-pane>
      <el-tab-pane label="相关系数">
        <p>内容4</p>
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
