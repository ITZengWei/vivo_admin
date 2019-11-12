<template>
  <div class="login">
    <!-- 顶部导航 -->
    <base-nav name="登录"></base-nav>
    <van-row class="content">
     <div class="inputGroup">
       <van-col tag="label" for="username" span="6">
         用户名
       </van-col>
       <van-col
         span="16"
         tag="input"
         type="text"
         id="username"
         placeholder="请输入用户名"
         ref="username"
       >
       </van-col>
     </div>
      <div class="inputGroup">
        <van-col span="6" tag="label" for="password">
          密码
        </van-col>
        <van-col
         span="16"
         tag="input"
         :type="toggle ? 'input' : 'password'"
         id="password"
         placeholder="请输入密码"
         ref="password"
        >
        </van-col>
        <label class="toggle" >
          <input type="checkbox" v-model="toggle">
          <van-icon name="closed-eye"/>
        </label>

      </div>
      <van-button type="info" size="large" class="btn" @click="handle">登录</van-button>
      <router-link to="/register" style="float: right;">注册</router-link>
    </van-row>

  </div>
</template>

<script>
	export default {
		name: "login.vue",
    data() {
	    return {
		    toggle: false,
		    password: '',
        username: 'hello'
      }
    },
    created() {

    },
    methods: {
			handle() {
				let userEle = this.$refs.username.$el
				let pasEle = this.$refs.password.$el
        const username = userEle.value.trim()
        const password = pasEle.value.trim()
        if (!username.length || !password.length) return this.$notify({ type: 'warning', message: '请输入完整信息' })
        this.$http.post('/login', { username, password })
          .then((res) => {
          	if (res.data && res.data.status === 200) {
          		document.cookie = 'isLogin=1'
          		document.location.href = document.referrer
            }

	          this.$notify({ type: 'danger', message: '用户名或密码输入错误' })
	          pasEle.value = ''
          })
      }
    }
	}
</script>

<style scoped lang="less">
.content {
  padding: 40px 20px 0;

  label {
    text-align: center;
  }
  .inputGroup {
    position: relative;
    border-radius: 4px;
    padding: 10px 0;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 18px;
    line-height: 20px;
    input {
      height: 100%;
      outline: none;
      border: none;
    }
  }
  .btn {
    margin-top: -10px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 14px;
  }

  .toggle {
    position: absolute;
    right: 21px;
    top: 10px;
  }
}
</style>