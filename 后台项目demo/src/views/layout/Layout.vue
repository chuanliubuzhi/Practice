<template>
	<div class="app-wrapper clearfix">
		
		<sidebar></sidebar>
		
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	
	import { Sidebar,Navbar, AppMain } from './components'
	
	export default {
		name: 'layout',
		components: {
			Sidebar,
			Navbar,
		    AppMain
		}
	}
	
</script>

<style type="text/css">
	
	.app-wrapper {
	  	position: relative;
	  	height: 100%;
	  	width: 100%;
	}
	.main-container{
		margin-left: 200px;
		margin-top: 50px;
		min-width: 800px;
	}
	
</style>