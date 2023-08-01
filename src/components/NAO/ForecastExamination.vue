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

// var ROOT_PATH = 'https://echarts.apache.org/examples';

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// $.get(ROOT_PATH + '/data/asset/geo/Map_of_Iceland.svg', function (svg) {
//   echarts.registerMap('iceland_svg', { svg: svg });
//   option = {
//     tooltip: {},
//     geo: {
//       tooltip: {
//         show: true
//       },
//       map: 'iceland_svg',
//       roam: true
//     },
//     series: {
//       type: 'effectScatter',
//       coordinateSystem: 'geo',
//       geoIndex: 0,
//       symbolSize: function (params) {
//         return (params[2] / 100) * 15 + 5;
//       },
//       itemStyle: {
//         color: '#b02a02'
//       },
//       encode: {
//         tooltip: 2
//       },
//       data: [
//         [488.2358421078053, 459.70913833075736, 100],
//         [770.3415644319939, 757.9672194986475, 30],
//         [1180.0329284196291, 743.6141808346214, 80],
//         [894.03790632245, 1188.1985153835008, 61],
//         [1372.98925630313, 477.3839988649537, 70],
//         [1378.62251255796, 935.6708486282843, 81]
//       ]
//     }
//   };
//   myChart.setOption(option);
//   myChart.getZr().on('click', function (params) {
//     var pixelPoint = [params.offsetX, params.offsetY];
//     var dataPoint = myChart.convertFromPixel({ geoIndex: 0 }, pixelPoint);
//     console.log(dataPoint);
//   });
// });

// option && myChart.setOption(option);




// option1.value = {
//   title: {
//     // text: SICChartTitle.value,
//     text: '提前1个月预测',
//     left: 'center'
//   },
//   visualMap: {
//     type: 'continuous',
//     min: 0,
//     max: 1,
//     top: 'middle',
//     left: 'right',
//     calculable: false,
//     handleIcon: 'none',
//     itemHeight: 200,
//     text: ['1', '0'],
//     hoverLink: false,
//     inRange: {
//       color: ['#1F5FA0', '#3F88BD', '#67A9CF', '#9DCDE3', '#D1E5F0', '#EEE2E3', '#FDDBC7', '#F8B993', '#EF8961', '#DC5C45', '#B41B2C']
//     },
//     left: 450
//   },
//   polar: {
//     center: [231, 240],
//     radius: 180
//   },
//   angleAxis: {
//     type: 'category',
//     data: ['180°', '120°E', '60°E', '0°', '60°W', '120°W'],
//     startAngle: 120,
//     interval: 30,
//     zlevel: 100
//   },
//   radiusAxis: {
//     show: false
//   },
//   xAxis: {
//     type: 'category',
//     data: ['-100', '-99', '-98', '-97', '-96', '-95', '-94', '-93', '-92', '-91', '-90', '-89', '-88', '-87', '-86', '-85', '-84', '-83', '-82', '-81', '-80', '-79', '-78', '-77', '-76', '-75', '-74', '-73', '-72', '-71', '-70', '-69', '-68', '-67', '-66', '-65', '-64', '-63', '-62', '-61', '-60', '-59', '-58', '-57', '-56', '-55', '-54', '-53', '-52', '-51', '-50', '-49', '-48', '-47', '-46', '-45', '-44', '-43', '-42', '-41', '-40', '-39', '-38', '-37', '-36', '-35', '-34', '-33', '-32', '-31', '-30', '-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
//     //show: false  //隐藏x轴
//   },
//   yAxis: {
//     type: 'category',
//     data: ['-100', '-99', '-98', '-97', '-96', '-95', '-94', '-93', '-92', '-91', '-90', '-89', '-88', '-87', '-86', '-85', '-84', '-83', '-82', '-81', '-80', '-79', '-78', '-77', '-76', '-75', '-74', '-73', '-72', '-71', '-70', '-69', '-68', '-67', '-66', '-65', '-64', '-63', '-62', '-61', '-60', '-59', '-58', '-57', '-56', '-55', '-54', '-53', '-52', '-51', '-50', '-49', '-48', '-47', '-46', '-45', '-44', '-43', '-42', '-41', '-40', '-39', '-38', '-37', '-36', '-35', '-34', '-33', '-32', '-31', '-30', '-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
//     //show: false  //隐藏y轴
//   },
//   series: [
//     {
//       name: 'Sea Ice Concentration',
//       type: 'heatmap',
//       data: [],
//       tooltip: {
//         show: false
//       }
//     },
//   ],
//   grid: {
//     width: '72%',
//     height: '75%'
//   },
// }
      // SICDescription.value = response.data.description;
    

// axios.get('http://mockjs.xiaoyaoji.cn/mock/20OIzKbo31s/seaice/errorBox')   //使用mock测试时使用此行，否则改为上行

