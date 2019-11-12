/* 引入 顶部 栏目 组件 */
import BaseNavBar from './BaseNavBar'

import BaseTabBar from './BaseTabBar'

import BaseCarousel from './BaseCarousel'

export default  {
	install: function (Vue) {
		/* 组装 组件 */
		Vue.component('base-nav', BaseNavBar)
		Vue.component('base-tab', BaseTabBar)
		Vue.component('base-carousel', BaseCarousel)

	}
}