<script setup>

import {onMounted} from "vue";
import { reactive } from "vue";
import {ref} from "vue";
import {nextTick} from "vue";
import axios from 'axios';
import VChart from 'vue-echarts';
import { tabsEmits } from "element-plus";

const selectedTemperature = ref(true)
const selectedPrecipitation = ref(false)
const selectedWind = ref(false)

const currentDate = new Date();
const currentYear = currentDate.getFullYear() + '';
const currentMonth = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''
const currentDay = currentDate.getDate() < 10 ? '0' + (currentDate.getDate() + '') : currentDate.getDate() + ''
// const defaultTime = currentYear + '-' + currentMonth + '-' + currentDay + '  00:00'

// const selectedTime = ref('');
// selectedTime.value = defaultTime;
const selectedDate = ref('')
const selectedHour = ref('00:00')
selectedDate.value = currentYear + '-' + currentMonth + '-' + currentDay

const latitudeWindChartTitle = ref('')
const longitudeWindChartTitle = ref('')

const latitudeWindDescription = ref('')
const longitudeWindDescription = ref('')

const latitudeWindImageUrl = ref('')
const longitudeWindImageUrl = ref('')

function selectChart(tab) {
  if(tab.index == 0) {
    selectedTemperature.value = true;
    selectedPrecipitation.value = false;
    selectedWind.value = false;
    // 更新图片
  }
  else if(tab.index == 1) {
    selectedTemperature.value = false;
    selectedPrecipitation.value = true;
    selectedWind.value = false;
    // 更新图片
  }
  else {
    selectedTemperature.value = false;
    selectedPrecipitation.value = false;
    selectedWind.value = true;
    updateWindChart();
  }
}

// 请求风场数据
const updateWindChart = async () => {
  latitudeWindChartTitle.value = selectedDate.value.substring(0, 4) + '年' + Number(selectedDate.value.substring(5, 7)) + '月' + Number(selectedDate.value.substring(8, 10)) + '日' + Number(selectedHour.value.substring(0, 2)) + '时' + '纬向风场预测结果';
  longitudeWindChartTitle.value = selectedDate.value.substring(0, 4) + '年' + Number(selectedDate.value.substring(5, 7)) + '月' + Number(selectedDate.value.substring(8, 10)) + '日' + Number(selectedHour.value.substring(0, 2)) + '时' + '经向风场预测结果';

  const params = {
    year: selectedDate.value.substring(0, 4),
    month: Number(selectedDate.value.substring(5, 7)) + '',
    day: Number(selectedDate.value.substring(8, 10)) + '',
    hour: Number(selectedHour.value.substring(0, 2)) + ''
  };

  console.log(params);

  axios.get('/globalweather/predictionResult/wind', { params })
    .then(response => {
      //console.log(response.data);
      latitudeWindDescription.value = response.data.latitudeWindDescription;
      longitudeWindDescription.value = response.data.longitudeWindDescription;
      latitudeWindImageUrl.value = response.data.latitudeWindImage;
      longitudeWindImageUrl.value = response.data.longitudeWindImage;
    })
    .catch(error => {
      console.error(error);
    });
}

function updateCharts() {
  if(selectedTemperature.value == true) {
    // 更新图片
  }
  else if(selectedPrecipitation.value == true) {
    // 更新图片
  }
  else {
    updateWindChart();
  }
}

function prevImg() {
  if(selectedHour.value == '06:00') {
    selectedHour.value = '00:00';
  }
  else if(selectedHour.value == '12:00') {
    selectedHour.value = '06:00';
  }
  else if(selectedHour.value == '18:00') {
    selectedHour.value = '12:00';
  }
  updateCharts();
}

function nextImg() {
  if(selectedHour.value == '00:00') {
    selectedHour.value = '06:00';
  }
  else if(selectedHour.value == '06:00') {
    selectedHour.value = '12:00';
  }
  else if(selectedHour.value == '12:00') {
    selectedHour.value = '18:00';
  }
  updateCharts();
}

function prevEnabled() {
  if(selectedHour.value == '00:00')
    return false;
  else
    return true;
}

