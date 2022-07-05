import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'ant-design-vue/dist/antd.css';
import { store, key } from '@/store';
import './permission.js'


const app = createApp(App)

app.use(router).use(store,key).mount('#app')
