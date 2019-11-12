<template>
  <van-tabbar class="tabBar" v-model="cActive">
    <van-tabbar-item
      v-for="item in barList"
      :icon="item.tabIcon"
    >
      <router-link :to="item.path">{{ item.name }}</router-link>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
	export default {
		name: "BaseTabBar",
		data() {
			return {
				cActive: this.active,
				/* 导航列表 */
				barList: [
					{ name: '首页', path: '/index', tabIcon: 'wap-home' },
					{ name: '分类', path: '/category', tabIcon: 'search' },
					{ name: '新闻', path: '/news', tabIcon: 'friends-o' },
					{ name: '我的', path: '/user', tabIcon: 'setting-o' },
				],
			}
		},
    created() {
			this.cActive = this.active
    },
    props: {
			active: {
				type: Number,
        required: true
      }
    },
    watch: {
			cActive(val) {
				this.$emit('update:active', val)
      }
    }
	}
</script>

<style scoped>
  .tabBar {
    line-height: 55px;
    height: 55px;
  }
</style>