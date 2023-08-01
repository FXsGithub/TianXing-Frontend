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
          // data: heatMapData,
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


axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params1 })
    .then(response => {
      //console.log(response.data);
      const data = response.data;

      let heatMapData = [];
      for (let i = 0; i < data["data"].length; i++) {
        for (let j = 0; j < data["data"][i].length; j++) {
          heatMapData.push([i, j, data["data"][i][j]]);
        }
      }

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
          data: heatMapData,
          
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
    })
    .catch(error => {
      console.error(error);
    });







option2.value={
  title: {
    // text: chartTitle2.value,
    text: '提前2个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
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
          // data: heatMapData,
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

// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option2.value = res.data
//       })

axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params2 })
    .then(response => {
      //console.log(response.data);
      const data = response.data;

      let heatMapData = [];
      for (let i = 0; i < data["data"].length; i++) {
        for (let j = 0; j < data["data"][i].length; j++) {
          heatMapData.push([i, j, data["data"][i][j]]);
        }
      }

  option2.value={
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
          data: heatMapData,
          
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
    })
    .catch(error => {
      console.error(error);
    });



option3.value={
  title: {
    // text: chartTitle3.value,
    text: '提前3个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
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
          // data: heatMapData,
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


// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option3.value = res.data
//       })

axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params3 })
    .then(response => {
      //console.log(response.data);
      const data = response.data;

      let heatMapData = [];
      for (let i = 0; i < data["data"].length; i++) {
        for (let j = 0; j < data["data"][i].length; j++) {
          heatMapData.push([i, j, data["data"][i][j]]);
        }
      }

  option3.value={
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
          data: heatMapData,
          
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
    })
    .catch(error => {
      console.error(error);
    });





option4.value={
  title: {
    // text: chartTitle4.value,
    text: '提前4个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
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
          // data: heatMapData,
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


// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option4.value = res.data
//       })

axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params4 })
    .then(response => {
      //console.log(response.data);
      const data = response.data;

      let heatMapData = [];
      for (let i = 0; i < data["data"].length; i++) {
        for (let j = 0; j < data["data"][i].length; j++) {
          heatMapData.push([i, j, data["data"][i][j]]);
        }
      }

  option4.value={
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
          data: heatMapData,
          
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
    })
    .catch(error => {
      console.error(error);
    });




option5.value={
  title: {
    // text: chartTitle4.value,
    text: '提前5个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
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
          // data: heatMapData,
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



// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option5.value = res.data
//       })

axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params5 })
    .then(response => {
      //console.log(response.data);
      const data = response.data;

      let heatMapData = [];
      for (let i = 0; i < data["data"].length; i++) {
        for (let j = 0; j < data["data"][i].length; j++) {
          heatMapData.push([i, j, data["data"][i][j]]);
        }
      }

      option5.value={
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
          data: heatMapData,
          
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
    })
    .catch(error => {
      console.error(error);
    });





option6.value={
  title: {
    // text: chartTitle4.value,
    text: '提前6个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
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
         // data: heatMapData,
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


// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option6.value = res.data
//       })

axios.get(`http://localhost:8888/nao/predictionExamination/error?year=${year}&month=${month}`, { params6 })
    .then(response => {
      //console.log(response.data);
      const data = response.data;

      let heatMapData = [];
      for (let i = 0; i < data["data"].length; i++) {
        for (let j = 0; j < data["data"][i].length; j++) {
          heatMapData.push([i, j, data["data"][i][j]]);
        }
      }

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
          data: heatMapData,
          
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
    })
    .catch(error => {
      console.error(error);
    });




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
