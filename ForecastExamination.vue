<script setup>

import {onMounted} from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
import { configProviderContextKey } from "element-plus";
import VueECharts from 'vue-echarts'

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''


const SICChartErroPrediction = 'SIC日预测误差'
const SICChartErroAdd = 'SIC误差统计'
const SIEChartErroAnalyse = 'SIE误差分析'

const selectedYear = ref('');
const selectedMonth = ref('');

selectedYear.value = year;
selectedMonth.value = month;

let myChart;
let myChart2;
let myChart3;


const chartTitle = ref('')
chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`

const chartTitle2 = ref('')
chartTitle2.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`

const chartTitle3 = ref('')
chartTitle3.value = `${selectedYear.value}年~${Number(selectedYear.value) + 1 + ''}年 SIC汇报结果误差箱型图`

function updateChartTitle() {
  chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
  chartTitle2.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
  chartTitle3.value = `${selectedYear.value}年~${Number(selectedYear.value) + 1 + ''}年 SIC汇报结果误差箱型图`;

  myChart.setOption({
    title: {
      text: chartTitle.value,
      left: 'center' //标题水平居中
    },
  });

  myChart2.setOption({
    title: {
      text: chartTitle2.value,
      left: 'center' //标题水平居中
    },
  });

  myChart3.setOption({
    title: {
      text: chartTitle3.value,
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
          },
          yAxis: {
            type: 'value',
            name: 'RMSE(%)',
            data: [10, 12, 14, 16, 18]
          },
          legend: { //图例
            data: ['ours', 'persistence'],
            orient: 'horizontal',
            left: 'center',
            bottom: '5',
          },
          series: [
            {
              name: 'ours',
              type: 'line',
              data: [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            },
            {
              name: 'persistence',
              type: 'line',
              data: [2, 2, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            },
            
          ]
        });

        myChart2 = echarts.init(document.getElementById('SICChart2'));
        myChart2.setOption({
          title: {
            text: chartTitle2.value,
            left: 'center' //标题水平居中
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            name: '时间',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
          },
          yAxis: {
            type: 'value',
            name: 'RMSE(%)',
            data: [10, 12, 14, 16, 18]
          },
          legend: { //图例
            data: ['ours', 'persistence'],
            orient: 'horizontal',
            left: 'center',
            bottom: '5',
          },
          series: [
            {
              name: 'ours',
              type: 'line',
              data: [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            },
            {
              name: 'persistence',
              type: 'line',
              data: [2, 2, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            },
            
          ]
        });

        
        myChart3 = echarts.init(document.getElementById('SICChart3'));
        myChart3.setOption({
          title: {
            text: chartTitle3.value,
            left: 'center' //标题水平居中
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            name: '时间',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
          },
          yAxis: {
            type: 'value',
            name: 'RMSE(%)',
            data: [10, 12, 14, 16, 18]
          },
          legend: { //图例
            data: ['ours', 'persistence'],
            orient: 'horizontal',
            left: 'center',
            bottom: '5',
          },
          series: [
            {
              name: 'ours',
              type: 'line',
              data: [10, 10, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1]
            },
            {
              name: 'persistence',
              type: 'line',
              data: [2, 2, 12, 2, 2, 2, 12, 2, 2, 2, 2, 2]
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
      {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 海冰预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>    
    <el-tabs type="border-card">
      <el-tab-pane label="SIC日预测误差">
        <div class="chart" id="SICChart"></div>
        <div class="chart2" id="SICChart2"></div>        
        <div class="description">
          {{ SICChartErroPrediction }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIC误差统计">
        <div class="chart3" id="SICChart3"></div>
        <div class="description">
          {{ SICChartErroAdd }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIE误差分析">        
        <div class="description">
          {{ SIEChartErroAnalyse }}
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

  .chart2 {
    height: 500px;
  }

  .chart3 {
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
