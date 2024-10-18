import './assets/main.styl'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'

const head = createHead()

const app = createApp(App)

app.use(head)
app.use(createPinia())
app.use(router)

app.mount('#app')
