<script setup>

import axios from "axios";
import {ref, defineExpose} from "vue";
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import VChart from "vue-echarts";

//时间选择器范围框定--start
const start_time = ref(null);
const end_time = ref(null);
/* 赋初值————默认为气温预测 */
axios.get('/imgs/WEA_T2M/getInitData')
.then(res =>{
  start_time.value = new Date(res.data.earliestDate);
  end_time.value = new Date(res.data.latestDate);
});

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
  return time.getTime() < start_time.value || time.getTime() > end_time.value;
};

function handleClick(tab, event) {
  console.log(tab.props.label);
  if(tab.props.label == '气温预测'){
    axios.get('/imgs/WEA_T2M/getInitData')
    .then(res =>{
      start_time.value = new Date(res.data.earliestDate);
      end_time.value = new Date(res.data.latestDate);
    });
  }
  else if(tab.props.label == '降水预测'){ 
    axios.get('/imgs/WEA_TP/getInitData')
    .then(res =>{
      start_time.value = new Date(res.data.earliestDate);
      end_time.value = new Date(res.data.latestDate);
      //end_time.value = new Date('2019-3-3');    //此行可以证明限制范围有根据选项卡改动
    });
  }
  else{     //风场预测
    axios.get('/imgs/WEA_U10/getInitData')
    .then(res =>{
      start_time.value = new Date(res.data.earliestDate);
      end_time.value = new Date(res.data.latestDate);
    });
  }
}
//时间选择器范围框定--end

const selectedDateTime = ref(null);
const selectedYear = ref(null); // 新变量，用于存储选定的年份
const selectedMonth = ref(null); // 新变量，用于存储选定的月份
const selectedDay = ref(null); // 新变量，用于存储选定的日期
const selectedHour = ref(null); // 新变量，用于存储选定的小时

//第一次进入为用户赋初值
const date = new Date(2019,0,1,0,0,0);
selectedDateTime.value = date;
selectedYear.value = date.getFullYear();
selectedMonth.value = date.getMonth() + 1;
selectedDay.value = date.getDate();
selectedHour.value = date.getHours();


var index_tempe=0; //切换气温预测时修改这个索引
var index_rain=0; //切换降水预测时修改这个索引
var index_wind=0;//切换风场的第一张图修改这个索引
var index_wind2=0;//切换风场的第二张图修改这个索引
const prefix="https://tianxing.tongji.edu.cn"

var title_of_temperature_Array;
var imgSrc_of_temperature_Array;
var text_of_temperature_Array;

var title_of_rain_Array;
var imgSrc_of_rain_Array ;
var text_of_rain_Array;

var title_of_wind_Array;
var imgSrc_of_wind_Array ;
var text_of_wind_Array;

var title_of_wind2_Array;
var imgSrc_of_wind2_Array ;
var text_of_wind2_Array;

const imgSrc_of_temperature = ref({})
const imgSrc_of_rain = ref({})
const imgSrc_of_wind = ref({})
const imgSrc_of_wind2 = ref({})
const title_of_temperature = ref({})
const text_of_temperature = ref({})
const title_of_rain = ref({})
const text_of_rain = ref({})
const title_of_wind = ref({})
const text_of_wind = ref({})
const title_of_wind2 = ref({})
const text_of_wind2 = ref({})

/* 避免未选择时屏幕上出现{} */
title_of_temperature.value = '';
text_of_temperature.value = '';
title_of_rain.value = '';
text_of_rain.value = '';
title_of_wind.value = '';
text_of_wind.value = '';
title_of_wind2.value = '';
text_of_wind2.value = '';

