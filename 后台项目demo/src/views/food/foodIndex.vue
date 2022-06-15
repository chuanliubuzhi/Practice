<template>
	<div class="">
		<div class="third-menu">
	    	<ul class="clearfix">
    			<li v-for="(list,index) in lists" v-if="index < 2" :key="index">
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
		name:'foodIndex',
		data (){
		  	return {
		  		lists:[
					{
						name:'商品管理',
						path:'/food/foodIndex/foodManage'
					},
					{
						name:'分组管理',
						path:'/food/foodIndex/foodGroup'
					},
					{
						name:'新建商品',
						path:'/food/foodIndex/addFood'
					},
					{
						name:'编辑商品',
						path:'/food/foodIndex/editFood'
					}
				]
	  		}
	  	}
	}
	
</script>

<style>
</style>