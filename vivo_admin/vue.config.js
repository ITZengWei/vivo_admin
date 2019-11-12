// /* Vue 反向代理 */
// module.exports = {
// 	devServer: {
// 		proxy: {
// 			'/api': {
// 				/* 设置跨域 */
// 				target: 'http://localhost:88/interface/',
// 				ws: true,
// 				changeOrigin: true,
// 				pathRewrite: {
// 					'^/api': ''
// 				}
// 			}
// 		}
// 	}
// }
//
// // http://localhost:88/vivo/