const params = {
    year: selectedYear.value,
    month: selectedMonth.value
  };



option1.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: [
          // [60, 20],
          // [116.410886, 39.881949],
          // [116.402574, 39.912345],
          // 其他数据点...
        ]
    },
    
  ]
}

// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option1.value = res.data
//       })


axios.get('/mock/20OIzKbo31s/nao/findGridData/nao', { params })
    .then(response => {
      //console.log(response.data);
      option1.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: response.data.data1,
    },
    
  ]
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
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: [
          // [60, 20],
          // [116.410886, 39.881949],
          // [116.402574, 39.912345],
          // 其他数据点...
        ]
    },
    
  ]
}

// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option2.value = res.data
//       })

axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao', { params })
    .then(response => {
      //console.log(response.data);
      option2.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: response.data.predictionData,
    },
    
  ]
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
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: [
          // [60, 20],
          // [116.410886, 39.881949],
          // [116.402574, 39.912345],
          // 其他数据点...
        ]
    },
    
  ]

}

// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option3.value = res.data
//       })

axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao', { params })
    .then(response => {
      //console.log(response.data);
      option3.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: response.data.predictionData,
    },
    
  ]
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
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: [
          // [60, 20],
          // [116.410886, 39.881949],
          // [116.402574, 39.912345],
          // 其他数据点...
        ]
    },
    
  ]
}


// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option4.value = res.data
//       })

axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao', { params })
    .then(response => {
      //console.log(response.data);
      option4.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: response.data.predictionData,
    },
    
  ]
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
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: [
          // [60, 20],
          // [116.410886, 39.881949],
          // [116.402574, 39.912345],
          // 其他数据点...
        ]
    },
    
  ]
}



// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option5.value = res.data
//       })

axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao', { params })
    .then(response => {
      //console.log(response.data);
      option5.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: response.data.predictionData,
    },
    
  ]
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
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      // name: 'ours',
      type: 'scatter',
      data: [
          [60, 20],
          [116.410886, 39.881949],
          [116.402574, 39.912345],
          // 其他数据点...
        ]
    },
    
  ]
}


// axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao')
//       .then(res => {
//         console.log(res.data)
//         option6.value = res.data
//       })

axios.get('/mock/20OIzKbo31s/nao/predictionResult/nao', { params })
    .then(response => {
      //console.log(response.data);
      option6.value={
  title: {
    // text: chartTitle.value,
    text: '提前1个月预测',
    left: 'center' //标题水平居中
  },
  tooltip: {},
  xAxis: {
        type: 'category',
        name: '经度',
        data: ['80°W','79°W','78°W','77°W','76°W','75°W','74°W','73°W','72°W','71°W','70°W','69°W','68°W','67°W','66°W','65°W',
'64°W','63°W','62°W','61°W','60°W','59°W','58°W','57°W','56°W','55°W','54°W','53°W','52°W','51°W','50°W','49°W',
'48°W','47°W','46°W','45°W','44°W','43°W','42°W','41°W','40°W','39°W','38°W','37°W','36°W','35°W','34°W','33°W',
'32°W','31°W','30°W','29°W','28°W','27°W','26°W','25°W','24°W','23°W','22°W','21°W','20°W','19°W','18°W','17°W',
'16°W','15°W','14°W','13°W','12°W','11°W','10°W','9°W','8°W','7°W','6°W','5°W','4°W','3°W','2°W','1°W','0°','1°E','2°E','3°E','4°E','5°E','6°E','7°E','8°E','9°E','10°E','11°E','12°E','13°E','14°E','15°E','16°E','17°E',
'18°E','19°E','20°E','21°E','22°E','23°E','24°E','25°E','26°E','27°E','28°E','29°E','30°E','31°E','32°E','33°E',
'34°E','35°E','36°E','37°E','38°E','39°E','40°E']
      },
      yAxis: {
        type: 'category',
        name: '纬度',
        data: ['20°N','21°N','22°N','23°N','24°N','25°N','26°N','27°N','28°N','29°N','30°N','31°N','32°N','33°N','34°N','35°N','36°N','37°N','38°N','38°N','39°N','40°N','41°N','42°N','43°N','44°N','45°N','46°N','47°N','48°N','49°N','50°N','51°N','52°N','53°N','54°N','55°N','56°N','57°N','58°N','59°N','60°N','61°N','62°N','63°N','64°N','65°N','66°N','67°N','68°N','69°N','70°N','71°N','72°N','73°N','74°N','75°N','76°N','77°N','78°N','79°N','80°N']
      },
      series: [
    {
      name: 'ours',
      type: 'scatter',
      data: response.data.predictionData,
    },
    
  ]
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
