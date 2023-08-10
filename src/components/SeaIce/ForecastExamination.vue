<script setup>

import { ref} from "vue";
import VChart from 'vue-echarts'
import axios from 'axios';

const currentDate = new Date();
const year = currentDate.getFullYear() - 1 + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''

const selectedYear = ref('');
const selectedMonth = ref('');

// selectedYear.value = year;
// selectedMonth.value = month;

if (year !== '2023') {
  selectedYear.value = '2023'; // 默认选中2023年
} else {
  selectedYear.value = year;
}

if (month !== '01') {
  selectedMonth.value = '01'; // 默认选中1月
} else {
  selectedMonth.value = month;
}

const disabledYear = () => {
  const allowedYear = [2023];
  const disabledYear = [2020,2021,2024,2025,2026,2027,2028,2029];

  // for (let i = 0; i < 60; i++) {
  //   if (!allowedMinute.includes(i)) {
  //     disabledMinute.push(i);
  //   }
  // }

  return disabledYear;
};

const disabledMonth = () => {
  const allowedMonth = [1];
  const disabledMonth = [2,3,4,5,6,7,8,9,10,11,12];

  // for (let i = 0; i < 60; i++) {
  //   if (!allowedSecond.includes(i)) {
  //     disabledSecond.push(i);
  //   }
  // }

  return disabledMonth;
};

const limitedDateRange = (time) => {
  return time.getFullYear() < 2022  || time.getFullYear() > 2023;
};
const limitedDateRange2 = (time) => {
  return ((time.getFullYear() != 2023 && time.getFullYear() != 2022) && (time.getMonth() >= 0 && time.getMonth() <= 11)) ||  ((time.getFullYear() == 2023 || time.getFullYear() == 2022) && (time.getMonth() >= 1 && time.getMonth() <= 11));
};
// const limitedDateRange2 = (time) => {
//   return  (time.getMonth() == 2 || time.getMonth() == 3 || time.getMonth() == 4 || time.getMonth() == 5 || time.getMonth() == 6 || time.getMonth() == 7 || time.getMonth() == 8 || time.getMonth() == 9 || time.getMonth() == 10 || time.getMonth() == 11 || time.getMonth() == 12 || time.getMonth() == 1) ;
// };
// let SICChartErroPrediction = reactive({single:true, text:'这张图显示了2023年6月的4周SIC预测结果与基线方法的比较。预测结果始终优于persistence，在第28天，预测结果比persistence的RMSE低26'})
// let SICChartErroAdd = reactive({single:true,text:'此处的12副图分别为从2022年2这张图显示了2022年里四种SIC预测结果提前1到7天的统计结果。MITgcm月~2023年1月起报的预测结果、官方记录结果及二者绝对差值图（柱状）。'})
// /* chart3 ,chart4 的下方文字描述 */
// let SIEChartErroAnalyse = reactive({single:true, text:'rmsd用来分析预报误差成因，其由偏差与方差两部分组成。从图b可以看出，除2020与2022年春季外，其他年份季节的rmsd主要由偏差构成，而从图d可知，当预报与观测之间的标准差偏差大时，对应了偏差的大值部分。而对于2020年与2022年春季的rmsd主要由方差构成，对应图c可知，当预报相关性系数较低时会造成较大的方差。'})




const SICChartErroPrediction = ref('这张图显示了2023年1月的4周SIC预测结果与基线方法的比较。预测结果始终优于persistence，在第28天，预测结果比persistence的RMSE低26.48%，证明了预测结果的有效性。')

const SICChartErroAdd = ref('这张图显示了2022年里四种SIC预测结果提前1到7天的统计结果。MITgcm output (with DA) with BC显著降低了SIC的预测误差，RMSE一直低于0.09，更好地提高了SIC预报结果准确性。')

const SIEChartErroAnalyse = ref('rmsd用来分析预报误差成因，其由偏差与方差两部分组成。从图b可以看出，除2020与2022年春季外，其他年份季节的rmsd主要由偏差构成，而从图d可知，当预报与观测之间的标准差偏差大时，对应了偏差的大值部分。而对于2020年与2022年春季的rmsd主要由方差构成，对应图c可知，当预报相关性系数较低时会造成较大的方差。')




