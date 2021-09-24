
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/style.css'

import 'element-plus/lib/theme-chalk/index.css';

import {ElSlider} from 'element-plus';

const app = createApp(App)
app.component(ElSlider.name, ElSlider)
app.use(store)
app.use(router)
app.mount('#app')
