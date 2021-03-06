import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/util/http'
import storage from '@/util/storage'
import cookie from '@/util/cookie'
import ui from './components/index'
import store from '@/store/index'
import './scss/main.scss'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$storage = storage
Vue.prototype.$cookie = cookie

Vue.use(ui)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
