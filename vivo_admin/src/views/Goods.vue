<template>
  <div class="Goods panel">
    <h2>商品列表</h2>
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />

        <!-- id -->
        <el-table-column prop="id" label="ID" sortable width="80"/>

        <!-- category id -->
        <el-table-column prop="categoryName" label="分类名称" sortable />

        <!-- src -->
        <el-table-column prop="src" label="效果图"  width="100">
          <template slot-scope="scope">
            <el-image :src="scope.row.src" lazy="true" style="width: 60px; height: 60px;">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>

        <!-- title -->
        <el-table-column prop="title" label="标题" sortable width="180"/>

        <!-- title -->
        <el-table-column prop="subtitle" label="副标题"  width="180"/>

        <!-- 价格 -->
        <el-table-column prop="price" label="价格" sortable width="100"/>

        <!-- 库存 -->
        <el-table-column prop="total" label="库存" sortable width="100"/>

        <el-table-column prop="die" label="下架" width="100">
          <el-switch
                  slot-scope="scope"
                  v-model="scope.row.die"
                  active-icon-class="el-icon-circle-check"
                  inactive-icon-class="el-icon-circle-close"
          >
          </el-switch>
        </el-table-column>


        <el-table-column
          align="right"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>

          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
              Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
	export default {
		name: "Goods",
		data() {
			return {
				tableData: [
          {
          	id: 1,
            categoryName: '一加一',
            src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            title: '这是一个标题',
            subtitle: '这是一个副标题',
            price: 100,
            total: 99,
            die: false
          },
					{
						id: 1,
						categoryName: '一加一',
						src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						title: '这是一个标题',
						subtitle: '这是一个副标题',
						price: 100,
						total: 99,
            die: false
					},
					{
						id: 1,
						categoryName: '一加一',
						src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						title: '这是一个标题',
						subtitle: '这是一个副标题',
						price: 100,
						total: 99,
            die: false
					},
					{
						id: 1,
						categoryName: '一加一',
						src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						title: '这是一个标题',
						subtitle: '这是一个副标题',
						price: 100,
						total: 99,
            die: false
					},
					{
						id: 1,
						categoryName: '一加一',
						src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						title: '这是一个标题',
						subtitle: '这是一个副标题',
						price: 100,
						total: 99,
            die: false
					},
					{
						id: 1,
						categoryName: '一加一',
						src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
						title: '这是一个标题',
						subtitle: '这是一个副标题',
						price: 100,
						total: 99,
            die: false
					},
        ],
				search: ''
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		},
	}
</script>

<style scoped>

</style>