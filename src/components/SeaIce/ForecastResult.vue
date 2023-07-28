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

SICOption.value = {
  title: {
    text: SICChartTitle.value,
    left: 'center'
  },
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 1,
    top: 'middle',
    left: 'right',
    calculable: false,
    handleIcon: 'none',
    itemHeight: 200,
    text: ['1', '0'],
    hoverLink: false,
    inRange: {
      color: ['#1F5FA0', '#3F88BD', '#67A9CF', '#9DCDE3', '#D1E5F0', '#EEE2E3', '#FDDBC7', '#F8B993', '#EF8961', '#DC5C45', '#B41B2C']
    },
    left: 450
  },
  polar: {
    center: [231, 240],
    radius: 180
  },
  angleAxis: {
    type: 'category',
    data: ['180°', '120°E', '60°E', '0°', '60°W', '120°W'],
    startAngle: 120,
    interval: 30,
    zlevel: 100
  },
  radiusAxis: {
    show: false
  },
  xAxis: {
    type: 'category',
    data: ['-100', '-99', '-98', '-97', '-96', '-95', '-94', '-93', '-92', '-91', '-90', '-89', '-88', '-87', '-86', '-85', '-84', '-83', '-82', '-81', '-80', '-79', '-78', '-77', '-76', '-75', '-74', '-73', '-72', '-71', '-70', '-69', '-68', '-67', '-66', '-65', '-64', '-63', '-62', '-61', '-60', '-59', '-58', '-57', '-56', '-55', '-54', '-53', '-52', '-51', '-50', '-49', '-48', '-47', '-46', '-45', '-44', '-43', '-42', '-41', '-40', '-39', '-38', '-37', '-36', '-35', '-34', '-33', '-32', '-31', '-30', '-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
    //show: false  //隐藏x轴
  },
  yAxis: {
    type: 'category',
    data: ['-100', '-99', '-98', '-97', '-96', '-95', '-94', '-93', '-92', '-91', '-90', '-89', '-88', '-87', '-86', '-85', '-84', '-83', '-82', '-81', '-80', '-79', '-78', '-77', '-76', '-75', '-74', '-73', '-72', '-71', '-70', '-69', '-68', '-67', '-66', '-65', '-64', '-63', '-62', '-61', '-60', '-59', '-58', '-57', '-56', '-55', '-54', '-53', '-52', '-51', '-50', '-49', '-48', '-47', '-46', '-45', '-44', '-43', '-42', '-41', '-40', '-39', '-38', '-37', '-36', '-35', '-34', '-33', '-32', '-31', '-30', '-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
    //show: false  //隐藏y轴
  },
  series: [
    {
      name: 'Sea Ice Concentration',
      type: 'heatmap',
      data: [],
      tooltip: {
        show: false
      }
    },
  ],
  grid: {
    width: '72%',
    height: '75%'
  },
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
      //console.log(response.data);
      SICOption.value = {
        title: {
          text: SICChartTitle.value,
          left: 'center'
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: 1,
          top: 'middle',
          left: 'right',
          calculable: false,
          handleIcon: 'none',
          itemHeight: 200,
          text: ['1', '0'],
          hoverLink: false,
          inRange: {
            color: ['#1F5FA0', '#3F88BD', '#67A9CF', '#9DCDE3', '#D1E5F0', '#EEE2E3', '#FDDBC7', '#F8B993', '#EF8961', '#DC5C45', '#B41B2C']
          },
          left: 450
        },
        polar: {
          center: [231, 240],
          radius: 180
        },
        angleAxis: {
          type: 'category',
          data: ['180°', '120°E', '60°E', '0°', '60°W', '120°W'],
          startAngle: 120,
          interval: 30,
          zlevel: 100
        },
        radiusAxis: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: ['-100', '-99', '-98', '-97', '-96', '-95', '-94', '-93', '-92', '-91', '-90', '-89', '-88', '-87', '-86', '-85', '-84', '-83', '-82', '-81', '-80', '-79', '-78', '-77', '-76', '-75', '-74', '-73', '-72', '-71', '-70', '-69', '-68', '-67', '-66', '-65', '-64', '-63', '-62', '-61', '-60', '-59', '-58', '-57', '-56', '-55', '-54', '-53', '-52', '-51', '-50', '-49', '-48', '-47', '-46', '-45', '-44', '-43', '-42', '-41', '-40', '-39', '-38', '-37', '-36', '-35', '-34', '-33', '-32', '-31', '-30', '-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
          //show: false  //隐藏x轴
        },
        yAxis: {
          type: 'category',
          data: ['-100', '-99', '-98', '-97', '-96', '-95', '-94', '-93', '-92', '-91', '-90', '-89', '-88', '-87', '-86', '-85', '-84', '-83', '-82', '-81', '-80', '-79', '-78', '-77', '-76', '-75', '-74', '-73', '-72', '-71', '-70', '-69', '-68', '-67', '-66', '-65', '-64', '-63', '-62', '-61', '-60', '-59', '-58', '-57', '-56', '-55', '-54', '-53', '-52', '-51', '-50', '-49', '-48', '-47', '-46', '-45', '-44', '-43', '-42', '-41', '-40', '-39', '-38', '-37', '-36', '-35', '-34', '-33', '-32', '-31', '-30', '-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
          //show: false  //隐藏y轴
        },
        series: [
          {
            name: 'Sea Ice Concentration',
            type: 'heatmap',
            data: response.data.data,
            tooltip: {
              show: false
            }
          },
        ],
        grid: {
          width: '72%',
          height: '75%'
        },
        
      }
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
        <v-chart class="SICChart" :option="SICOption" autoresize />
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