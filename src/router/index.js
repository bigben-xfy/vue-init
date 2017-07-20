/**
 * Created by bigben on 2017/5/16.
 */

import App from '../App'

let home = r => require.ensure([], () => r(require('../pages/home')), 'home')

export default [{
	path: '/',
	component: App,
	children: [
		{
			path: '',
			redirect: '/home'
		}, {
			path: '/home',
			component: home
		}
	]
}]



