<script setup>
  import {ref, onMounted, reactive, watch,computed} from "vue";
  import * as echarts from "echarts";
  import axios  from "axios";
  import VChart from 'vue-echarts';
  import {nextTick} from "vue";
  import { configProviderContextKey } from "element-plus";
    import {
    ArrowLeft,
    ArrowRight,
  } from '@element-plus/icons-vue'
  
  
  const chart1 = ref({})
   const chart1Title = ref('**年*月~**年*月Niño3.4指数结果预测')
  
  
  /* chart1  的下方文字描述 */
  let Chart1_Description = reactive({single:true, text:'此处为预测结果指数预测折线图。'})
  



   /* 时间选择器 -- begin */
  const currentDate = new Date();
  const year = currentDate.getFullYear() - 1 + '';
  const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''
  const start_year = ref(year);
  const start_month = ref(month);

  /* 时间选择器 -- end */
    

  /* 赋初值 */
  //指数预测
  axios.get('/enso/predictionExamination/linechart?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        console.log(res.data);
        chart1.value = res.data
      });
  
  /* 图表更新 */
  function update_charts() {
        if (start_year.value && start_month.value) {
    axios
      .get('/enso/predictionExamination/linechart', {
        params: {
          year: Number(start_year.value),
          month: Number(start_month.value)
        }
      })
      .then(res => {
        chart1.value = res.data;
      });

    const endDate = new Date(
      Number(start_year.value),
      Number(start_month.value) + 18
    );
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDateString = `${endYear}年${endMonth < 10 ? '0' : ''}${endMonth}月`;

    chart1Title.value = `${start_year.value}年${start_month.value}月~${endDateString}Niño3.4`;
  } else {
    chart1Title.value = `**年*月~**年*月Niño3.4指数结果预测`;
  }
}
  
  
  
  
  
    </script>
    
    <template>
      <div class="pageContent">
        <h1 class="title">
          ENSO预测结果
        </h1>
        <p></p>
        <div class="datePickerContainer">
          <el-date-picker @change="update_charts()" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false"  style="width: 80px; height: 25px"/>
          <div class="text">年</div>
          <el-date-picker @change="update_charts()" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false"  style="width: 60px; height: 25px"/>
          <div class="text">月</div>
        </div>
    
        <el-tabs type="border-card">
          <el-tab-pane label="指数预测">
            <p class="chart-title">{{ chart1Title }}</p>
            <v-chart class="chart" :option="chart1" autoresize></v-chart>
            <p class="text_of_graph">{{ Chart1_Description.text }}</p>
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
    /*chart1 的表和文字*/
  
  .chart {
    height: 400px;
  }
  .chart-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
  
  .text_of_graph{
    text-align: center;
  }
  
  /* 预报误差页面的容器 */
  .chart-container {
    position: relative;
  }
  

    </style>