<!--这个文件是首页，是网站的入口(root)-->

<script lang="ts" setup>
import { ref } from 'vue'
// 在这里引入组件
import MainPage from './components/MainPage/MainPage.vue'
import ENSOForecastExamination1 from "./components/ENSO/ForecastExamination1.vue";
import ENSOForecastResult from "./components/ENSO/ForecastResult.vue";
import SeaIceForecastExamination from "./components/SeaIce/ForecastExamination.vue";
import SeaIceForecastResult from "./components/SeaIce/ForecastResult.vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  currentPage.value=key;
}

const currentPage = ref("首页")

</script>

<template>
  <el-scrollbar>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div>
          <img src="./assets/logo.png" alt="logo"/>
          <img src="./assets/title.png" alt="logo"/>
        </div>
      </el-header>

      <el-main class="container" style="padding: 0;">
        <el-scrollbar>
          <el-row class="tac">
            <el-col :span="4">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  @select="handleSelect"
              >
                <el-menu-item index="首页">
                  <el-icon>
                    <icon-menu/>
                  </el-icon>
                  首页
                </el-menu-item>
                <el-sub-menu index="ENSO">
                  <template #title>
                    <el-icon>
                      <icon-menu/>
                    </el-icon>
                    <span>ENSO</span>
                  </template>

                  <el-menu-item index="ENSO预测结果">预测结果</el-menu-item>
                  <el-menu-item index="ENSO预测检验2">预测检验1</el-menu-item>
                  <el-menu-item index="ENSO预测检验1">预测检验2</el-menu-item>


                </el-sub-menu>


                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <icon-menu/>
                    </el-icon>
                    <span>海冰</span>
                  </template>

                  <el-menu-item index="海冰预测结果">预测结果</el-menu-item>
                  <el-menu-item index="海冰预测检验">预测检验</el-menu-item>


                </el-sub-menu>

                <el-menu-item index="模态可视化">
                  <el-icon>
                    <icon-menu/>
                  </el-icon>
                  <span>模态可视化</span>
                </el-menu-item>



                <el-sub-menu index="4">
                  <template #title>
                    <el-icon>
                      <icon-menu/>
                    </el-icon>
                    <span>NAO</span>
                  </template>

                  <el-menu-item index="4-1">预测结果</el-menu-item>
                  <el-menu-item index="4-2">预测检验</el-menu-item>


                </el-sub-menu>

                <el-sub-menu index="5">
                  <template #title>
                    <el-icon>
                      <icon-menu/>
                    </el-icon>
                    <span>全体天气</span>
                  </template>

                  <el-menu-item index="5-1">预测结果</el-menu-item>
                  <el-menu-item index="5-2">预测检验</el-menu-item>


                </el-sub-menu>
              </el-menu>
            </el-col>
            <el-col :span="20" class="page-content">
              <div v-if="currentPage=='首页'"><main-page></main-page></div>
              <div v-if="currentPage=='ENSO预测结果'"><ENSOForecastResult></ENSOForecastResult></div>
              <div v-if="currentPage=='ENSO预测检验1'"><ENSOForecastExamination1></ENSOForecastExamination1></div>
              <div v-if="currentPage=='海冰预测结果'"><SeaIceForecastResult></SeaIceForecastResult></div>
              <div v-if="currentPage=='海冰预测检验'"><SeaIceForecastExamination></SeaIceForecastExamination></div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-main>

      <el-footer class="footer">
        <div>Copyright© 2023
          同济大学软件学院智慧大气与智慧海洋实验室&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;互联网ICP备案：<a
              href="https://beian.miit.gov.cn/">鲁ICP备2023007740号-1</a>.
        </div>
      </el-footer>

    </el-container>

  </div>
  </el-scrollbar>
</template>

<!--注意这个lang="scss"-->
<style lang="scss" scoped>
.header {

  background: rgb(246,248,250);
  div{
    width: 88vw;
    min-width: 1000px;
  }
  //将css代码统一写在一起，不要使用内联的形式, 右边这种写法非常不规范且难以维护 -> ( <div style="..."></div> )
  //下面这个css选择器，选择了header类元素内的img元素，这是sass语法，会被自动编译为css
  img {
    margin: 8px;
    height: 48px
  }
  min-width: 1000px;
  display: flex;
  justify-content: center;
  z-index: 8000;
  height: 64px;
  vertical-align: center;
  box-shadow: 1px 0 18px rgba(51, 51, 51, .06)
}

.container {
  height: calc(100vh - 64px - 24px);
  display: flex;
  justify-content: center;
}

.page-content {

}

.footer {
  div {
    height: 24px;
    line-height: 24px;
  }

  height: 24px;
  box-shadow: 1px 0 18px rgba(51, 51, 51, .06);
  opacity: 80%;
  font-size: small;
  text-align: center;
}

.tac{
  width: 88vw;
  min-width: 1000px;
}
</style>