<script setup>
import {ref, onMounted, reactive, watch, defineExpose} from "vue";
import * as echarts from "echarts";
import axios  from "axios";
import VChart from 'vue-echarts';
import {nextTick} from "vue";
import { configProviderContextKey } from "element-plus";
/* 时间选择器 -- begin */
const currentDate = new Date('2023-2');   //  赋初值
const year = currentDate.getFullYear() + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''
const start_year = ref(year);     //选择的年
const start_month = ref(month);   //选择的月

const start_time = ref(null);     //可选时间范围
const end_time = ref(null);
//此处利用monthly comparison调接口获取未切换标签时的时间范围
axios.get('/enso/monthlyComparison/getInitData')
    .then(res =>{
      //console.log(res.data.start);
      start_time.value = new Date(res.data.start);
      end_time.value = new Date(res.data.end);
    });

// start_time.value = new Date('2023-1');      //暂时写死范围
// end_time.value = new Date('2023-6');
const limitedDateRange = (time) => {
  return time.getTime() < start_time.value || time.getTime() > end_time.value;
};
/* 根据选择页更新限制范围 */
function handleClick(tab, event) {
  console.log(tab.props.label);
  if(tab.props.label == '逐月比对'){
    //再次调用接口是为了当从别的标签切换回来时 能将时间选择器对应修改
    axios.get('/enso/monthlyComparison/getInitData')
        .then(res =>{
          start_time.value = new Date(res.data.start.replace(/-/g,'/'));
          end_time.value = new Date(res.data.end.replace(/-/g,'/'));
        });
  }
  else if(tab.props.label == '预报误差'){
    //再次调用接口是为了当从别的标签切换回来时 能将时间选择器对应修改
    axios.get('/enso/monthlyComparison/getInitData')
        .then(res =>{
          start_time.value = new Date(res.data.start.replace(/-/g,'/'));
          end_time.value = new Date(res.data.end.replace(/-/g,'/'));
        });
  }
  else if(tab.props.label == '误差分析'){
    axios.get('/enso/errorBox/getInitData')
        .then(res =>{
          //console.log(res.data.earliestDate);
          //console.log(res.data.latestDate);
          start_time.value = new Date(res.data.earliestDate.replace(/-/g,'/'));
          end_time.value = new Date(res.data.latestDate.replace(/-/g,'/'));
          //console.log(start_time.value);
          //console.log(end_time.value);
        });
    // start_time.value = new Date('2023-2');
    // end_time.value = new Date('2023-2');
  }
  else{        //相关系数
    axios.get('/enso/errorCorr/getInitData')
        .then(res =>{
          console.log(res.data.earliestDate);
          console.log(res.data.latestDate);
          start_time.value = new Date(res.data.earliestDate.replace(/-/g,'/'));
          end_time.value = new Date(res.data.latestDate.replace(/-/g,'/'));
        });
  }
}
/* 时间选择器 -- end */

var chart2_option; //存储从后端返回的chart2的option
var index_month=0; //切换页时修改这个索引

const chart1 = ref({})
const chart2 = ref({})
const chart3 = ref({})
const chart4 = ref({})
/* chart1 ,chart2 的下方文字描述 */
let Chart1_Description = reactive({single:true, text:'此处为预测结果汇总折线图。'})
let Chart2_Description = reactive({single:true,text:'此处的12副图分别为从2022年2月~2023年1月起报的预测结果、官方记录结果及二者绝对差值图（柱状）。'})
/* chart3 ,chart4 的下方文字描述 */
let Chart3_Description = reactive({single:true, text:'此处为不同起报月份的绝对差值分布箱型图。'})
let Chart4_Description = reactive({single:true, text:'此处为不同起报月份的相关性折线图。'})


/* 赋初值 */
//逐月对比
axios.get('/enso/predictionExamination/monthlyComparison?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart1.value = res.data.option;
      Chart1_Description.text = res.data.text
    });
//预报误差
axios.get('/enso/predictionExamination/error?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart2_option=res.data.option;
      chart2.value = chart2_option[0];
      Chart2_Description.text = res.data.text
    });
//误差分析
axios.get('/enso/predictionExamination/errorBox?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart3.value = res.data.option
      Chart3_Description.text = res.data.text
    });
//相关系数
axios.get('/enso/predictionExamination/errorCorr?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart4.value = res.data.option
      Chart4_Description.text = res.data.text
    });



    
/* 图表更新 */
function update_charts() {
  axios.get('/enso/predictionExamination/monthlyComparison?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        chart1.value = res.data.option
        Chart1_Description.text = res.data.text
      });
  axios.get('/enso/predictionExamination/error?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        chart2_option=[]; //先置空
        index_month=0; //设置索引月为0
        chart2_option=res.data.option;
        chart2.value = chart2_option[0];
        Chart2_Description.text = res.data.text
      });
  axios.get('/enso/predictionExamination/errorBox?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        chart3.value = res.data.option
        Chart3_Description.text = res.data.text
      });
  axios.get('/enso/predictionExamination/errorCorr?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        chart4.value =res.data.option
        Chart4_Description.text = res.data.text 
      });
}

/* 使el-button点击后能正常失焦 Start (by wyf)*/
const buttonLeft = ref(null);
const buttonRight = ref(null);

/* chart2左右切换 -- begin */
function change_Month(flag) {

  if(flag==="left"){
    if(index_month>0){
      index_month--;
    }
    else{
      index_month=11;
    }
    buttonLeft.value.$el.blur();
  }
  else if(flag==="right"){
    if(index_month<11){
      index_month++;
    }
    else{
      index_month=0;
    }
    buttonRight.value.$el.blur();
  }

  chart2.value=chart2_option[index_month];
}
/* chart2左右切换 -- end */

defineExpose({
  change_Month
});
/* 使el-button点击后能正常失焦 End */

import {
  ArrowLeft,
  ArrowRight,
} from '@element-plus/icons-vue'
</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      ENSO预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="update_charts()" 
      v-model="start_year" 
      type="year" 
      format="YYYY" 
      value-format="YYYY" 
      :clearable="false" 
      :disabledDate="limitedDateRange"
      style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="update_charts()" 
      v-model="start_month" 
      type="month" 
      format="MM" 
      value-format="MM" 
      :clearable="false" 
      :disabledDate="limitedDateRange"
      style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>

    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="逐月比对">
        <v-chart class="chart" :option="chart1" autoresize></v-chart>
        <p class="text_of_graph">{{ Chart1_Description.text }}</p>
      </el-tab-pane>
      <el-tab-pane label="预报误差">
        <div class="chart-container">
          <v-chart class="chart" :option="chart2" autoresize></v-chart>
          <el-button ref="buttonLeft" type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_Month('left')"></el-button>
          <el-button ref="buttonRight" type="primary" class="arrow-right" :icon="ArrowRight" @click="change_Month('right')"></el-button>
        </div>
        <p class="text_of_graph">{{ Chart2_Description.text }}</p>
      </el-tab-pane>
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
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: center
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
/*chart1、2 的表和文字*/
.chart {
  height: 400px;
}
.text_of_graph{
  text-align: center;
}
/*chart3、4 的表和文字*/
.chart_3 {
  height: 400px;
}
.chart_4 {
  height: 400px;
}
.text3{
  text-align: center;
}
.text4{
  text-align: center;
}

/* 预报误差页面的容器 */
.chart-container {
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
