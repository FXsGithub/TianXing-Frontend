<script setup>

import { ref, onMounted, defineExpose } from "vue";
import axios from 'axios';
import VChart from 'vue-echarts';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const selectedSIE = ref(true)
const selectedSIC = ref(false)

const selectedYear = ref('');
const selectedMonth = ref('');
const selectedDay = ref('');

selectedYear.value = '2023';
selectedMonth.value = '01';
selectedDay.value = new Date();

const SIEAvailableList = ref([])
const SICAvailableList = ref({
  yearList: [],
  monthList: [],
  dateList: []
})

const SIEChartTitle = ref('')
const SICChartTitle = ref('')

const SIEOption = ref({})

const SIEDescription = ref('')

const imgSrc = ref([]);
const imgIndex = ref(0);

const SIELoading = ref(false);
const SICLoading = ref(false);

function selectChart(tab) {
  if(tab.index == 0) {
    selectedSIE.value = true;
    selectedSIC.value = false;
  }
  else {
    selectedSIE.value = false;
    selectedSIC.value = true;
  }
}

// 请求SIE数据
const updateSIEChart = async () => {
  SIELoading.value = true;
  updateSIEChartTitle();
  const params = {
    year: Number(selectedYear.value),
    month: Number(selectedMonth.value)
  };
  axios.get('/seaice/predictionResult/SIE', { params })
    .then(response => {
      SIEOption.value = response.data.option;
      SIEDescription.value = response.data.description;
      SIELoading.value = false;
    })
    .catch(error => {
      console.error(error);
      SIELoading.value = false;
    });
}

// 请求SIC数据
const updateSICChart = async () => {
  SICLoading.value = true;
  updateSICChartTitle();
  const params = {
    year: selectedDay.value.getFullYear(),
    month: selectedDay.value.getMonth() + 1,
    day: selectedDay.value.getDate()
  };
  axios.get('/seaice/predictionResult/SIC', { params })
    .then(response => {
      imgSrc.value = response.data;
      imgIndex.value = 0;
      loadImg(imgSrc.value);
      SICLoading.value = false;
    })
    .catch(error => {
      console.error(error);
      SICLoading.value = false;
    });
}

// 初始化SIE可请求的年月
const initSIEAvailableList = () => {
  updateSIEChartTitle();
  SIELoading.value = true;
  const params = {
    year: 2023,
    month: 1
  };
  axios.get('/seaice/predictionResult/SIE', { params })
    .then(response => {
      SIEAvailableList.value = response.data.availableList;
      SIEOption.value = response.data.option;
      SIEDescription.value = response.data.description;
      SIELoading.value = false;
    })
    .catch(error => {
      console.error(error);
      SIELoading.value = false;
    });
}

