<script setup>
  //start_year       selectedDateTime
//currentDate         date

import { ref, onMounted, reactive, watch, defineExpose } from "vue";
import * as echarts from "echarts";
import axios  from "axios";
import VChart from 'vue-echarts';
import { nextTick } from "vue";
import { configProviderContextKey } from "element-plus";
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'


const prefix="https://www.tjensoprediction.com"
/* 时间选择器 -- begin */

const currentDate = new Date('2023-2');   //  赋初值
const year = currentDate.getFullYear() + '';
const month = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1 + '') : currentDate.getMonth() + 1 + ''
const start_year = ref(year);     //选择的年
const start_month = ref(month);   //选择的月

const start_time = ref(null);     //可选时间范围
const end_time = ref(null);





/*预留的
此处调接口获取时间范围
axios.get('http://www.tjensoprediction.com:8080/imgs/WEA_T2M/getInitData')
.then(res =>{
  start_time.value = new Date(res.data.earliestDate);
  end_time.value = new Date(res.data.latestDate);
});
*/

start_time.value = new Date('2023-1');      //后端还没完成嘿嘿暂时写死范围
end_time.value = new Date('2023-6');
const limitedDateRange = (time) => {
  return time.getTime() < start_time.value || time.getTime() > end_time.value;
};


/* 根据选择页更新限制范围 */
function handleClick(tab, event) {
  console.log(tab.props.label);
 if(tab.props.label == '模态预测'){ 
    start_time.value = new Date('2023-2');      //暂时写死范围
    end_time.value = new Date('2023-4');
    
    axios.get('http://www.tjensoprediction.com:8080/imgs/predictionResult/ssta?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
      index_heat = 0;//组图指针置0
      console.log(res.data);
      imgSrc_of_heat_Array = res.data;
      imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
      
      
    });
  }
  else if(tab.props.label == '指数预测'){
    start_time.value = new Date('2023-1');      //暂时写死范围
    end_time.value = new Date('2023-6');

  axios.get('http://www.tjensoprediction.com:8080/enso/predictionResult/linechart?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      
      chart1.value = res.data
     
    })
  }
}
/* 时间选择器 -- end */
  
  


const chart1 = ref({})
const chart1Title = ref('**年*月~**年*月Niño3.4指数结果预测')
  let Chart1_Description = reactive({single:true, text:'此处为预测结果指数预测折线图。'})

 
  var index_heat=0; //切换热力图时修改这个索引
  var imgSrc_of_heat_Array ;
  const imgSrc_of_heat = ref({})




  /* 赋初值 */
  //指数预测

axios.get('http://www.tjensoprediction.com:8080/enso/predictionResult/linechart?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart1.value = res.data
     
    });

//模态预测（热力图）
axios.get('http://www.tjensoprediction.com:8080/imgs/predictionResult/ssta?year='+Number(start_year.value)+'&month='+Number(start_month.value))
      .then(res => {
      index_heat = 0;//组图指针置0
      console.log(res.data);
      imgSrc_of_heat_Array = res.data;
      imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
      
    });



  /* 图表更新 */
function update_charts() {
  
 
      axios.get('http://www.tjensoprediction.com:8080/enso/predictionResult/linechart?year='+Number(start_year.value)+'&month='+Number(start_month.value))
    .then(res => {
      chart1.value = res.data
     
    })
      axios.get('http://www.tjensoprediction.com:8080/imgs/predictionResult/ssta?year='+Number(start_year.value)+'&month='+Number(start_month.value))
  
      .then(res => {
        index_heat = 0;
        console.log(res.data);
        imgSrc_of_heat_Array = res.data;
        imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[0]}`;
        

      });




    }

/* 使el-button点击后能正常失焦 Start (by wyf)*/
const buttonLeft = ref(null);
const buttonRight = ref(null);

  /* 左右切换 -- begin */
function change_time_heat(flag) {

  if (flag === "left") {
    if (index_heat > 0) {
      index_heat--;
    }
    else {
      index_heat = 17;
    }
    buttonLeft.value.$el.blur();
  }
  else if (flag === "right") {
    if (index_heat < 17) {
      index_heat++;
    }
    else {
      index_heat = 0;
    }
    buttonRight.value.$el.blur();
  }
  imgSrc_of_heat.value = `${prefix}${imgSrc_of_heat_Array[index_heat]}`;
}

defineExpose({
  change_time_heat
});
/* 使el-button点击后能正常失焦 End */

</script>
    
    <template>
      <div class="pageContent">
        <h1 class="title">
          ENSO预测结果
        </h1>
        <p></p>
        <div class="datePickerContainer">
            <!-- 已控制时间选择范围 -->
          <el-date-picker @change="update_charts()" 
          v-model="start_year" 
          type="year" 
          format="YYYY" 
          value-format="YYYY" 
          :clearable="false" 
          :disabledDate="limitedDateRange"
          style="width: 80px; height: 25px"/>
          <div class="text">年</div>
          <el-date-picker @change="update_charts()" 
          v-model="start_month" 
          type="month" 
          format="MM" 
          value-format="MM" 
          :clearable="false" 
          :disabledDate="limitedDateRange"
          style="width: 60px; height: 25px"/>
          <div class="text">月</div>
        </div>
    
        <el-tabs type="border-card" @tab-click="handleClick">

          <el-tab-pane label="指数预测">
            
            <v-chart class="chart_1" :option="chart1" autoresize > </v-chart>
            <p class="text1">{{Chart1_Description.text}}
            </p>
          </el-tab-pane>

        
          <el-tab-pane label="模态预测">
        
            <div class="pic_container">
              <img class="picture" :src="imgSrc_of_heat" alt="">
            </div>
            <el-button ref="buttonLeft" type="primary" class="arrow-left" :icon="ArrowLeft" @click="change_time_heat('left')"></el-button>
            <el-button ref="buttonRight" type="primary" class="arrow-right" :icon="ArrowRight" @click="change_time_heat('right')"></el-button>
          
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
      /*chart1的表和文字*/
      
      .chart_1 {
       height: 400px;
      }
      
      .text1{
        text-align: center;
      }
      .picture {
  width: 400px;
  display: block; /* 将元素设置为块级元素 */
  margin-left: 10px;
  margin-top: -175px;
  margin-bottom: -160px;
}
.pic_container{
  overflow: hidden;
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
      </style>