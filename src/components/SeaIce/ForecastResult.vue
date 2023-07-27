<script setup>

import {onMounted} from "vue";
import { reactive } from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
import { configProviderContextKey } from "element-plus";

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const selectedYear = ref('');
const selectedMonth = ref('');

selectedYear.value = year;
selectedMonth.value = month;

let myChart;

const chartTitle = ref('')
chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 SIE指数预测结果`

const months = {
  '01': '一月',
  '02': '二月',
  '03': '三月',
  '04': '四月',
  '05': '五月',
  '06': '六月',
  '07': '七月',
  '08': '八月',
  '09': '九月',
  '10': '十月',
  '11': '十一月',
  '12': '十二月'
}

const SIEData = reactive({
  prediction: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  mean: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  upper: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  lower: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  description : ''
});

const SICData = reactive({
  SICChartDescription : '此处为SIC模态描述内容'
});

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
              data: SIEData.prediction
            },
            {
              name: 'mean',
              type: 'line',
              data: SIEData.mean
            },
            {
              name: 'upper',
              type: 'line',
              data: SIEData.upper
            },
            {
              name: 'lower',
              type: 'line',
              data: SIEData.lower
            },
          ]
        });

      })
    }
)

// 请求SIE数据
const updateChart = async () => {
  chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 SIE指数预测结果`;

  try {
    const requestData = {
      year: selectedYear.value,
      month: selectedMonth.value
    };

    // const response = await axios.post('api/SeaIce/SIE', requestData);

    // SIEData.prediction = response.data.prediction;
    // SIEData.mean = response.data.mean;
    // SIEData.upper = response.data.upper;
    // SIEData.lower = response.data.lower;
    // SIEData.description = response.data.description;

    // 测试数据
    SIEData.prediction = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    SIEData.mean = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    SIEData.upper = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    SIEData.lower = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    SIEData.description = '此处为SIE指数描述内容';

    myChart.setOption({
      xAxis: {
        data: monthArray()
      },
      title: {
        text: chartTitle.value,
        left: 'center' //标题水平居中
      },
      series: [
        {
          name: 'prediction',
          type: 'line',
          data: SIEData.prediction
        },
        {
          name: 'mean',
          type: 'line',
          data: SIEData.mean
        },
        {
          name: 'upper',
          type: 'line',
          data: SIEData.upper
        },
        {
          name: 'lower',
          type: 'line',
          data: SIEData.lower
        },
      ]
    });

  } catch (error) {
    console.error(error);
  }
}

function monthArray() {
  const index = Object.keys(months).indexOf(selectedMonth.value);
  const keys = Object.keys(months);
  return keys.slice(index).map(key => months[key]).concat(keys.slice(0, index).map(key => months[key]));
}
</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 海冰预测结果
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChart" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChart" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>    
    <el-tabs type="border-card" stretch="true">
      <el-tab-pane label="SIE指数">
        <div class="chart" id="SICChart"></div>
        <div class="description">
          {{ SIEData.description }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIC模态">
        <div class="description">
          {{ SICData.description }}
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