<script setup>


import {onMounted} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";

onMounted(
    ()=>{
      nextTick(() => {
        let myChart = echarts.init(document.getElementById('chart1'));
        myChart.setOption({
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        });

      })
    }
)

</script>

<template>
  <div class="pageContent">
    <h1>
      ENSO预报结果
    </h1>
    <el-tabs type="border-card">
      <el-tab-pane label="内容1">
        <p>内容1</p>
        <p>测试内容</p>
        <div class="chart" id="chart1"></div>
      </el-tab-pane>
      <el-tab-pane label="内容2">
        <p>内容2</p>
      </el-tab-pane>
      <el-tab-pane label="内容3">
        <p>内容3</p>
      </el-tab-pane>
      <el-tab-pane label="内容4">
        <p>内容4</p>
      </el-tab-pane>
    </el-tabs>
    <div id="echarts-demo">
    </div>
  </div>
</template>

<style scoped lang="scss">
  .chart{
    height: 200px;
  }
</style>