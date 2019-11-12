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
      <el-input type="text" v-model="form.username" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button type="success">注册</el-button>
    </el-form-item>

  </el-form>
</template>

<script>

	const baseURL = 'http://localhost:88/interface/Login/'

export default {
	data() {
		return {
			form: {
				username: '',
        password: ''
      },
      rules: {
	      username: [
          { required: true, message: '请输入用户名' },
          { min: 2, max: 10, message: '字符长度在 2 到 20 之间' }
        ],
	      password: [
		      { required: true, message: '请输入密码' },
		      { min: 2, max: 10, message: '字符长度在 6 到 20 之间' }
	      ],
      }
    }
  },
  methods: {
    submitForm() {
	    this.$refs['loginForm'].validate(valid => {
        if (valid) {

        	const { username, password } = this.form

          let formData = new FormData()
          formData.append('username', username)
          formData.append('password', password)

          this.$http.post(baseURL + 'login.php', formData)
            .then((response) => {
            	console.log(response)
	            if (response.status === 200) {

            		/* 获取 TOKEN */
            		console.log(response.data.token)
                localStorage.setItem('zw_token', response.data.token)
            		this.$router.push('/dashboard')

              } else {
		            this.$message({
			            showClose: true,
			            message: '用户名或密码错误',
			            type: 'error'
		            });
              }
            })
            .catch(() => {
	            console.log('服务器错误')
            })
        } else {

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
  width: 320px;
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