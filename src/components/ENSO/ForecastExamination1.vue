<script setup>
import {ref, onMounted, reactive, watch} from "vue";
import * as echarts from "echarts";
import axios  from "axios";
import {nextTick} from "vue";
import { configProviderContextKey } from "element-plus";
/* 时间选择器 -- begin */
const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const start_year = ref('');
const start_month = ref('');
const end_year = ref('');
const end_month = ref('');

start_year.value = year;
start_month.value = month;
//时间是倒推关系，所以终止时间早于起始时间
function get_end_year(){
  if(Number(start_month.value) < 12)
    end_year.value = Number(start_year.value) - 1 + '';
  else
    end_year.value = Number(start_year.value)  + '';
}
function get_end_month(){
  if(Number(start_month.value) < 12)
    end_month.value = Number(start_month.value) +1 + '';
  else
    end_month.value = Number(start_month.value) -11 + '';
  if(Number(end_month.value) < 10)
    end_month.value = '0' + end_month.value;
}

function updateChartTitle() {
  get_end_year();
  get_end_month();

  update_chart1(); //更新图表1显示
  update_chart2(); //更新图表2显示

}
/* 时间选择器 -- end */

/* text更新 -- begin */
let Chart1_Description = reactive({single:true, text:'此处为预测结果汇总折线图。'})
let Chart2_Description = reactive({single:true,text:'此处的12副图分别为从2022年2月~2023年1月起报的预测结果、官方记录结果及二者绝对差值图（柱状）。'})
/* text更新 -- end */

const months = {
   1:'Jan',
   2:'Feb',
   3: 'Mar',
   4: 'Apr',
   5: 'May',
   6: 'Jun',
   7: 'Jul',
   8: 'Aug',
   9: 'Sep',
   10: 'Oct',
   11: 'Nov',
   12: 'Dec',
}

/* chart更新 -- begin */
const data_chart1 = ref([[20, 49, 70, -100, -15, 70, 35, 16, 32, 70, 64, 33]])
const xAxis_chart1 =  ref([])
const xAxis_chart2 =  ref([])
const data_chart2 = ref([[20, 49, 70, -100, -15, 70, 35, 16, 32, 70, 64, 33]])
const legend_chart1 = ref([])
var index_month=ref(1);
const series_1=ref([]);
const series_2=ref([{}]);
var nino_data=ref([]);

function generate_legend(){
  get_end_year();
  get_end_month();

  var cur_year,cur_month;
  cur_year = Number(end_year.value);
  cur_month = Number(end_month.value);
  var result = []
  for(let i = 0; i < 12; i++){
    var tmp = cur_year + '年' + cur_month + "月起报" ;
    result.push(tmp);
    if(Number(cur_month) < 12){
      cur_month++;
    }
    else{
      cur_year++;
      cur_month = 1;
    }
  }
  return result;
}
function generate_xAxis1(){
  get_end_year();
  get_end_month();

  var cur_year,cur_month;
  cur_year = Number(end_year.value)-2000; //先直接-2000吧，年份大了再改
  cur_month = Number(end_month.value);
  var result = []
  for(let i = 0; i < 12; i++){
    var tmp = months[cur_month] + '-' + cur_year ;
    result.push(tmp);
    if(Number(cur_month) < 12){
      cur_month++;
    }
    else{
      cur_year++;
      cur_month = 1;
    }
  }
  return result;
}

