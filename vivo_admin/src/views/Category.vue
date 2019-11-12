<template>
  <div class="Category panel">
    <h2>分类列表</h2>
    <el-button style="margin: 10px 0;" type="primary" @click="handleAddNav" icon="el-icon-circle-plus-outline">新建</el-button>

    <!-- 分类 图表格 -->
    <template>
      <el-table
        :data="tableData"
        style="width: 65%;"
        stripe
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column prop="id" label="名称" width="80" sortable/>

        <el-table-column prop="order_id" label="分类ID" sortable width="120"/>

        <el-table-column label="分类名称" width="180" >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <i :class="status[scope.row.status].icon"></i>&nbsp;&nbsp;{{ status[scope.row.status].msg }}
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>


    <el-dialog :title="flag + '分类列表'" :visible.sync="dialogFormVisible">
      <el-form
              :model="form"
              :rules="rules"
              status-icon
              ref="form"
      >
        <el-form-item label="名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="排序ID" label-width="80px" prop="orderId">
          <el-input v-model="form.order_id" autocomplete="off"></el-input>
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

	const baseURL = 'http://localhost:88/interface/Category/'

	export default {
		name: "footnav",
		data() {
			return {
				/* 状态数组 */
				status: [
					{ icon: 'el-icon-circle-close', msg: '未审核' },
					{ icon: 'el-icon-more-outline', msg: '审核中' },
					{ icon: 'el-icon-circle-check', msg: '已审核' },
				],
				/* 表单数据 */
				tableData: [],
				dialogFormVisible: false,
				form: {  },
				flag: '修改',
				/* 批量删除 ID集合 */
				ids: [],
				/* 规则集合 */
				rules: {
					orderId: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 - 5 之间' }
					],
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
					]

				}
			}
		},
		created() {
			/* 请求获取 全部分类信息 */
			this.$http.get(baseURL + 'list.php')
				.then((result) => {
					this.tableData = result.data.data
					console.log(result)
				})
		},
		methods: {
			handleEdit(index, info) {
				this.flag = '修改'
				this.dialogFormVisible = true
				this.form = { ...info }
			},
			/* 处理新建导航 */
			handleAddNav() {
				this.form = {}
				this.flag = '添加'
				this.dialogFormVisible = true
			},
			/* 处理保存 */
			handleSave(id) {

				this.dialogFormVisible = false

				/* 请求路径 */
				let url = baseURL

				/* 请求参数 */
				let params = {}

				this.$refs.form.validate(valid => {
					/* 操作目标 */
					let target = ''

					if (valid) {
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
            newForm.append('id', id)
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
											console.log(this.tableData)
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
			}
		},
		mounted() {
			this.$watch('dialogFormVisible', () => {
				this.$refs.form.clearValidate()
			})
		}

	}

</script>

<style scoped lang="less">

</style>