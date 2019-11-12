<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="auto" >

      <div class="logo">
        <el-image
          style="width: 88px; height: 60px"
          :src="logo"
          fit="cover">
        </el-image>
        <!--<img src="" alt="">-->
      </div>
      <el-menu
       default-active="/dashboard"
       :collapse="isCollapse"
       class="slideBar el-menu-vertical-demo "
       collapse-transition
       unique-opened
       router
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>全局设置</template>
          <el-menu-item index="/dashboard">
            <i class="el-icon-location"></i>
            仪表盘
          </el-menu-item>
          <el-menu-item index="/config"> <i class="el-icon-setting"></i>设置</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>底部区域</template>
          <el-menu-item index="/footnav">
            <i class="el-icon-location"></i>
            底部导航
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-coin"></i>分类区域</template>
          <el-menu-item index="/category">
            <i class="el-icon-s-goods"></i>商品分类
          </el-menu-item>
          <el-menu-item index="/goods">
            <i class="el-icon-ice-cream"></i>商品列表
          </el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-picture"></i>轮播区域</template>
          <el-menu-item index="/carousel">
            <i class="el-icon-s-opportunity"></i>轮播列表
          </el-menu-item>

        </el-submenu>

        <el-submenu index="5">
          <template slot="title"><i class="el-icon-picture"></i>新闻区域</template>
          <el-menu-item index="/news">
            <i class="el-icon-s-opportunity"></i>新闻列表
          </el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title"><i class="el-icon-user-solid"></i>用户区域</template>
          <el-menu-item index="/users">
            <i class="el-icon-user"></i>用户列表
          </el-menu-item>

        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header>

        <!-- 左侧 区域 -->
        <div class="header-left" >
          <el-button
            type="primary"
            plain
            :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="isCollapse = !isCollapse"
          ></el-button>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>

        <!-- 右侧 区域 -->
        <div class="header-right">
          <el-link type="primary" icon="el-icon-s-home"></el-link>
          <el-link type="primary" icon="el-icon-s-tools"></el-link>
          <el-badge :value="1" class="item" type="danger">
            <el-link type="primary" icon="el-icon-message-solid"></el-link>
          </el-badge>

          <el-dropdown @command="handleItemClick">
            <template></template>
            <span class="el-dropdown-link">
              <template v-if=$store.getters.getUserInfo.id>
                <el-avatar :size="30" :src="$store.getters.getUserInfo.avatar"/>
                <span>{{ $store.getters.getUserInfo.username }}</span>
              </template>
              <template v-else>
                <el-avatar :size="30" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
                <span>王小虎</span>
              </template>

            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting">狮子头</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">修改信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-close" command="close" @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
	export default {
		data() {

			return {
        /* 搜索 输入框 */
				input: '',
        /* 是否展开 */
				isCollapse: false,
        logo: require('../assets/LOGO.jpg')
			}
		},
    methods: {
      /* 处理点击 */
	    handleItemClick(name) {
        /* 处理退出登录 */
	    	if (name === 'close') {
			    window.localStorage.setItem('z-token', '')
          /* 清除 用户信息 */
          this.$store.commit('handleSaveUserInfo', {})
			    this.$router.push('/login')
        }
      }
    }
	};
</script>

<style lang="less" scoped>

  /* 左侧区域 */
  .el-aside {
    overflow-x: hidden;
    background-color: #fff;
    color: #333;
    /* LOGO 区域 */
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      font-size: 24px;
      background-color: rgba(249,251,250);
      color: #fff;
    }

    /* 侧边栏区域 */
    .slideBar {
      width: 100%;
      height: calc(100vh - 65px);
      /* 展开动画 */
      &.el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
      &.el-menu--collapse {
        width: 40px;
        overflow: hidden;
        z-index: 99;
        border-right: none;
      }
    }
  }


  /* 头部区域 */
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #333;
    line-height: 60px;
    /* 头部左侧 */
    .header-left {
      display: flex;
      align-items: center;
      /* 切换按钮 */
      .el-button {
        font-size: 20px;
        margin: 0 15px;
        padding: 10px 15px;
      }
    }

    /* 头部右侧 */
    .header-right {
      padding-right: 20px;
      display: flex;
      align-items: center;
      .el-link {
        margin: 0 5px;

      }
      .el-badge__content.is-fixed {
        position: absolute;
        top: 10px;
        left: 10px;
      }

      /* 下拉框 */
      .el-dropdown {
        margin-left: 10px;
        > span {
          display: flex;
          align-items: center;
          > span {
            margin: 0 5px;
          }
        }

      }
    }
  }


</style>

<style>

</style>