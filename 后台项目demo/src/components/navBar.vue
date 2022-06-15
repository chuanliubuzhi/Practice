<template>
	
	<!--<el-menu>
		
	    <el-submenu :index="1">
	        <template slot="title">首页</template>
          	<el-menu-item index="1-1">系统首页</el-menu-item>
	    </el-submenu>
	    
	    <el-submenu :index="2">
	        <template slot="title">微信</template>
          	<el-menu-item index="2-1">素材管理</el-menu-item>
          	<el-menu-item index="2-2">微信菜单</el-menu-item>
          	<el-menu-item index="2-3">自动回复</el-menu-item>
          	<el-menu-item index="2-4">模板消息</el-menu-item>
          	<el-menu-item index="2-5">多客服设置</el-menu-item>
          	<el-menu-item index="2-6">微信配置</el-menu-item>
	    </el-submenu>
	    
	    <el-submenu :index="3">
	        <template slot="title">订单</template>
          	<el-menu-item index="3-1">订单概况</el-menu-item>
          	<el-menu-item index="3-2">订单列表</el-menu-item>
          	<el-menu-item index="3-3">评价列表</el-menu-item>
	    </el-submenu>
	    
	    <el-submenu :index="4">
	        <template slot="title">商城</template>
          	<el-menu-item index="4-1">商品管理</el-menu-item>
          	<el-menu-item index="4-2">店铺商品分类</el-menu-item>
          	<el-menu-item index="4-3">商品标签管理</el-menu-item>
          	<el-menu-item index="4-4">商品SKU管理</el-menu-item>
	    </el-submenu>
	    
	    <el-submenu :index="5">
	        <template slot="title">内容</template>
          	<el-menu-item index="5-1">文章列表</el-menu-item>
          	<el-menu-item index="5-2">文章分类</el-menu-item>
          	<el-menu-item index="5-3">反馈管理</el-menu-item>
          	<el-menu-item index="5-4">公告管理</el-menu-item>
          	<el-menu-item index="5-1">热词管理</el-menu-item>
          	<el-menu-item index="5-2">举报管理</el-menu-item>
          	<el-menu-item index="5-3">商家审核</el-menu-item>
          	<el-menu-item index="5-4">距离设置</el-menu-item>
	    </el-submenu>
	    
	    <el-submenu :index="6">
	        <template slot="title">商城</template>
          	<el-menu-item index="6-1">商品管理</el-menu-item>
          	<el-menu-item index="6-2">店铺商品分类</el-menu-item>
          	<el-menu-item index="6-3">商品标签管理</el-menu-item>
          	<el-menu-item index="6-4">商品SKU管理</el-menu-item>
	    </el-submenu>
	    
	</el-menu>-->
	
	<aside class="sidebar">
		
		<div class="main-nav">
			<ul class="nav-menu">
				<li v-for="(nav,index) in navs" :key="index" @click="toggle(index)">
					<a>{{nav}}</a>
				</li>
			</ul>
		</div>
		
		<div class="main-nav-side">
			<ul class="nav-list">
				<li v-for="(navlist,index) in navlists" :key="index" v-if="index == num">
					<ul>
						<li v-for="(navlistt,index) in navlist" :key="index">
							<a>{{navlistt}}</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		
	</aside>
	
	
	
	
	
</template>

<script type="text/javascript">
	
	export default {
		name: 'navbar',
		data:function (){
			return {
				navs:['首页','肉禽蛋奶','冷热速食','休闲食品','酒水饮料','粮油调味','清洁日化','家居用品','鲜花蛋糕','医药健康'],
				navlists:[
					['首页','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页2','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页3','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页4','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页5','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页6','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页7','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页8','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页9','清洁日化','家居用品','鲜花蛋糕','医药健康'],
					['首页10','清洁日化','家居用品','鲜花蛋糕','医药健康'],
				],
				num:0
			}
		},
		methods:{
			toggle(index) {
				this.num = index;
			}
		}
	}
	
</script>

<style lang="scss">
	
	.sidebar{
		.main-nav{
			position: fixed;
			width: 90px;
			height: 500px;
			background-color: #444;
			left: 0;
			top: 0;
			margin: 0;
			padding: 0;
		}
		.main-nav-side{
			position: fixed;
			margin-left: 90px;
			width: 110px;
			top: 0;
			left: 0;
			height: 500px;
			background-color: #ff8000;
		}
	}
	
	
</style>