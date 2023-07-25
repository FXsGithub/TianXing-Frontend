import './style.scss'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import axios from "axios";
// import * as echarts from 'echarts';
//axios.defaults.baseURL = 'http://127.0.0.1:1234'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')