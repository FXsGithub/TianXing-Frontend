<script setup>

import { ref} from "vue";
import VChart from 'vue-echarts'
import axios from 'axios';

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''


const text_of_option1 = ref('预测误差主要来自于对中纬度和冰岛附近低压的高估，能够预测出NAO的典型两级模态 ，模拟误差随着预测时长逐渐增加。')//表示前六个图底下的文字描述

const text_of_option7 = ref('对于为期1个月的NAOI预测，不如高分辨率模式ECMWF ，但与低分辨率模式ECCC相当。由于只接受月平均数作为输入，忽略了决定短时尺度可预测性的天气现象和初始条件。在超过两个月的提前期的预测技巧远远超过了失去预测能力的数值模式，将NAO的有效预测时间从1个月扩展到了6个月。')

const selectedYear = ref('');
const selectedMonth = ref('');

selectedYear.value = year;
selectedMonth.value = month;






const option1 = ref({})
const option2 = ref({})
const option3 = ref({})
const option4 = ref({})
const option5 = ref({})
const option6 = ref({})
const option7 = ref({})

const imgSrc_of_option1 = ref({})
const imgSrc_of_option2 = ref({})
const imgSrc_of_option3 = ref({})
const imgSrc_of_option4 = ref({})
const imgSrc_of_option5 = ref({})
const imgSrc_of_option6 = ref({})

const title_of_option1 = ref({})
const title_of_option2 = ref({})
const title_of_option3 = ref({})
const title_of_option4 = ref({})
const title_of_option5 = ref({})
const title_of_option6 = ref({})








const params1 = {
    year: selectedYear.value,
    month: Number(selectedMonth.value) - 1
  };
  
  const params2 = {
    year: selectedYear.value,
    month: Number(selectedMonth.value) - 2
  }; 

  const params3 = {
    year: selectedYear.value,
    month: Number(selectedMonth.value) - 3
  }; 

  const params4 = {
    year: selectedYear.value,
    month: Number(selectedMonth.value) - 4
  }; 

  const params5 = {
    year: selectedYear.value,
    month: Number(selectedMonth.value) - 5
  }; 

  const params6 = {
    year: selectedYear.value,
    month: Number(selectedMonth.value) - 6
  }; 

 

