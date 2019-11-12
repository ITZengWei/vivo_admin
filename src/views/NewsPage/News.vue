<template>
    <div class="NewsPage">
        <!-- 顶部导航 -->
        <base-nav name="新闻列表"></base-nav>

        <!-- 中间内容区域 -->
        <ul>
            <router-link to="/newsDesc" tag="li" class="news" v-for="(news, i) in newsList" :key="i">
                <p class="title">{{ news.title }}</p>
                <img v-lazy="news.src" >
                <p class="content">{{ news.content }}</p>
                <p class="time">发布日期 {{ news.time }}</p>
            </router-link>
        </ul>

        <!-- 底部区域 -->
        <base-tab :active.sync="active"></base-tab>
    </div>
</template>

<script>
	export default {
		name: "News",
    data() {
			return {
				active: 2,
        newsList: [
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
	        },
	        {
		        title: 'vivo X21全面屏手机五大个热门问题详解',
		        src: 'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/18/211307l0sr8tqrpststut0.jpg',
		        content: 'X21给人的第一感觉是比X20更加惊艳的，6.28英寸的大屏幕，19:9的屏幕比例，屏占比达到了90.3%，全面屏视野比X20更加广阔。',
		        time: '2018-4-18'
	        },
        ]
      }
    }
	}
</script>

<style scoped lang="less">
.NewsPage {
    ul {
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
}
</style>