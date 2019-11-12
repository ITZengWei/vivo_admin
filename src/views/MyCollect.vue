<template>
  <div class="Collect">
    <!-- 顶部导航 -->
    <base-nav name="我的收藏"></base-nav>

    <van-tabs>
      <van-tab v-for="tab in tabs">
        <div slot="title">
          <van-icon :name="tab.icon" />{{ tab.title }}
        </div>
        <template v-if="tab.content === 'goods'">
          <van-card
                  v-for="i in 10"
                  :key="i"
                  price="2.00"
                  desc="描述信息"
                  title="商品标题"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                  :lazy-load="true"
          >
            <div slot="footer">
              <van-button type="warning" size="mini" @click="del">取消</van-button>
            </div>
          </van-card>
        </template>
        <template v-else>
          <ul class="article">
            <li class="news" v-for="(article, i) in articleList" :key="i">
              <p class="title">{{ article.title }}</p>
              <router-link to="/newsDesc"><img :src="article.src" alt=""></router-link>
              <p class="content">{{ article.content }}</p>
              <p class="time">发布日期 {{ article.time }}
                <van-button
                  class="floatRight"
                  type="warning"
                  size="mini"
                  @click="del"
                >取消</van-button>
              </p>

            </li>
          </ul>
        </template>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
	export default {
		name: "MyCollect",
    data() {
			return {
				tabs: [
          { title: '商品', icon: 'cart-o', content: 'goods', },
          { title: '文章', icon: 'orders-o', content: 'article' },
        ]
      }
    },
    methods: {
			/* 删除收藏 */
	    del() {
		    this.$dialog.confirm({
			    message: '您，要删除收藏？'
		    }).then(() => {
		    	console.log('yes')
			    // on confirm
		    }).catch(() => {
			    // on cancel
			    console.log('no')
		    });
      }
    },
    computed: {
			goodsList() {
				return [
          { title: '商品' }
        ]
      },
	    articleList() {
		    return [
			    {
				    title: 'vivo X21全面屏手机五大个热门问题详解',
				    src: 'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/18/211307l0sr8tqrpststut0.jpg',
				    content: 'X21给人的第一感觉是比X20更加惊艳的，6.28英寸的大屏幕，19:9的屏幕比例，屏占比达到了90.3%，全面屏视野比X20更加广阔。',
				    time: '2018-4-18'
			    },
			    {
				    title: 'vivo X21全面屏手机五大个热门问题详解',
				    src: 'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/18/211307l0sr8tqrpststut0.jpg',
				    content: 'X21给人的第一感觉是比X20更加惊艳的，6.28英寸的大屏幕，19:9的屏幕比例，屏占比达到了90.3%，全面屏视野比X20更加广阔。',
				    time: '2018-4-18'
			    },
			    {
				    title: 'vivo X21全面屏手机五大个热门问题详解',
				    src: 'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/18/211307l0sr8tqrpststut0.jpg',
				    content: 'X21给人的第一感觉是比X20更加惊艳的，6.28英寸的大屏幕，19:9的屏幕比例，屏占比达到了90.3%，全面屏视野比X20更加广阔。',
				    time: '2018-4-18'
			    }
		    ]
      }
    }
	}
</script>

<style scoped lang="less">

  /* 文章 */
  ul.article {
    list-style: none;
    .news {
      padding: 12px 12px 25px;
      font-size: 12px;
      border-bottom: 1px dashed rgb(204,204,204);
      .title {
        line-height: 55px;
        font-size: 19px;
      }
      img {
        display: block;
        width: 100%;
        height: 160px;
      }
      .content {
        text-align: justify;
        padding-top: 10px;
        line-height: 20px;
      }
    }
  }

  /* 商品 */


</style>