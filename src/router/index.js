//導入vue
import Vue from 'vue'

//導入Router
import Router from 'vue-router'

import routes from './routes.js'

Vue.use(Router)


export default new Router({
	routes
})
//這裡一定使用大括號,否則錯誤