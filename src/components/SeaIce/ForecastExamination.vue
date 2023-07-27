<script setup>

import { ref} from "vue";
import VChart from 'vue-echarts'

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''


const SICChartErroPrediction = '这张图显示了2023年6月的4周SIC预测结果与基线方法的比较。预测结果始终优于persistence，在第28天，预测结果比persistence的RMSE低26.48%，证明了预测结果的有效性。'

const SICChartErroAdd = '这张图显示了2022年里四种SIC预测结果提前1到7天的统计结果。MITgcm output (with DA) with BC显著降低了SIC的预测误差，RMSE一直低于0.09，更好地提高了SIC预报结果准确性。'

const SIEChartErroAnalyse = 'rmsd用来分析预报误差成因，其由偏差与方差两部分组成。从图b可以看出，除2020与2022年春季外，其他年份季节的rmsd主要由偏差构成，而从图d可知，当预报与观测之间的标准差偏差大时，对应了偏差的大值部分。而对于2020年与2022年春季的rmsd主要由方差构成，对应图c可知，当预报相关性系数较低时会造成较大的方差。'

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

const chartX = ref('')
chartX.value = [`${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,
          `${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,
          `${selectedYear.value}/${selectedMonth.value}/`]
//还缺axio的请求代码，这段不太会，想参考一下别人的


function updateChartTitle() {
  chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
  // chartTitle2.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
  chartTitle3.value = `2022年SIC回报结果误差箱型图`;
  chartTitle4.value = `SIE预测误差分析`;
  chartX.value = [`${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,
          `${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,`${selectedYear.value}/${selectedMonth.value}/`,
          `${selectedYear.value}/${selectedMonth.value}/`]

 option1.value.title= {
      text: chartTitle.value,
      left: 'center' //标题水平居中
 }

 option1.value.xAxis= {
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

// watchEffect(() => {
//     // const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
//     // const startMonth = Number(selectedMonth.value);
//     const xAxisData = Number(selectedMonth.value);
//     option1.value.xAxis.data = xAxisData;
//     option2.value.xAxis.data = xAxisData;
//   });


const option1=ref({
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
      data: [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: 'persistence',
      type: 'line',
      data: [2, 2, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    },

  ]
})

const option2=ref({
  // title: {
  //   text: chartTitle2.value,
  //   left: 'center' //标题水平居中
  // },
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
      data: [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: 'persistence',
      type: 'line',
      data: [2, 2, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    },

  ]
})


const option3=ref({
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
      name: 'MITgcm output（without DA）',
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
      name: 'MITgcm output（without DA）with BC',
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
      name: 'MITgcm output（with DA）',
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
      name: 'MITgcm output（with DA）with BC',
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

})

const option4=ref({
  title: {
    text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['','','2020','','','', '2021','','','', '2022','']
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
})

const option5=ref({
  title: {
    // text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['','','2020','','','', '2021','','','', '2022','']
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
})


const option6=ref({
  title: {
    // text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['','','2020','','','', '2021','','','', '2022','']
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
})

const option7=ref({
  title: {
    // text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data: ['','','2020','','','', '2021','','','', '2022','']
  },
  yAxis: {
    type: 'value',
    name: 'standard deviation(million km²)',
    data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0,3.5]
  },
  legend: { //图例
    data: ['observation','IceTFT'],
    orient: 'horizontal',
    left: 'center',
    bottom: '5',
  },
  series: [
    {
      name: 'observation',
      type: 'line',
      data: [0.5, 1.0, 0.99, 1.2, 1.5, 2.0, 0.5, 2.5, 3.0, 3.5, 2.0, 1.0,1.5]
    },
    {
      name: 'IceTFT',
      type: 'line',
      data: [0.5, 0.95, 0.99, 1.5, 1.6, 2.2, 0.3, 2.2, 3.5, 3.5, 2.2, 1.0,1.5]
    }       
  ]
})



</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 海冰预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle" v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>    
    <el-tabs type="border-card">
      <el-tab-pane label="SIC日预测误差">
        <div class="chart">
          <v-chart :option="option1" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option2" autoresize></v-chart>
        </div>
        <div class="description">
          {{ SICChartErroPrediction }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIC误差统计">
        <div class="chart">
          <v-chart :option="option3" autoresize></v-chart>
        </div>
        <div class="description">
          {{ SICChartErroAdd }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="SIE误差分析">        
        <div class="chart">
          <v-chart :option="option4" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option5" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option6" autoresize></v-chart>
        </div>
        <div class="chart">
          <v-chart :option="option7" autoresize></v-chart>
        </div>          
        <div class="description">
          {{ SIEChartErroAnalyse }}
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
