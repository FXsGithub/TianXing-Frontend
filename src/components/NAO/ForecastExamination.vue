
<script setup>

import { ref} from "vue";
import VChart from 'vue-echarts'
import axios from 'axios';

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''


const SICChartErroPrediction = '预测误差主要来自于对中纬度和冰岛附近低压的高估，能够预测出NAO的典型两级模态 ，模拟误差随着预测时长逐渐增加。'

const SICChartErroAdd = '对于为期1个月的NAOI预测，不如高分辨率模式ECMWF ，但与低分辨率模式ECCC相当。由于只接受月平均数作为输入，忽略了决定短时尺度可预测性的天气现象和初始条件。在超过两个月的提前期的预测技巧远远超过了失去预测能力的数值模式，将NAO的有效预测时间从1个月扩展到了6个月。'

const selectedYear = ref('');
const selectedMonth = ref('');

selectedYear.value = year;
selectedMonth.value = month;




const chartTitle = ref('')
chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`

const chartTitle2 = ref('')
chartTitle2.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`

const chartTitle3 = ref('')
chartTitle3.value = `2022年SIC回报结果误差箱型图`

const chartTitle4 = ref('')
chartTitle4.value = `SIE预测误差分析`

const option1 = ref({})
const option2 = ref({})
const option3 = ref({})
const option4 = ref({})
const option5 = ref({})
const option6 = ref({})
const option7 = ref({})


const chartX = ref('')
chartX.value = [`${selectedYear.value}/${selectedMonth.value}/1`,`${selectedYear.value}/${selectedMonth.value}/2`,`${selectedYear.value}/${selectedMonth.value}/3`,
          `${selectedYear.value}/${selectedMonth.value}/4`,`${selectedYear.value}/${selectedMonth.value}/5`,`${selectedYear.value}/${selectedMonth.value}/6`,
          `${selectedYear.value}/${selectedMonth.value}/7`,`${selectedYear.value}/${selectedMonth.value}/8`,`${selectedYear.value}/${selectedMonth.value}/9`,
          `${selectedYear.value}/${selectedMonth.value}/10`,`${selectedYear.value}/${selectedMonth.value}/11`,`${selectedYear.value}/${selectedMonth.value}/12`,
          `${selectedYear.value}/${selectedMonth.value}/13`,`${selectedYear.value}/${selectedMonth.value}/14`,`${selectedYear.value}/${selectedMonth.value}/15`,
          `${selectedYear.value}/${selectedMonth.value}/16`,`${selectedYear.value}/${selectedMonth.value}/17`,`${selectedYear.value}/${selectedMonth.value}/18`,
          `${selectedYear.value}/${selectedMonth.value}/19`,`${selectedYear.value}/${selectedMonth.value}/20`,`${selectedYear.value}/${selectedMonth.value}/21`,
          `${selectedYear.value}/${selectedMonth.value}/22`,`${selectedYear.value}/${selectedMonth.value}/23`,`${selectedYear.value}/${selectedMonth.value}/24`,
          `${selectedYear.value}/${selectedMonth.value}/25`,`${selectedYear.value}/${selectedMonth.value}/26`,`${selectedYear.value}/${selectedMonth.value}/27`,]