axios.get('/nao/predictionExamination/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
    .then(res => {
      console.log(res.data.imgSrc);
      // title_of_option1.value='提前1个月预测';
      list = res.data.imgSrc;
      text_of_option1.value = res.data.text;
  });
// axios.get('/nao/predictionExamination/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
//     .then(res => {
//       console.log(res.data.imgSrc);
//       title_of_option2.value='提前2个月预测';
//       imgSrc_of_option2.value = res.data.imgSrc;
//       text_of_option1.value = res.data.text;
//     });
// axios.get('/nao/predictionExamination/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
//     .then(res => {
//       console.log(res.data.imgSrc);
//       title_of_option3.value='提前3个月预测';
//       imgSrc_of_option3.value = res.data.imgSrc;
//       text_of_option1.value = res.data.text;
//     });
// axios.get('/nao/predictionExamination/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
//     .then(res => {
//       console.log(res.data.imgSrc);
//       title_of_option4.value='提前4个月预测';
//       imgSrc_of_option4.value = res.data.imgSrc;
//       text_of_option1.value = res.data.text;
//     });
// axios.get('/nao/predictionExamination/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
//     .then(res => {
//       console.log(res.data.imgSrc);
//       title_of_option5.value='提前5个月预测';
//       imgSrc_of_option5.value = res.data.imgSrc;
//       text_of_option1.value = res.data.text;
//     });
// axios.get('/nao/predictionExamination/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
//     .then(res => {
//       console.log(res.data.imgSrc);
//       title_of_option6.value='提前6个月预测';
//       imgSrc_of_option6.value = res.data.imgSrc;
//       text_of_option1.value = res.data.text;
//     });


option1.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {
          position: 'top'
        },
        animation: false,
       
        xAxis: {
          type: 'category',
          data: [1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0]
        },
        yAxis: {
          type: 'category',
          data: [1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0]
        },
        visualMap: {
          min: -2.5,
          max: 2.5,
          calculable: true,
          orient: 'horizontal',
          left: '2000px',
          bottom: '15%',
          inRange: {
            color: ['blue', '#ffffff', 'red'] // 配置颜色范围
          }
        },
        series: [{
          name: 'try',
          type: 'heatmap',
          // data: heatMapData1,
          data: [],
          label: {
            show: false
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
          
  

}


// axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params1 })
//     .then(response => {
//       //console.log(response.data);
//       const data = response.data;

//       let heatMapData = [];
//       for (let i = 0; i < data["data"].length; i++) {
//         for (let j = 0; j < data["data"][i].length; j++) {
//           heatMapData.push([i, j, data["data"][i][j]]);
//         }
//       }

//       option1.value={
//   title: {
//     // text: chartTitle.value,
//     text: '提前1个月预测',
//     left: 'center' //标题水平居中
//   },
//   tooltip: {
//           position: 'top'
//         },
//         animation: false,
       
//         xAxis: {
//           type: 'category',
//           data: [1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0]
//         },
//         yAxis: {
//           type: 'category',
//           data: [1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0]
//         },
//         visualMap: {
//           min: -2.5,
//           max: 2.5,
//           calculable: true,
//           orient: 'horizontal',
//           left: '2000px',
//           bottom: '15%',
//           inRange: {
//             color: ['blue', '#ffffff', 'red'] // 配置颜色范围
//           }
//         },
//         series: [{
//           name: 'try',
//           type: 'heatmap',
//           data: heatMapData,
          
//           label: {
//             show: false
//           },
//           itemStyle: {
//             emphasis: {
//               shadowBlur: 10,
//               shadowColor: 'rgba(0, 0, 0, 0.5)'
//             }
//           }
//         }]
          
  

// }
//     })
//     .catch(error => {
//       console.error(error);
//     });










option7.value={
  title: {
    text: '月度NAOI预测技巧',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    name: '预测提前期（月）',
    axisLine: {
          lineStyle: {
            color: 'black'
          },
          onZero: false  // 坐标轴与负刻度对齐
        },
    data:['1','2','3','4','5','6']
  },
  yAxis: {
    type: 'value',
    name: '相关系数技巧',
    min: -0.2,
    data: [-0.2, 0.0, 0.2, 0.4, 0.6 ,0.8]
  },
  legend: { //图例
    data: ['95% significance','ECMWF','ECCC','NAO-MCR'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: '95% significance',
      type: 'line',
      lineStyle: {
            type: "dashed", // 将线条类型改为虚线
          },
      data: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35]
    },
    {
      name: 'ECMWF',
      type: 'line',
      data: [0.8, 1.0, 0.5, -0.1, -0.12, 0.3]
    } ,
    {
      name: 'ECCC',
      type: 'line',
      data: [0.6, 0.8, 0.75, 0.9, 0.1, 0.0]
    } ,
    {
      name: 'NAO-MCR',
      type: 'line',
      data: [0.7, 0.43, 0.45, 0.4, 0.35, 0.45]
    }      

  ]
}



</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      NAO预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>    
    <el-tabs type="border-card">
      <el-tab-pane label="指数预测">
        <h2 class="title">
          {{ selectedYear }}年{{ selectedMonth }}月 预测结果分布误差图
        </h2>
        <div v-for="i in list">
          <img :src="i">          
        </div>
        <!-- <div class="chart">
          <v-chart :option="option1" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option2" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option3" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option4" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option5" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option6" autoresize></v-chart>
        </div> -->
        <div class="description">
          {{ text_of_option1 }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="模态预测">
        <h2 class="title">
           NAOI指数预测的相关系数
        </h2>
        <div class="chart">
          <v-chart :option="option7" autoresize></v-chart>
        </div>   
        <div class="description">
          {{ text_of_option7 }}
        </div>
      </el-tab-pane>
     
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
  .title {
    text-align: center
  }
  .chart {
    height: 500px;
  }

  .description {
    font-size: 16px;
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
