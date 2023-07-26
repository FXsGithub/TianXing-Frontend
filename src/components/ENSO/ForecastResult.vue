<script setup>
  import { ref,onMounted } from "vue";
  import * as echarts from "echarts";
  import { nextTick } from "vue";
  import { configProviderContextKey } from "element-plus";


  var app = {};

var chartDom = document.getElementById('main');

var option;

let noise = getNoiseHelper();
let xData = [];
let yData = [];
noise.seed(Math.random());
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
    if(Number(start_month.value) < 8)
      end_year.value = Number(start_year.value) + 1 + '';
    else
      end_year.value = Number(start_year.value) + 2 + '';
  }
  function get_end_month(){
    if(Number(start_month.value) < 5)
      end_month.value = Number(start_month.value) + 5 + '';
    else if(Number(start_month.value) < 8)
      end_month.value = Number(start_month.value) + 5 + '';
    else
      end_month.value = Number(start_month.value) - 7  + '';
    if(Number(end_month.value) < 10)
      end_month.value = '0' + end_month.value;
  }
  
  let myChart1;
  
  const chart1Title = ref('')
  const chart2Title = ref('')
  chart1Title.value = `${start_year.value}年${start_month.value}月~${end_year.value}年${end_month.value}月 ENSO预测结果`
  chart2Title.value = `${start_year.value}年${start_month.value}月 SST集合平均预测结果`

  function updateChartTitle() {
    get_end_year();
    get_end_month();
    chart1Title.value = `${start_year.value}年${start_month.value}月~${end_year.value}年${end_month.value}月 ENSO预测结果`;
    chart2Title.value = `${start_year.value}年${start_month.value}月 SST集合平均预测结果`
    myChart1.setOption({
      title: {
        text: chart1Title.value,
        left: 'center' //标题水平居中
      },
    });

    myChart2.setOption({
      title: {
        text: chart2Title.value,
        left: 'center' //标题水平居中
      },
    });
  }
  /* 时间选择器 -- end */


  const chart2Ref = ref(null);
  const chart3Ref = ref(null);
  onMounted(() => {
   
    nextTick(() => {
      let myChart1 = echarts.init(document.getElementById("chart1"));
      myChart1.setOption({
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
 
    /*图2显示*/
 onMounted(() => {
    nextTick(() => {
      let myChart2 = echarts.init(document.getElementById("chart2"));
    let data = generateData(2, -5, 5);
option = {
  tooltip: {},
  xAxis: {
    type: 'category',
    data: xData
  },
  yAxis: {
    type: 'category',
    data: yData
  },
  visualMap: {
    min: 0,
    max: 1,
    calculable: true,
    realtime: false,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    }
  },
  series: [
    {
      name: 'Gaussian',
      type: 'heatmap',
      data: data,
      emphasis: {
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1
        }
      },
      progressive: 1000,
      animation: false
    }
  ]
};
    })
  })
    
  

  /*热力图所用function*/
  function generateData(theta, min, max) {
  let data = [];
  for (let i = 0; i <= 200; i++) {
    for (let j = 0; j <= 100; j++) {
      // let x = (max - min) * i / 200 + min;
      // let y = (max - min) * j / 100 + min;
      data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
      // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
    }
    xData.push(i);
  }
  for (let j = 0; j < 100; j++) {
    yData.push(j);
  }
  return data;
}
function getNoiseHelper() {
  class Grad {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    dot2(x, y) {
      return this.x * x + this.y * y;
    }
    dot3(x, y, z) {
      return this.x * x + this.y * y + this.z * z;
    }
  }
  const grad3 = [
    new Grad(1, 1, 0),
    new Grad(-1, 1, 0),
    new Grad(1, -1, 0),
    new Grad(-1, -1, 0),
    new Grad(1, 0, 1),
    new Grad(-1, 0, 1),
    new Grad(1, 0, -1),
    new Grad(-1, 0, -1),
    new Grad(0, 1, 1),
    new Grad(0, -1, 1),
    new Grad(0, 1, -1),
    new Grad(0, -1, -1)
  ];
  const p = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
    141, 128, 195, 78, 66, 215, 61, 156, 180
  ];
  // To remove the need for index wrapping, double the permutation table length
  let perm = new Array(512);
  let gradP = new Array(512);
  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  function seed(seed) {
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }
    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }
    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed >> 8) & 255);
      }
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  }
  seed(0);
  // ##### Perlin noise stuff
  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
  // 2D Perlin Noise
  function perlin2(x, y) {
    // Find unit grid cell containing point
    let X = Math.floor(x),
      Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X;
    y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255;
    Y = Y & 255;
    // Calculate noise contributions from each of the four corners
    let n00 = gradP[X + perm[Y]].dot2(x, y);
    let n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
    let n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
    let n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
    // Compute the fade curve value for x
    let u = fade(x);
    // Interpolate the four results
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
  }
  return {
    seed,
    perlin2
  };
}


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
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left"></el-button>
            <div class="chart" id="chart2"></div>
            <el-button type="primary"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <p>测试内容</p>


          
          </el-button-group>
          
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