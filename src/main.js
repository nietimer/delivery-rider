import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import routes from '../router/index.js'

const app = createApp(App)

app.use(routes)
app.use(createPinia())

app.mount('#app')
