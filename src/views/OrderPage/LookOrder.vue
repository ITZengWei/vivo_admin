<template>
  <div class="LookOrder">

    <!--{{ $route.params }}-->
    <!-- 顶部导航 -->
    <base-nav name="结算" />

    <!-- 用户收信息 不可编辑 -->
    <div class="userTake">
      <p class="base"><span class="name">收货人: {{ tallyOrder.name }}</span>
        <span class="tel">电话：{{ tallyOrder.tel }}</span></p>
      <p class="address">{{ tallyOrder.address }}</p>
    </div>
    <!-- 商品处理 -->
    <section class="payShop">
      <header class="header">商品清单</header>
      <main class="body shopDesc">
        <img :src="tallyOrder.src " alt="">
        <div class="info">
          <p class="first"><span class="title">{{ tallyOrder.title }} </span><span class="count"> × {{ tallyOrder.count }}</span></p>
          <p class="price">¥ {{ tallyOrder.price }}</p>
          <p class="content">{{ tallyOrder.content }}</p>
        </div>
      </main>
    </section>

    <section class="payShop">
      <header class="header">发票信息</header>
      <main class="body invoice">
        <p>*请输入发票信息:</p>
        <input type="text" placeholder="请输入发票信息">
      </main>
    </section>

    <section class="payShop">
      <header class="header">支付方式</header>
      <main class="body pay">
        <div class="navs">
          <span>在线支付</span>
          <span>花呗分期</span>
          <span>货到付款</span>
        </div>
        <div class="content">支持支付宝支付、微信支付、银行卡支付、财付通等</div>
      </main>
    </section>

    <section class="payShop">
      <header class="header">订单留言</header>
      <main class="body comment">
        <textarea placeholder="限300字（若有特殊需求，请联系商城在线客服)">
        </textarea>
        <p>商品总金额：¥3998</p>
        <p>运费：0.00</p>
        <p>优惠：¥0.00</p>
        <p style="color: #ccc;">赠送积分：3998</p>
      </main>
    </section>

    <!-- 底部 -->
    <van-submit-bar
            :price="0"
            button-text="立即结算"
            @submit="onSubmit"
    >
    <span>订单总金额：</span>
    </van-submit-bar>


  </div>
</template>

<script>

	export default {
		name: "LookOrder",
    data() {
			return {
				tallyOrder: {
					name: 'Bill',
          tel: 13407943933,
          address: '江西省抚州市临川',
          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1496689781362hd_530x530.png',
          title: 'Xplay6 128G版 ',
          count: 1,
          price: 3998
        }
      }
    },
    methods: {
	    onSubmit() {

      }
    }
	}
</script>

<style scoped lang="less">
  .LookOrder {
    background-color: rgb(244,244,244);
    /* 收货人信息 */
    .userTake {
      background-color: #fff;
      padding: 25px;
      font-size: 15px;
      background-image: url('https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png');
      background-repeat: repeat-x;
      background-position: left bottom;
      background-size: 3.5rem;
      .base {
        display: flex;
        line-height: 45px;
        justify-content: space-between;

      }
      .address {
        line-height: 20px;
        font-size: 12px;
      }
    }

    /* 商品信息 */
    .payShop {
      background-color: #fff;
      margin-top: 12px;
      .header {
        padding-left: 25px;
        font-size: 16px;
        line-height: 55px;
        border-bottom: 1px solid rgb(234,234,234);
      }

      .body {
        padding: 10px 25px;
        min-height: 75px;
        font-size: 14px;
        &.shopDesc {
          display: flex;
          img {
            height: 88px;
            margin-right: 30px;
          }
          .info {
            flex: 1;
            font-size: 14px;
            line-height: 25px;
            .first {
              font-size: 16px;
              display: flex;
              justify-content: space-between;
            }
            .price {
              color: red;
            }
          }
        }

      }

    }
    /* 发票信息 */
    .invoice {
      line-height: 30px;
      input {
        width: 100%;
        text-indent: 10px;
        display: block;
      }
    }
    /* 支付方式 */
    .pay {
      .navs {
        span {
          display: inline-block;
          border: 1px solid #d1d1d1;
          padding: 10px 20px;
          margin-right: 10px;
          &:last-child {
            margin: 0;
          }
        }

      }
      .content {
        margin-top: 10px;
        border: 1px solid #d1d1d1;
        padding: 10px;
        line-height: 18px;
        font-size: 14px;
      }
    }

    /* 订单留言 */
    .comment {
      textarea {
        width: 100%;
        min-height: 75px;
        padding: 5px;
        resize: none
      }
      p {

        color: #ccc;
      }
    }
  }

</style>