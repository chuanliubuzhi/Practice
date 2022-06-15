<template>

	<div class="">
    	
    	<div class="third-menu" v-show="this.$route.path !=='/goods/group/addGroup' ">
	    	<ul class="clearfix">
	    		<li v-for="(list,index) in lists" :key="index" v-if="index < 1">
	    			<router-link :to=" list.path " >
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

<script type="text/javascript">
	export default {
		name:'group',
		data (){
		  	return {
		  		lists:[
					{
						name:'商品分组管理',
						path:'/goods/group/index'
					},
					{
						name:'新建商品分组',
						path:'/goods/group/addGroup'
					}
				]
		  	}
		}
	}
</script>

<style type="text/css">
	
</style>