import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$url = 'http://www.softeem.xin:8080/myxj/'

const app = new Vue({
    ...App
})
app.$mount()
