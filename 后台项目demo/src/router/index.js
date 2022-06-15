import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

import Layout from '../views/layout/Layout'

import { getToken } from '@/utils/auth'

//全权限路由表
export const constantRouterMap = [
	{
		path: '/',
		redirect: '/customer/customIndex',
		name:'home'
	},
	{
		path: '/login',
		component: _import('login/index'),
		redirect: '/login/signin',
		name: 'login',
		children: [
			{
				path: 'signin',
				component: _import('login/components/signin'),
				name: 'signin'
			},
			{
				path: 'signup',
				component: _import('login/components/signup'),
				name: 'signup'
			},
			{
				path: 'reset',
				component: _import('login/components/reset'),
				name: 'reset'
			}
		]
	},
	{
		path: '/worktable',
		component: Layout,
		redirect: '/worktable/index',
		name: 'worktable',
		children: [
			{
				path: 'index',
				component: _import('worktable/index'),
				name: 'index'
			},
		]
	},
	{
		path: '/goods',
		component: Layout,
		redirect: '/goods/manage/selling',
		name:'goods',
		children: [
			{
				path: 'manage',
				component: _import('goods/manage'),
				redirect: '/goods/manage/selling',
				name: 'manage',
				children: [{
						path: 'selling',
						component: _import('goods/manages/selling'),
						name: 'selling'
					},
					{
						path: 'soldout',
						component: _import('goods/manages/soldout'),
						name: 'soldout'
					},
					{
						path: 'forsale',
						component: _import('goods/manages/forsale'),
						name: 'forsale'
					},
					{
						path: 'create',
						component: _import('goods/manages/create'),
						name: 'create'
					},
					{
						path: 'goodsEdit',
						component: _import('goods/manages/goodsEdit'),
						name: 'goodsEdit'
					}
				]
			},
			{
				path: 'group',
				component: _import('goods/group'),
				redirect: '/goods/group/index',
				name: 'group',
				children: [{
						path: 'index',
						component: _import('goods/groups/index'),
						name: 'goodsIndex'
					},
					{
						path: 'addGroup',
						component: _import('goods/groups/addGroup'),
						name: 'addGroup'
					}
				]
			}
		]
	},
	{
		path: '/trade',
		component: Layout,
		name: 'trade',
		redirect: '/trade/index',
		children: [{
				path: 'index',
				component: _import('trade/index'),
				name: 'index'
			},
			{
				path: 'order',
				component: _import('trade/order'),
				redirect: '/trade/order/forHere',
				name: 'order',
				children: [
					{
						path: 'forHere',
						component: _import('trade/order/forHere'),
						name: 'forHere'
					}
				]
			},
			{
				path: 'review',
				component: _import('trade/review'),
				name: 'review'
			}
		]
	},
	{
		path: '/customer',
		component: Layout,
		name: 'customer',
		redirect: '/customer/customIndex',
		children: [{
				path: 'customIndex',
				component: _import('customer/customIndex'),
				name: 'customIndex'
			},
			// {
			// 	path: 'member',
			// 	component: _import('customer/member'),
			// 	name: 'member'
			// },
			{
				path: 'editCustom',
				component: _import('customer/editCustom'),
				name: 'editCustom'
			},
		]
	},
	{
		path: '/setting',
		component: Layout,
		name: 'setting',
		redirect: '/setting/store',
		children: [
			{
				path: 'reset',
				component: _import('setting/reset'),
				name: 'reset'
			},
			{
				path: 'store',
				component: _import('setting/store'),
				name: 'store'
			},
			{
				path: 'express',
				component: _import('setting/express'),
				redirect: '/setting/express/shipping',
				name: 'express',
				children: [{
						path: 'shipping',
						component: _import('setting/express/shipping'),
						name: 'expressManage'
					},
					{
						path: 'freight',
						component: _import('setting/express/freight'),
						name: 'expressFreight'
					},
					{
						path: 'create',
						component: _import('setting/express/create'),
						name: 'createTemplate'
					}
				]
			},
			{
				path: 'file',
				component: _import('setting/file'),
				redirect: '/setting/file/setImage',
				name: 'file',
				children: [{
						path: 'setImage',
						component: _import('setting/files/setImage'),
						name: 'setImage'
					},
					{
						path: 'setGroup',
						component: _import('setting/files/setGroup'),
						name: 'setGroup'
					}
				]
			},
			{
				path: 'printer',
				component: _import('setting/printer'),
				name: 'printer'
			},
		]
	},
	{
		path:'/food',
		component: Layout,
		name: 'food',
		redirect: '/food/foodIndex/foodManage',
		children: [
			{
				path: 'foodIndex',
				component: _import('food/foodIndex'),
				redirect: '/food/foodIndex/foodManage',
				name: 'foodIndex',
				children: [
					{
						path: 'foodManage',
						component: _import('food/foodIndexs/foodManage'),
						name: 'foodManage'

					},
					{
						path: 'foodGroup',
						component: _import('food/foodIndexs/foodGroup'),
						name: 'foodGroup'

					},
					{
						path: 'addFood',
						component: _import('food/foodIndexs/addFood'),
						name: 'addFood'

					},
					{
						path: 'editFood',
						component: _import('food/foodIndexs/editFood'),
						name: 'editFood'
					}
				]
			},
			{
				path: 'tableIndex',
				component: _import('food/tableIndex'),
				redirect: 'tableIndex/tables',
				name: 'tableIndex',
				children: [
					{
						path: 'tables',
						component: _import('food/tableManage/tables'),
						name: 'tables'

					},
					{
						path: 'tableType',
						component: _import('food/tableManage/tableType'),
						name: 'tableType'

					}
				]
			}
		]
	},

	{
		path: '/content',
		component: Layout,
		name: 'content',
		redirect: '/content/articleLists',
		children: [
			{
				path: 'articleLists',
				component: _import('content/articleLists'),
				name: 'articleLists'
			},
			{
				path: 'articleClassify',
				component: _import('content/articleClassify'),
				name: 'articleClassify'
			},
			{
				path: 'articleEdit',
				component: _import('content/articleEdit'),
				name: 'articleEdit'
			},
			{
				path: 'articleClassifyEdit',
				component: _import('content/articleClassifyEdit'),
				name: 'articleClassifyEdit'
			},
		]
	},
	{
		path: '/english',
		component: Layout,
		name: 'english',
		redirect: '/english/articleLists',
		children: [
			{
				path: 'articleLists',
				component: _import('english/articleLists'),
				name: 'articleLists'
			},
			{
				path: 'articleClassify',
				component: _import('english/articleClassify'),
				name: 'articleClassify'
			},
			{
				path: 'articleEdit',
				component: _import('english/articleEdit'),
				name: 'articleEdit'
			},
			{
				path: 'articleClassifyEdit',
				component: _import('english/articleClassifyEdit'),
				name: 'articleClassifyEdit'
			},
		]
	}
]


//实例化vue的时候只挂载constantRouter
var router = new Router({
	routes: constantRouterMap
})

// //全局前置守卫
// router.beforeEach((to, from, next) => {
// 	if ( getToken() ) {
// 		if ( /login/.test(to.path) ) {
// 			next({path: '/'});
// 		} else {
// 			next();
// 		}
// 	} else {
// 		if ( /login/.test(to.path) ) {
// 			next();
// 		} else {
// 			next({path: '/login/signin'});
// 		}

// 	}
// });

export default router

//权限路由表
//export const asyncRouterMap = []
