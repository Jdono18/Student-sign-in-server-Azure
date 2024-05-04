import { createApp } from 'vue'  // imports vue library
import { createPinia } from 'pinia'  // imports pinia library

import 'bootstrap/dist/css/bootstrap.min.css'  // imports bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'
import App from './App.vue'

//createApp(App).mount('#app')

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.mount('#app')  // mount vue within html div id=app

