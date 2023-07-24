<script setup>
  import { ref,onMounted } from "vue";
  import * as echarts from "echarts";
  import { nextTick } from "vue";
  
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
    if(Number(start_month.value) < 7)
      end_year.value = Number(start_year.value) + 1 + '';
    else
      end_year.value = Number(start_year.value) + 2 + '';
  }
  function get_end_month(){
    if(Number(start_month.value) < 4)
      end_month.value = Number(start_month.value) + 6 + '';
    else if(Number(start_month.value) < 7)
      end_month.value = Number(start_month.value) + 6 + '';
    else
      end_month.value = Number(start_month.value) - 6 + '';
    if(Number(end_month.value) < 10)
      end_month.value = '0' + end_month.value;
  }
  
  let myChart;
  
  const chartTitle = ref('')
  chartTitle.value = `${start_year.value}年${start_month.value}月~${end_year.value}年${end_month.value}月 ENSO预测结果`
  
  function updateChartTitle() {
    get_end_year();
    get_end_month();
    chartTitle.value = `${start_year.value}年${start_month.value}月~${end_year.value}年${end_month.value}月 ENSO预测结果`;
    myChart.setOption({
      title: {
        text: chartTitle.value,
        left: 'center' //标题水平居中
      },
    });
  }
  /* 时间选择器 -- end */
  onMounted(() => {
    nextTick(() => {
      let myChart = echarts.init(document.getElementById("chart1"));
      myChart.setOption({
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["2022年2月", "2022年3月", "2022年2月", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "2022年2月",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    });
  });
  
  </script>
  
  <template>
    <div class="pageContent">
      <h1 class="title">
        {{ start_year }}年{{ start_month }}月~{{ end_year }}年{{ end_month }}月 ENSO预测结果
      </h1>
      <div class="datePickerContainer">
        <el-date-picker @change="updateChartTitle" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
        <div class="text">年</div>
        <el-date-picker @change="updateChartTitle" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
        <div class="text">月</div>
      </div> 
  
      <el-tabs type="border-card">
        <el-tab-pane label="指数预测">
          <p>内容1</p>
          <p>测试内容</p>
          <div class="chart" id="chart1"></div>
        </el-tab-pane>
        <el-tab-pane label="模态预测">
          <p>内容2</p>
        </el-tab-pane>
      </el-tabs>
      <div id="echarts-demo"></div>
      <div id="echarts-demo"></div>
    </div>
  </template>
  
  <style scoped lang="scss">
    .title {
      text-align: center
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
  </style>
  