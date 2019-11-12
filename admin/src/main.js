import Vue from 'vue'
import router from './router'
import store from './store'

/* 导入 Element */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 导入基础样式 */
import ('@/assets/reset.css')

/* 引入 axios */
import axios from 'axios'
Vue.prototype.$http = axios

Vue.directive('focus', {
	bind(ele) {
		ele.focus()
	},
	inserted(ele) {
		ele.focus()
	}
})



Vue.config.productionTip = false

new Vue({
  router,
	store,
  render: h => h('router-view')
}).$mount('#app')
