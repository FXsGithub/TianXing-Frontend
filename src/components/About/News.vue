<script setup>

const files = import.meta.glob('../../news/*.md')
let newsFiles = Object.keys(files).map(filePath => {
  // 取出文件名
  return filePath.split('/').pop().replace('.md', '')
})

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isNewsIndex = computed(() => route.path === '/news' || route.path === '/News' )

for(let i in files){
  console.log(Object.getOwnPropertyNames(files[i]))
}

</script>

<template>
  <div class="pageContent">

    <div v-if="isNewsIndex">
      <h1 >信息发布</h1>

      <li v-for="file in newsFiles" :key="file">
        <router-link :to="`/news/${file}`">{{ file }}</router-link>
      </li>
    </div>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">

</style>