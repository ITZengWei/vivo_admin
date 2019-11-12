/* 模拟数据 */
/* 引入mock */
import Mock  from 'mockjs'

const Random = Mock.Random

/* 取随机数组 */
const randArr = (num, arr) => {
	let tempArr = []
	const len = arr.length
	for (let i = 0 ; i < num; i++) {
		const index = Math.floor(Math.random() * len)
		tempArr.push(arr[index])
		/* 如果是 一个 我们直接取出来 */
		if (num == 1) tempArr = tempArr[0]
	}
	return tempArr
}

/* 随机函数 */
function rand(num, callback) {
	if (num === 1) return callback()

	const arr = []
	for (let i = 0; i < num; i++) {
		arr.push(callback())
	}
	return arr
}


/* 轮播图 图片 */
const CarouselImages = [
	'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg',
	'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180430/20180430232146894398_original.jpg',
	'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg'
]

/* 名称数组 */
const nameArr = ['mobile', 'config', 'screen', 'create']

/* 类型 数组 */
const typeArr = ['A', 'B', 'C', 'D']

const ProductList = rand(30, () => {

	/* 随机商品 */
	const item = {
		/* ID */
		id: Random.integer(1, 50) + Random.integer(20, 50),
		/* 商品名称 */
		name: randArr(1, nameArr),
		/* 商品类别 */
		type: randArr(1, typeArr),
		/* 商品图片 */
		src: Random.image('530x530', Random.color(), '#fff', 'png', 'Product'),
		/* 商品详情 轮播图 */
		images: rand(3, () => Random.image('530x530', Random.color(), '#fff', 'png', '详情')),
		/* 商品介绍 */
		info: Random.ctitle(5),
		/* 商品标题 */
		title: Random.ctitle(4),
		/* 副标题 */
		subtitle: Random.ctitle(10),
		/* 价格 */
		price: Number(Random.float(100, 300, 0, 2).toFixed(2)),
		/* 库存 */
		total: Random.integer(10, 199),
		/* 广告 */
		ad: Random.title(3),
		/* 图文介绍 */
		intro: '<div>图文介绍</div>'
	}

	return item
})

/* 用户列表 */
const users = [
	{ username: 'Bill', password: '110349' }
]

/* 导出数据 */
export default {
	mock: Mock.mock,
	ProductList,
	CarouselImages,
	randArr,
	users
}


