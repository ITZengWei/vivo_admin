<template>
  <el-container>
    <el-aside width="auto">
      <div class="logo">
        <a href="#/">Vivo admin</a>
      </div>
        <el-menu
          class="sidebar"
          default-active="/dashboard"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="true"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>控制面板</span>
            </template>
            <el-menu-item index="/dashboard">仪表盘</el-menu-item>
            <el-menu-item index="/config">控制面板</el-menu-item>
          </el-submenu>

          <!-- 底部导航 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>底部导航</span>
            </template>
            <el-menu-item index="/footnav">底部导航</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>分类区域</span>
            </template>
            <el-menu-item index="/category">分类列表</el-menu-item>
            <el-menu-item index="/goods">商品列表</el-menu-item>
          </el-submenu>

          <el-menu-item index="/users">
            <i class="el-icon-user"></i>
            <span>用户列表</span>
          </el-menu-item>

          <el-menu-item index="/carousel">
            <i class="el-icon-user"></i>
            <span>轮播图管理</span>
          </el-menu-item>

          <el-menu-item index="/文章管理">
            <i class="el-icon-user"></i>
            <span>轮播图管理</span>
          </el-menu-item>



        </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          <el-button
            size="mini"
            class="toggle-btn"
            :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="isCollapse = !isCollapse"
          ></el-button>
          <el-input v-model="input" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <!--<i slot="suffix" class="el-input__icon el-icon-date"></i>-->
          </el-input>
        </div>
        <div class="header-right">
          <el-link type="primary"><i class="el-icon-s-home"></i></el-link>
          <el-link type="primary"><i class="el-icon-setting"></i></el-link>
            <el-badge :value="12" class="item">
              <el-link type="primary"><i class="el-icon-bell"></i></el-link>
            </el-badge>

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
               <el-avatar :size="35" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>曾大大
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" :divided="true">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" :divided="true">修改信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check" :divided="true">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-close" :divided="true"
                                command="logout"
              >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
	// var echarts = require('echarts');
  export default {
	name: 'App',
	data() {
		return {
			isCollapse: false,
			input: ''
		}
  },
  methods: {
		/* 处理登录 */
	  handleCommand(router) {

	  /* 处理退出登录 */
	  if (router === 'logout') {
      this.$confirm('您确认要注销嘛', '提示')
        .then(() => {
          this.$router.push('/logout')
        })
        .catch(() => {
        })
    }

	  	console.log('hello word', router)
	  	// this.$confirm('')
    }
  }
}
</script>
<style>
  .el-dropdown-link {
    margin-left: 15px;
    cursor: pointer;
  }
  .el-aside {
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 2px rgba(0,0,0, .15);
    z-index: 999;
  }

</style>
<style scoped lang="less">

  .el-input__icon.el-icon-search {
    line-height: 40px;
  }

  .logo {
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    background-color: #409EFF;
  }
  .el-header {
    display: flex;
    background-color: #fff;

    justify-content: space-between;

    .header-left,
    .header-right {
      display: flex;
      align-items: center;
    }
    .header-left {
      .toggle-btn {
        margin: 0 10px;
        font-size: 18px;
        padding: 6px 10px;
      }

    }
    .header-right {
      flex-grow: 1;
      justify-content: flex-end;
      font-size: 12px;
      .el-link {
        margin: 0 10px;
        font-size: 24px;
      }
      .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
          left: 0px;
          top: 0px;
        }
     }
    }
  }
  .el-aside {
    .sidebar {
      height: calc(100vh - 60px);
      background-color: #fff;
      border-right: none;
      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }



</style>