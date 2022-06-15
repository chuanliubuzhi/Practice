<template>

	<div class="sidebar-container">

		<!--一级路由-->
		<div class="sidebar-warpper">
			<a class="sidebar-logo"><img src="../../../assets/images/logo.png"/></a>
			<ul class="first-menu">
				<li v-for="(menu,index) in menus"  @click="toggle(index)" :key="index">
					<router-link class="treeview" :to="menu.path">
						<i :class="menu.icon"></i>
						{{menu.title}}
					</router-link>
				</li>
			</ul>
		</div>

		<!--二级路由-->

		<div class="second-menu-warpper" v-for="(menu,index) in menus" v-show="index==num" :key="index">
			<h2>{{menu.lists[0].name}}</h2>
			<ul class="second-menu">
				<li v-for="(list,sIndex) in menu.lists"  :key="sIndex">
					<router-link  :to="menu.path + '/' + list.path" >
						{{list.name}}
					</router-link>
				</li>
			</ul>
		</div>

	</div>

</template>

<script type="text/javascript">

	export default {
	  	name: 'scrollBar',
	  	data() {
	    	return {
	    		num:0,
	      		menus:[
	      			{
	      				title:'工作台',
	      				icon:'el-icon-view',
						path:'/worktable',

	      				lists:[
	      					{name:'概览',path:'index'},
	      				]
	      			},
	      		    // {
	      			// 	title:'商品管理',
	      			// 	icon:'el-icon-goods',
	      			// 	path:'/food',
	      			// 	lists:[
	      			// 		{name:'商品管理',path:'foodIndex'},
	      			// 		{name:'餐桌管理',path:'tableIndex'}
	      			// 	]
	      			// },
	      			{
	      				title:'订单',
	      				icon:'el-icon-tickets',
	      				path:'/trade',
	      				lists:[
	      					{name:'订单概况',path:'index'},
	      					{name:'所有订单',path:'order'},
	      					{name:'评价管理',path:'review'}
	      				]
	      			},
	      			{
	      				title:'客户',
	      				icon:'el-icon-star-off',
	      				path:'/customer',
	      				lists:[
	      					{name:'客户管理',path:'customIndex'},
	      					// {name:'会员搜索',path:'member'}
	      				]
					  },
					
	      		
	      			{
	      				title:'设置',
	      				icon:'el-icon-setting',
	      				path:'/setting',
	      				lists:[
	      					{name:'站点设置',path:'store'},
	      					{name:'物流管理',path:'express'},
	      					{name:'我的文件',path:'file'},
	      					{name:'打印机',path:'printer'}
	      				]
					  },
					  	{
	      				title:'内容管理',
	      				icon:'el-icon-edit-outline',
	      				path:'/content',
	      				lists:[
	      					{name:'文章列表',path:'articleLists'},
	      					{name:'文章分类',path:'articleClassify'}
	      				]
					  },
					  	{
	      				title:'英文管理',
	      				icon:'el-icon-edit-outline',
	      				path:'/english',
	      				lists:[
	      					{name:'文章列表',path:'articleLists'},
	      					{name:'文章分类',path:'articleClassify'}
	      				]
	      			},
	      			{
	      				title:'设置',
	      				icon:'el-icon-setting',
	      				path:'/setting',
	      				lists:[
	      					{name:'站点设置',path:'store'},
	      					{name:'物流管理',path:'express'},
	      					{name:'我的文件',path:'file'},
	      					{name:'打印机',path:'printer'}
	      				]
					  },
					// 商品模块注释
	      			// {
	      			// 	title:'商品',
	      			// 	icon:'el-icon-menu',
	      			// 	path:'/goods',
	      			// 	lists:[
	      			// 		{name:'商品管理',path:'manage'},
	      			// 		{name:'商品分组',path:'group'}
	      			// 	]
	      			// },
	      		]
	    	}
	  	},
	  	methods:{

	  		toggle (index){
	  			this.num = index;
				  sessionStorage.setItem('num', this.num);
	  		},
	  	},
	  	created() {
			  this.num = sessionStorage.getItem('num');
			  if(this.num == null){
				this.num = 0;
			  }
			  else{
				  this.num = sessionStorage.getItem('num');
			  }
	  	}
	}

</script>

<style lang="scss">
	.sidebar-warpper{
		position: fixed;
		width: 90px;
		left: 0;
		top: 0;
		bottom: 0;
		background-color: #444;
		z-index: 999;
	}
	.sidebar-logo{
		display: block;
	    width: 90px;
	    height: 63px;
	    overflow: hidden;
	    img{
	    	width: 32px;
    		height: 32px;
    		border-radius: 50%;
    		margin: 14px auto 0;
    		display: block;
	    }
	}
	.first-menu{
		width: 90px;
		position: relative;
		color: #ffffff;
		li{
			font-size: 14px;
		    height: 36px;
		    line-height: 36px;
		    margin-bottom: 14px;
		    cursor: pointer;
		}
		li:hover{
			background: #fff;
			color: #000;
		}
		.treeview{
			color: #CACACA;
		    display: block;
		    padding-left: 8px;
		}
		.router-link-active{
            background: #fff;
			color: #000;
        }

	}
	.second-menu-warpper{
		position: fixed;
		width: 110px;
		left: 90px;
		top: 0;
		bottom: 0;
		border-right: 1px solid #eeeeee;
		background-color: #fff;
		z-index: 999;
		h2{
			padding-left: 20px;
		    font-size: 14px;
		    height: 50px;
		    line-height: 50px;
		    border-bottom: 1px solid #f2f2f2;
		}
		.second-menu{
			padding: 13px 10px;
			box-sizing: content-box;
			li{
			    font-size: 14px;
			    height: 36px;
			    line-height: 36px;
			    margin-bottom: 14px;
			    overflow: hidden;
			    cursor: pointer;
			    border-radius: 2px;
			    a{
			    	display: block;
    				padding: 0 10px;
			    }
			    .router-link-active{
	                background: #f2f2f2;
					color: #333;
	            }
			}
		}
	}

</style>