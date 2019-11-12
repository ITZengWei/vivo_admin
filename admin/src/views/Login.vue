<template>
  <el-form
          ref="loginForm"
          label-width="60px"
          autocomplete="off"
          :rules="rules"
          class="login"
          status-icon
          :model="form"
  >
    <h2>会员登录</h2>
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-focus v-model="form.username" placeholder="用户名或者邮箱" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm" @keyup.enter="submitForm">登录</el-button>
      <el-button type="success" @click="$router.push('/register')">注册</el-button>
    </el-form-item>

  </el-form>
</template>

<script>

  /* 引入 Vuex */
  import { mapMutations } from 'vuex'

	/* 后台请求的基础地址 */
	const sendURL = 'http://localhost:88/vivo_interface/Login/login.php'

	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名或者密码' },
						{ min: 2, max: 20, message: '字符长度在 2 到 20 之间' }
					],
					password: [
						{ required: true, message: '请输入密码' },
						{ min: 2, max: 20, message: '字符长度在 6 到 20 之间' }
					],
				}
			}
		},
		methods: {
      ...mapMutations(['handleStore']),
			submitForm() {
				this.$refs['loginForm'].validate(valid => {

          if (valid) {
          	let formData = new FormData()
            for (let prop in this.form) {
	            formData.append(prop, this.form[prop])
            }


          	this.$http.post(sendURL, formData)
              .then(response => {
              	console.log(response)
                let { status, msg, token, data } = response.data
	              if (status === 200) {

                  /* 设置 TOKEN */
                  window.localStorage.setItem('z-token', token)
                  console.log('用户信息', data[0])
                  /* 存储 到 Vuex 中 */
                  this.$store.commit('handleSaveUserInfo', data[0])

		              this.handleStore({
			              code: 200,
			              msg: '登录成功'
		              })


		              /* 重定向 */
		              // console.dir(this.$router.push)
		              this.$router.push({ path: '/dashboard' })

	              } else {
              		this.form.password = ''
              		/* 用户名或者密码错误 */
		              this.handleStore({
			              code: 500,
			              msg: '用户名或密码错误'
		              })

                }

              })
              .catch(_ => {
	              this.handleStore({
		              code: 500,
		              msg: '服务端错误'
	              })
              })
          } else {
	          this.handleStore({
              code: 505,
              msg: '请输入正确信息'
            })

          }
        })
			}
		}
	}
</script>

<style scoped lang="less">
  .login {

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    padding: 30px 20px 20px 10px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 2px -1px 5px rgba(0,0,0, .2);
    border: 1px solid rgba(0,0,0, .2);
    background-color: #fff;
    h2 {
      text-align: center;
      margin-bottom: 10px;
      opacity: .6;
    }

  }
</style>