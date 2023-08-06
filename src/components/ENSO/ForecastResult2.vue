<script setup>

  import axios from "axios";
  import {ref} from "vue";
  import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
  import VChart from "vue-echarts";
  
  //时间选择器范围框定--start
  
  const limitedDateRange = (time) => {
    const year = new Date(time).getFullYear();
    const month = new Date(time).getMonth();
    return year !== 2023 || month < 1 || month > 3; // Months are 0-based
  };
  
  //时间选择器范围框定--end
  const currentDate = new Date();
  const year = currentDate.getFullYear() - 1 + '';
  const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''
  const start_year = ref(year);
  const start_month = ref(month);
  const selectedDateTime = ref(null);
  const selectedYear = ref(null); // 新变量，用于存储选定的年份
  const selectedMonth = ref(null); // 新变量，用于存储选定的月份
  const selectedDay = ref(null); // 新变量，用于存储选定的日期
  const selectedHour = ref(null); // 新变量，用于存储选定的小时
  
  //第一次进入为用户赋初值
  const date = new Date(2023,0,1,0,0,0);
  selectedDateTime.value = date;
  selectedYear.value = date.getFullYear();
  selectedMonth.value = date.getMonth() + 1;
  selectedDay.value = date.getDate();
  selectedHour.value = date.getHours();
  
  
  var index_img=0; //切换图片时修改这个索引
 
  
  const prefix="https://www.tjensoprediction.com"
  
  var title_of_heat_Array;
  var imgSrc_of_heat_Array;
  var text_of_heat_Array;
  

  const title_of_heat = ref({})
  const imgSrc_of_heat = ref({})
  const text_of_heat = ref({})

  
  /* 避免未选择时屏幕上出现{} */
  text_of_heat.value = '';
 

  /* 赋初值 */
  axios.get('/GB/ForecastResult/heat2?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
      .then(res => {
        index_img = 0;
        imgSrc_of_heat_Array = res.data.imgSrc;
        title_of_heat_Array = res.data.title;
        title_of_heat.value = title_of_heat_Array[0];
        text_of_heat_Array = res.data.text;
        imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
        text_of_heat.value = text_of_heat_Array[0];
      });
 
  
  const handleDateTimeChange = () => {
    // 当日期时间选择发生变化时被调用
    console.log(selectedDateTime.value); // 输出当前选择的日期和时间
  
    if (selectedDateTime.value) {
      const selectedDate = new Date(selectedDateTime.value);
      selectedYear.value = selectedDate.getFullYear(); // 获取年份值并存储到 selectedYear
      selectedMonth.value = selectedDate.getMonth() + 1; // 获取月份值并存储到 selectedMonth
      selectedDay.value = selectedDate.getDate(); // 获取日期值并存储到 selectedDay
      selectedHour.value = selectedDate.getHours(); // 获取小时值并存储到 selectedHour
    }

  if(selectedMonth.value==2)
  {

 axios.get('/GB/ForecastResult/heat2?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
      .then(res => {
        index_img = 0;
        imgSrc_of_heat_Array = res.data.imgSrc;
        text_of_heat_Array = res.data.text;
        imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
        text_of_heat.value = text_of_heat_Array[0];
      });
  
    }
    else if(selectedMonth.value==3)
  {
 
 axios.get('/GB/ForecastResult/heat3?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
      .then(res => {
        index_img = 0;
        imgSrc_of_heat_Array = res.data.imgSrc;
        text_of_heat_Array = res.data.text;
        imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
        text_of_heat.value = text_of_heat_Array[0];
      });
  
    }
    else if(selectedMonth.value==4)
  {

 axios.get('/GB/ForecastResult/heat4?year='+selectedYear.value+'&month='+selectedMonth.value+'&day='+selectedDay.value+'&hour='+selectedHour.value)
      .then(res => {
        index_img = 0;
        imgSrc_of_heat_Array = res.data.imgSrc;
        text_of_heat_Array = res.data.text;
        imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
        text_of_heat.value = text_of_heat_Array[0];
      });
  
    }


  }
   
    
  
  
  
  /* 左右切换 -- begin */
  function change_time_heat(flag) {
  
    if(flag==="left"){
      if(index_img>0){
        index_img--;
      }
      else{
        index_img=17;
      }
    }
    else if(flag==="right"){
      if(index_img<17){
        index_img++;
      }
      else{
        index_img=0;
      }
    }
    title_of_heat.value=title_of_heat_Array[index_img];
    imgSrc_of_heat.value=`${prefix}${imgSrc_of_heat_Array[index_img]}`;
    text_of_heat.value=text_of_heat_Array[index_img];
  }
 
  /* 左右切换 -- end */
  </script>
    
    <template>
      <div class="pageContent">
        <h1 class="title">
          ENSO预测结果
        </h1>
        <p></p>
        <div class="datePickerContainer">
          <el-date-picker @change="handleDateTimeChange" v-model="start_year" type="year" format="YYYY" value-format="YYYY" :clearable="false" :disabledDate="limitedDateRange" style="width: 80px; height: 25px"/>
          <div class="text">年</div>
          <el-date-picker @change="handleDateTimeChange" v-model="start_month" type="month" format="MM" value-format="MM" :clearable="false"  :disabledDate="limitedDateRange" style="width: 60px; height: 25px"/>
          <div class="text">月</div>
        </div>
    
        <el-tabs type="border-card">
          <el-tab-pane label="模态预测">
            
              <div class="block text-center">
                <p class="picture_title">
                  {{ title_of_heat }}
                </p>
                
                <div class="chart2-container">
                <img class="picture" :src="imgSrc_of_heat" alt=""  style="margin: 0 auto;">
                <p class="picture_text">
                  {{ text_of_heat }}
                </p>
                <el-button type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_time_heat('left')" />
                <el-button type="primary" class="arrow-right" :icon="ArrowRight" @click="change_time_heat('right')" />
              </div>
            </div>
           
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    
    
    <style scoped lang="scss">
 /*时间选择器样式*/
 .datePickerContainer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  



  /* 其他样式 */

.el-tabs {
  width: 100%; /* 占满父容器的宽度 */
}
.tabs-container {
  width: 100%; /* 占满父容器的宽度 */
  display: flex;
  justify-content: center; /* 在容器中水平居中 */
}
.title {
  text-align: center
}
.picture_title {
   text-align: center;
   font-size: 14px;
}
.picture_text {
  text-align: center;
  font-size: 14px;
}


/* 预报误差页面的容器 */
.whole_container {
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

.picture {
  max-width: 90%;
  display: block; /* 将元素设置为块级元素 */

  text-align: center;
}
.pic_container{
  overflow: hidden;
  height: auto;
  width: auto;
  
}
    </style>