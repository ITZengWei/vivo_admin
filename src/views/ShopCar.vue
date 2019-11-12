<template>
  <div class="ShopCar">
    <!-- 顶部导航 -->
    <base-nav name="购物车"></base-nav>
    <template v-if="!goodsList.length">

      <h3 style="text-align: center; padding-top: 30px;">
        <van-loading type="spinner" color="#1989fa" />
      </h3>
    </template>
    <template v-else>
      <van-card
              v-for="goods in goodsList" :key="goods.id"
              :num="goods.total + '库存'"
              :price="goods.price"
              :desc="goods.ad"
              :title="goods.title"
              :thumb="goods.images[0]"
              :centered="true"
              :lazy-load="true"
      >
        <div slot="tags" class="van-clearfix wra">
          <van-stepper class="floatLeft" v-model="goods.count" />
          <van-switch
                  v-model="goods.selected"
                  size="24px"
                  class="floatRight"
          />
        </div>
        <div slot="footer" style="padding-top: 10px;">
          <van-button type="danger" size="mini" @click="delById(goods.id)">删除</van-button>
        </div>
      </van-card>
    </template>



    <!-- 底部结账 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="toggleAll" >全选</van-checkbox></van-submit-bar>
  </div>

</template>

<script>
	export default {
		name: "ShopCar",
    data() {
			return {
				checked: true,
        value: 1,
        goodsList: []
      }
    },
    created() {
			this.goodsList = this.$store.getters.getShopCarList
    },
    methods: {
	    onSubmit() {

      },
      /* 根据 ID 去删除 */
	    delById(id) {
	    	this.$store.commit('removeShop', { id })
      }
    },
    computed: {
			totalPrice() {
				let sum = 0
        this.goodsList.forEach(item => {
					console.log(item)
					if (item.selected) {
						sum += item.price * item.count
					}
        })
				return sum * 100
      },
	    toggleAll: {
				get() {
					if (this.goodsList.length === 0) return false
					return this.goodsList.every(item => item.selected)
        },
        set() {
					let select = !this.toggleAll
	        this.goodsList.forEach(item => item.selected = select)
        }
      }
    }
	}
</script>

<style scoped>
.wra {
  padding: 10px;
}
</style>