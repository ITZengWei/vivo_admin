/* 引入 Vue */
import Vue from 'vue'

/* 引入 VueRouter */
import  VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 引入 页面组件 */
import Index from './views/HomePage/Index'

/* 选购组件 */
const Choose = () => import('./views/Chooses')

/* 选购 商品 详情 */
const ChooseDesc = () => import('./views/GoodsDesc')

/* 查看订单 */
const LookOrder = () => import('./views/OrderPage/LookOrder')



/* 商品列表组件 */
const Category = () => import('./views/CategoryPage/Category')

/*新闻组件*/
const News = () => import('./views/NewsPage/News')

const NewsDesc = () => import('./views/NewsPage/NewsDesc')


/* 用户组件 */
const Login = () => import('./views/loginAndRegister/Login')

const Register = () => import('./views/loginAndRegister/Register')

const User = () => import('./views/UserPage/User')

const ShopCar = () => import('./views/ShopCar')

const MyCollect = () => import('./views/MyCollect')




/* 路由规则 */
const routerRules = {
	routes: [
		{ path: '/', redirect: '/index' },

		{ path: '/index', component: Index },

		/* 选购路由 */
		{ path: '/choose/:name', component: Choose },

		/* 选购商品 详情路由 */
		{ path: '/goods/:name/goods_id/:id', component: ChooseDesc },

		/* 查看订单 */

		// old {path: '/order/:name/goods_id/:id', component: LookOrder },
		{path: '/order/:name/:id/:count', component: LookOrder },



		{ path: '/category', component: Category },


		{ path: '/news', component: News },

		/* 新闻详情 */
		{ path: '/newsDesc', component: NewsDesc },

		{ path: '/user', component: User },

		/* 登录 */
		{ path: '/login', component: Login },

		/* 注册 */
		{ path: '/register', component: Register },

		/* 购物车 */
		{ path: '/shopCar', component: ShopCar },

		/* 我的收藏 */
		{ path: '/collect', component: MyCollect }

	]
}


/* 根据 路由规则 创建路由实例 */
const router = new VueRouter(routerRules)

/* 可以设置 全局守卫 */
const checkRoutes = ['/user', '/order']
router.beforeEach((to, from, next) => {
	if (checkRoutes.includes(to.path) && !document.cookie.match(/isLogin=1/)) {
		console.log('未登录')
		next('/login')
	} else {
		next()
	}
})

/* 导出 路由 */
export default router
