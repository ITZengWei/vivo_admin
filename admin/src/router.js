import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

/* 引入组件 */
const App = () => import('@/views/App')

/* 仪表盘组件 */
const DashBoard = () => import('@/views/DashBoard')

/* 设置组件 */
const Config = () => import('@/views/Config')

/* 底部导航区域 */

const FootNav = () => import('@/views/FootNav')


/* 分类区域 */
const Category = () => import('@/views/Category')

const Goods = () => import('@/views/Goods')

/* 用户区域 */
const Users = () => import('@/views/Users')


/* 登录区域 */
const Login = () => import('@/views/Login')

/* 轮播图区域 */
const Carousel = () => import('@/views/Carousel')



const router = new Router({
  routes: [
    { path: '/', component: App, redirect: '/dashboard',
      children: [
        { path: 'dashboard', component: DashBoard },
        { path: 'config', component: Config },

        { path: 'footnav', component: FootNav },

        /* 分类区域 */
	      { path: 'category', component: Category },
	      { path: 'goods', component: Goods },

        /* 用户区域 */
	      { path: 'users', component: Users },

	      /* 轮播图区域 */
	      { path: 'carousel', component: Carousel }
      ]
    },
	  { path: '/login', component: Login }
  ]
})

/* 设置全局导航 */
/* 需要检验的 router */
const checkRouter = ['/dashboard', '/footnav', '/category', '/goods', '/users', '/carousel', '/news']
router.beforeEach((to, from, next) => {
	if (checkRouter.includes(to.path)) {
		/**/
		/* 获取本地 token */
		let token = window.localStorage.getItem('z-token')
		let formData = new FormData()
		formData.append('token', token)
		console.log(token)
		axios.post('http://localhost:88/vivo_interface/Login/token.php', formData)
			.then(res => {
				if (res.data.code === 20000) {
					next()
				} else {
					/* 去登录页面 */
					next('/login')
				}
			})

		console.log('需要检验')
	} else {
		/* 不需要检验直接放行 */
		next()
	}
})

export default router
