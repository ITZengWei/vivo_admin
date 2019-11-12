import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

const Login = () => import('@/views/Login')

const App = () => import('@/views/App')

const DashBoard = () => import('@/views/DashBoard')

const Config = () => import('@/views/Config')

const FootNav = () => import('@/views/footnav')

const Category = () => import('@/views/Category')

const Goods = () => import('@/views/Goods')

const Users = () => import('@/views/Users')

const Carousel = () => import('@/views/Carousel')

const Article = () => import('@/views/Article')


const router = new Router({
  routes: [
    { path: '/', component: App,
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', component: DashBoard },
        { path: 'config', component: Config },
        { path: 'footnav', component: FootNav },
        { path: 'category', component: Category },
        { path: 'goods', component: Goods },
        { path: 'users', component: Users },
        { path: 'carousel', component: Carousel },
        { path: 'article', component: Article },
      ]
    },
	  { path: '/logout', component: Login }
  ]
})

/* 不需要拦截的 路由 */
const unInterceptRouter = ['/logout', '/register']
router.beforeEach((to, from, next) => {
  /* 进行验证 */
  if (!unInterceptRouter.includes(to.path)) {
    let token = localStorage.getItem('zw_token')
    /* 判断有没有 */
    if (!token) return next('/logout')

    /* 判断真伪、过期 */
    const formData = new FormData()
    formData.append('token', token)
	  axios.post('http://localhost:88/interface/Login/token.php', formData)
      .then(response => {
        if (response.data.code === 20000) {
          next()
        } else {
          next('/logout')
        }
      })
      .catch(() => {

      })
  } else {
	  next()
  }
})
/* 到处 */
export default router