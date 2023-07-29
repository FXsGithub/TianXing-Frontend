<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import * as echarts from "echarts";
import VChart from 'vue-echarts';
import { nextTick } from "vue";
import axios  from "axios";
import { configProviderContextKey } from "element-plus";
/* 时间选择器 -- begin */
const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + '';

const start_year = ref(year);
const start_month = ref(month);
/* 时间选择器 -- end */

const chart3 = ref({})
const chart4 = ref({})
/* 赋初值 */
axios.get('/enso/predictionExamination/errorBox?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart3.value = res.data
    });
axios.get('/enso/predictionExamination/errorCorr?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart4.value =res.data
    });
/* 图表更新 */
function update_charts() {
  axios.get('/enso/predictionExamination/errorBox?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        chart3.value = res.data
      });
  axios.get('/enso/predictionExamination/errorCorr?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        chart4.value =res.data
      });
}


/* chart3 ,chart4 的下方文字描述 */
let Chart3_Description = reactive({single:true, text:'此处为不同起报月份的绝对差值分布箱型图。'})
let Chart4_Description = reactive({single:true, text:'此处为不同起报月份的相关性折线图。'})

</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      ENSO预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="update_charts" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="update_charts" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="误差分析">
        <v-chart class="chart_3" :option="chart3" autoresize></v-chart>
        <p class="text3">{{Chart3_Description.text}}
        </p>
      </el-tab-pane>
      <el-tab-pane label="相关系数">
        <v-chart class="chart_4" :option="chart4" autoresize></v-chart>
        <p class="text4">{{Chart4_Description.text}}
        </p>
      </el-tab-pane>
    </el-tabs>
    <div id="echarts-demo"></div>
    <div id="echarts-demo"></div>
  </div>
</template>

<style scoped lang="scss">
.title {
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
.text3{
  text-align: center;
}
.text4{
  text-align: center;
}
.chart_3 {
  height: 400px;
}
.chart_4 {
  height: 400px;
}
</style>

