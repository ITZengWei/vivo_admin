import Vue from 'vue'
import router from './router'
import store from './store'

/* 引入 饿了么框架 */ 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/* 导入基本样式 */
import '@/assets/reset.css'

/* 导入 axios */
import axios from 'axios'

Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h('router-view')
}).$mount('#app')
