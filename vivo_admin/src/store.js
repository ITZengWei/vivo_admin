import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const baseURL = 'http://localhost:88/interface/FootNav/'

export default new Vuex.Store({
	state: {
		pageDate: [],
	},
	mutations: {
	  /* 处理改变页面数据 */
	  handleChangePageData(state, newData) {
	    state.pageDate = newData
    }
  },
	actions: {
		fetch(context) {
			// 'http://localhost:88/interface/FootNav/'
			axios.get('http://localhost:88/interface/FootNav/list.php')
				.then(data => {
					let tableData = data.data.data
					context.commit('handleChangePageData', tableData)
				}, () => {
					console.log('错误')
				})
    },
    handleDelete(context, ids) {

	    /* 删除的id 集合 */
	    let delIds = (ids + '').split(',')

	    console.log(delIds, '删除的ID')
	    /* 发送请求 删除 */
	    axios.get(baseURL + 'delete.php?id=' + ids)
		    .then((response) => {
			    let { data } = response
			    console.log(data)
			    if (data.status === 200) {

				    /* 成功了删除页面上的数据 */
				    let newPageData = context.state.pageDate.filter(item => {
					    return !delIds.some(id => item.id == id)
				    })

				   context.commit('handleChangePageData', newPageData)

			    } else {
				    console.log('服务端 错误')
			    }
		    })
		    .catch(() => {
			    console.log('url 错误')
		    })
	    console.log(delIds)
    }

  }
})