// const selectedDateTime = ref(null);
// const selectedYear = ref(null); // 新变量，用于存储选定的年份
// const selectedMonth = ref(null); // 新变量，用于存储选定的月份

// const date = new Date(2023,0,1,0,0,0);
// selectedDateTime.value = date;
// selectedYear.value = date.getFullYear();
// selectedMonth.value = date.getMonth() + 1;

const chartTitle = ref('')
//chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月 预测结果误差折线图`
chartTitle.value = `2023年1月预测结果误差折线图`


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
  //chartTitle.value = `${selectedYear.value}年${selectedMonth.value}月 预测结果误差折线图`;
  chartTitle2.value = `${selectedYear.value}年${selectedMonth.value}月~${Number(selectedYear.value) + 1 + ''}年${selectedMonth.value}月 预测结果误差折线图`;
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

//    // 当日期时间选择发生变化时被调用
// // console.log(selectedYear.value); // 输出当前选择的日期和时间
// // console.log(selectedMonth.value); // 输出当前选择的日期和时间

// if (selectedDateTime.value) {
//   const selectedDate = new Date(selectedDateTime.value);
//   selectedYear.value = selectedDate.getFullYear(); // 获取年份值并存储到 selectedYear
//   selectedMonth.value = selectedDate.getMonth() + 1; // 获取月份值并存储到 selectedMonth
// }

  

}




//axios.get('http://www.tjensoprediction.com:8080/seaice/error?year=2023&month=1')
 axios.get('http://www.tjensoprediction.com:8080/seaice/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
    .then(response => {
      console.log(response.data);
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
      data:  response.data["2023_BACC"],
              
    },
    {
      name: 'persistence',
      type: 'line',
      data:  response.data["2023_per_BACC"],
    },

  ]
}

 //SICChartErroPrediction.value = response.data.description;
 })
    .catch(error => {
      console.error(error);
 });
      


// option1.value={
//   title: {
//     text: chartTitle.value,
//     left: 'center' //标题水平居中
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     name: '时间',
//     data: chartX.value
//   },
//   yAxis: {
//     type: 'value',
//     name: 'BACC(%)',
//     data: [10, 12, 14, 16, 18]
//   },
//   legend: { //图例
//     data: ['ours', 'persistence'],
//     orient: 'horizontal',
//     left: 'center',
//     bottom: '5',
//   },
//   series: [
//     {
//       name: 'ours',
//       type: 'line',
//       data: []
              
//     },
//     {
//       name: 'persistence',
//       type: 'line',
//       data: []
//     },

//   ]
// }

