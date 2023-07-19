<script setup>
// 在这里引入组件
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <img src="./assets/logo.jpg" alt="logo"/>
        <img src="./assets/title.png" alt="logo"/>
      </el-header>
      <el-container style="height: calc(100vh - 64px);">
        <el-aside width="200px" style="">Aside</el-aside>
        <el-main style="padding: 0">
          <el-scrollbar>
            <div v-for="item in 70">测试文案 {{ item }}</div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<!--注意这个lang="scss"-->
<style lang="scss" scoped>
.header {

  //下面这个css选择器，选择了header类元素内的img元素，这是sass语法，会被自动编译为css
  img {
    margin: 8px;
    height: 48px
  }

  min-width: 800px;
  height: 64px;
  vertical-align: center;
  box-shadow: 1px 0 18px rgba(51, 51, 51, .06)
}
</style>
