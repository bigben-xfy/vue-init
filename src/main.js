/**
 * Created by bigben on 2017/7/20.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import VueResource from 'vue-resource'

import {
	loading,
	row,
	col,
	tag
} from 'element-ui'

Vue.use(row)
Vue.use(col)
Vue.use(tag)

Vue.use(loading.directive)
Vue.prototype.$loading = loading.service

Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter({
	routes: routes,
	mode: 'history'
})

new Vue({
	router
}).$mount('#app')








