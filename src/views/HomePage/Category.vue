<template>
  <!-- 火热商品 -->
  <div class="hotProduct">
    <h5 class="title">爆款产品</h5>
    <!-- 主商品 -->
    <router-link :to="`goods/${ product.main.name }/goods_id/${ product.main.id }`" class="mainProduct">
      <img :src="product.main.src" alt="">
      <div class="info">
        <h3 class="title">{{ product.main.title }}</h3>
        <p class="subtitle">{{ product.main.subtitle }}</p>
        <p class="price">￥{{ product.main.price }}</p>
      </div>
    </router-link>

    <!-- 其他商品 -->
    <van-grid :border="true" :column-num="2" class="product">
      <van-grid-item
        v-for="(item, i) in product.common"
        :key="i"

        :to="`goods/${ item.name }/goods_id/${ item.id }`"
      >
        <!-- 修改 -->
        <img :src="item.src" alt="">
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <p class="pricle">￥{{ item.price }}</p>
        <!--<van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />-->
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
	export default {
		name: "Category",
    data() {
			return {

      }
    },
    props: {
	    product: {
	    	type: Object,
        required: true
      }
    }
	}
</script>

<style scoped lang="less">
  /* 主要商品 */
  .hotProduct {
    border-top: 1px solid rgb(244,244,244);
    background-color: #fff;
    /* 标题 */
    .title {
      line-height: 50px;
      padding-left: 10px;
    }
    /* 主商品 */
    .mainProduct {

      padding-top: 15px;
      padding-bottom: 15px;
      display: flex;
      img {
        margin-left: 35px;
        max-width: 150px;
        height: 140px;
      }
      .info {
        text-align: center;
        flex: 1;
        font-size: 14px;
        .title {
          font-weight: 600;
          font-size: 16px;
          line-height: 35px;
          color: rgb(36,36,36);
        }
        .subtitle {
          line-height: 24px;

          margin-bottom: 30px;
          color: rgb(118,118,118);
        }
        .price {
          font-weight: 600;
          color: rgb(237,67,53);
        }
      }
    }
  }

  /* 普通商品 */
  .product {
    font-size: 12px;
    line-height: 20px;
    img {
      height: 88px;
    }
    .title {
      line-height: 20px;
      margin: 10px 0;
      font-weight: 600;
    }
    .price {
      color: rgb(237,67,53);
    }
  }
</style>