function updateChartTitle() {
  chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
  // chartTitle2.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
  chartTitle3.value = `2022年SIC回报结果误差箱型图`;
  chartTitle4.value = `SIE预测误差分析`;
  chartX.value = [`${selectedYear.value}/${selectedMonth.value}/1`,`${selectedYear.value}/${selectedMonth.value}/2`,`${selectedYear.value}/${selectedMonth.value}/3`,
          `${selectedYear.value}/${selectedMonth.value}/4`,`${selectedYear.value}/${selectedMonth.value}/5`,`${selectedYear.value}/${selectedMonth.value}/6`,
          `${selectedYear.value}/${selectedMonth.value}/7`,`${selectedYear.value}/${selectedMonth.value}/8`,`${selectedYear.value}/${selectedMonth.value}/9`,
          `${selectedYear.value}/${selectedMonth.value}/10`,`${selectedYear.value}/${selectedMonth.value}/11`,`${selectedYear.value}/${selectedMonth.value}/12`,
          `${selectedYear.value}/${selectedMonth.value}/13`,`${selectedYear.value}/${selectedMonth.value}/14`,`${selectedYear.value}/${selectedMonth.value}/15`,
          `${selectedYear.value}/${selectedMonth.value}/16`,`${selectedYear.value}/${selectedMonth.value}/17`,`${selectedYear.value}/${selectedMonth.value}/18`,
          `${selectedYear.value}/${selectedMonth.value}/19`,`${selectedYear.value}/${selectedMonth.value}/20`,`${selectedYear.value}/${selectedMonth.value}/21`,
          `${selectedYear.value}/${selectedMonth.value}/22`,`${selectedYear.value}/${selectedMonth.value}/23`,`${selectedYear.value}/${selectedMonth.value}/24`,
          `${selectedYear.value}/${selectedMonth.value}/25`,`${selectedYear.value}/${selectedMonth.value}/26`,`${selectedYear.value}/${selectedMonth.value}/27`,]

 option1.value.title= {
      text: chartTitle.value,
      left: 'center' //标题水平居中
 }

 option1.value.xAxis= {
        data: chartX.value
 }

 option2.value.xAxis= {
        data: chartX.value
 }


  // option2.value.title= {

  //     text: chartTitle2.value,
  //     left: 'center' //标题水平居中
  //   }


  option3.value.title={
      text: chartTitle3.value,
      left: 'center' //标题水平居中
    }


  option4.value.title={
      text: chartTitle4.value,
      left: 'center' //标题水平居中
   }

  

}

// axios.get('http://mockjs.xiaoyaoji.cn/mock/20OIzKbo31s/seaice/errorBox')   //使用mock测试时使用此行，否则改为上行

axios.get('/mock/20OIzKbo31s/seaice/error')
      .then(res => {
        console.log(res.data)
        option1.value = res.data
      })


option1.value={
  title: {
    text: chartTitle.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    name: '时间',
    data: chartX.value
  },
  yAxis: {
    type: 'value',
    name: 'BACC(%)',
    data: [10, 12, 14, 16, 18]
  },
  legend: { //图例
    data: ['ours', 'persistence'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: 'ours',
      type: 'line',
      data: [10, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1,10,12,14,16,18,10,
              1, 1, 1, 1, 1, 1, 1, 1, 1]
              
    },
    {
      name: 'persistence',
      type: 'line',
      data: [2, 2, 12, 2, 2, 2, 2, 2, 2, 
              1, 1, 1,10,12,14,16,18,10,
              1, 1, 1, 1, 1, 1, 1, 10, 1]
    },

  ]
}

axios.get('/mock/20OIzKbo31s/seaice/error')
      .then(res => {
        console.log(res.data)
        option2.value = res.data
      })

option2.value={
  title: {
    text: chartTitle2.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    name: '时间',
    data: chartX.value
  },
  yAxis: {
    type: 'value',
    name: 'RMSE(%)',
    data: [10, 12, 14, 16, 18]
  },
  legend: { //图例
    data: ['ours', 'persistence'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: 'ours',
      type: 'line',
      data: [2, 2, 12, 2, 2, 2, 2, 2, 2, 
              1, 1, 1,10,12,14,16,18,10,
              1, 1, 1, 1, 1, 1, 1, 10, 1]
    },
    {
      name: 'persistence',
      type: 'line',
      data: [10, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1,10,12,14,16,18,10,
              1, 1, 1, 1, 1, 1, 1, 1, 1]
    },

  ]
}


axios.get('/mock/20OIzKbo31s/seaice/errorBox')
      .then(res => {
        console.log(res.data)
        option3.value = res.data
      })


