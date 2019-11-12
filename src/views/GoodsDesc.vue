<template>
  <div class="goodsDesc">
    <!-- 顶部导航 -->
    <base-nav name="商品详情"></base-nav>
    <!-- 轮播图 区域 -->
    <base-carousel :images="goods.images" ></base-carousel>


    <!-- 商品价格区域 -->
    <div class="goodsArea">
      <div class="title"> {{ goods.title }}</div>
      <div class="content">
        <span>{{ goods.ad }}</span>
        {{ goods.info }}
        <span class="total">库存: {{ goods.total }}</span>
      </div>
      <span class="price">￥{{ goods.price }}</span>
    </div>
    <!-- 购买商品数量 -->
    <div class="buyCount">
      <span>购买数量：</span>
      <van-stepper v-model="count" input-width="40px" button-size="32px" class="numBox" />
    </div>

    <!-- 弹出层 区域 -->
    <van-cell is-link
      @click="handle"
    >
      <!-- 使用 title 插槽来自定义标题 -->
      <template slot="title">
        <van-icon name="passed" :style="{ 'vertical-align': 'middle' }" />支持花呗分期&nbsp;&nbsp;
        <van-icon name="passed" />支持以旧换新
      </template>
    </van-cell>

    <van-popup
            class="popups"
            v-model="show"
            closeable
            position="bottom"
            :style="{ height: '50%' }"

    >
      <p class="title" style="">服务说明</p>
      <div class="content">
        <p><van-icon name="passed" :style="{ 'vertical-align': 'middle' }" />支持花呗分期</p>
        <p>商品支持花呗分期</p>
        <p class="sliceLine"><van-icon name="passed" :style="{ 'vertical-align': 'middle' }" />可以使用换新鼓励金</p>
        <p>换新鼓励金通过参加以旧换新回收旧手机以后获得，旧手机享受额外补贴。<router-link to="#">现在换机</router-link></p>
      </div>
      <div class="footer">
        <van-button
          type="info"
          class="close"
          size="large"
          @click="closePopup"
        >
          关闭
        </van-button>
      </div>

    </van-popup>

    <!-- 商品介绍区域 -->
    <div class="productDesc" >
      <div class="goodDetailImg"><p><img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20160818/20160818164932573700_original.jpg" alt="详情图片"></p><p><img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20160818/20160818164953579712_original.jpg" alt="详情图片"></p><p><img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20160818/2016081816500395651_original.jpg" alt="详情图片"></p><p><img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20160818/20160818165007673346_original.jpg" alt="详情图片"></p><p><img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20160818/201608181651084158_original.jpg" alt="详情图片"></p><p><img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20170113/20170113090615670252_original.jpg" alt="详情图片"></p></div>
    </div>

    <!-- 底部 订单信息 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"  />
      <van-goods-action-icon icon="cart-o" text="收藏" @click="collect" />
      <van-goods-action-icon to="/shopCar" icon="cart-o" text="购物车"  />
      <van-goods-action-button  class="goods-btn" type="warning" text="加入购物车" @click="addShop" />
      <van-goods-action-button  class="goods-btn" type="danger" text="提交订单" @click="submitOrder" />
    </van-goods-action>
  </div>
</template>

<script>
	export default {
		name: "GoodsDesc",
    data() {
			return {
        show: false,
				/* 商品信息 */
        count: 1,
				goods: {}
      }
    },
    created() {
			/* 拿到 已买数量 */
      const { name, id } = this.$route.params
	    this.$http.get(`/choose_name_id?name=${ name }&id=${ id }`)
		    .then(result => {
			    this.goods = result.data
		    })

    },
    methods: {
			handle() {
				this.show = true
      },
      /* 收藏 */
	    collect() {
	    	let message = ''
	    	if (!this.goods.isCollect) {
			    this.goods.isCollect = true
			    this.$store.commit('addCollect', { name: 'goods', data: { ...this.goods } })
			    message = '收藏成功啦~'
			    console.log('hello word 收藏成功啦')
        } else {
			    message = '已经收藏了 亲~'
          console.log('hello word 已经收藏了')
        }
		    this.$dialog.alert({
			    title: '^_^',
			    message
		    })
	    },
      /* 发送订单 */
	    submitOrder() {
				console.log('提交订单', this.$route.params)
        const { name, id } = this.$route.params
		    this.$router.push(`/order/${ name }/${ id }/${ this.count }`)
      },
	    addShop() {

		    const total = this.goods.total
		    if (total - this.count < 0) {
			    return this.$dialog.alert({
				    title: '温馨提示库存不足',
				    message: `您购买的数量超过库存数量，现有(${ total })`
			    })
		    }
		    this.goods.total -= this.count

        /* TODO 添加购物车 */

        this.$store.commit('addShopCar', { selected: true, count: this.count, ...this.goods })

		    this.$dialog.alert({
			    title: '恭喜你',
			    message: `加入 ${ this.goods.title } ${ this.count } 件`
		    })

	    },
	    closePopup() {
				console.log('关闭')
		    this.show = false
      },
    }
	}
</script>

<style scoped lang="less">

  /* 弹出层 */
  .popups {
    .title {
      text-align: center; line-height: 55px; font-size: 18px;
    }
    .content {
      font-size: 14px;
      padding: 20px 30px;
      line-height: 30px;
      .sliceLine {
        margin-top: 25px;
      }
      p:nth-of-type(2n) {
        padding-left: 14px;
      }
    }
    .footer {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      padding: 10px;
      width: 100%;
      .close {
        width: 100%;
        height: 30px;
        border-radius: 14px;
        line-height: 30px;
      }
    }
  }

  /* 底部价格 */
  .goods-btn {
    border-radius: 0;
    margin-right: 0;
    height: 50px;
  }

  /* 商品价格区域 */
  .goodsArea {
    padding: 15px;
    .title {
      line-height: 35px;
      font-size: 20px;
    }
    .content {
      overflow: hidden;
      text-align:justify;
      line-height: 20px;
      font-size: 14px;
      span {
        color: rgb(255,75,61);
      }
      .total {
        float: right;
        font-style: normal;
        font-size: 16px;
      }
    }
    .price {
      margin-top: 10px;
      margin-bottom: 20px;
      line-height: 35px;
      font-size: 28px;
      color: rgb(248,18,0);
    }
  }
  .buyCount {
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cecece;
    border-top: 1px solid #cecece;
    .numBox {
      border: 1px solid rgb(178,178,178);
      .van-stepper__input {
        background-color: red;
      }
    }

  }
.productDesc {
  width: 100%;
  img {
    display: block;
    width: 300px;
    width: 100%;
    margin: 0 auto;
  }

}
</style>