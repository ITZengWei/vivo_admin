<template>
    <div class="UserPage">

        <!-- 顶部导航 -->
        <base-nav name="个人中心"></base-nav>


        <!-- 中间内容区域 -->
       <div class="content">
           <header class="header">
               <van-image
                       width="70"
                       height="70"
                       radius="50%"
                       src="https://img.yzcdn.cn/vant/cat.jpeg"
               />
           </header>
           <main>
               <!-- 优惠信息 -->
               <dl class="coupon">
                  <dd>
                      <p>0</p>
                      <p>优惠卷</p>
                  </dd>
                   <dd>
                       <p>0</p>
                       <p>换鼓励金</p>
                   </dd>
                   <dd>
                       <p>10794</p>
                       <p>积分</p>
                   </dd>
               </dl>
               <van-cell title="我的订单" value="全部" />
               <van-grid
                 :border="false"
                 class="money"
               >
                 <van-grid-item :to="'comment'" icon="send-gift-o" text="待付款" />
                 <van-grid-item :to="'comment'" icon="apps-o" text="待收货" />
                 <van-grid-item :to="'comment'" icon="like-o" text="待评价" />
                 <van-grid-item :to="'comment'" icon="exchange" text="退款/退货" />
               </van-grid>
               <van-cell title="我的收藏" to="/collect" icon="credit-pay" is-link/>
               <van-cell title="我的收货地址" icon="aim" is-link/>
               <van-cell title="我的购物车" to="shopCar" icon="ecard-pay" is-link/>
               <van-cell title="扫码分享" icon="qr" is-link @click="show = true" />
               <van-dialog
                 v-model="show"
                 confirmButtonText="残忍拒绝"

               >
                 <img src="../../assets/ewm.jpg" class="ewm">
               </van-dialog>
               <van-cell title="关于我们" icon="info-o" is-link/>
           </main>

       </div>
        <!-- 底部区域 -->
        <base-tab :active.sync="active"></base-tab>
    </div>
</template>

<script>
	export default {
		name: "User.vue",
    data() {
			return {
				active: 3,
				show: false
      }
    },
    methods: {
    }
	}
</script>

<style scoped>
.wra {
    overflow-x: hidden;
    overflow-y: auto;
}

.header {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(4,151,248);
}

.ewm {
  height: 100%;
  width: 100%;
}

.coupon {
    display: flex;
    background-color: #fff;
    border-bottom: 5px solid rgb(244,244,244);
}

.coupon dd {
    padding: 20px;
    flex: 1;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
}



.money {
    color: rgb(85,160,241);
}
</style>