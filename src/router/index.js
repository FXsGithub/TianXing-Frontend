import { createRouter, createWebHashHistory } from 'vue-router'

// 在这里引入组件
import Home from '../components/MainPage/Home.vue'
import Demo from '../components/MainPage/Demo.vue'
import ENSOForecastExamination from "../components/ENSO/ForecastExamination.vue";
import ENSOForecastResult from "../components/ENSO/ForecastResult.vue";
import SeaIceForecastExamination from "../components/SeaIce/ForecastExamination.vue";
import SeaIceForecastResult from "../components/SeaIce/ForecastResult.vue";

import NAOForecastExamination from "../components/NAO/ForecastExamination.vue";
import NAOForecastResult from "../components/NAO/ForecastResult.vue";

import News from '../components/About/News.vue'
import Achievements from "../components/About/Achievement.vue";

import {defineAsyncComponent} from "vue";
import GlobalWeatherForecastResult from "../components/GlobalWeather/GlobalWeatherForecastResult.vue";

const newsFiles = import.meta.glob('../news/*.md')
const newsRoutes = Object.keys(newsFiles).map(filePath => {
    // 你可能需要根据文件路径创建路由路径。这是一个简单的例子：
    const path = `/news/${filePath.split('/').pop().replace('.md', '')}`

    filePath = filePath.split('/').pop().split('.')[0]

    // 返回一个路由对象。
    return {
        path,
        component: ()=>import(`../news/${filePath}.md`)
    }
})

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Demo',
        name: 'Demo',
        component: Demo
    },
    {
        path: '/ENSOForecastExamination',
        name: 'ENSOForecastExamination',
        component: ENSOForecastExamination
    },
    {
        path: '/ENSOForecastResult',
        name: 'ENSOForecastResult',
        component: ENSOForecastResult
    },

    
    {
        path: '/SeaIceForecastExamination',
        name: 'SeaIceForecastExamination',
        component: SeaIceForecastExamination
    },
    {
        path: '/SeaIceForecastResult',
        name: 'SeaIceForecastResult',
        component: SeaIceForecastResult
    },
    {
        path: '/NAOForecastResult',
        name: 'NAOForecastResult',
        component: NAOForecastResult
    },
    {
        path: '/NAOForecastExamination',
        name: '/NAOForecastExamination',
        component: NAOForecastExamination
    },
    {
        path: '/Achievements',
        name:'Achievements',
        component: Achievements
    },
    {
        path: '/GlobalWeatherForecastResult',
        name:'GlobalWeatherForecastResult',
        component: GlobalWeatherForecastResult
    },
]

let rootNewsRoutes = {
    path: '/News',
    name: '/News',
    component: News,
}

rootNewsRoutes.children = newsRoutes;

//动态添加路由，根据news文件夹下面的每一个页面创建路由，rootNewsRoutes是newsRoutes的father
routes.push(rootNewsRoutes)


const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
