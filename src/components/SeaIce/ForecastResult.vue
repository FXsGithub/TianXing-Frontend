<script setup>

import {onMounted} from "vue";
import { reactive } from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
import axios from 'axios';
import VChart from 'vue-echarts';

const availableList = ref([])

const selectedSIE = ref(true)
const selectedSIC = ref(false)

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const selectedYear = ref('');
const selectedMonth = ref('');
const selectedDay = ref('');

selectedYear.value = '2023';
selectedMonth.value = '01';
selectedDay.value = currentDate;

const SIEChartTitle = ref('')
const SICChartTitle = ref('')
SIEChartTitle.value = updateSIEChartTitle();
SICChartTitle.value = `${selectedDay.value.getFullYear()}年${selectedDay.value.getMonth()}月${selectedDay.value.getDay()}日 海冰SIC预测结果`;

const SIEOption = ref({})

const SIEDescription = ref('')
const SICDescription = ref('')

SIEOption.value = {
  title: {
    text: SIEChartTitle.value,
    left: 'center'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    name: '时间',
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },
  yAxis: {
    type: 'value',
  },
  legend: {
    data: ['prediction', 'mean', 'upper', 'lower'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: 'prediction',
      type: 'line',
      data: []
    },
    {
      name: 'mean',
      type: 'line',
      data: []
    },
    {
      name: 'upper',
      type: 'line',
      data: []
    },
    {
      name: 'lower',
      type: 'line',
      data: []
    },
  ]
}

function selectChart(tab) {
  if(tab.index == 0) {
    selectedSIE.value = true;
    selectedSIC.value = false;
    updateSIEChart();
  }
  else {
    selectedSIE.value = false;
    selectedSIC.value = true;
    updateSICChart();
  }
}

// 请求SIE数据
const updateSIEChart = async () => {
  updateSIEChartTitle();

  const params = {
    year: Number(selectedYear.value),
    month: Number(selectedMonth.value)
  };

//  axios.get('http://www.tjensoprediction.com:8080/seaice/predictionResult/SIE', { params })
  axios.get('/seaice/predictionResult/SIE', { params })
    .then(response => {
      //console.log(response.data);
      SIEOption.value = response.data.option;
      SIEDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

function updateSIEChartTitle() {
  let year1 = selectedYear.value;
  let month1 = selectedMonth.value;
  let year2 = ''
  let month2 = ''

  if(Number(month1) == 1) {
    month2 = '12';
    year2 = year1;
  }
  else {
    month2 = Number(month1) - 1 + '';
    year2 = Number(year1) + 1 + '';
  }
  if(month2.length == 1) {
    month2 = '0' + month2;
  }
  SIEChartTitle.value = year1 + '年' + month1 + '月~' + year2 + '年' + month2 + '月 海冰预测结果';
}

function handleYearChange() {
  for (let i = 0; i < availableList.value.length; i++) {
    if (selectedYear.value == availableList.value[i].year && selectedMonth.value == availableList.value[i].month) {
      updateSIEChart();
      return;
    }
  }
  for (let i = 0; i < availableList.value.length; i++) {
    if (selectedYear.value == availableList.value[i].year) {
      selectedMonth.value = availableList.value[i].month < 10 ? '0' + (availableList.value[i].month + '') : availableList.value[i].month + ''
      updateSIEChart();
      return;
    }
  }
}

// 请求SIC数据
const updateSICChart = async () => {
  SICChartTitle.value = `${selectedDay.value.getFullYear()}年${selectedDay.value.getMonth() + 1}月${selectedDay.value.getDate()}日 海冰SIC预测结果`;
  const params = {
    year: selectedDay.value.getFullYear(),
    month: selectedDay.value.getMonth() + 1,
    day: selectedDay.value.getDate()
  };
  //console.log(params.year + '-' + params.month + '-' + params.day)
//  axios.get('http://www.tjensoprediction.com:8080/seaice/predictionResult/SIC', { params })
  axios.get('/seaice/predictionResult/SIC', { params })
    .then(response => {
      //此处应该得到一张图片
      SICDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

// 初始化可请求的年月
const initAvailableList = () => {
  const params = {
    year: 2023,
    month: 1
  };
  
  axios.get('/seaice/predictionResult/SIE', { params })
    .then(response => {
      availableList.value = response.data.availableList
    })
    .catch(error => {
      console.error(error);
    });
}

function disabledYear(date) {
  const year = date.getFullYear();
  for (let i = 0; i < availableList.value.length; i++) {
    if (year == availableList.value[i].year) {
      return false;
    }
  }
  return true;
}

function disabledMonth(date) {
  const month = date.getMonth() + 1;
  for (let i = 0; i < availableList.value.length; i++) {
    if (selectedYear.value == availableList.value[i].year && month == availableList.value[i].month) {
      return false;
    }
  }
  return true;
}

onMounted(
  () => {
    initAvailableList();
    nextTick(() => {
      updateSIEChart();
    })
  }
)
</script>

<template>
  <div class="pageContent">
    <h1 v-show="selectedSIE" class="title">
      {{ SIEChartTitle }}
    </h1>
    <h1 v-show="selectedSIC" class="title">
      {{ selectedDay.getFullYear() }}年{{ selectedDay.getMonth() + 1 }}月 海冰预测结果
    </h1>
    <div class="datePickerContainer" v-show="selectedSIE">
      <el-date-picker @change="handleYearChange" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px" :disabled-date="disabledYear" />
      <div class="text">年</div>
      <el-date-picker @change="updateSIEChart" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px" :disabled-date="disabledMonth" />
      <div class="text">月</div>
    </div>
    <div class="datePickerContainer" v-show="selectedSIC">
      <el-date-picker @change="updateSICChart" v-model="selectedDay" :clearable="false" style="width: 115px; height: 25px"/>
    </div>
    <el-tabs type="border-card" @tab-click="selectChart" :stretch="true">
      <el-tab-pane label="SIE指数">
        <v-chart class="SIEChart" :option="SIEOption" autoresize />
        <div class="description">
          {{ SIEDescription }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIC模态">
        <h3 style="text-align: center; margin-top: 0px; font-size: 18px">{{ SICChartTitle }}</h3>
        <div class="imageContainer">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
        </div>
        <p style="text-align: center">图片接口尚未完成</p>
        <div class="description">
          {{ SICDescription }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
  .title {
    text-align: center
  }
  .SIEChart {
    height: 500px;
  }

  .SICChart {
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
    height: 400px; /* 可根据需要调整容器高度 */
  }

  .image {
    height: 100%;
  }
</style>