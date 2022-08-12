import { createApp } from 'vue'
// import 'virtual:windi-base.css'
// import 'virtual:windi-components.css'
import '@/design/index.less'
// import 'virtual:windi-utilities.css'

import 'virtual:windi.css' // 全局引入windicss
import 'virtual:svg-icons-register' // 全局引入icon配置
import App from './App.vue'
import { router } from '@/router/index'
import { setupStore } from '@/store'
import { initAppConfigStore } from '@/logics/initAppConfig'

const app = createApp(App)

setupStore(app)
// 初始化基础配置
initAppConfigStore()

app.use(router)

app.mount('#app')
