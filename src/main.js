import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import request from './utils/request'
import api from './service/api'

import 'element-plus/dist/index.css'

const app = createApp(App)

app.config.globalProperties.$http = request
app.config.globalProperties.$api = api

app.use(router).mount('#app')
