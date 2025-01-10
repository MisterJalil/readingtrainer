import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import "./components/style.css"

createApp(App).use(store).use(router).mount('#app')



