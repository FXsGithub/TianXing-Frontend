<script setup>

import {onMounted} from "vue";
import { reactive } from "vue";
import {ref} from "vue";
import * as echarts from 'echarts';
import {nextTick} from "vue";
//import { configProviderContextKey } from "element-plus";
import axios from 'axios';
import VChart from 'vue-echarts';

const selectedNAOI = ref(true)
const selectedSLP = ref(false)

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const selectedYear = ref('');
const selectedMonth = ref('');
const selectedDay = ref('');

selectedYear.value = year;
selectedMonth.value = month;
selectedDay.value = currentDate;

const NAOIChartTitle = ref('')
const SLPChartTitle = ref('')
NAOIChartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 NAOI指数预测结果`
SLPChartTitle.value = `${selectedDay.value.getFullYear()}年${selectedDay.value.getMonth()}月${selectedDay.value.getDay()}日 北大西洋SLP预测结果`;

const months = {'01': '一月', '02': '二月', '03': '三月', '04': '四月', '05': '五月', '06': '六月', '07': '七月', '08': '八月', '09': '九月', '10': '十月', '11': '十一月', '12': '十二月'}

const NAOIOption = ref({})
const SLPOption = ref({})
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
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value',
  },
  legend: { //图例
    data: ['观测值', 'ECCC', 'ECMWF', 'NAO-MCR'],
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
      name: 'ECCC',
      type: 'line',
      data: []
    },
    {
      name: 'ECMWF',
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

SLPOption.value = {

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
  NAOIChartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 NAOI指数预测结果`;

  const params = {
    year: selectedYear.value,
    month: selectedMonth.value
  };

  axios.get('/nao/predictionResult/NAOI', { params })
    .then(response => {
      //console.log(response.data);
      NAOIOption.value = {
        title: {
          text: NAOIChartTitle.value,
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
          data: ['观测值', 'ECCC', 'ECMWF', 'NAO-MCR'],
          orient: 'horizontal',
          left: 'center',
          bottom: '5',
        },
        series: [
          {
            name: '观测值',
            type: 'line',
            data: response.data.observations,
          },
          {
            name: 'ECCC',
            type: 'line',
            data: response.data.eccc,
          },
          {
            name: 'ECMWF',
            type: 'line',
            data: response.data.ecmwf,
          },
          {
            name: 'NAO-MCR',
            type: 'line',
            data: response.data.naomcr
          },
        ]
      }
      NAOIDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

// 请求SLP数据
const updateSLPChart = async () => {
  SLPChartTitle.value = `${selectedYear.value}年${selectedMonth.value}月 北大西洋SLP预测结果`;
  const params = {
    year: selectedYear.value,
    month: selectedMonth.value
  };
  //console.log(params.year + '-' + params.month + '-' + params.day)
  axios.get('/nao/predictionResult/SLP', { params })
    .then(response => {
      //此处应该得到一张图片
      SLPDescription.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });
}

function monthArray() {
  const index = Object.keys(months).indexOf(selectedMonth.value);
  const keys = Object.keys(months);
  return keys.slice(index).map(key => months[key]).concat(keys.slice(0, index).map(key => months[key])).slice(0, 6);
}

onMounted(
  () => {
    nextTick(() => {
      updateNAOIChart();
    })
  }
)
</script>

<template>
  <div class="pageContent">
    <h1 v-show="selectedNAOI" class="title">
      {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 NAO预测结果
    </h1>
    <h1 v-show="selectedSLP" class="title">
      {{ selectedYear }}年{{ selectedMonth }}月 北大西洋SLP预测结果
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateNAOIChart" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateNAOIChart" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
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
    height: 400px; /* 可根据需要调整容器高度 */
  }

  .image {
    height: 100%;
  }
</style>