//axios.get('http://www.tjensoprediction.com:8080/seaice/error?year=2023&month=1')
axios.get('http://www.tjensoprediction.com:8080/seaice/error?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
    .then(response => {
      console.log(response.data);
      option2.value={
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
      data: response.data["2023_RMSE"],
    },
    {
      name: 'persistence',
      type: 'line',
     data: response.data["2023_per_RMSE"],
    },

  ]
}

    // SICChartErroPrediction.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });

// option2.value={
//   // title: {
//   //   text: chartTitle2.value,
//   //   left: 'center' //标题水平居中
//   // },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     name: '时间',
//     data: chartX.value
//   },
//   yAxis: {
//     type: 'value',
//     name: 'RMSE(%)',
//     data: [10, 12, 14, 16, 18]
//   },
//   legend: { //图例
//     data: ['ours', 'persistence'],
//     orient: 'horizontal',
//     left: 'center',
//     bottom: '5',
//   },
//   series: [
//     {
//       name: 'ours',
//       type: 'line',
//       data: []
//     },
//     {
//       name: 'persistence',
//       type: 'line',
//       data: []
//     },

//   ]
// }


//axios.get('http://www.tjensoprediction.com:8080/seaice/errorBox?year='+Number(selectedYear.value)+'&month='+Number(selectedMonth.value))
axios.get('http://www.tjensoprediction.com:8080/seaice/errorBox?year=2022')
    .then(response => {
      console.log(response.data);
      const data0 = response.data["withoutDA_withoutBC"];
      const data1 = response.data["withoutDA_withBC_RMSE"];
      const data2 = response.data["withDA_withoutBC_RMSE"];
      const data3 = response.data["MITgcm(with DA)withBC_RMSE"];
  option3.value={
    title: {
    text: chartTitle3.value,
    left: 'center' //标题水平居中
  },

    dataset: [
      {
        source: data0
      },
      {
        source: data1
      },
      {
        source: data2
      },
      {
        source: data3
      },
      {
        fromDatasetIndex: 0,
        transform: { type: 'boxplot' }
      },
      {
        fromDatasetIndex: 1,
        transform: { type: 'boxplot' }
      },
      {
        fromDatasetIndex: 2,
        transform: { type: 'boxplot' }
      },
      {
        fromDatasetIndex: 3,
        transform: { type: 'boxplot' }
      }
    ],
    legend: {
      top: '10%'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '10%',
      top: '20%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      name: 'Lead time',
      axisLabel: {
         formatter: function(value) {
             return (parseInt(value) + 1) + 'day';
         },
      align: 'center'
      },
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: true
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: 'RMSE(%)',
      splitArea: {
        show: false
      }
    },
    series: [
      {
        name: 'withDA_withoutBC_RMSE',
        type: 'boxplot',
        datasetIndex: 4
      },
      {
        name: 'withoutDA_withoutBC',
        type: 'boxplot',
        datasetIndex: 5
      },
      {
        name: 'withoutDA_withBC_RMSE',
        type: 'boxplot',
        datasetIndex: 6
      },
      {
        name: 'MITgcm(with DA)withBC_RMSE',
        type: 'boxplot',
        datasetIndex: 7
      }
    ]

}

    //SICChartErroAdd.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });


// option3.value={
//   title: {
//     text: chartTitle3.value,
//     left: 'center' //标题水平居中
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     name: 'Lead time',
//     data: ['1day', '2day', '3day', '4day','5day','6day','7day']
//   },
//   yAxis: {
//     type: 'value',
//     name: 'RMSE(%)',
//     data: [0, 5, 10, 15, 20]
//   },
//   series: [
//     {
//       name: 'withoutDA_withoutBC',
//       type: 'candlestick',
//       data: [
//       ]
//     },
//     {
//       name: 'withoutDA_withBC_RMSE',
//       type: 'candlestick',
//       data: [
//       ]
//     },
//     {
//       name: 'withDA_withoutBC_RMSE',
//       type: 'candlestick',
//       data: [
//       ]
//     },
//     {
//       name: 'MITgcm(with DA)withBC_RMSE',
//       type: 'candlestick',
//       data: [
//       ]
//     }
//   ]

// }


 axios.get('http://www.tjensoprediction.com:8080/seaice/predictionExamination/errorAnalysis?year=2020-2022')
    .then(response => {
      console.log(response.data);
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
      type: 'line',
      data: response.data["RMSD"]
    }    
  ]
}

    //SIEChartErroAnalyse.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });



// option4.value={
//   title: {
//     text: chartTitle4.value,
//     left: 'center' //标题水平居中
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     // name: '时间',
//     data: ['2020 spring','2020 summer','2020 fall','2020 winter',
//            '2021 spring','2021 summer', '2021 fall','2021 winter',
//            '2022 spring','2022 summer', '2022 fall','2022 winter']
//   },
//   yAxis: {
//     type: 'value',
//     name: 'RMSD(million km²)',
//     data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0]
//   },
//   legend: { //图例
//     data: [''],
//     orient: 'horizontal',
//     left: 'center',
//     bottom: '5',
//   },
//   series: [
//     {
//       // name: 'ours',
//       type: 'line',
//       data: []
//     }    
//   ]
// }


axios.get('http://www.tjensoprediction.com:8080/seaice/predictionExamination/errorAnalysis?year=2020-2022')
    .then(response => {
      console.log(response.data);
      option5.value={
  title: {
    // text: chartTitle4.value,
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
      data: response.data["BAIS"]
    },
    {
      name: 'variance',
      type: 'bar',
      data: response.data["VAR"]
    },

  ]
}

    //SIEChartErroAnalyse.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });


// option5.value={
//   title: {
//     // text: chartTitle4.value,
//     left: 'center' //标题水平居中
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     // name: '时间',
//     data: ['2020 spring','2020 summer','2020 fall','2020 winter',
//            '2021 spring','2021 summer', '2021 fall','2021 winter',
//            '2022 spring','2022 summer', '2022 fall','2022 winter']
//   },
//   yAxis: {
//     type: 'value',
//     name: 'RMSD²(million km²)',
//     data: [0.2, 0.4, 0.6, 0.8, 1.0 ,1.2 ,1.4 ,1.6 ,1.8]
//   },
//   legend: { //图例
//     data: ['bais', 'variance'],
//     orient: 'horizontal',
//     left: 'center',
//     bottom: '5',
//   },
//   series: [
//     {
//       name: 'bais',
//       type: 'bar',
//       data: []
//     },
//     {
//       name: 'variance',
//       type: 'bar',
//       data: []
//     },

//   ]
// }



axios.get('http://www.tjensoprediction.com:8080/seaice/predictionExamination/errorAnalysis?year=2020-2022')
    .then(response => {
      console.log(response.data);
 option6.value={
  title: {
    // text: chartTitle4.value,
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
      type: 'line',
      data: response.data["CORRELATION"]
    }    
  ]
}

    //SIEChartErroAnalyse.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });

// option6.value={
//   title: {
//     // text: chartTitle4.value,
//     left: 'center' //标题水平居中
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     // name: '时间',
//     data: ['2020 spring','2020 summer','2020 fall','2020 winter',
//            '2021 spring','2021 summer', '2021 fall','2021 winter',
//            '2022 spring','2022 summer', '2022 fall','2022 winter']
//   },
//   yAxis: {
//     type: 'value',
//     name: 'Correlation coefficient',
//     data: [0.970, 0.975, 0.980, 0.985, 0.990 ,0.995 ,1.000]
//   },
//   legend: { //图例
//     data: [''],
//     orient: 'horizontal',
//     left: 'center',
//     bottom: '5',
//   },
//   series: [
//     {
//       // name: 'ours',
//       type: 'line',
//       data: []
//     }    
//   ]
// }



axios.get('http://www.tjensoprediction.com:8080/seaice/predictionExamination/errorAnalysis?year=2020-2022')
    .then(response => {
      console.log(response.data);
  option7.value={
  title: {
    // text: chartTitle4.value,
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // name: '时间',
    data:['2020 spring','2020 summer','2020 fall','2020 winter',
           '2021 spring','2021 summer', '2021 fall','2021 winter',
           '2022 spring','2022 summer', '2022 fall','2022 winter']
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
      data: response.data["OBS_STD"]
    },
    {
      name: 'IceTFT',
      type: 'line',
      data: response.data["PRE_STD"]
    } 
 ]
}

    //SIEChartErroAnalyse.value = response.data.description;
    })
    .catch(error => {
      console.error(error);
    });

// option7.value={
//   title: {
//     // text: chartTitle4.value,
//     left: 'center' //标题水平居中
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'category',
//     // name: '时间',
//     data:['2020 spring','2020 summer','2020 fall','2020 winter',
//            '2021 spring','2021 summer', '2021 fall','2021 winter',
//            '2022 spring','2022 summer', '2022 fall','2022 winter']
//   },
//   yAxis: {
//     type: 'value',
//     name: 'standard deviation(million km²)',
//     data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0,3.5]
//   },
//   legend: { //图例
//     data: ['observation','IceTFT'],
//     orient: 'horizontal',
//     left: 'center',
//     bottom: '5',
//   },
//   series: [
//     {
//       name: 'observation',
//       type: 'line',
//       data: []
//     },
//     {
//       name: 'IceTFT',
//       type: 'line',
//       data: []
//     } 
//   ]
// }



</script>

<template>
  <div class="pageContent">
    <h1 class="title">
      <!-- {{ selectedYear }}年{{ selectedMonth }}月~{{ Number(selectedYear) + 1 + '' }}年{{ selectedMonth }}月 海冰预测结果检验 -->
      海冰预测结果检验
    </h1>
    <div class="datePickerContainer">
      <el-date-picker @change="updateChartTitle" 
      :disabledDate="limitedDateRange"
               v-model="selectedYear" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
      <div class="text">年</div>
      <el-date-picker @change="updateChartTitle"
      :disabledDate="limitedDateRange2"
       v-model="selectedMonth" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
      <div class="text">月</div> 
      <!-- <el-date-picker
              v-model="selectedDateTime"
              type="datetime"
              placeholder="请选择时间"
              @change="updateChartTitle"
          /> -->
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