option3.value={
  title: {
    text: chartTitle3.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    name: 'Lead time',
    data: ['1day', '2day', '3day', '4day','5day','6day','7day']
  },
  yAxis: {
    type: 'value',
    name: 'RMSE(%)',
    data: [0, 5, 10, 15, 20]
  },
  series: [
    {
      name: 'withoutDA_withoutBC',
      type: 'candlestick',
      data: [
        [5, 15, 10, 20],
        [10, 6, 20, 10],
        [15, 20, 5, 20],
        [20, 5, 7, 10],
        [10, 6, 20, 10],
        [15, 20, 5, 20],
        [5, 15, 10, 20]
      ]
    },
    {
      name: 'withoutDA_withBC_RMSE',
      type: 'candlestick',
      data: [
        [15, 9, 10, 20],
        [10, 15, 20, 10],
        [5, 20, 5, 20],
        [10, 5, 15, 10],
        [10, 15, 20, 10],
        [5, 20, 5, 20],
        [10, 5, 15, 10]
      ]
    },
    {
      name: 'withDA_withoutBC_RMSE',
      type: 'candlestick',
      data: [
        [5, 5, 10, 20],
        [6, 7, 20, 10],
        [15, 10, 5, 20],
        [10, 10, 13, 5],
        [5, 5, 10, 20],
        [10, 10, 13, 5],
        [6, 7, 20, 10]
      ]
    },
    {
      name: 'MITgcm(with DA)withBC_RMSE',
      type: 'candlestick',
      data: [
        [15, 15, 10, 20],
        [8, 15, 20, 18],
        [5, 20, 6, 20],
        [10, 5, 9, 10],
        [5, 20, 6, 20],
        [15, 15, 10, 20],
        [8, 15, 20, 18]
      ]
    }
  ]

}

axios.get('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis')
      .then(res => {
        console.log(res.data)
        option4.value = res.data
      })


option4.value={
  title: {
    text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['2020 spring','2020 summer','2020 fall','2020 winter',
           '2021 spring','2021 summer', '2021 fall','2021 winter',
           '2022 spring','2022 summer', '2022 fall','2022 winter']
  },
  yAxis: {
    type: 'value',
    name: 'RMSD(million km²)',
    data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0]
  },
  legend: { //图例
    data: [''],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      // name: 'ours',
      type: 'line',
      data: [0, 0.2, 0.1, 0.8, 0.3, 0.2, 0.1, 0.1, 0.6, 0.5, 0.1, 1.1,1.7]
    }    
  ]
}

axios.get('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis')
      .then(res => {
        console.log(res.data)
        option5.value = res.data
      })


option5.value={
  title: {
    text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['2020 spring','2020 summer','2020 fall','2020 winter',
           '2021 spring','2021 summer', '2021 fall','2021 winter',
           '2022 spring','2022 summer', '2022 fall','2022 winter']
  },
  yAxis: {
    type: 'value',
    name: 'RMSD²(million km²)',
    data: [0.2, 0.4, 0.6, 0.8, 1.0 ,1.2 ,1.4 ,1.6 ,1.8]
  },
  legend: { //图例
    data: ['bais', 'variance'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: 'bais',
      type: 'bar',
      data: [3, 1, 1, 1.5, 1, 2.1, 1, 2.0, 1, 1.5, 0.5, 1]
    },
    {
      name: 'variance',
      type: 'bar',
      data: [3, 1.5, 1.0, 2.5, 2.0, 2.1, 1, 2.0, 1, 0.5, 2.5, 1]
    },

  ]
}

axios.get('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis')
      .then(res => {
        console.log(res.data)
        option6.value = res.data
      })

option6.value={
  title: {
    text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['2020 spring','2020 summer','2020 fall','2020 winter',
           '2021 spring','2021 summer', '2021 fall','2021 winter',
           '2022 spring','2022 summer', '2022 fall','2022 winter']
  },
  yAxis: {
    type: 'value',
    name: 'Correlation coefficient',
    data: [0.970, 0.975, 0.980, 0.985, 0.990 ,0.995 ,1.000]
  },
  legend: { //图例
    data: [''],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      // name: 'ours',
      type: 'line',
      data: [0.970, 0.985, 0.990, 0.978, 0.980, 0.995, 1.000, 0.975, 0.990, 1.000, 0.990, 1.000,0.976]
    }    
  ]
}

// axios.get('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis')
//       .then(res => {
//         console.log(res.data)
//         option7.value = res.data
//       })

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
        <div class="chart">
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
        </div>
        <div class="description">
          {{ SICChartErroPrediction }}
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
          {{ SICChartErroAdd }}
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
