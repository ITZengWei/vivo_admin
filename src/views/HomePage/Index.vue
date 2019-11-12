<template>
  <div class="IndexPage">
    <!-- 顶部导航 -->
    <base-nav name="vivo"></base-nav>

    <!-- 中间内容区域 -->

    <p  class="tip">
      <span><van-icon name="fire-o" />官方正品</span>
      <span><van-icon name="smile-o" />满68包邮</span>
      <span><van-icon name="thumb-circle-o" />30天退款</span>
      <span><van-icon name="phone-circle-o" />全网点售后</span>
    </p>
    <!-- 轮播 -->
    <base-carousel :images="images" :height="260"></base-carousel>

    <!-- 商品分类 -->
    <van-grid :column-num="4" :border="false">

      <van-grid-item
              v-for="(value, index) in tabs"
              :key="index"
              :icon="value.icon"
              :text="value.name"
              :to="value.path"
      >
      </van-grid-item>
    </van-grid>

    <!-- 火热商品展示 -->
    <h-category :product="product"></h-category>

    <!-- 底部区域 -->
    <base-tab :active.sync="active"></base-tab>
  </div>
</template>

<script>
  /* 引入 局部组件 */
	import HCarousel from '../../components/BaseCarousel'
	import HCategory from './Category'

	export default {
		name: "Index",
		components: {
			HCategory
    },
    data() {
			return {
				/* 当前选中的 */
				active: 0,
				tabs: [
					{ name: '选购手机', icon: 'aim', path: '/choose/mobile' },
					{ name: '选购配件', icon: 'shop-o', path: '/choose/config' },
					{ name: '选购屏保', icon: 'music-o', path: '/choose/screen' },
					{ name: '定制手机', icon: 'aim', path: '/choose/create' },
				],
        images: [
          'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg',
          'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180430/20180430232146894398_original.jpg',
          'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg'
        ],
        product: {
					main: {
						src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1496689781362hd_530x530.png',
            title: 'X9Plus 全网通',
            subtitle: '优惠200元|限量促销',
            price: 3183.00
          },
          common: [
            {
	            src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
	            title: 'X9Plus 全网通',
	            subtitle: '优惠200元|限量促销',
	            price: 3183.00
            },
	          {
		          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png',
		          title: 'X20Plus 全面屏',
		          subtitle: '6.43英寸大屏|0.1s快速解锁',
		          price: 3498
	          },
	          {
		          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454710945hd_530x530.png',
		          title: 'X9Plus 全网通',
		          subtitle: '优惠200元|限量促销',
		          price: 3183.00
	          },
	          {
		          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1496689544465hd_530x530.png',
		          title: 'X9Plus 全网通',
		          subtitle: '优惠200元|限量促销',
		          price: 3183.00
	          },
	          {
		          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
		          title: 'X9Plus 全网通',
		          subtitle: '优惠200元|限量促销',
		          price: 3183.00
	          },
          ]
        }
      }
    },
    created() {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 &&  xhr.status === 200) {
					const result = JSON.parse(xhr.responseText)
          this.images = result.carousel
          this.product = result.product
					console.log(JSON.parse(xhr.responseText))
        }
      }
      xhr.open('get', '/get_car_pro')
      xhr.send()
    }
	}
</script>

<style scoped lang="less">
.tip {
  border-top: 1px solid rgb(244,244,244);
  color: rgb(185,185,185);
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 30px;
  .van-icon {
    vertical-align: -1px;
    margin-right: 2px;
  }
}
  .router {
    display: block;
  }
</style>