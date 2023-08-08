<script setup>

import {onMounted} from "vue";
import { reactive } from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
import axios from 'axios';
import VChart from 'vue-echarts';

const selectedNAOI = ref(true)
const selectedSLP = ref(false)

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const selectedYear = ref('');
const selectedMonth = ref('');

let NAOIStartYear = 0;
let NAOIStartMonth = 0;
let NAOIEndYear = 0;
let NAOIEndMonth = 0;

selectedYear.value = year;
selectedMonth.value = month;

const NAOIChartTitle = ref('')
const SLPChartTitle = ref('')
NAOIChartTitle.value = updateNAOIChartTitle();
SLPChartTitle.value = selectedYear + '年' + selectedMonth + '月 北大西洋SLP预测结果';

const NAOIOption = ref({})
const NAOIDescription = ref('')
const SLPDescription = ref('')

NAOIOption.value = {
  title: {
    text: NAOIChartTitle.value,
    left: 'center'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    name: '时间',
    data: ['一月', '二月', '三月', '四月', '五月', '六月']
  },
  yAxis: {
    type: 'value',
  },
  legend: {
    data: ['观测值', 'NAO-MCR'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: '观测值',
      type: 'line',
      data: []
    },
    {
      name: 'NAO-MCR',
      type: 'line',
      data: []
    },
  ]
}

function selectChart(tab) {
  if(tab.index == 0) {
    selectedNAOI.value = true;
    selectedSLP.value = false;
    updateNAOIChart();
  }
  else {
    selectedNAOI.value = false;
    selectedSLP.value = true;
    updateSLPChart();
  }
}

// 请求NAOI数据
const updateNAOIChart = async () => {
  updateNAOIChartTitle();

  const params = {
    year: Number(selectedYear.value),
    month: Number(selectedMonth.value)
  };

  axios.get('http://www.tjensoprediction.com:8080/nao/predictionResult/nao', { params })
  //axios.get('/nao/predictionResult/nao', { params })
    .then(response => {
      //console.log(response.data);
      NAOIOption.value = response.data.option;
      NAOIDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

function updateNAOIChartTitle() {
  let year1 = selectedYear.value;
  let month1 = selectedMonth.value;
  let year2 = ''
  let month2 = ''

  if(Number(month1) > 7) {
    month2 = Number(month1) - 7 + '';
    year2 = Number(year1) + 1 + '';
  }
  else {
    month2 = Number(month1) + 5 + '';
    year2 = year1;
  }
  if(month2.length == 1) {
    month2 = '0' + month2;
  }
  NAOIChartTitle.value = year1 + '年' + month1 + '月~' + year2 + '年' + month2 + '月 NAO预测结果';
}

// 请求SLP数据
const updateSLPChart = async () => {
  SLPChartTitle.value = `${selectedYear.value}年${selectedMonth.value}月 北大西洋SLP预测结果`;
  const params = {
    year: selectedYear.value,
    month: selectedMonth.value
  };
  //console.log(params.year + '-' + params.month + '-' + params.day)
  axios.get('http://www.tjensoprediction.com:8080/nao/predictionResult/SLP', { params })
    .then(response => {
      //此处应该得到一张图片
      SLPDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

function updateCharts() {
  if(selectedNAOI.value == true) {
    updateNAOIChart();
  }
  else {
    updateSLPChart();
  }
}

// 初始化NAOI图表
const initNAOIChart = () => {
  axios.get('http://www.tjensoprediction.com:8080/nao/initialize/naoPrediction')
    .then(response => {
      console.log(response.data)
      NAOIStartYear = response.data.start_year;
      NAOIStartMonth = response.data.start_month;
      NAOIEndYear = response.data.end_year;
      NAOIEndMonth = response.data.end_month;

      selectedYear.value = NAOIEndYear;
      selectedMonth.value = NAOIEndMonth.toString().padStart(2, '0');

      NAOIOption.value = response.data.option;
      NAOIDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

function disabledYear(date) {
  const year = date.getFullYear();
  if(year < NAOIStartYear || year > NAOIEndYear)
    return true;
  else
    return false;
}

function disabledMonth(date) {
  const month = date.getMonth() + 1;
  if(selectedYear.value == NAOIStartYear && month < NAOIStartMonth)
    return true;
  else if(selectedYear.value == NAOIEndYear && month > NAOIEndMonth)
    return true;
  else
    return false;
}

onMounted(
  () => {
    initNAOIChart();
  }
)
</script>

<template>
  <div class="pageContent">
    <h1 v-show="selectedNAOI" class="title">
      {{ NAOIChartTitle }}
    </h1>
    <h1 v-show="selectedSLP" class="title">
      {{ selectedYear }}年{{ selectedMonth }}月 北大西洋SLP预测结果
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateCharts" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px" :disabled-date="disabledYear" />
      <div class="text">年</div>
      <el-date-picker @change="updateCharts" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px" :disabled-date="disabledMonth" />
      <div class="text">月</div>
    </div>
    <el-tabs type="border-card" @tab-click="selectChart" :stretch="true">
      <el-tab-pane label="指数预测">
        <v-chart class="NAOIChart" :option="NAOIOption" autoresize />
        <div class="description">
          {{ NAOIDescription }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="模态预测">
        <h3 style="text-align: center; margin-top: 0px">{{ SLPChartTitle }}</h3>
        <div class="imageContainer">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
        </div>
        <p style="text-align: center">图片接口尚未完成</p>
        <div class="description">
          {{ SLPDescription }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
  .title {
    text-align: center
  }
  .NAOIChart {
    height: 500px;
  }

  .SLPChart {
    margin: 0 auto;
    height: 480px;
    width: 500px
  }

  .description {
    margin-top: 20px;
    font-size: 16px;
    text-align: center;
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

  .imageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .image {
    height: 100%;
  }
</style>