function nextEnabled() {
  if(selectedHour.value == '18:00')
    return false;
  else
    return true;
}

onMounted(
  () => {
    nextTick(() => {
      //console.log(defaultTime)
    })
  }
)

// const makeRange = (start, end) => {
//   const result = [];
//   for (let i = start; i <= end; i++) {
//     result.push(i);
//   }
//   return result;
// }

// const disabledMinutes = () => {
//   return makeRange(1, 59);
// }
</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      全球天气预报结果
    </h1>

    <!-- <div class="datePickerContainer">
      <el-date-picker
        @change="updateCharts"
        v-model="selectedTime"
        type="datetime"
        placeholder="请选择时间"
        :clearable="false"
        :editable="false"
        format="YYYY-MM-DD  HH:mm"
        value-format="YYYY-MM-DD HH:mm"
        :defaultValue="defaultTime"
        :disabled-minutes="disabledMinutes"
        style="width: 160px; height: 25px"
      />
    </div> -->

    <div class="datePickerContainer">
      <el-date-picker
        @change="updateCharts"
        v-model="selectedDate"
        type="date"
        placeholder="请选择日期"
        :clearable="false"
        :editable="false"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="width: 120px; height: 32px"
      />
      <el-time-select
        @change="updateCharts"
        v-model="selectedHour"
        start="00:00"
        step="06:00"
        end="18:00"
        
        format="HH:mm"
        value-format="HH:mm"
        placeholder="请选择时间"
        :clearable="false"
        :editable="false"
        style="width: 120px; height: 25px"
      />
    </div>

    <el-tabs type="border-card" @tab-click="selectChart" :stretch="true">
      
      <el-tab-pane label="气温预测">
      </el-tab-pane>

      <el-tab-pane label="降水预测">
      </el-tab-pane>

      <el-tab-pane label="风场预测">

        <el-row>

          <el-col :span="2">
            <el-icon class="svgButton" @click="prevImg" v-if="prevEnabled()">
              <svg t="1691253838737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2542" width="200" height="200"><path d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z" p-id="2543" fill="#666666"></path></svg>
            </el-icon>
          </el-col>

          <el-col :span="20">

            <h3 style="text-align: center; margin-top: 0px">{{ latitudeWindChartTitle }}</h3>
            <div class="imageContainer">
              <img
                :src="latitudeWindImageUrl"
                class="image"
              />
            </div>
            <div class="description">
              {{ latitudeWindDescription }}
            </div>

          </el-col>

          <el-col :span="2">
            <el-icon class="svgButton" @click="nextImg" v-if="nextEnabled()">
              <svg t="1691253903985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2682" width="200" height="200"><path d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z" p-id="2683" fill="#666666"></path></svg>
            </el-icon>
          </el-col>

        </el-row>

        <div class="divider1"></div>
        <div class="divider2"></div>

        <el-row>

          <el-col :span="2">
            <el-icon class="svgButton" @click="prevImg" v-if="prevEnabled()">
              <svg t="1691253838737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2542" width="200" height="200"><path d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z" p-id="2543"></path></svg>
            </el-icon>
          </el-col>

          <el-col :span="20">

            <h3 style="text-align: center; margin-top: 0px">{{ longitudeWindChartTitle }}</h3>
            <div class="imageContainer">
              <img
                :src="longitudeWindImageUrl"
                class="image"
              />
            </div>
            <div class="description">
              {{ longitudeWindDescription }}
            </div>

          </el-col>

          <el-col :span="2">
            <el-icon class="svgButton" @click="nextImg" v-if="nextEnabled()">
              <svg t="1691253903985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2682" width="200" height="200"><path d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z" p-id="2683"></path></svg>
            </el-icon>
          </el-col>

          </el-row>

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

  .icon {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .icon:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.3s ease;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
  }
  
  .iconDisabled {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .svgButton {
    width: 100%;
    height: 100%;
  }

  .svgButtonDisabled {
    width: 100%;
    height: 100%;
  }

  .divider1 {
    height: 30px;
    border-bottom: 2px solid #DDDDDD
  }

  .divider2 {
    height: 10px;
  }
</style>