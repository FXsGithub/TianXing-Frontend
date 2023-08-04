<script setup>

import axios from "axios";
import {ref} from "vue";

//等时间选择器的值
const start_year = 2019;
const start_month = 1;
const start_day = 1;
const start_hour = 6;

const title_of_temperature = ref({})
const imgSrc_of_temperature = ref({})
const text_of_temperature = ref({})

const title_of_rain = ref({})
const imgSrc_of_rain = ref({})
const text_of_rain = ref({})

//这是编造的接口形式，之后会根据实际的修改
axios.get('/GB/predictionResult/temperature?year='+start_year+'&month='+start_month+'&day='+start_day+'&hour='+start_hour)
    .then(res => {
      console.log(res.data.imgSrc);
      title_of_temperature.value=res.data.title;
      imgSrc_of_temperature.value = res.data.imgSrc;
      text_of_temperature.value=res.data.text;
    });
//imgSrc_of_temperature="https://www.tjensoprediction.com/imgs/WEA/t2m/20190101/1.png";
axios.get('/GB/predictionResult/rain?year='+start_year+'&month='+start_month+'&day='+start_day+'&hour='+start_hour)
    .then(res => {
      console.log(res.data.imgSrc);
      title_of_rain.value=res.data.title;
      imgSrc_of_rain.value = res.data.imgSrc;
      text_of_rain.value=res.data.text;
    });
//imgSrc_of_rain="https://www.tjensoprediction.com/imgs/WEA/tp/20190101/1.png";
</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      全球天气预报结果
    </h1>

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
</template>

<style scoped lang="scss">
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

</style>