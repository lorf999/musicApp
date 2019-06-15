import 'lib-flexible/flexible.js'

import Vue from 'vue'
import App from './App.vue'
//導入所有的vant ui庫
//import Vant from 'vant'
//導入路由
import router from './router/index.js'

//使用vue-axios
import axios from 'axios'
import VuaAxios from 'vue-axios'
import { Row, Col } from 'vant'

//按需要導入導入vant組件
import { Button,Switch,Stepper,Tabs,Tab,Icon} from 'vant'
//使用Button
Vue.use(Button).use(Switch).use(Stepper).use(VuaAxios,axios).use(Row).use(Col).use(Tab).use(Tabs).use(Icon)
Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
