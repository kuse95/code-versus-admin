import { createApp } from 'vue'
import { store } from '@/stores'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/src/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import '@/permission'

import 'normalize.css'
import './styles/main.scss'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
Nprogress.start()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