/* 赋初值 */
axios.get('/imgs/WEA_T2M/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
//axios.get("/imgs/WEA_T2M/getImgsPath?year=2019&month=1&day=1&hour=0")
    .then(res => {
      index_tempe = 0;
      //console.log(res.data.titles);
      title_of_temperature_Array = res.data.titles;
      imgSrc_of_temperature_Array = res.data.imgSrc;
      text_of_temperature_Array = res.data.texts;
      title_of_temperature.value = title_of_temperature_Array[0];
      imgSrc_of_temperature.value = `${prefix}${imgSrc_of_temperature_Array[0]}`;
      text_of_temperature.value = text_of_temperature_Array[0];
    });
axios.get('/imgs/WEA_TP/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
//axios.get("/imgs/WEA_TP/getImgsPath?year=2019&month=1&day=1&hour=0")
      .then(res => {
      index_rain = 0;
      //console.log(res.data.titles);
      //console.log(res.data.texts);
      title_of_rain_Array = res.data.titles;
      imgSrc_of_rain_Array = res.data.imgSrc;
      text_of_rain_Array = res.data.texts;
      title_of_rain.value = title_of_rain_Array[0];
      imgSrc_of_rain.value = `${prefix}${imgSrc_of_rain_Array[0]}`;
      text_of_rain.value = text_of_rain_Array[0];
    });
axios.get('/imgs/WEA_U10/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
    .then(res => {
      index_wind = 0;
      console.log(res.data.titles);
      console.log(res.data.texts);
      title_of_wind_Array = res.data.titles;
      imgSrc_of_wind_Array = res.data.imgSrc;
      text_of_wind_Array = res.data.texts;
      title_of_wind.value = title_of_wind_Array[0];
      imgSrc_of_wind.value = `${prefix}${imgSrc_of_wind_Array[0]}`;
      text_of_wind.value = text_of_wind_Array[0];
    });
axios.get('/imgs/WEA_MSLP/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
    .then(res => {
      index_wind2 = 0;
      console.log(res.data.titles);
      console.log(res.data.texts);
      title_of_wind2_Array = res.data.titles;
      imgSrc_of_wind2_Array = res.data.imgSrc;
      text_of_wind2_Array = res.data.texts;
      title_of_wind2.value = title_of_wind2_Array[0];
      imgSrc_of_wind2.value = `${prefix}${imgSrc_of_wind2_Array[0]}`;
      text_of_wind2.value = text_of_wind2_Array[0];
    });


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

  axios.get('/imgs/WEA_T2M/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
  //axios.get("/imgs/WEA_T2M/getImgsPath?year=2019&month=1&day=1&hour=0")
      .then(res => {
        index_tempe = 0;
        //console.log(res.data.title);
        title_of_temperature_Array = res.data.titles;
        imgSrc_of_temperature_Array = res.data.imgSrc;
        text_of_temperature_Array = res.data.texts;
        title_of_temperature.value = title_of_temperature_Array[0];
        imgSrc_of_temperature.value = `${prefix}${imgSrc_of_temperature_Array[0]}`;
        text_of_temperature.value = text_of_temperature_Array[0];
      });

  axios.get('/imgs/WEA_TP/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
  //axios.get("/imgs/WEA_TP/getImgsPath?year=2019&month=1&day=1&hour=0")
      .then(res => {
        index_rain = 0;
        //console.log(res.data.imgSrc);
        title_of_rain_Array = res.data.titles;
        imgSrc_of_rain_Array = res.data.imgSrc;
        text_of_rain_Array = res.data.texts;
        title_of_rain.value = title_of_rain_Array[0];
        imgSrc_of_rain.value = `${prefix}${imgSrc_of_rain_Array[0]}`;
        text_of_rain.value = text_of_rain_Array[0];
      });
  axios.get('/imgs/WEA_U10/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
    .then(res => {
        index_wind = 0;
        console.log(res.data.imgSrc);
        title_of_wind_Array = res.data.titles;
        imgSrc_of_wind_Array = res.data.imgSrc;
        text_of_wind_Array = res.data.texts;
        title_of_wind.value = title_of_wind_Array[0];
        imgSrc_of_wind.value = `${prefix}${imgSrc_of_wind_Array[0]}`;
        text_of_wind.value = text_of_wind_Array[0];
    });
  axios.get('/imgs/WEA_MSLP/getImgsPath?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
      .then(res => {
        index_wind2 = 0;
        console.log(res.data.imgSrc);
        title_of_wind2_Array = res.data.titles;
        imgSrc_of_wind2_Array = res.data.imgSrc;
        text_of_wind2_Array = res.data.texts;
        title_of_wind2.value = title_of_wind2_Array[0];
        imgSrc_of_wind2.value = `${prefix}${imgSrc_of_wind2_Array[0]}`;
        text_of_wind2.value = text_of_wind2_Array[0];
      });
}

/* 使el-button点击后能正常失焦 Start (by wyf)*/
const buttonLeftTemp = ref(null);
const buttonRightTemp = ref(null);
const buttonLeftRain = ref(null);
const buttonRightRain = ref(null);
const buttonLeftWind = ref(null);
const buttonRightWind = ref(null);
const buttonLeftWind2 = ref(null);
const buttonRightWind2 = ref(null);

/* 左右切换 -- begin */
function change_time_tempe(flag) {

  if(flag==="left"){
    if(index_tempe>0){
      index_tempe--;
    }
    else{
      index_tempe=19;
    }
    buttonLeftTemp.value.$el.blur();
  }
  else if(flag==="right"){
    if(index_tempe<19){
      index_tempe++;
    }
    else{
      index_tempe=0;
    }
    buttonRightTemp.value.$el.blur();
  }
  title_of_temperature.value=title_of_temperature_Array[index_tempe];
  imgSrc_of_temperature.value=`${prefix}${imgSrc_of_temperature_Array[index_tempe]}`;
  text_of_temperature.value=text_of_temperature_Array[index_tempe];
}
function change_time_rain(flag) {

  if(flag==="left"){
    if(index_rain>0){
      index_rain--;
    }
    else{
      index_rain=19;
    }
    buttonLeftRain.value.$el.blur();
  }
  else if(flag==="right"){
    if(index_rain<19){
      index_rain++;
    }
    else{
      index_rain=0;
    }
    buttonRightRain.value.$el.blur();
  }
  title_of_rain.value=title_of_rain_Array[index_rain];
  imgSrc_of_rain.value=`${prefix}${imgSrc_of_rain_Array[index_rain]}`;
  text_of_rain.value=text_of_rain_Array[index_rain];
}

function change_time_wind(flag) {

if(flag==="left"){
  if(index_wind>0){
    index_wind--;
  }
  else{
    index_wind=19;
  }
  buttonLeftWind.value.$el.blur();
}
else if(flag==="right"){
  if(index_wind<19){
    index_wind++;
  }
  else{
    index_wind=0;
  }
  buttonRightWind.value.$el.blur();
}
title_of_wind.value=title_of_wind_Array[index_wind];
imgSrc_of_wind.value=`${prefix}${imgSrc_of_wind_Array[index_wind]}`;
text_of_wind.value=text_of_wind_Array[index_wind];
}

function change_time_wind2(flag) {

if(flag==="left"){
  if(index_wind2>0){
    index_wind2--;
  }
  else{
    index_wind2=19;
  }
  buttonLeftWind2.value.$el.blur();
}
else if(flag==="right"){
  if(index_wind2<19){
    index_wind2++;
  }
  else{
    index_wind2=0;
  }
  buttonRightWind2.value.$el.blur();
}
title_of_wind2.value=title_of_wind2_Array[index_wind2];
imgSrc_of_wind2.value=`${prefix}${imgSrc_of_wind2_Array[index_wind2]}`;
text_of_wind2.value=text_of_wind2_Array[index_wind2];
}
/* 左右切换 -- end */

defineExpose({
  change_time_tempe,
  change_time_rain,
  change_time_wind,
  change_time_wind2
});
/* 使el-button点击后能正常失焦 End */
</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      全球天气预报结果
    </h1>

    <div class="datePickerContainer">
      <!-- 已控制时间选择范围 -->
      <div class="datetime-picker">
        <span class="demonstration">提示：请选择整时的时间</span>
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
          <div class="whole_container">
            <p class="picture_title">
              {{ title_of_temperature }}
            </p>
            <div class="pic_container">
              <img class="picture" :src="imgSrc_of_temperature" alt="">
            </div>
            <p class="picture_text">
              {{ text_of_temperature }}
            </p>
            <el-button ref="buttonLeftTemp" type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_time_tempe('left')"></el-button>
            <el-button ref="buttonRightTemp" type="primary" class="arrow-right" :icon="ArrowRight" @click="change_time_tempe('right')"></el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane label="降水预测">
          <div class="whole_container">
            <p class="picture_title">
              {{ title_of_rain }}
            </p>
            <div class="pic_container">
              <img class="picture" :src="imgSrc_of_rain" alt="">
            </div>
            <p class="picture_text">
              {{ text_of_rain }}
            </p>
            <el-button ref="buttonLeftRain" type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_time_rain('left')"></el-button>
            <el-button ref="buttonRightRain" type="primary" class="arrow-right" :icon="ArrowRight" @click="change_time_rain('right')"></el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="风场预测">
           <div class="whole_container">
            <p class="picture_title">
              {{ title_of_wind }}
            </p>
            <div class="pic_container">
              <img class="picture" :src="imgSrc_of_wind" alt="">
            </div>
            <p class="picture_text">
              {{ text_of_wind }}
            </p>
            <el-button ref="buttonLeftWind" type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_time_wind('left')"></el-button>
            <el-button ref="buttonRightWind" type="primary" class="arrow-right" :icon="ArrowRight" @click="change_time_wind('right')"></el-button>
           </div>                
          <div class="whole_container">
            <p class="picture_title">
              {{ title_of_wind2 }}
            </p>
            <div class="pic_container">
              <img class="picture" :src="imgSrc_of_wind2" alt="">
            </div>
            <p class="picture_text">
              {{ text_of_wind2 }}
            </p>
            <el-button ref="buttonLeftWind2" type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_time_wind2('left')"></el-button>
            <el-button ref="buttonRightWind2" type="primary" class="arrow-right" :icon="ArrowRight" @click="change_time_wind2('right')"></el-button>
          </div>
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
.el-tabs {
  width: 100%; /* 占满父容器的宽度 */
}
.tabs-container {
  width: 100%; /* 占满父容器的宽度 */
  display: flex;
  justify-content: center; /* 在容器中水平居中 */
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
  margin-left: 10px;
  margin-top: -175px;
  margin-bottom: -160px;
}
.pic_container{
  overflow: hidden;
}

/* 预报误差页面的容器 */
.whole_container {
  position: relative;
}
/* 设置左箭头按钮的样式 */
.el-button.arrow-left {
  position: absolute;
  top: 50%; /* 将箭头按钮的顶部与父容器的中间对齐 */
  left: 0; /* 将箭头按钮的左侧与父容器的左侧对齐 */
  width: 40px; /* 设置按钮宽度 */
  height: 80px; /* 设置按钮高度 */
  transform: translateY(-50%); /* 垂直居中箭头按钮 */
}

/* 设置右箭头按钮的样式 */
.el-button.arrow-right {
  position: absolute;
  top: 50%; /* 将箭头按钮的顶部与父容器的中间对齐 */
  right: 0; /* 将箭头按钮的右侧与父容器的右侧对齐 */
  width: 40px; /* 设置按钮宽度 */
  height: 80px; /* 设置按钮高度 */
  transform: translateY(-50%); /* 垂直居中箭头按钮 */
}

</style>
