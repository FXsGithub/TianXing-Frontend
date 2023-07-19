<!--这个文件是首页，是网站的入口(root)-->

<script lang="ts" setup>
// 在这里引入组件
// import HelloWorld from './components/HelloWorld.vue'
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
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <img src="./assets/logo.jpg" alt="logo"/>
        <img src="./assets/title.png" alt="logo"/>
      </el-header>
      <el-container class="container">
        <el-main style="padding: 0">
          <el-scrollbar>
            <el-row class="tac">
              <el-col :span="4">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                >
                  <el-sub-menu index="1">
                    <template #title>
                      <el-icon>
                        <location/>
                      </el-icon>
                      <span>Navigator One</span>
                    </template>
                    <el-menu-item-group title="Group One">
                      <el-menu-item index="1-1">item one</el-menu-item>
                      <el-menu-item index="1-2">item two</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group Two">
                      <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="1-4">
                      <template #title>item four</template>
                      <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>
                  </el-sub-menu>
                  <el-menu-item index="2">
                    <el-icon>
                      <icon-menu/>
                    </el-icon>
                    <span>Navigator Two</span>
                  </el-menu-item>
                  <el-menu-item index="3" disabled>
                    <el-icon>
                      <document/>
                    </el-icon>
                    <span>Navigator Three</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <el-icon>
                      <setting/>
                    </el-icon>
                    <span>Navigator Four</span>
                  </el-menu-item>
                </el-menu>
              </el-col>

            </el-row>
          </el-scrollbar>
        </el-main>
        <el-footer class="footer"><div>Copyright© 2023 同济大学软件学院智慧大气与智慧海洋实验室&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;互联网ICP备案：<a href="https://beian.miit.gov.cn/">鲁ICP备2023007740号-1</a>.</div></el-footer>
      </el-container>
    </el-container>

  </div>

</template>

<!--注意这个lang="scss"-->
<style lang="scss" scoped>
.header {

  //将css代码统一写在一起，不要使用内联的形式, 右边这种写法非常不规范且难以维护 -> ( <div style="..."></div> )
  //下面这个css选择器，选择了header类元素内的img元素，这是sass语法，会被自动编译为css
  img {
    margin: 8px;
    height: 48px
  }

  z-index: 8000;
  min-width: 800px;
  height: 64px;
  vertical-align: center;
  box-shadow: 1px 0 18px rgba(51, 51, 51, .08)
}

.container{
  height: calc(100vh - 64px);
}

.footer{
  div{
    height: 24px;
    line-height: 24px;
  }
  height: 24px;
  box-shadow: 1px 0 18px rgba(51, 51, 51, .08);
  opacity: 80%;
  font-size: small;
  text-align: center;
}
</style>
