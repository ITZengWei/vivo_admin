<template>
  <div class="foot-nav panel">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类区域</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="buttons">
      <!-- 添加按钮 -->
      <el-button size="mini"
                 type="primary"
                 plain
                 icon="el-icon-circle-plus-outline"
                 @click="handleAdd"
      >添加</el-button>

      <!-- 批量删除 按钮 -->
      <el-button
              type="danger"
              v-show="batchBtn"
              icon="el-icon-delete"
              @click="handleDelete(delIds)"
      >
        批量删除</el-button>
    </div>


    <!-- 表格区域 -->
    <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
      >
      <el-table-column  type="selection"  width="55"/>
      <el-table-column prop="order_id" label="序号" width="180" sortable/>
      <el-table-column prop="name" label="名称" width="180" sortable/>
      <el-table-column prop="icon" label="图片预览">
        <template slot-scope="scope">
          <el-image
            style="width: 300px; height: 100px"
            :src="scope.row.src"
            fit="cover"
          />
        </template>
      </el-table-column>

      <el-table-column prop="checked" label="审核" width="180">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.checked"
                  active-value="1"
                  inactive-value="0"
                  active-icon-class="el-icon-circle-check"
                  inactive-icon-class="el-icon-circle-close"
                  inactive-color="#ff4949"
                  @change="handleChange(scope.row.id, scope.row)"
          >
          </el-switch>

        </template>
      </el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框区域 -->

    <el-dialog :title="flagText + '商品分类'" :visible.sync="dialogFormVisible" >
      <el-form :model="form" :rules="rules" ref="ruleForm">

        <el-form-item label="审核" :label-width="formLabelWidth" prop="checked">
          <el-switch
                  v-model="form.checked"
                  active-value="1"
                  inactive-value="0"
                  active-icon-class="el-icon-circle-check"
                  inactive-icon-class="el-icon-circle-close"
                  inactive-color="#ff4949"
          />
        </el-form-item>

        <el-form-item label="排序ID" :label-width="formLabelWidth" prop="order_id">
          <el-select v-model="form.order_id" placeholder="请选择">
            <el-option
                    v-for="item in 5"
                    :key="item"
                    :label="item"
                    :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片地址" :label-width="formLabelWidth" prop="src">


          <el-input v-model="form.src" autocomplete="off"></el-input>


        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

	/* 引入 vuex */
	import { mapState } from 'vuex'

	/* 添加和 编辑的字段 */
	let field =  {
		order_id: '1',
		name: '',
		src: '',
		checked: '0'
	}

	export default {
		name: "Carousel",
		data() {
			return {
				/* 批量删除按钮 */
				batchBtn: false,
				dialogFormVisible: false,

				/* 验证 */
				form: field,
				/* 编辑的 ID */
				currEditId: '',
				/* 批量删除 IDS */
				delIds: '',
				formLabelWidth: '80px',
				/* 切换 验证form 标题 */
				flagText: '',
				/* 表单校验 */
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					src: [
						{ required: true, message: '请输入轮播图地址', trigger: 'blur' },
					],
					checked: [
						{ required: true, message: '请确认审核', trigger: 'blur' },
					],
					order_id: [
						{ required: true, message: '请填排序ID', trigger: 'blur' }
					]
				}
			}
		},
		created() {
			/* 拉取数据 */
			this.$store.dispatch('handleFetch', 'Carousel/list.php')
		},
		computed: {
			/* 表格数据，store 的状态 */
			...mapState(['tableData', 'storeStatus', 'isChecked'])
		},
		methods: {
			handleAdd() {
				this.form = { }
				this.flagText = '新增'
				this.dialogFormVisible = true
			},
			handleEdit(id, row) {
				/* 覆盖当前编辑的 ID */
				this.currEditId = id
				this.flagText = '编辑'
				this.dialogFormVisible = true
				this.form = { ...row }
			},
			/* 删除 表格列表 */
			handleDelete(ids) {


				let backURL = 'Carousel/delete.php?id=' + ids
				/* 处理删除 */
				this.$store.dispatch('handleDelete', { backURL, ids })

			},
			handleCancle() {
				this.form = {}
				this.dialogFormVisible = false
			},
			/* 确认提交控件 */
			handleConfirm() {
				/* 判断是否验证通过 */

				/* 获取表单信息 */
				let result = { ...this.form }

				this.$refs['ruleForm'].validate((valid) => {
					/* 通过 */
					if (valid) {
						this.dialogFormVisible = false


						/* 获取编辑的 ID 和 flag 信息 */
						let { currEditId, flagText } = this

						/* 中间 URL 信息 */
						let middleURL = 'Carousel/'
						console.log({ currEditId, flagText, middleURL, result })
						/* 处理编辑和添加 flag path  */
						this.$store.dispatch('handleSave', { currEditId, flagText, middleURL, result })

						/* 未通过 */
					} else {
						this.$message.error('请输入正确信息');
					}
				});
			},
			/*  */
			handleChange(id, item) {

				this.$confirm('此操作将切换权限, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('handleCheck', { id, checked: item.checked, backURL: 'Carousel/state.php' })

				}).catch(() => {
					item.checked = !Number(item.checked) ? '1' : '0'
				})

			},
			/* 处理选项卡变化 */
			handleSelectionChange(rows) {
				this.batchBtn = rows.length > 0
				this.delIds = rows.map(item => item.id).join(',')
			},
		},
		mounted() {
			this.$watch('dialogFormVisible', () => {
				/* 清除 上一次校验成果, 和内容 */
				this.$refs['ruleForm'].clearValidate()
			})
		}
	}


</script>

<style scoped lang="less">
  /* 按钮组 */
  .buttons {
    display: flex;
    .el-button {
      margin: 20px 5px;
      line-height: 30px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
    }
  }

  .el-table-column {
    .cell {
      text-align: center;
    }
  }
</style>