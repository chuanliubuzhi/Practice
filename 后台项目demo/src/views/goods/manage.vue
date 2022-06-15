<template>
    
    <div class="">
    	<!--v-show=" this.$route.path!== '/goods/manage/create' "-->
    	<div class="third-menu">
	    	<ul class="clearfix">
    			<li v-for="(list,index) in lists" v-if="index < 3" :key="index">
    				<router-link  :to=" list.path ">
						{{list.name}}
					</router-link>
	    		</li>
	    	</ul>
	    </div>
	    
	    <transition name="fade" mode="out-in">
	        <router-view></router-view>
	    </transition>
	    
    </div>
    
</template>

<script>

export default {
  	name: 'dashboard',
  	computed:{
  		showTab (){
  			if (this.$route.path == '/goods/manage/create'){
	  			return false
	  		}else if(this.$route.path == '/goods/manage/goodsEdit'){
	  			return false
	  		}else {
	  			return true
	  		}
  		}
  	},
  	data (){
	  	return {
	  		lists:[
				{
					name:'出售中',
					path:'/goods/manage/selling'
				},
				{
					name:'已售罄',
					path:'/goods/manage/soldout'
				},
				{
					name:'仓库中',
					path:'/goods/manage/forsale'
				},
				{
					name:'发布商品',
					path:'/goods/manage/create'
				},
				{
					name:'编辑商品',
					path:'/goods/manage/goodsEdit'
				}
			]
  		}
  	}
}
</script>

<style lang="scss">
	
</style>
