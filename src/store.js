import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	/* 类似于data */
	state: {
		/* 购物车列表 */
		/* { title, subtitle, count, price, selected, total } */
		shopCarList: [],
		/* 收藏列表 */
		collectList: {
			/* 文章列表 */
			/* { title, src, content, time } */
			article: [

			],
			/* { title, subtitle, price } */
			/* 商品列表 */
			goods: [

			]
		}
	},
	/* 类似与 methods */
	mutations: {
		/* 添加购物车 */
		addShopCar(state, goods) {
			let item = state.shopCarList.find(item => item.id === goods.id)
			if (item) {
				/* 有这件商品 */
				item.count += goods.count
			} else {
				state.shopCarList.push(goods)
			}
			console.log(state.shopCarList)
		},
		/* 根据删除购物车 商品 */
		removeShop(state, msg) {
			let index = state.shopCarList.findIndex(item => item.id === msg.id)
			state.shopCarList.splice(index, 1)
		},

		/* 添加收藏 */
		addCollect(state, item) {
			const { goods, article } = state.collectList
			if (item.name === 'article') {
				article.push(item)
				/* 添加文章 */
			} else if (item.name === 'goods') {
				/* 添加 商品 */
				goods.push(item)
			}
			console.log('添加成功')
		},

	},
	/*  类似与 computed */
	getters: {
		getShopCarList(state) {
			return state.shopCarList
		}
	}
})

export default store