import Vue from 'vue'
import App from './App.vue'

/* 引入 router 模快 */
import router from './router'


/* 引入 vuex */
import store from './store'


/* 引入 axios */
import axios from 'axios'
Vue.prototype.$http = axios

/* 引入 vant 框架 */
/* 暂时全局导入 */
import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Lazyload);

/* 引入数据 */
import tempData from './Mock/mock'

Vue.use(Vant)

/* 引入所有基础组件 */
import BaseCmp from './components'
Vue.use(BaseCmp)

/* 是否为上线 */
Vue.config.productionTip = false

new Vue({
  router,
	store,
  render: h => h(App)
}).$mount('#app')





 /* test ajax */
window.ajax = (url) => {
	const xhr = new XMLHttpRequest()
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 &&  xhr.status === 200) {
		  console.log(xhr.responseText)

		}
	}
	console.log(url)
	xhr.open('get', url)
	xhr.send()
}
