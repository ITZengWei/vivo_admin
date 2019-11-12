<template>
  <!-- 头部区域 -->
  <van-nav-bar
          :title="name"
          left-text="返回"
          @click-left="$router.back()"
          left-arrow
          :z-index="999"
          class="navIcon">
  </van-nav-bar>
</template>

<script>
	export default {
		name: "BaseNavBar",
    data() {
			return {

      }
    },
    props: {/*
      不要 active
      active: {
        type: Number,
          required: true
      }*/
      name: {
      	type: String
      }
    }
	}
</script>

<style scoped lang="less">
  .navIcon {
    height: 55px;
    line-height: 55px;
    position: fixed;
    top: 0;
    width: 100%;
    .van-icon {
      font-size: 18px;
    }

  }
</style>