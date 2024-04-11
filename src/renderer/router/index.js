import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			components: {
				default: () => import('@/layout/index'),
			},
			children: [
				{
					path: '/',
					name: 'landing-page',
					components: {
						default: () => import('@/views/landing/index'),
						cNav: () => import('@/components/common/cNav')
					},
				},
			],
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
