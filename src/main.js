import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(ToastService)

app.component('InputText', InputText)
app.component('Button', Button)

app.mount('#app')
