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
  
  var index_month=0; //切换页时修改这个索引
  
  const chart1 = ref({})
   const chart1Title = ref('**年*月~**年*月Niño3.4指数结果预测')
  
  
  /* chart1  的下方文字描述 */
  let Chart1_Description = reactive({single:true, text:'此处为预测结果指数预测折线图嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎噶。'})
  








  const currentIndex = ref(0); // 当前图片索引

onMounted(() => {
  currentIndex.value = 0; // 设置初始图片索引
});

const prevImage = () => {
  currentIndex.value = currentIndex.value === 0 ? image_route.length - 1 : currentIndex.value - 1;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % image_route.length;
};

const currentImageUrl = computed(() => {
  if (image_route[currentIndex.value]?.url) {
    return image_route[currentIndex.value].url;
  }
  return null;
});



// 创建一个计算属性，用于构建图片的标题
const imageTitle = computed(() => {
  if (start_year.value && start_month.value) {
    return `${start_year.value}年${start_month.value}月Niño3.4区SST集合平均预测结果`;
  } else {
    return `**年*月Niño3.4区SST集合平均预测结果`;
  }
});










  //chart2 图片路径选择
  const image_route = [
  
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
  // 时间选择器范围框定--start

const limitedDateRange = (time) => {
  const year = new Date(time).getFullYear();
  const month = new Date(time).getMonth();
  return year !== 2023 || month < 1 || month > 3; // Months are 0-based
};

// 时间选择器范围框定--end
  /* 时间选择器 -- end */
    
  
  
   
  /* 赋初值 */
  //指数预测
  axios.get('/enso/predictionExamination/monthlyComparison?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
        console.log(res.data);
        chart1.value = res.data
      });
  
  /* 图表更新 */
  function update_charts() {
        if (start_year.value && start_month.value) {
    axios
      .get('/enso/predictionExamination/monthlyComparison', {
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
          <el-date-picker @change="update_charts()" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" :disabledDate="limitedDateRange" style="width: 80px; height: 25px"/>
          <div class="text">年</div>
          <el-date-picker @change="update_charts()" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false" :disabledDate="limitedDateRange" style="width: 60px; height: 25px"/>
          <div class="text">月</div>
        </div>
    
        <el-tabs type="border-card">
          <el-tab-pane label="指数预测">
            <p class="chart-title">{{ chart1Title }}</p>
            <v-chart class="chart" :option="chart1" autoresize></v-chart>
            <p class="text_of_graph">{{ Chart1_Description.text }}</p>
          </el-tab-pane>


          <el-tab-pane label="模态预测">
            
              <div class="block text-center">
                <div class="image-title">{{ imageTitle }}</div>
                <div class="chart2-container">
                <img :src="currentImageUrl" alt="" class="image" />
                <el-button type="primary" class="arrow-left" :icon="ArrowLeft" @click="prevImage" />
                <el-button type="primary" class="arrow-right" :icon="ArrowRight" @click="nextImage" />
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
  
  /* chart2图片样式 */
  .image-title {
    text-align: center;
  font-size: 25px; /* 调整标题字体大小 */
  margin: 20px 0; /* 调整标题上下间距 */
  font-weight: bold; /* 设置加粗 */
  margin-right: 100px; /* 添加左外边距 */
}
  
  .chart2-container{
     /* 记得再往上调点 */
    width: 740px; 
    height: 600px; 
    margin-top: 0px; /* 调整上边距 */
    align-items: center; /* 垂直居中 */
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