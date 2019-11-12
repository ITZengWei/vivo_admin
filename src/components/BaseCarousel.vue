<template>
  <van-swipe :autoplay="3000" :height="height">
    <van-swipe-item v-for="(image, index) in images" :key="index" >
      <!--<img v-lazy="image"/>-->
      <img class="img" :src="image" alt="">
    </van-swipe-item>
  </van-swipe>

</template>

<script>
	export default {
		props: {
			images: {
				type: Array,
				// required: true
			},
      height: {
				type: Number,
        default: 300
      }
		}
	}
</script>

<style scoped>
  .img {

    display: block;
    margin: 0 auto;
    height: 100%;
  }
</style>