// 初始化SIC可请求的年月
const initSICAvailableList = () => {
  updateSICChartTitle();
  SICLoading.value = true;
  axios.get('/seaice/initial/SICprediction')
    .then(response => {
      SICAvailableList.value.yearList = response.data.yearList;
      SICAvailableList.value.monthList = response.data.monthList;
      SICAvailableList.value.dateList = response.data.dateList;
      imgSrc.value = response.data.sicInitial;
      let newestYear = 0;
      let newestMonth = 0;
      let newestDate = 0;
      for(let i = 0; i < SICAvailableList.value.yearList.length; i++) {
        SICAvailableList.value.yearList[i] = Number(SICAvailableList.value.yearList[i]);
        if(newestYear < SICAvailableList.value.yearList[i]) {
          newestYear = SICAvailableList.value.yearList[i];
        }
      }
      for(let i = 0; i < SICAvailableList.value.monthList.length; i++) {
        SICAvailableList.value.monthList[i] = Number(SICAvailableList.value.monthList[i]);
        if(newestMonth < SICAvailableList.value.monthList[i]) {
          newestMonth = SICAvailableList.value.monthList[i];
        }
      }
      for(let i = 0; i < SICAvailableList.value.dateList.length; i++) {
        SICAvailableList.value.dateList[i] = Number(SICAvailableList.value.dateList[i]);
        if(newestDate < SICAvailableList.value.dateList[i]) {
          newestDate = SICAvailableList.value.dateList[i];
        }
      }
      selectedDay.value = new Date(newestYear, newestMonth - 1, newestDate);
      imgIndex.value = 0;
      loadImg(imgSrc.value);
      SICLoading.value = false;
      updateSICChartTitle();
    })
    .catch(error => {
      console.error(error);
      SICLoading.value = false;
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
    month2 = (Number(month1) - 1).toString().padStart(2, '0');
    year2 = Number(year1) + 1 + '';
  }
  SIEChartTitle.value = year1 + '年' + month1 + '月~' + year2 + '年' + month2 + '月 海冰预测结果';
  console.log(SIEChartTitle.value);
  console.log(selectedSIE.value)
}

function updateSICChartTitle() {
  SICChartTitle.value = selectedDay.value.getFullYear() + '年' + (selectedDay.value.getMonth() + 1) + '月' + selectedDay.value.getDate() + '日 海冰SIC预测结果';
}

// 选择的年份改变时，判断之前选择的月份在新的年份中是否可用，不可用则改为最早的可用月份
function handleYearChange() {
  for (let i = 0; i < SIEAvailableList.value.length; i++) {
    if (selectedYear.value == SIEAvailableList.value[i].year && selectedMonth.value == SIEAvailableList.value[i].month) {
      updateSIEChart();
      return;
    }
  }
  for (let i = 0; i < SIEAvailableList.value.length; i++) {
    if (selectedYear.value == SIEAvailableList.value[i].year) {
      selectedMonth.value = SIEAvailableList.value[i].month < 10 ? '0' + (SIEAvailableList.value[i].month + '') : SIEAvailableList.value[i].month + ''
      updateSIEChart();
      return;
    }
  }
}

function disabledYear(day) {
  const year = day.getFullYear();
  for (let i = 0; i < SIEAvailableList.value.length; i++) {
    if (year == SIEAvailableList.value[i].year) {
      return false;
    }
  }
  return true;
}

function disabledMonth(day) {
  const month = day.getMonth() + 1;
  for (let i = 0; i < SIEAvailableList.value.length; i++) {
    if (selectedYear.value == SIEAvailableList.value[i].year && month == SIEAvailableList.value[i].month) {
      return false;
    }
  }
  return true;
}

function disabledDate(day) {
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  for (let i = 0; i < SICAvailableList.value.yearList.length; i++) {
    for (let j = 0; j < SICAvailableList.value.monthList.length; j++) {
      for (let k = 0; k < SICAvailableList.value.dateList.length; k++) {
        if (year == SICAvailableList.value.yearList[i] && month == SICAvailableList.value.monthList[j] && date == SICAvailableList.value.dateList[k]) {
          return false;
        }
      }
    }
  }
  return true;
}

/* 使el-button点击后能正常失焦 Start */
const buttonLeft = ref(null);
const buttonRight = ref(null);

const changeIndex = (direction) => {
  if(direction == 'left') { // 点击了左按钮
    if(imgIndex.value == 0)
      imgIndex.value = imgSrc.value.length - 1;
    else
      imgIndex.value--;
    buttonLeft.value.$el.blur(); // 使左按钮失焦
  }
  else { // 点击了右按钮
    if(imgIndex.value == imgSrc.value.length - 1)
      imgIndex.value = 0;
    else
      imgIndex.value++;
    buttonRight.value.$el.blur(); // 使右按钮失焦
  }
};

defineExpose({
  changeIndex
});
/* 使el-button点击后能正常失焦 End */

// 图片预加载
const loadImg = (imgList) => {
  for (let i = 0; i < imgList.length; i++) {
    let img = new Image();
    let currentSrc = '';
    img.src = 'http://tianxing.tongji.edu.cn' + imgList[i];
    img.onload = function () {
      console.log('加载完毕', this.currentSrc);
    }
    img.onerror = function () {
      console.log('加载错误', this.currentSrc);
    }
  }
}

onMounted(
  () => {
    initSIEAvailableList();
    initSICAvailableList();
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
      <el-date-picker @change="updateSICChart" v-model="selectedDay" :clearable="false" style="width: 115px; height: 25px" :disabled-date="disabledDate" />
    </div>
    <el-tabs type="border-card" @tab-click="selectChart" :stretch="true">
      <el-tab-pane label="SIE指数" v-loading="SIELoading && selectedSIE">
        <v-chart class="SIEChart" :option="SIEOption" autoresize />
        <div class="description">
          {{ SIEDescription }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIC模态" v-loading="SICLoading && selectedSIC">
        <h3 style="text-align: center; margin-top: 0px; font-size: 18px">{{ SICChartTitle }}</h3>
        <h4 style="text-align: center; margin-top: 0px; font-size: 16px">({{ imgIndex + 1 }}/{{ imgSrc.length }})</h4>
        <div class="imageContainer">
          <img v-if="imgSrc.length" :src="'http://tianxing.tongji.edu.cn' + imgSrc[imgIndex]" class="image" alt="" />
        </div>
        <el-button ref="buttonLeft" type="primary" class="arrowLeft" :icon="ArrowLeft" @click="changeIndex('left')" />
        <el-button ref="buttonRight" type="primary" class="arrowRight" :icon="ArrowRight" @click="changeIndex('right')" />
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
  height: 500px;
}

.image {
  height: 100%;
}

.el-button.arrowLeft {
  position: absolute;
  top: 50%;
  left: 10%;
  width: 40px;
  height: 80px;
  transform: translateY(-50%);
}

.el-button.arrowRight {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 40px;
  height: 80px;
  transform: translateY(-50%);
}
</style>