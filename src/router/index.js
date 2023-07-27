import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../components/MainPage/MainPage.vue'
import NAOForecastResult from '../components/NAO/ForecastResult.vue'
import NAOForecastExamination from '../components/NAO/ForecastExamination.vue'

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home
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

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
