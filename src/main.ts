import { createApp } from 'vue'
import App from './App.vue'
import {vuexStore} from './store'

createApp(App).use(vuexStore).mount('#app')
