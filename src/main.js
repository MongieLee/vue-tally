import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
Vue.config.productionTip = false
import { DatePicker, MessageBox, Message } from "element-ui";

import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
Vue.component(DatePicker.name, DatePicker)
Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.onload = function () {
  setTimeout(() => {
    window.scrollTo(0, 10000)
  }, 0);
}
