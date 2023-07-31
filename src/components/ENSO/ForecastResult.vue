<script setup>
  import {ref, onMounted, reactive, watch} from "vue";
  import * as echarts from "echarts";
  import axios  from "axios";
  import VChart from 'vue-echarts';
  import {nextTick} from "vue";
  import { configProviderContextKey } from "element-plus";
    import {
    ArrowLeft,
    ArrowRight,
  } from '@element-plus/icons-vue'
  
  var index_month=0; //切换页时修改这个索引
  
  const chart1 = ref({})
  // const chart1Title = ref('')
  // chart1Title.value = `${start_year.value}年${start_month.value}月~${Number(start_year.value) + 1 + ''}年${start_month.value}月 预测结果折线图`
  
  /* chart1  的下方文字描述 */
  let Chart1_Description = reactive({single:true, text:'此处为预测结果指数预测折线图嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎噶。'})
  
  //chart2 图片路径选择
  var image_route = [
  
    {url: "src/components/ENSO/FR_image/202302img/0.png"},
    {url: "src/components/ENSO/FR_image/202302img/1.png"},
    {url: "src/components/ENSO/FR_image/202302img/2.png"},
    {url: "src/components/ENSO/FR_image/202302img/3.png"},
    {url: "src/components/ENSO/FR_image/202302img/4.png"},
    {url: "src/components/ENSO/FR_image/202302img/5.png"},
    {url: "src/components/ENSO/FR_image/202302img/6.png"},
    {url: "src/components/ENSO/FR_image/202302img/7.png"},
    {url: "src/components/ENSO/FR_image/202302img/8.png"},
    {url: "src/components/ENSO/FR_image/202302img/9.png"},
    {url: "src/components/ENSO/FR_image/202302img/10.png"},
    {url: "src/components/ENSO/FR_image/202302img/11.png"},
    {url: "src/components/ENSO/FR_image/202302img/12.png"},
    {url: "src/components/ENSO/FR_image/202302img/13.png"},
    {url: "src/components/ENSO/FR_image/202302img/14.png"},
    {url: "src/components/ENSO/FR_image/202302img/15.png"},
    {url: "src/components/ENSO/FR_image/202302img/16.png"},
   
  ]
  
  
   /* 时间选择器 -- begin */
  const currentDate = new Date();
  const year = currentDate.getFullYear() - 1 + '';
  const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''
  const start_year = ref(year);
  const start_month = ref(month);
  /* 时间选择器 -- end */
    
  
  
   
  
      /*图2显示*/
  /* 赋初值 */
  //指数预测
  axios.get('/enso/predictionExamination/monthlyComparison?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        console.log(res.data);
        chart1.value = res.data
      });
  
  /* 图表更新 */
  function update_charts() {
    // chart1Title.value = `${start_year.value}年${start_month.value}月~${Number(start_year.value) + 1 + ''}年${start_month.value}月 预测结果折线图`
    axios.get('/enso/predictionExamination/monthlyComparison?year='+Number(start_year.value)+'&month='+Number(start_month.value))
        .then(res => {
          console.log(res.data);
          chart1.value = res.data
        });
      }
  
  
  
  
  
    </script>
    
    <template>
      <div class="pageContent">
        <h1 class="title">
          ENSO预测结果
        </h1>
        <p></p>
        <div class="datePickerContainer">
          <el-date-picker @change="update_charts()" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" style="width: 80px; height: 25px"/>
          <div class="text">年</div>
          <el-date-picker @change="update_charts()" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false" style="width: 60px; height: 25px"/>
          <div class="text">月</div>
        </div>
    
        <el-tabs type="border-card">
          <el-tab-pane label="指数预测">
  
            <v-chart class="chart" :option="chart1" autoresize></v-chart>
            <p class="text_of_graph">{{ Chart1_Description.text }}</p>
          </el-tab-pane>
          <el-tab-pane label="模态预测">
            <div class="chart2-container">
  
            <!-- 走马灯遍历 -->
            <div class="block text-center">
              <span class="demonstration">标题</span>
              <el-carousel height="450px">
                
                <el-carousel-item v-for="item in image_route" :key="item">
                  <img :src="item.url" alt="" class="image"/>
                </el-carousel-item>
              </el-carousel>
            </div>
             
  
            
            </div>
           
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
  
  
  .text_of_graph{
    text-align: center;
  }
  
  /* 预报误差页面的容器 */
  .chart-container {
    position: relative;
  }
  
      /* 设置左箭头按钮的样式 */
  .el-button.arrow-left {
    position: absolute;
    top: 50%; /* 将箭头按钮的顶部与父容器的中间对齐 */
    left: 0; /* 将箭头按钮的左侧与父容器的左侧对齐 */
    width: 40px; /* 设置按钮宽度 */
    height: 80px; /* 设置按钮高度 */
    transform: translateY(-50%); /* 垂直居中箭头按钮 */
  }
  
  /* 设置右箭头按钮的样式 */
  .el-button.arrow-right {
    position: absolute;
    top: 50%; /* 将箭头按钮的顶部与父容器的中间对齐 */
    right: 0; /* 将箭头按钮的右侧与父容器的右侧对齐 */
    width: 40px; /* 设置按钮宽度 */
    height: 80px; /* 设置按钮高度 */
    transform: translateY(-50%); /* 垂直居中箭头按钮 */
  }
  
  /* 走马灯样式 */
  .demonstration {
    color: var(--el-text-color-secondary);
    
  }
  
  .chart2-container{
     /* 记得再往上调点 */
    width: 740px; 
    height: 600px; 
     /* 惹 */
  }
  
  .el-carousel__item h3 {
    color: #fdfdfd;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #fdfdfd;;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #ffffff;
  }
  
  /* 图片样式 */
  .image{
    width: 600px; /* 设置图片宽度 */
    height: 570px; /* 设置图片高度 */
    position:absolute;
    left:60px;
  }
    </style>