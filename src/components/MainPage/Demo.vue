<script setup xmlns="http://www.w3.org/1999/html">
import VChart from 'vue-echarts';
import {ref} from "vue";

const option1 = ref({})
const option2 = ref({})

import axios  from "axios";

function handleClick() {
  axios.get('/ice/prediction?year=2023')
      .then(res => {
        option1.value = res.data
      })

  axios.get('/api/getStyData')
      .then(res => {
        console.log(res.data)
      })
}

option2.value = {
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Ad Networks'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search Engines'},
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

option1.value = {
  title: {
    text: 'ENSO预测',
    left: 'center',
  },
  legend:{
    bottom: 0
  },
  yAxis:{
    name: '        Niño 3.4 Index',
  },
  textStyle: {
    rich: {
      a: {
        color: 'black',
        fontSize:9,
      },
    }
  },

  "xAxis": {"data": ["Feb-23", "Mar-23", "Apr-23", "May-23", "Jun-23", "Jul-23", "Aug-23", "Sep-23", "Oct-23", "Nov-23", "Dec-23", "Jan-24", "Feb-24", "Mar-24", "Apr-24", "May-24", "Jun-24", "Jul-24"]},
  "series": [{
    "data": [-0.53, -0.35, -0.31, -0.13, -0.07, -0.02, 0.08, 0.11, 0.22, 0.47, 0.56, 0.92, 0.75, 0.41, 0.01, -0.03, -0.11, -0.29],
    "name": "ef",
    "type": "line"
  }, {
    "data": [-0.25, 0.34, 0.41, 0.45, 0.19, -0.22, -0.44, -0.67, -0.32, 0.14, 0.41, 1.5, 1.33, 0.97, 0.53, 0.41, 0.18, -0.76],
    "name": "ENSO-ASC",
    "type": "line"
  }, {
    "data": [-0.44, -0.29, -0.15, 0.23, 0.46, 0.7, 0.94, 1.12, 1.14, 1.52, 1.69, 1.81, 1.7, 1.42, 0.94, 0.67, 0.37, 0.27],
    "name": "ENSO-Cross",
    "type": "line"
  }, {
    "data": [-0.6, -0.33, -0.06, 0.13, 0.18, 0.12, 0.09, 0.12, 0.16, 0.33, 0.14, 0.29, 0.14, -0.04, -0.17, 0.01, -0.05, -0.12],
    "name": "ENSO-GTC",
    "type": "line"
  }, {
    "data": [-0.84, -1.11, -1.45, -1.34, -1.1, -0.69, -0.28, -0.13, -0.11, -0.12, -0.01, 0.06, -0.17, -0.71, -1.25, -1.2, -0.94, -0.57],
    "name": "ENSO-MC",
    "type": "line"
  }]
}

</script>

<template>
  <div class="pageContent">
    <h1>
      网站简介
    </h1>

    <p>
      同济大学“天行”气象预测平台，是同济大学“人工智能+大气海洋”研究团队的官方平台。该平台用于进行ENSO、海冰、NAO、台风等气候/天气现象的预报。该平台将公开向外界展示，并持续更新预报结果。该平台将展示自然科学基金重点联合基金项目、国家自然科学基金面上项目、国家重点研发计划以及上海市科委重点课题等多个重大项目的成果，是同济大学在AI+气象领域发展的重要环节。
    </p>


    <h1>
      项目说明
    </h1>
    <p>
      本次项目是同济大学暑期实习项目，要求9名本科学生，在四周内（7月17日~8月11日）完成该平台的开发。四周包括项目开发和项目测试，时间安排后续详细说明。
    </p>

    <h1>Example</h1>

    <el-button type="danger" class="-button--example" @click="handleClick">点击使用Mock数据，模拟调用接口返回数据,并更新图表
    </el-button>

    <p>
      只要把useMock设为true，就可以使用mock数据，设为false就可以调用真实接口（需要设置axios的baseURL），mock模拟的接口定义在mock文件夹下的index.js中即可使用。上面这个按钮每点一次，就会调用一次mock接口，接口返回一些随机数据，然后更新图表。
    </p>

    <el-tabs type="border-card">
      <el-tab-pane label="User">
        <v-chart class="chart" :option="option1" autoresize></v-chart>
      </el-tab-pane>
      <el-tab-pane label="Config">
        <v-chart class="chart" :option="option2" autoresize></v-chart>
      </el-tab-pane>
      <el-tab-pane label="Role">Role</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane>
    </el-tabs>


  </div>

</template>

<style scoped lang="scss">
.chart {
  height: 500px;
}

.-button--example {
  margin-bottom: 20px;
}
</style>