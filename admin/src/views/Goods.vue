<template>
  <div class="foot-nav panel">

    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品区域</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
      height="540"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >

      <el-table-column  type="selection"  width="55"/>
      <el-table-column prop="category_id" label="分类序号" width="80" sortable/>

      <el-table-column prop="name" label="名称" width="120" sortable/>



      <el-table-column prop="src" label="商品图标" width="120">
        <template slot-scope="scope">
          <el-image fit="cover ":src="scope.row.src" style="width: 60px; height: 60px;" lazy />
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="180" />

      <el-table-column prop="price" label="价格" width="180" sortable/>

      <el-table-column prop="total" label="库存" width="180" sortable/>

      <el-table-column prop="attr" label="商品属性" width="180" sortable/>



      <el-table-column prop="checked" label="审核">
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

      <el-table-column label="操作">
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

    <el-dialog :title="flagText + '商品'" :visible.sync="dialogFormVisible" >
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

        <el-form-item label="分类ID" :label-width="formLabelWidth" prop="order_id">

          <el-select v-model="form.category_id" placeholder="请选择">
            <el-option
              v-for="(item, i) in categoryAttr"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态选择" :label-width="formLabelWidth" prop="order_id">

          <el-select v-model="form.attr" placeholder="请选择">
            <el-option
              v-for="(item, i) in goodsAttr"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="title" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="库存" :label-width="formLabelWidth" prop="total">
          <el-input v-model="form.total" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="src" :label-width="formLabelWidth" prop="src">
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
	import { mapState, mapGetters } from 'vuex'

  /* 添加和 编辑的字段 */
  let field =  {
	    sold_out: '',
	    price: '',
	    total: '',
	    src: '',
	    category_id: '',
	    title: '',
      checked: '0',
	    attr: '普通'
	  }

	export default {
		name: "FootNav",
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
					price: [
						{ required: true, message: '请输入价格', trigger: 'blur' },
          ],
					total: [
						{ required: true, message: '请输入库存', trigger: 'blur' },
					],
					title: [
						{ required: true, message: '请输入标题', trigger: 'change' },
					],
					attr: [
						{ required: true, message: '请输入对应的状态', trigger: 'change' },
					]

				}
      }
    },
		computed: {
			/* 表格数据，store 的状态 */
			...mapState(['tableData', 'storeStatus', 'isChecked']),
      /* 接收响应体 */
      ...mapGetters(['response2page']),
			/* 商品 属性 */
			goodsAttr() {
			  return this.response2page.list.goodsAttr
      },
			/* 商品 类别 */
			categoryAttr() {
				return this.response2page.list.categoryAttr
      },

		},
    created() {
	    /* 拉取数据 */
	    this.$store.dispatch('handleFetch', 'Goods/list.php')


      /* TODO */
	    let list  = this.response2page.list

	    console.log({ ...this.response2page }, '拿到响应数据')

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

	      let backURL = 'Goods/delete.php?id=' + ids
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
				    let middleURL = 'Goods/'
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
		      this.$store.dispatch('handleCheck', { id, checked: item.checked, backURL: 'Goods/state.php' })

	      }).catch(() => {
		      item.checked = !Number(item.checked) ? '1' : '0'
	      })

      },
      /* 处理选项卡变化 */
	    handleSelectionChange(rows) {
	    	this.batchBtn = rows.length > 0
        this.delIds = rows.map(item => item.id).join(',')
      }
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