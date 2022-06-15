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
		name:'tableIndex',
		data (){
		  	return {
		  		lists:[
					{
						name:'桌位',
						path:'/food/tableIndex/tables'
					},
//					{
//						name:'桌位类型',
//						path:'/food/tableIndex/tableType'
//					}
				]
	  		}
	  	}
	}
	
</script>

<style>
</style>