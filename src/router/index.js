import { createRouter, createWebHashHistory } from 'vue-router'

import NAOForecastResult from '../components/NAO/ForecastResult.vue'
import NAOForecastExamination from '../components/NAO/ForecastExamination.vue'

const routes = [
    {
        path: '/NAOForecastResult',
        name: 'Home',
        component: NAOForecastResult
    },
    {
        path: '/NAOForecastExamination',
        name: 'About',
        component: NAOForecastExamination
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
