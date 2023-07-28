import { createRouter, createWebHashHistory } from 'vue-router'

// 在这里引入组件
import MainPage from '../components/MainPage/MainPage.vue'
import ENSOForecastExamination1 from "../components/ENSO/ForecastExamination1.vue";
import ENSOForecastExamination2 from "../components/ENSO/ForecastExamination2.vue";
import ENSOForecastResult from "../components/ENSO/ForecastResult.vue";
import SeaIceForecastExamination from "../components/SeaIce/ForecastExamination.vue";
import SeaIceForecastResult from "../components/SeaIce/ForecastResult.vue";
import NAOForecastExamination from "../components/NAO/ForecastExamination.vue";
import NAOForecastResult from "../components/NAO/ForecastResult.vue";
import News from '../components/About/News.vue'

import {defineAsyncComponent} from "vue";

const newsFiles = import.meta.glob('../news/*.md')
const newsRoutes = Object.keys(newsFiles).map(filePath => {
    // 你可能需要根据文件路径创建路由路径。这是一个简单的例子：
    const path = `/news/${filePath.split('/').pop().replace('.md', '')}`

    // 每个值是一个返回模块的 promise，你可以通过调用这个函数来获取模块。
    const component = newsFiles[filePath]

    // 返回一个路由对象。
    return {
        path,
        component: defineAsyncComponent(() => component())
    }
})


const routes = [

    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/ENSOForecastExamination1',
        name: 'ENSOForecastExamination1',
        component: ENSOForecastExamination1
    },
    {
        path: '/ENSOForecastExamination2',
        name: 'ENSOForecastExamination2',
        component: ENSOForecastExamination2
    },{
        path: '/ENSOForecastResult',
        name: 'ENSOForecastResult',
        component: ENSOForecastResult
    },{
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
    }
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
