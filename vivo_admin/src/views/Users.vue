<template>
  <div class="footerNav">
    <h2>底部导航管理</h2>
    <el-button type="primary" @click="handleAddNav"><i class="el-icon-plus"></i>新建</el-button>
    <el-button type="danger" v-show="ids.length" size="medium " icon="el-icon-delete" @click="handleBatchRemove">批量删除</el-button>
    <br>
    <br>
    <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            @selection-change="handleSelectionChange"
            :default-sort="{ prop: 'orderId', order: 'ascending' }"
    >
      <el-table-column type="selection" width="55" ></el-table-column>

      <el-table-column label="序号" prop="orderId" width="80" sortable/>
      <el-table-column label="头像"  width="120">
        <template slot-scope="scope">
          <el-avatar :size="40" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="用户名" prop="username" width="120"/>
      <el-table-column label="注册时间" prop="reg_time" width="200"/>
      <el-table-column label="状态" prop="state" width="120"/>

      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-switch
                  active-value="1"
                  inactive-value="0"
                  v-model="scope.row.checked"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="handleChange(scope.row.id, scope.row.checked)"
          />
        </template>

      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleRemove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="flag + '用户'" :visible.sync="dialogFormVisible">
      <el-form
              :model="form"
              :rules="rules"
              status-icon
              ref="form"
      >
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"
                    :placeholder="flag=='修改'?'不修改则为空':''"
          ></el-input>
        </el-form-item>
				
				<el-form-item label="确认密码" label-width="80px" prop="confirmPas">
          <el-input type="password" v-model="form.confirmPas" autocomplete="off"></el-input>
        </el-form-item>
	
        <el-form-item label="真实姓名" label-width="80px" prop="realname">
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" label-width="80px" prop="avatar">
          <!--<el-input v-model="form.avatar" autocomplete="off"></el-input>-->

          <el-upload
                  class="avatar-uploader"
                  action="http://localhost:88/interface/upload.php"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  name="upfile"
          >
            <img v-if="form.src"  width="100" height="80" :src="form.src" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

	const baseURL = 'http://localhost:88/interface/Users/'

	export default {
		name: "footnav",
		data() {
			/* 校验密码 */

			/* 验证去确认密码 */
			const validatePass = (rule, value, callback) => {
				if (this.form.password !== '' && value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			}

			return {
				/* 表单数据 */
				tableData: [
					{ id: 1, orderId: 1,name: '首页', icon: 'wra-home-o', iconed: 'wap-home', path: '/home', checked: false },
					{ id: 2, orderId: 7,name: '分类', icon: 'bag-o', iconed: 'bag', path: '/classify', checked: true },
					{ id: 3, orderId: 4,name: '新闻', icon: 'wra-home-o', iconed: 'wap-home', path: '/news', checked: false },
				],
				dialogFormVisible: false,
				form: {  },
				flag: '修改',
				/* 批量删除 ID集合 */
				ids: [],
				/* 展示图片 */
				imageUrl: '',
				/* 规则集合 */
				rules: {
					username: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 - 5 之间' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20 }
					],
					confirmPas: [
						{ required: true, message: '请输入确认密码' },
            { validator: validatePass, trigger: 'blur' }
					],
					realname : [
						{ required: true, message: '请输入名称', trigger: 'blur' },
					]
				},

			}
		},
		created() {

			this.$http.get(baseURL + 'list.php')

				.then(data => {
					this.tableData = data.data.data
					console.log(this.tableData)
				}, () => {
					console.log('错误')
				})
		},
		methods: {
			handleEdit(index, info) {
				this.flag = '修改'
				this.dialogFormVisible = true

				this.rules.password[0].required = false
				this.rules.confirmPas[0].required = false

				this.form = { ...info, confirmPas: info.password }
			},
			/* 处理新建导航 */
			handleAddNav() {
				this.form = {}
				this.flag = '添加'

        this.rules.password[0].required = true
        this.rules.confirmPas[0].required = true


				this.dialogFormVisible = true
			},
			/* 处理保存 */
			handleSave() {

				this.dialogFormVisible = false

				/* 请求路径 */
				let url = baseURL

				/* 请求参数 */
				let params = {}

				this.$refs.form.validate(valid => {
					/* 操作目标 */
					let target = ''

					if (valid) {
						let id = -1
						if (this.flag === '修改') {
							id = this.form.id
							target = this.tableData.find(item => item.id === id)

							url += 'update.php'
							params =  Object.assign({}, target, this.form)

						} else if (this.flag === '添加') {
							/* 发送请求 */
							url += 'add.php'
							params = { checked: 0, ...this.form }

						}

						/* 创建 form 对象 */
						let newForm = new FormData()
            newForm.append('id', Date.now())
						for (let prop in params) {
							newForm.append(prop, params[prop])
						}
						console.log(url)
						/* 发送请求 */
						this.$http.post(url, newForm)
							.then(res => {
								if (res.status !== 200) return this.$message('操作不成功')

								if (this.flag === '修改') {
									Object.assign(target, params)
								}	else if (this.flag === '添加') {
									this.$http.get(baseURL + 'list.php')
										.then(data => {
											this.tableData = data.data.data
											console.log(data)
										}, () => {
											console.log('错误')
										})
								}
							})


					} else {
						this.$notify.error({
							title: '验证不通过错误',
							message: '请输入合法的信息'
						});
					}
				})

			},
			/* 处理删除 */
			handleRemove(id) {

				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					let index = this.tableData.findIndex(item => item.id === id)
					this.tableData.splice(index, 1)
					let params = '?id=' + id
					this.$http.get(baseURL + 'delete.php' + params)
						.then((res) => {
							if (res.status !== 200) return this.$message('操作不成功')
							this.$message('成功删除')
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			/* 处理选项卡改变 */
			handleSelectionChange(all) {
				this.ids = []
				all.forEach(item => {
					this.ids.push(item.id)
				})
				console.log('ids', this.ids)
			},
			/* 处理批量删除 */
			handleBatchRemove() {

				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					let params = '?id=' + this.ids
					this.$http.get(baseURL + 'delete.php' + params)
						.then((res) => {
							if (res.status !== 200) return this.$message('操作不成功')

							let newTableDate = []
							this.tableData.forEach(item => {
								if (!this.ids.includes(item.id)) {
									newTableDate.push(item)
								}
							})
							this.tableData = newTableDate
							this.$message('成功删除')
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			/* 处理 switch 开关改变 */
			handleChange(id, newVal) {
				console.log('改变了', id, newVal)
				/* 发送请求 审核 */
				let url = `${ baseURL }state.php?id=${ id }&state=${ newVal }`
				console.log('url', url)
				this.$http.get(url)
					.then(result => {
						if (result.data.status === 200) {
							this.$message({
								type: 'success',
								message: result.data.msg
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
      /* 处理上传文件之前 */
			beforeAvatarUpload(file) {
				/* 校验 */
        const allowExt = ['image/jpg', 'image/jpeg', 'image/png', 'image/png']
        const allowSize = { min: 0, max: 2 }
        let isExist = allowExt.includes(file.type)
        let isSize = file.size > allowSize.min && allowSize.max

				if (!isExist) {
					this.$message.error(`上传头像图片只能为 ${ allowSize.join('、') } 格式!`);
				}
				if (!isSize) {
					this.$message.error(`上传头像图片大小在[${ allowSize.min } - ${ allowSize.max } ]MB!`);
				}
				return isExist && isSize;
      },
      /* 上传成功 */
			handleAvatarSuccess(res, file) {
				console.log(res)
				// this.form.avatar = res.filepath
        this.form.avatar = res.filepath
        this.$set(this.form, 'src', URL.createObjectURL(file.raw))
			},

		},
		mounted() {
			this.$watch('dialogFormVisible', () => {
				this.$refs.form.clearValidate()
			})
		}

	}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>