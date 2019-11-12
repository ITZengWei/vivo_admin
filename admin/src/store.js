import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

/* 引入 */
import { Message } from 'element-ui';

Vue.use(Vuex)

/* 后台基础地址 */
const baseURL = 'http://localhost:88/vivo_interface/'

/* 克隆方法 */
const deepClone = (origin,target = {}) => {
	let  toStr =  Object.prototype.toString
	let  arrStr =  '[Object Array]'

	for( let prop in origin){
		if(origin.hasOwnProperty(prop)){
			if(typeof(origin[prop]) ==  'object'){
				if(toStr.call(origin[prop]) == arrStr){
					alert(toStr.call(origin[prop]))
					target[prop] =[]
				}else{
					target[prop] = {}
				}
				deepClone(origin[prop],target[prop])
			}else{
				target[prop] = origin[prop]
			}
		}
	}
}

export default new Vuex.Store({
  state: {
    /* 表格数据 */
    tableData: [],
	  /* store 返回前台的状态 404 500 200 */
	  storeStatus: {
	    code: null,
      msg: null
    },
	  /* 分类ID */
		userInfo: {},

	  /* 是否审核 */
	  isChecked: false,

    /* 信息类型 */
    msgType: { '404': 'error', '500': 'error', '200': 'success', '403': 'info', '505': 'warning'  },

	  /* 响应数据 */
	  response: {

	  }
  },
  mutations: {
  	/* 处理存储用户信息 */
	  handleSaveUserInfo(state, userInfo) {
	  	state.userInfo = userInfo
	  },
    /* 处理改变 页面数据 newData 和 response */
    handleChange(state, params) {
    	/* 替换的数据 响应数据 何时触发 */
	    let { newData, response, when } = params
    	// console.log(state.tableData[0].name, state.tableData[1].name)
      state.tableData = newData
	    console.log(when)
	    /* 改变响应体 */
	    state.response[when] = {}

	    deepClone(response, state.response[when])

	    /* 触发响应的 函数 */
	    console.log({ ...state.response }, 'hello word')

    },
    /* 处理改变 状态 */
	  handleStore(state, newState) {
	    const { code, msg } = newState
		  state.storeStatus = newState
      /* 改变状态的同事发送消息 */
		  Message({
			  showClose: true,
			  message: msg,
			  type: state.msgType[code]
		  })
    },
  },
  getters: {
    /* 处理过滤数据 */
    handleFilterData(state) {
      /* 传送一个过滤 函数参数, 返回 table 对应过滤的 数据  */
      return (callback) => state.tableData.filter(item => callback && callback(item))
    },
	  /* 深克隆数据 */
	  deepCloneData(state) {
	  	let obj = []
		  deepClone(state.tableData, obj)
		  console.log(obj)
	  	return obj
	  },
	  /* 返回最终结果 扩展 */
	  handleGetResult(state) {
		  let obj = {}
		  deepClone(state.response, obj)
		  return obj
	  },
	  /* 返回响应体给页面 */
	  response2page(state) {
	  	console.log('返回数据', {...state.response})
	  	return state.response
	  },
	  /* 返回用户信息 */
	  getUserInfo(state) {
	  	let isExist = false
	  	if (state.id) {
			  isExist = true
		  }
	  	return { isExist, ...state.userInfo }
	  }
  },
  actions: {

    /* 处理拉取数据 第一个执行 上下文 store 第二个 后面的 尾地址 */
    handleFetch(ctx, backURL) {
      /* 发送地址 */
      let sendURL = baseURL + backURL
	    axios.get(sendURL)
		    .then((response) => {
		      /* 结构所有的属性 */
			    let { data, status: code, msg } = response.data
			    if (code === 200) {
				    ctx.commit('handleChange', { newData: data, response: response.data, when: 'list'  })
			    }
			    /* 发送给前台状态 */
			    ctx.commit('handleStore', { code, msg })

		    })
		    /* 处理所有的异常 */
		    .catch(() => {
			    ctx.commit('handleStore', { code: 404, msg: 'url 地址错误' })
		    })
    },

    /* 处理删除 页面数据 params { backURL, ids  }  */
    handleDelete(ctx, params) {

	    /* 发送地址 */
	    let sendURL = baseURL + params.backURL

	    /* 删除的id 集合 */
	    let delIds = (params.ids + '').split(',')
	    console.log(delIds, '删除的ID')

	    /* 发送请求 删除 */
	    axios.get(sendURL)
		    .then((response) => {
			    /* 结构所有的属性 */
			    let { data, status: code, msg } = response.data
			    if (code === 200) {
						console.log(data)
            /* 得到新的数据 */
				    let newData = ctx.getters.handleFilterData(item => {
				      return !delIds.includes(item.id)
				    })

			      /* 修改数据 */
				    ctx.commit('handleChange', { newData: newData, response: response.data, when: 'delete'   })
			    }
			    /* 发送给前台状态 */
			    ctx.commit('handleStore', { code, msg })
		    })

		    /* 处理所有的异常 */
		    .catch(() => {
			    ctx.commit('handleStore', { code: '404', msg: 'url 地址错误' })
		    })
    },

    /* 处理添加和编辑 页面数据 params => { currEditId, flagText, middleURL, form } */
    handleSave(ctx, params) {
      /* 结构 */
      let { currEditId, flagText, middleURL, result: form } = params

	    /* 发送地址 */
	    let sendURL = baseURL + middleURL


	    /* 发送参数对象 */
	    if (flagText === '新增') {
		    /* 拿到新成员 */
		    // const { checked, order_id, name, icon, iconed, path } = result
		    sendURL += 'add.php'
	    } else if (flagText === '编辑') {
	    	/* 新增 加一个 ID */
		    Object.assign(form, { id: currEditId })
		    sendURL += 'edit.php'
	    }

		/*		// 测试
			 console.log(sendURL, '基本路径')
			 console.log(form, '请求参数')
			 return
*/

	    /* 创建 form 表单 装载参数 */
	    const formData = new FormData()
	    for (let prop in form) {
		    formData.append(prop, form[prop])
	    }

	    axios.post(sendURL, formData)
		    .then((response) => {
			    /* 结构所有的属性 */
			    let { newItem: resItem, status: code, msg, id } = response.data
					console.log(response, '接收过来的成员')
			    /* 获得原始数据 需要深克隆 TODO  */
			    let originData = ctx.getters.deepCloneData

			    if (code === 200) {
						let newItem = {}
				    /* 处理编辑逻辑 */
				    if (flagText == '编辑') {
					    let replaceItem = originData.find(item => item.id === currEditId)
					    Object.assign(replaceItem, resItem)
			      /* 处理添加逻辑 */
				    } else {
					    newItem = { id, ...form }
					    originData.unshift(newItem)
				    }
				    /* 修改数据 */
				    ctx.commit('handleChange', { newData: originData, response: response.data, when: 'save'  })

			    }
			    /* 发送给前台状态 */
			    ctx.commit('handleStore', { code, msg })
		    })

    },

    /* 处理审核 当前状态 { id, checked } */
    handleCheck(ctx, params) {
	    /* 解构一下 参数 */
	    let { id, checked, backURL } = params

	    /* 发送地址 */
	    let sendURL = baseURL + backURL

	    const formData = new FormData()
	    formData.append('id', id)
	    formData.append('checked', checked)

	    axios.post(sendURL, formData)
		    .then((response) => {
			    /* 结构所有的属性 */
			    let { status: code, msg } = response.data
			    if (code === 200) {

				    /* 获得原始数据 需要深克隆 TODO  */
				    let originData = ctx.getters.deepCloneData

				    /* 开始替换 */
				    let replaceItem = originData.find(item => item.id === id)
				    replaceItem.checked = checked

				    ctx.commit('handleChange', { newData: originData, response: response.data, when: 'check' })

			    }
			    /* 发送给前台状态 */
			    ctx.commit('handleStore', { code, msg })
		    })
		    /* 处理所有的异常 */
		    .catch(() => {
			    ctx.commit('handleStore', { code: 404, msg: 'url 地址错误' })
		    })
    }
  }
})
