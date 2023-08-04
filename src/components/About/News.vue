<script setup>

const files = import.meta.glob('../../news/*.md')
let newsFiles = Object.keys(files).map(filePath => {
  // 取出文件名
  return filePath.split('/').pop().replace('.md', '')
})

import {computed, defineAsyncComponent, ref} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const isNewsIndex = computed(() => route.path === '/news' || route.path === '/News')

const newsComponents = ref([])
Promise.all(
    Object.keys(files).map(filePath => {
      filePath = filePath.split('/').pop().split('.')[0]

      return import(`../../news/${filePath}.md`).then((mdModule) => {
        mdModule.frontmatter.fileName = filePath
        newsComponents.value.push(mdModule.frontmatter)
      })
    })
).then(() => {
  // 按日期从新到旧排序
  newsComponents.value.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  // console.log(newsComponents.value[0]) // Now this should print the most recent news
})

</script>

<template>
  <div class="pageContent News">
    <div v-if="isNewsIndex">
      <h1>信息发布</h1>
      <el-card class="box-card">
      <li v-for="file in newsComponents" class="list-item">
        <img :src="file.image"  class="image" alt=""/>
        <router-link :to="`/news/${file.fileName}`">
          <span class="date" >{{ file.date }}</span>
          <span class="title">{{ file.title }}</span> &nbsp;
        </router-link>
        <hr class="horizontal-line" />
      </li>
      </el-card>
      

    </div>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}
/* 自定义列表项的样式 */
.list-item {
  list-style-type: none; /* 去除默认的圆点样式 */
  padding-left: 1em; /* 添加左边距，以模拟圆点位置 */
  height: 120px;
  position: relative;
}

/*新闻列表图片*/
.image {
  width: 120px;
  height: 80px;
  position: absolute;
  left: 30px;
  top: 10px;
  }

  /* 自定义标题的样式 */
.title {
  font-size: 18px; /* 设置标题的字体大小 */
  font-weight: bold; /* 设置标题的字体粗细为加粗 */
  color: #1b1b1b; /* 设置标题的文字颜色 */
  /* 添加其他样式，根据需要调整 */
  position: absolute;
  bottom:0;
  left:30px;
  z-index:1;
}

/* 设置圆点颜色为淡灰色 */
.list-item:before {
  content: "•"; /* 使用伪元素添加圆点 */
  color: #999; /* 设置圆点颜色为淡灰色 */
  margin-right: 0.5em; /* 调整圆点与文字之间的间距 */
  position: absolute;
  bottom:0;

}

/* 自定义日期的样式 */
.date {
  font-size: 16px; /* 设置日期的字体大小 */
  color: #666; /* 设置日期的文字颜色 */
  float:right;/* 设置日期的文字右对齐 */
  position: absolute;
  left:680px;
  bottom:0;
  

}

.horizontal-line {
  border-top-style:dashed;/*虚线样式*/
  height: 1px; /* 设置水平线高度 */
  color: #5c5b5b; /* 设置水平线颜色为浅灰色 */
  margin: 0.5em 0; /* 调整水平线的上下间距 */
  position: relative;
  z-index:999;
  bottom:-95px;
}


/*以下为新闻列表卡片样式*/
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1020x;
}
</style>