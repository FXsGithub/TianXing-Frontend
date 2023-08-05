<script setup>

import axios from "axios";
import {ref, computed} from "vue";

//时间选择器范围框定--start

  const disabledMinute = () => {
    const allowedMinute = [0];
    const disabledMinute = [];
    
    for (let i = 0; i < 60; i++) {
      if (!allowedMinute.includes(i)) {
        disabledMinute.push(i);
      }
    }
    
    return disabledMinute;
  };
  
  const disabledSecond = () => {
    const allowedSecond = [0];
    const disabledSecond = [];
    
    for (let i = 0; i < 60; i++) {
      if (!allowedSecond.includes(i)) {
        disabledSecond.push(i);
      }
    }
    
    return disabledSecond;
  };
  
  const limitedDateRange = (time) => {
    const year = new Date(time).getFullYear();
    const month = new Date(time).getMonth();
    return year !== 2023 || month < 1 || month > 3; // Months are 0-based
  };

  //时间选择器范围框定--end
const selectedDateTime = ref(null);
const selectedYear = ref(null); // 新变量，用于存储选定的年份
const selectedMonth = ref(null); // 新变量，用于存储选定的月份
const selectedDay = ref(null); // 新变量，用于存储选定的日期
const selectedHour = ref(null); // 新变量，用于存储选定的小时


const title_of_temperature = ref({})
const imgSrc_of_temperature = ref({})
const text_of_temperature = ref({})

const title_of_rain = ref({})
const imgSrc_of_rain = ref({})
const text_of_rain = ref({})

/* 避免未选择时屏幕上出现{} */
title_of_temperature.value = '';
text_of_temperature.value = '';
title_of_rain.value = '';
text_of_rain.value = '';

const handleDateTimeChange = () => {
  // 当日期时间选择发生变化时被调用
  console.log(selectedDateTime.value); // 输出当前选择的日期和时间

  if (selectedDateTime.value) {
    const selectedDate = new Date(selectedDateTime.value);
    selectedYear.value = selectedDate.getFullYear(); // 获取年份值并存储到 selectedYear
    selectedMonth.value = selectedDate.getMonth() + 1; // 获取月份值并存储到 selectedMonth
    selectedDay.value = selectedDate.getDate(); // 获取日期值并存储到 selectedDay
    selectedHour.value = selectedDate.getHours(); // 获取小时值并存储到 selectedHour
  }
  
  //这是编造的接口形式，之后会根据实际的修改
  axios.get('/GB/predictionResult/temperature?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
    .then(res => {
      console.log(res.data.imgSrc);
      title_of_temperature.value=res.data.title;
      imgSrc_of_temperature.value = res.data.imgSrc;
      text_of_temperature.value=res.data.text;
    });
  axios.get('/GB/predictionResult/rain?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
    .then(res => {
      console.log(res.data.imgSrc);
      title_of_rain.value=res.data.title;
      imgSrc_of_rain.value = res.data.imgSrc;
      text_of_rain.value=res.data.text;
    });
};

</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      全球天气预报结果
    </h1>

    <div class="datePickerContainer">
      <!-- 已控制时间选择范围 -->
      <div class="datetime-picker">
        <span class="demonstration">提示：选择2023年2月至4月整时的时间</span>
          <div class="block">
            <el-date-picker
              v-model="selectedDateTime"
              type="datetime"
              placeholder="请选择时间"
              @change="handleDateTimeChange"
              :disabledDate="limitedDateRange"
              :disabledMinutes="disabledMinute"
              :disabledSeconds="disabledSecond"
            />
          </div>
      </div>
    </div>

    <div class="tabs-container">
    <el-tabs type="border-card">
      <el-tab-pane label="气温预测">
        <p class="picture_title">
          {{ title_of_temperature }}
        </p>
        <div class="pic_container">
          <img class="picture" :src="imgSrc_of_temperature" alt="">
        </div>
        <p class="picture_text">
          {{ text_of_temperature }}
        </p>
      </el-tab-pane>
      <el-tab-pane label="降水预测">
        <p class="picture_title">
          {{ title_of_rain }}
        </p>
        <div class="pic_container">
          <img class="picture" :src="imgSrc_of_rain" alt="">
        </div>
        <p class="picture_text">
          {{ text_of_rain }}
        </p>
      </el-tab-pane>
      <el-tab-pane label="风场预测">
        <p>hahahah</p>
      </el-tab-pane>
    </el-tabs>
  </div>
  </div>
</template>

<style scoped lang="scss">
  /*时间选择器样式*/
  .datetime-picker {
  float: right;
  display: flex;
  width: 25%;
  padding: 0;
  flex-direction: column-reverse; /* 设置为列方向，同时将内容从底部开始排列 */
}

/* 为demonstration添加样式 */
.datetime-picker .demonstration {
  display: inline-block;
  white-space: nowrap;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 0; /* 调整为0，使文字紧贴上方 */
}

  .datetime-picker .block {
  padding: 20px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.datetime-picker .block:last-child {
  border-right: none;
}
.datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.datePickerContainer {
  /* 其他样式 */
  margin-bottom: 20px; /* 添加底部外边距 */
}

    
    /* 可参考图片样式 */
    .image{
      width: 600px; /* 设置图片宽度 */
      height: 570px; /* 设置图片高度 */
      position:absolute;
      left:70px;
    }

    .pageContent {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中内容 */
}
.tabs-container {
  width: 100%; /* 占满父容器的宽度 */
  display: flex;
  justify-content: center; /* 在容器中水平居中 */
}

.el-tabs {
  width: 100%; /* 占满父容器的宽度 */
}
.title {
  text-align: center
}
.picture_title {
   text-align: center;
   font-size: 14px;
}
.picture_text {
  text-align: center;
  font-size: 14px;
}
.picture {
  max-width: 90%;
  display: block; /* 将元素设置为块级元素 */
  margin-left: 35px;
  margin-top: -175px;
  margin-bottom: -160px;
}
.pic_container{
  overflow: hidden;
}
.border-card{
  position:absolute;
  top:100%;
}

</style>