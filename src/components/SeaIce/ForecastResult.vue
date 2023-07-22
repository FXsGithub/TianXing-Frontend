<script setup>

import {onMounted} from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
import { configProviderContextKey } from "element-plus";

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''


const SIEChartDescription = '此处为SIE指数描述内容'
const SICChartDescription = '此处为SIC模态描述内容'

const selectedYear = ref('');
const selectedMonth = ref('');

selectedYear.value = year;
selectedMonth.value = month;

let myChart;

const chartTitle = ref('')
chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 SIE指数预测结果`

function updateChartTitle() {
  chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 SIE指数预测结果`;
  myChart.setOption({
    title: {
      text: chartTitle.value,
      left: 'center' //标题水平居中
    },
  });
}

onMounted(
    ()=>{
      nextTick(() => {
        myChart = echarts.init(document.getElementById('SICChart'));
        myChart.setOption({
          title: {
            text: chartTitle.value,
            left: 'center' //标题水平居中
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            name: '时间',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            type: 'value',
          },
          legend: { //图例
            data: ['prediction', 'mean', 'upper', 'lower'],
            orient: 'horizontal',
            left: 'center',
            bottom: '5',
          },
          series: [
            {
              name: 'prediction',
              type: 'line',
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            },
            {
              name: 'mean',
              type: 'line',
              data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            },
            {
              name: 'upper',
              type: 'line',
              data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            },
            {
              name: 'lower',
              type: 'line',
              data: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            },
          ]
        });

      })
    }
)

</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 海冰预测结果
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>    
    <el-tabs type="border-card">
      <el-tab-pane label="SIE指数">
        <div class="chart" id="SICChart"></div>
        <div class="description">
          {{ SIEChartDescription }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIC模态">
        <div class="description">
          {{ SICChartDescription }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
  .title {
    text-align: center
  }
  .chart {
    height: 500px;
  }

  .description {
    font-size: 16px,
  }

  .datePickerContainer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .text {
    margin-left: 5px;
    margin-right: 10px;
  }
</style>