function update_chart1(){
  xAxis_chart1.value = [];    //更新x轴标签
  xAxis_chart1.value = generate_xAxis1();

  get_end_year();
  get_end_month();

  /* chart1更新 -- begin */
  legend_chart1.value = [];   //更新标签
  legend_chart1.value = generate_legend();

  var cur_year,cur_month;
  cur_year = Number(end_year.value);
  cur_month = Number(end_month.value);//获取当前年月以对应查找

  //获取当前的气候中心数据
  //axios.get('enso/predictionExamination/monthlyComparison?year='+Number(cur_year)+'&month='+Number(cur_month))
  axios.get('/enso/predictionExamination/monthlyComparison?year=1&month=1') //使用mock测试时使用此行，否则改为上行
      .then(res => {
        // console.log(res.data.data2);
        nino_data=res.data.data2;
      });

  var tmp = []; //存储获取到的12个月的数据的二维数组，内容是一维数组
  for(let i = 0; i < 12; i++){
    let j,k;
    //axios.get('enso/predictionExamination/monthlyComparison?year='+Number(cur_year)+'&month='+Number(cur_month))
    axios.get('/enso/predictionExamination/monthlyComparison?year=1&month=1') //使用mock测试时使用此行，否则改为上行
        .then(res => {
          var t_data;
          console.log(res.data.text);
          console.log(res.data.data1);
          Chart1_Description.text = res.data.text;
          t_data=res.data.data1;
          tmp.push(t_data);
          if(tmp.length===12){
            data_chart1.value = tmp;
            update_series_1();
            }
        });
    if(Number(cur_month) < 12){
      cur_month++;
    }
    else{
      cur_year++;
      cur_month = 1;
    }
  }

  /*  //图1更新
  series_chart1.push({ //添加气候中心的预报结果
    name: "气候中心Nino3.4指数记录",
    type: "line",
    lineStyle: {
      color: "black", // 将颜色改为红色（你可以使用任何CSS颜色值）
      width: 3, // 将线条宽度改为3
      // 根据需求添加更多样式属性
    },
    itemStyle: {
      // 添加itemStyle属性来自定义节点样式
      color: "black", // 将节点颜色改为黑色
    },
    data: [10, 28, 397, 478, 578, 667, 698],
  });
  cur_year = Number(end_year.value); //表示当前循环到的月份
  cur_month = Number(end_month.value); //表示当前循环到的月份
  var count=0; //用于计数，判断是否到12个月
  //循环生成图1对应的12个月的新数据
  while (1) {
    if(count===2) break;
    series_chart1.push({
      name: cur_year+"年"+cur_month+"月起报",
      type: "line",
      lineStyle: {
        type: "dashed",
      },
      data: data_chart1.value,
    });
    cur_month<12 ? cur_month++ : cur_month=1; //月份增加
    count++;
    if(count!==0&&cur_month===1) cur_year++; //判断是否增加一年
  }*/

  /* chart1更新 -- end */

}
function update_chart2(){
  get_end_year();
  get_end_month();

  var cur_year,cur_month;
  cur_year = Number(end_year.value);
  cur_month = Number(end_month.value);//获取当前年月以对应查找

  index_month.value=0;//索引月

  //图2初始更新
  var tmp2 = [];
  for(let i = 0; i < 12; i++){ //一次性获取十二个月的数据
    //axios.get('/enso/predictionExamination/error?year='+Number(cur_year)+'&month='+Number(cur_month))
    axios.get('/enso/predictionExamination/error?year=1&month=1') //使用mock测试时使用此行，否则改为上行
        .then(res => {
          var t2_data;
          // console.log(res.data.text);
          // console.log(res.data.data);
          Chart1_Description.text = res.data.text;
          t2_data=res.data.data;
          tmp2.push(t2_data);
          if(tmp2.length===12){
            data_chart2.value = tmp2; //保存每个月的数据
            update_series_2();
          }
        });
    if(Number(cur_month) < 12){
      cur_month++;
    }
    else{
      cur_year++;
      cur_month = 1;
    }
  }
}

/* chart更新 -- end */
function update_series_1(){
  series_1.value = [{}];
  var tmp = [];
  tmp.push(
      {
        name: "气候中心Nino3.4指数记录",
        type: "line",
        lineStyle: {
          color: "black", // 将颜色改为红色（你可以使用任何CSS颜色值）
          width: 3, // 将线条宽度改为3
          // 根据需求添加更多样式属性
        },
        itemStyle: {
          // 添加itemStyle属性来自定义节点样式
          color: "black", // 将节点颜色改为黑色
        },
        data: nino_data,
      }
  );
  for(let i = 0; i < 12; i++) {
    tmp.push(
        {
          name: legend_chart1.value[i],
          type: "line",
          lineStyle: {
            type: "dashed",
          },
          data: data_chart1.value[i],
        }
    );
  }
  series_1.value = tmp;
}
function update_series_2(){
  series_2.value = [{}];
  var tmp = [];
  var now_year,now_month;
  now_year=Number(end_year.value);
  if(Number(end_month.value)+Number(index_month.value)<=12) {
    now_month = Number(end_month.value) + Number(index_month.value);
  }
  else{
    now_month=Number(end_month.value) + Number(index_month.value)-12;
    now_year=Number(end_year.value)+1;
  }

  var error_data,e_data=[];
  for(var i=0;i<nino_data.length;i++){
    error_data=data_chart2.value[Number(index_month.value)][i]-nino_data[i];
    e_data.push(error_data);
  }
  tmp.push(
      {
        name: now_year+"年"+now_month+"月起报误差",
        type: 'bar',
        lineStyle: {
          type: "dashed",
        },
        data:  e_data,
      }
  );
  tmp.push(
      {
        name: "气候中心Nino3.4指数记录",
        type: "line",
        lineStyle: {
          type: "dashed",
        },
        data: nino_data,
      }
  );
  tmp.push(
      {
        name: now_year+"年"+now_month+"月起报",
        type: "line",
        lineStyle: {
          type: "dashed",
        },
        data: data_chart2.value[Number(index_month.value)],
      }
  );
  series_2.value = tmp;
}

