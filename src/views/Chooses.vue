<template>
  <div class="choose">
    <!-- 顶部导航 -->
    <base-nav :name=" navName "></base-nav>
    <!-- 标签页 -->
    <van-tabs>
      <van-tab v-for="(type, index) in types" :key="index"
               :title="type + '类型'">
        <van-grid :border="true" :column-num="2" class="product">
          <van-grid-item
            v-for="goods in showData(type)"
            :key="goods.id"
            :to="'/goods/' + $route.params.name + '/goods_id/' + goods.id "
          >
            <!-- 商品详情  + 产品 类型   商品 ID  + id -->
            <!--{{ '/goods/' + $route.params.name + '/goods_id/' + goods.id }}-->
            <img :src="goods.src" alt="">
            <p class="title">{{ goods.title }}</p>
            <p class="subtitle">{{ goods.subtitle }}</p>
            <p class="price">{{ goods.price }}</p>
          </van-grid-item>
        </van-grid>

      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
	export default {
		name: "Chooses",
    data() {
			return {
				/* 显示数据 */

        goodsList: [
          {
          	id: 1,
          	type: 'Xplay',
	          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
            title: 'X9Plus 全网通',
            subtitle: '优惠200元|限量促销',
            price: '￥2798',
            total: 99,
          },
	        {
		        id: 2,
		        type: 'Xplay',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png',
		        title: 'X20Plus 全面屏',
		        subtitle: '6.43英寸大屏|0.1s快速解锁',
		        price: '￥2798',
		        total: 99,
	        },
	        {
		        id: 3,
		        type: 'X',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
		        title: 'X9Plus 全网通',
		        subtitle: '优惠200元|限量促销',
		        price: '￥2798',
		        total: 99,
	        },
	        {
		        id: 4,
		        type: 'Y',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
		        title: 'X9Plus 全网通',
		        subtitle: '优惠200元|限量促销',
		        price: '￥2798',
		        total: 99,
	        },
	        {
		        id: 5,
		        type: 'Xplay',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
		        title: 'X9Plus 全网通',
		        subtitle: '优惠200元|限量促销',
		        price: '￥2798',
		        total: 99,
	        },
	        {
		        id: 6,
		        type: 'Xplay',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png',
		        title: 'X20Plus 全面屏',
		        subtitle: '6.43英寸大屏|0.1s快速解锁',
		        price: '￥2798',
		        total: 99,
	        },
	        {
		        id: 7,
		        type: 'X',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
		        title: 'X9Plus 全网通',
		        subtitle: '优惠200元|限量促销',
		        price: '￥2798',
		        total: 99,
	        },
	        {
		        id: 8,
		        type: 'Y',
		        src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
		        title: 'X9Plus 全网通',
		        subtitle: '优惠200元|限量促销',
		        price: '￥2798',
		        total: 99,
	        },
        ]
      }
    },
    created() {
			console.log(this.$route.params.name)
      this.$http.get('/choose_mobile')
        .then((result) => {
        	this.goodsList = result.data
        })
        .catch((err) => {
        	console.log('error is ', err)
        })
    },
    methods: {
      /* 展示数据 */
      showData(type) {
        console.log(type)
        return this.goodsList.filter(item => {
        	if (type === '全部') return true
          return item.type == type
        })
      }
    },
    computed: {
			/* 类型集合 */
			types() {
				const arr = ['全部']
				this.goodsList.forEach(item => {
					if (!arr.includes(item.type)) {
						arr.push(item.type)
          }
				})
				return arr
      },
      /* 导航名字 */
      navName() {
	      const nameObj = { 'mobile': '选购手机', 'config': '选购配件', 'screen': '选购碎屏保', 'create': '定制手机' }
      	return nameObj[this.$route.params.name]
      }
	  }
	}
</script>

<style scoped lang="less">
  .product {
    font-size: 12px;
    line-height: 20px;
    img {
      height: 100px;
    }
    .title {
      line-height: 20px;
      margin: 10px 0;
      font-weight: 600;
    }
    .price {
      color: rgb(237, 67, 53);
    }
  }
</style>