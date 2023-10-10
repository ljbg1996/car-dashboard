import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import DriverPage from './pages/DriverPage.vue'
// @ts-ignore
import CenterPage from './pages/CenterPage.vue'
// @ts-ignore
import CoDriverPage from './pages/CoDriverPage.vue'
// @ts-ignore
import Car from './Car.vue'


import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes : RouteRecordRaw[] =[
    {path:"/driver", name: "driver", component: DriverPage},
    {path:"/center",name:"center", component: CenterPage},
    {path:"/codriver",name:"codriver", component: CoDriverPage}
]
const router = createRouter({

    history: createWebHistory(),

    routes,
    })

const pinia =createPinia();
const app=createApp (App);
app.use( router);
app.use (pinia);
app.mount('#app');

