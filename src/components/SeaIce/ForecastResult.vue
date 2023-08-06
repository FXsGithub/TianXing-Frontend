<script setup>

import {onMounted} from "vue";
import { reactive } from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
//import { configProviderContextKey } from "element-plus";
import axios from 'axios';
import VChart from 'vue-echarts';

const selectedSIE = ref(true)
const selectedSIC = ref(false)

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const selectedYear = ref('');
const selectedMonth = ref('');
const selectedDay = ref('');

selectedYear.value = year;
selectedMonth.value = month;
selectedDay.value = currentDate;

const SIEChartTitle = ref('')
const SICChartTitle = ref('')
SIEChartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 SIE指数预测结果`
SICChartTitle.value = `${selectedDay.value.getFullYear()}年${selectedDay.value.getMonth()}月${selectedDay.value.getDay()}日 海冰SIC预测结果`;

const months = {'01': '一月', '02': '二月', '03': '三月', '04': '四月', '05': '五月', '06': '六月', '07': '七月', '08': '八月', '09': '九月', '10': '十月', '11': '十一月', '12': '十二月'}

const SIEOption = ref({})
const SICOption = ref({})
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
  //console.log(selectedSIE);
  //console.log(selectedSIC);
}

// 请求SIE数据
const updateSIEChart = async () => {
  SIEChartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 SIE指数预测结果`;

  const params = {
    year: selectedYear.value,
    month: selectedMonth.value
  };

  axios.get('/seaice/predictionResult/SIE', { params })
    .then(response => {
      //console.log(response.data);
      SIEOption.value = {
        title: {
          text: SIEChartTitle.value,
          left: 'center' //标题水平居中
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          name: '时间',
          data: monthArray()
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
            data: response.data.prediction,
          },
          {
            name: 'mean',
            type: 'line',
            data: response.data.mean,
          },
          {
            name: 'upper',
            type: 'line',
            data: response.data.upper,
          },
          {
            name: 'lower',
            type: 'line',
            data: response.data.lower
          },
        ]
      }
      SIEDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

// 请求SIC数据
const updateSICChart = async () => {
  SICChartTitle.value = `${selectedDay.value.getFullYear()}年${selectedDay.value.getMonth() + 1}月${selectedDay.value.getDate()}日 海冰SIC预测结果`;
  const params = {
    year: selectedDay.value.getFullYear(),
    month: selectedDay.value.getMonth() < 10 ? '0' + (selectedDay.value.getMonth() + 1 + '') : selectedDay.value.getMonth() + 1 + '',
    day: selectedDay.value.getDate() < 10 ? '0' + (selectedDay.value.getDate() + '') : selectedDay.value.getDate() + ''
  };
  //console.log(params.year + '-' + params.month + '-' + params.day)
  axios.get('/seaice/predictionResult/SIC', { params })
    .then(response => {
      //此处应该得到一张图片
      SICDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

function monthArray() {
  const index = Object.keys(months).indexOf(selectedMonth.value);
  const keys = Object.keys(months);
  return keys.slice(index).map(key => months[key]).concat(keys.slice(0, index).map(key => months[key]));
}

onMounted(
  () => {
    nextTick(() => {
      updateSIEChart();
    })
  }
)
</script>

<template>
  <div class="pageContent">
    <h1 v-show="selectedSIE" class="title">
      {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 海冰预测结果
    </h1>
    <h1 v-show="selectedSIC" class="title">
      {{ selectedDay.getFullYear() }}年{{ selectedDay.getMonth() + 1 }}月 海冰预测结果
    </h1>
    <div class="datePickerContainer" v-show="selectedSIE">
      <el-date-picker @change="updateSIEChart" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateSIEChart" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
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
        <h3 style="text-align: center; margin-top: 0px">{{ SICChartTitle }}</h3>
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