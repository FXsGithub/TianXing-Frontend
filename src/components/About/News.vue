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
  <div class="pageContent">

    <div v-if="isNewsIndex">
      <h1>信息发布</h1>

      <li v-for="file in newsComponents">
        <router-link :to="`/news/${file.fileName}`">{{ file.title }} &nbsp&nbsp {{ file.date }}</router-link>
      </li>

    </div>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">

</style>