/* chart2左右切换 -- begin */
function change_Month(flag) {
  generate_xAxis2();
  if(flag==="left"){
    if(index_month.value>0){
      index_month.value--;
    }
    else{
      index_month.value=11;
    }

  }
  else if(flag==="right"){
    if(index_month.value<11){
      index_month.value++;
    }
    else{
      index_month.value=0;
    }

  }
  update_series_2();
  xAxis_chart2.value = generate_xAxis2();
}
function generate_xAxis2() {
  var result ;
  var x_series ;
  var index;
  result = generate_xAxis1();
  index=index_month.value;
  for (let j = 0; j < 12-index_month.value; j++) {
    result[j] = result[index];
    index++;
  }
  for (let j = 0; j < index_month.value; j++) {
    result.pop();
  }
  x_series=result;
  return x_series;
}

/* chart2左右切换 -- end */

// 初始化第一个图表
const initChart1 = () => {
  legend_chart1.value = generate_legend();
  xAxis_chart1.value = generate_xAxis1();
  update_chart1();
  let myChart1 = echarts.init(
      document.getElementById("chart_of_monthly_comparison")
  );

  myChart1.setOption({
    title: {
      text: "预测结果逐月对比",
      left:"center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      x:'center',
      y:'bottom',
      tooltip: {
        show: true
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data:xAxis_chart1.value,
      axisLabel: {
        interval: 2, // 设置横坐标刻度的显示间隔为1，即每个刻度都显示
      },
    },
    yAxis: {
      type: "value",
      name: 'Niño 3.4 Index',
    },
    series: series_1.value
  });

  watch(series_1,() => {
    myChart1.clear();
    myChart1.setOption({
      title: {
        text: "预测结果逐月对比",
        left:"center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        x:'center',
        y:'bottom',
        tooltip: {
          show: true
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data:xAxis_chart1.value,
        axisLabel: {
          interval: 2, // 设置横坐标刻度的显示间隔为1，即每个刻度都显示
        },
      },
      yAxis: {
        type: "value",
        name: 'Niño 3.4 Index',
      },
      series: series_1.value
    })
  },)
};

//初始化第二个图表
const initChart2 = () => {
  update_chart2();
  xAxis_chart2.value=generate_xAxis1();
  let myChart2 = echarts.init(
      document.getElementById("chart_of_error_histogram")
  );
  myChart2.setOption({
    title: {
      text: "预报结果误差柱状图",
      left:"center",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      x:'center',
      y:'bottom',
      tooltip: {
        show: true
      }
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis_chart2.value,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          interval: 2, // 设置横坐标刻度的显示间隔为1，即每个刻度都显示
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Niño 3.4 Index',
      },
    ],
    series: series_2.value,
  });

  watch(series_2,() => {
    var set_interval; //设置显示间隔
    if(index_month.value===0){
      set_interval=2;
    }
    else if(index_month.value>=1&&index_month.value<=5){
      set_interval=1;
    }
    else{
      set_interval=0;
    }

    myChart2.setOption({
      xAxis: [
        {
          type: 'category',
          data: xAxis_chart2.value,
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            interval: set_interval, // 设置横坐标刻度的显示间隔
          },
        }
      ],
      series: series_2.value,
    })
  },)
};

onMounted(() => {
  setTimeout(() => {
    initChart1();
  }, 100);  //延迟图表生成，等页面的框架都渲染出来了，能获取高度宽度了
  setTimeout(() => {
    initChart2();
  }, 100);
});

import {
  ArrowLeft,
  ArrowRight,
} from '@element-plus/icons-vue'
</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      {{ end_year }}年{{ end_month }}月~{{ start_year }}年{{ start_month }}月 ENSO预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="逐月比对">
        <div class="chart1" id="chart_of_monthly_comparison" ></div>
        <p class="text_of_graph">{{ Chart1_Description.text }}</p>
      </el-tab-pane>
      <el-tab-pane label="预报误差">
        <div class="chart2-container">
          <div class="chart2" id="chart_of_error_histogram" style="width: 1000px; height: 400px;"></div>
          <el-button type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_Month('left')"></el-button>
          <el-button type="primary" class="arrow-right" :icon="ArrowRight" @click="change_Month('right')"></el-button>
        </div>
        <p class="text_of_graph">{{ Chart2_Description.text }}</p>
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
.chart1 {
  height: 400px;
}

.chart2 {
  height: 400px;
}
.text_of_graph{
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
