<template>
  <div class="CategoryPage">
    <!-- 顶部导航 -->
    <base-nav name="商品分类"></base-nav>

    <!-- 中间内容区域 -->
    <van-row tag="div">
      <van-col span="6">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item, index) in sidebar"
            :title="item.title"
            :info="item.num ? item.num : ''"
            :key="index"
            @click="handle(item.id)"
          />

        </van-sidebar>
      </van-col>

      <van-col span="18" class="icon">
        <van-grid
                :gutter="4"
                :square="true"
                :column-num="3"
        >
          <van-grid-item
              v-for="image in list"
              to="goods/config/goods_id/4">
            <!--<img src="../assets/img.jpg" alt="">-->
            <van-image :src="image.src"/>
          </van-grid-item>
        </van-grid>
      </van-col>

    </van-row>

    <!-- 底部区域 -->
    <base-tab :active.sync="active"></base-tab>
  </div>
</template>

<script>
	export default {
		name: "Goods",
		data() {
			return {
				active: 1,
				activeKey: 0,
        category: 1,
				sidebar: [
					{ id: 1, title: 'QQ飞车', num: 2},
					{ id: 2, title: '逆战', num: 3},
					{ id: 3, title: '英雄联盟', num: 4},
					{ id: 4, title: '王者荣耀', num: 0}
				],
				images: [
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png' },
          { id: 2, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454710945hd_530x530.png' },
          { id: 3, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1496689781362hd_530x530.png' },
          { id: 4, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/11/4111_1492998667334hd_530x530.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1496689544465hd_530x530.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972514378hd_250x250.png' },
          { id: 2, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/20/4020_1481558694236_530x530.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1481558960471_530x530.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/73/4273_1491007460873hd_250x250.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/83/4183_1482921083765_530x530.png' },
          { id: 1, src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/81/4181_1482720908043_250x250.png' }
				]
			};
		},
    methods: {
	    handle(id) {
	    	this.category = id
      }
    },
    computed: {
			list() {
				return  this.images.filter(item => item.id === this.category)
      }
    }
	}
</script>

<style scoped>
  .icon img {
    width: 100%;
    height: 100%;
  }
</style>