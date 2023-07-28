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
import News1 from  '../news/news1.md'
import News2 from '../news/news2.md'

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
    },
    {
        path: '/News',
        name: '/News',
        component: News,
        children:[
            {
                path:'News1',
                component : News1
            },
            {
                path:'News2',
                component : News2
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
