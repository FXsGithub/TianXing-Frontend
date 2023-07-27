<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import * as echarts from "echarts";
import { nextTick } from "vue";
import axios  from "axios";
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
function get_end_year(){
if(Number(start_month.value) < 12)
end_year.value = Number(start_year.value) - 1 + '';
else
end_year.value = Number(start_year.value) + '';
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


update_chart3();
update_chart4();
}
/* 时间选择器 -- end */
/* chart 3-4 -- begin */
const legend_chart3 = ref([])
const xAxis_chart4 =  ref([])
const data_chart4 = ref([])
/* chart3 ,chart4 的下方文字描述 */
let Chart3_Description = reactive({single:true, text:'此处为不同起报月份的绝对差值分布箱型图。'})
let Chart4_Description = reactive({single:true, text:'此处为不同起报月份的相关性技巧折线图。'})
/* 返回chart3的标签/chart4的x轴data */
function get_description_34(type_des){
  get_end_year();
  get_end_month();
  /* end_year end_month  -> start_year  start_month */
  var cur_year = Number(end_year.value);
  var cur_month = Number(end_month.value);
  var cur_des = '起报预报误差';   //yyyy年m月起报预报误差
  if(type_des == 4)              //yyyy年n月起报结果
    cur_des = '起报结果';
  var result = []
  for(let i = 0; i < 12; i++){
    var tmp = cur_year + '年' + cur_month + '月' + cur_des;
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
/* chart3的属性 */
const series_3 =ref([{}])
const data_chart3 = ref([[]])
/* 更新 文本描述, chart3的标签、数值,chart4的x轴、数值*/
function update_chart3(){
  legend_chart3.value = [];   //更新标签
  legend_chart3.value = get_description_34(3);
  
  Chart3_Description.text = '此处为不同起报月份的绝对差值分布箱型图。';   //更新文字描述
  var cur_year = Number(end_year.value);
  var cur_month = Number(end_month.value);
  get_end_year();
  get_end_month();
  var tmp = [];
  for(let i = 0; i < 12; i++){
    
    axios.get('/enso/predictionExamination/errorBox?year='+Number(cur_year)+'&month='+Number(cur_month))
    //axios.get('/enso/predictionExamination/errorBox?year=2022&month=2')   //使用mock测试时使用此行，否则改为上行
    .then(res => {      
      var errorBox = [res.data.nino34_mean.min, res.data.nino34_mean.q1
      , res.data.nino34_mean.median, res.data.nino34_mean.q3, res.data.nino34_mean.max];
      tmp.push(errorBox);
      if(tmp.length == 12){
        data_chart3.value = tmp;
        update_series_3();
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
/*
nino34_mean: {
"q1": 0.155,
"q3": 0.7350000000000001,
"min": 0.07,
"median": 0.45,
"max": 0.8800000000000001
 }
*/
}
function update_series_3(){
  series_3.value = [{}];
  var tmp = [];
  for(let i = 0; i < 12; i++){
    tmp.push(
        {
          name: legend_chart3.value[i],
          type: 'boxplot',
          data: [data_chart3.value[i]],       //数据项最小值、下四分位数、中位数、上四分位数、最大值
        }
    );
  }
  series_3.value = tmp;
}
function update_chart4(){ 
  xAxis_chart4.value = [];    //更新x轴标签
  xAxis_chart4.value = get_description_34(4);

  Chart4_Description.text = '此处为不同起报月份的相关性技巧折线图。';   //更新文字描述
  
  data_chart4.value = [];   //更新数据
  var cur_year = Number(end_year.value);
  var cur_month = Number(end_month.value);
  get_end_year();
  get_end_month();
  var errorCorr = []
  for(let i = 0; i < 12; i++){
    axios.get('/enso/predictionExamination/errorCorr?year='+Number(cur_year)+'&month='+Number(cur_month))
    //axios.get('/enso/predictionExamination/errorCorr?year=2022&month=2')      //使用mock测试时使用此行，否则改为上行
    .then(res => {
        errorCorr.push(res.data.nino34_mean)
        if(errorCorr.length==12)
          data_chart4.value = errorCorr
      });
    if(Number(cur_month) < 12){
      cur_month++;
    }
    else{
      cur_year++;
      cur_month = 1;
    }
  }; 

}
/* chart 3-4 -- end */

const initChart1 = () => {
  let myChart1 = echarts.init(
      document.getElementById("chart_of_monthly_comparison")
  );
  myChart1.setOption({
    title: {
      text: "预报结果逐月对比",
      left:"center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [
        "2022年2月",
        "2022年3月",
        "2022年4月",
        "2022年5月",
        "气候中心Nino3.4指数记录",
      ],
      bottom:0,
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
      data: [
        "Feb-22",
        "Mar-22",
        "Apr-22",
        "May-22",
        "Jun-22",
        "Jul-22",
        "Aug-22",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "2022年2月",
        type: "line",
        stack: "Total",
        lineStyle: {
          type: "dashed", // 将线条类型改为虚线
        },
        data: [-120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "2022年3月",
        type: "line",
        stack: "Total",
        lineStyle: {
          type: "dashed", // 将线条类型改为虚线
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "2022年4月",
        type: "line",
        stack: "Total",
        lineStyle: {
          type: "dashed", // 将线条类型改为虚线
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "2022年5月",
        type: "line",
        stack: "Total",
        lineStyle: {
          type: "dashed", // 将线条类型改为虚线
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "气候中心Nino3.4指数记录",
        type: "line",
        stack: "Total",
        lineStyle: {
          color: "black", // 将颜色改为红色（你可以使用任何CSS颜色值）
          width: 4, // 将线条宽度改为3
          // 根据需求添加更多样式属性
        },
        itemStyle: {
          // 添加itemStyle属性来自定义节点样式
          color: "black", // 将节点颜色改为黑色
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  });

};

const initChart2 = () => {
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
      data: ['Evaporation', 'Precipitation', 'Temperature','Temperature2'],
      bottom:0,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Precipitation',
        min: -100,
        max: 250,
        interval: 50,
      },

    ],
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: 'Temperature',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [-10, -15, -40, -6, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      },
      {
        name: 'Temperature2',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [-20, -22, -43, -61, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  });
};

const initChart3 = () => {
  legend_chart3.value = get_description_34(3);
  update_chart3();
  let myChart3 = echarts.init(
      document.getElementById("chart_of_error_analysis")
  );
  myChart3.setOption({
   title: [
    {
      text: '误差分析箱型图',
      left: 'center'
    },
  ],
  legend: {
    x:'center',
    y:'bottom',
    tooltip: {
      show: true
    }
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '25%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    show:false,
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
  },
  yAxis: {
    type: 'value',
    name: 'Niño 3.4 Index',
    splitArea: {
      show: true
    },
  data:[0, 0.1, 0.2, 0.3, 0.4, 0.5]
  },
  series: series_3.value,
  });

  watch(series_3, () => {
    myChart3.clear();
    myChart3.setOption({
      title: [
    {
      text: '误差分析箱型图',
      left: 'center'
    },
      ],
      legend: {
    x:'center',
    y:'bottom',
    tooltip: {
      show: true
    }
      },
      tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
      },
      grid: {
    left: '10%',
    right: '10%',
    bottom: '25%'
      },
      xAxis: {
    type: 'category',
    boundaryGap: true,
    show:false,
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
      },
      yAxis: {
    type: 'value',
    name: 'Niño 3.4 Index',
    splitArea: {
      show: true
    },
  data:[0, 0.1, 0.2, 0.3, 0.4, 0.5]
      },
      series: series_3.value,
    })
  },)
};

const initChart4 = () => {
  xAxis_chart4.value = get_description_34(4);
  update_chart4();
  let myChart4 = echarts.init(
      document.getElementById("chart_of_correlation_analysis")
  );
  myChart4.setOption({
  title:[
    {
      text: '预测结果逐月相关性分析',
      left: 'center'
    }
  ],
  xAxis: {
    type: 'category',
    data: xAxis_chart4.value,
    axisLabel: {
      show:true,
      rotate:30,
      }
  },
  yAxis: {
    type: 'value',
    name: 'Niño 3.4 Index',
    data:[0, 0.2, 0.4, 0.6, 0.8, 1]
  },
  series: [
    {
      data: data_chart4.value,
      type: 'line'
    }
  ]
  });

  watch(data_chart4, () => {
  myChart4.setOption({
    xAxis: {
      type: 'category',
      data: xAxis_chart4.value,
      axisLabel: {
        show:true,
        rotate:30,
      }
    },
    series: [
    {
      data: data_chart4.value,
      type: 'line'
    }
  ]
  })
},)
};

onMounted(() => {
  setTimeout(() => {
    initChart1();
  }, 20);  //延迟图表生成，等页面的框架都渲染出来了，能获取高度宽度了
  setTimeout(() => {
    initChart2();
  }, 20);
  setTimeout(() => {
    initChart3();
  }, 20);
  setTimeout(() => {
    initChart4();
  }, 20);
});

</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      ENSO预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="逐月比对">
        <div class="chart1" id="chart_of_monthly_comparison" style="height: 400px;"></div>
        <p class="text1">于2023年冬季发展为厄尔尼诺时间，Nino3.4指数峰值为1.19，随后逐渐减弱，与24年4月过渡为中性状态
        </p>
      </el-tab-pane>
      <el-tab-pane label="预报误差">
        <el-button-group id="arrow">
          <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
          <el-button type="primary">
            Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </el-button-group>
        <div class="chart2" id="chart_of_error_histogram" style="width: 1000px; height: 400px;"></div>
      </el-tab-pane>
      <el-tab-pane label="误差分析">
        <div class="chart3" id="chart_of_error_analysis" style="width: 1000px;height: 400px;"></div>
        <p class="text3">{{Chart3_Description.text}}
        </p>
      </el-tab-pane>
      <el-tab-pane label="相关系数">
        <div class="chart4" id="chart_of_correlation_analysis" style="width: 1000px;height: 400px;"></div>
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
  .chart {
    height: 500px;
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
  .chart3 {
    height: 400px;
  }
  .chart4 {
    height: 400px;
  }
  .text1{
    text-align: center;
  }
  .text3{
    text-align: center;
  }
  .text4{
    text-align: center;
  }
</style>
