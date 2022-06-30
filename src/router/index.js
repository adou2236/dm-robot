import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '/src/views/login/index.vue'
import Setting from '/src/views/setting/index.vue'
import Panel from '/src/views/panel/index.vue'

export const constantRoutes= [
    {
        path: '/',
        component: Login,
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        path: '/panel',
        component: Panel
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});

export default router;
