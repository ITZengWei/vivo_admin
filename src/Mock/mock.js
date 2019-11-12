import DataModel from './model'

/* 引入数据模型 */
const { mock, CarouselImages, ProductList, users, randArr } = DataModel

console.log(ProductList)

/* 处理 首页数据 */

let temp = ProductList.map(item => {
	const { id, name, src, title, subtitle, price } = item

	return { id, name, src, title, subtitle, price }
})

/* 发送 数据 */
let sendData = {
	carousel: CarouselImages,
	product: {
		main: randArr(1, temp),
		common: randArr(10, temp),
	}
}
/* 设计 url */
mock('/get_car_pro', 'get', mock(sendData))


/* 处理选购 */

const goodsFilter = (context) => {
	const arr = []
	ProductList.forEach(item => {
		if (item.name === context) {
			const { id, type, src, title, subtitle, price, total } = item
			arr.push({ id, type, src, title, subtitle, price, total })
		}
	})

	return arr
}

/* 设计 url */
mock('/choose_mobile', 'get', mock(goodsFilter('mobile')))
mock('/choose_config', 'get', mock(goodsFilter('config')))
mock('/choose_screen', 'get', mock(goodsFilter('screen')))
mock('/choose_create', 'get', mock(goodsFilter('create')))

/* 处理 购物车详情 */


const goodsDescFilter = (obj) => {
	const target =  ProductList.find(item => {
		return (item.name == obj.name && item.id == obj.id)
	})
	console.log(target)
	const { id, images, title, ad, info, price, total, intro} = target

	return { id, images, title, ad, info, price, total, intro}
}

mock(/\/choose_name_id\?name=\w+&id=\d+/, 'get', (req) => {
	// {url: "/choose_name_id?name=config&id=4", type: "GET", body: null}
	let { url } = req
	console.log(url)
	let params = url.slice(url.lastIndexOf('?') + 1).split('&')
	params.forEach((item, i) => {
		 params[i] = item.split('=')
	})
	let obj = {}
	params.forEach(item => {
		obj[item[0]] = item[1]
	})
	console.log(goodsDescFilter(obj))
	return goodsDescFilter(obj)
})

// mock('/choose_name_id', 'get', mock(goodsDescFilter('create')))

/* 处理登录 */

const isExist = (person, db) => {

	return db.find(item => {
		let flag = true
		for (let prop in item) {
			if (item[prop] !== person[prop]) {
				flag = false
			}
		}
		return flag
	})
}

mock('/login', 'post', (req) => {
	const { username, password } = JSON.parse(req.body)
	console.log(username, password)
	const flag = isExist({ username, password }, users)
	if (flag) return {
		msg: '登陆成功',
		status: 200
	}
	return { msg: 'not find user' }
})
console.log(users)

/* 处理注册 */
mock('/addUser', 'post', (req) => {
	const person = JSON.parse(req.body)

	const flag = isExist(person, users)
	if (flag) {
		return { msg: '用户已存在', status: 401 }
	}

	users.push(person)
	console.log(users)
	return {
		msg: 'add is ok',
		status: 200
	}
})







