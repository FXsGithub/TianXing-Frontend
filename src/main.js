import './style.scss'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import './mock'
import axios from 'axios'

// axios 默认的请求地址，真实服务器地址
// axios.defaults.baseURL = 'https://www.tjensoprediction.com:8888/'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')