<template>
	
	<div class="container newcon">
		<el-form ref="form" :model="addSite" label-width="80px">
			
			<el-form-item label="父级分类">
			    <el-input ref="prtid" v-model="this.$route.params.pid"></el-input>
			</el-form-item>
			
			<el-form-item label="分类名称">
			    <el-input v-model="addSite.category_name"></el-input>
			</el-form-item>
			
			<el-form-item>
			    <el-button type="primary" @click="createSite">立即创建</el-button>
			    <el-button @click="cancel">取消</el-button>
			</el-form-item>
			
		</el-form>
	</div>
</template>

<script>
	
	import { addSiteCategory } from '@/api/goods'
	
	export default {
		name:'addGroup',
		data (){
			return {
				addSite:{
					category_name:'',
					parentid:0 ,
					sort_order:50 ,
					is_show:1
				}
			}
		},
		methods:{
			createSite (){
				if ( !this.$refs.prtid.value ){
					this.addSite.parentid = 0 ;
				}else {
					this.addSite.parentid = this.$refs.prtid.value ;
				}
				let category = this.addSite ;
				addSiteCategory(category).then(res => {
					if ( res.data.code == 0 ){
						this.$message({
			            	type: 'success',
			            	message: '创建成功!'
			        	});
			        	this.$router.push('/goods/group');
					}else {
						this.$message({
			            	type: 'info',
			            	message: '创建失败!'
			        	});
			        	//console.log(res) ;
			        	return ;
					}
		      	})
			},
			cancel (){
				//console.log(this.$refs.prtid.value);
			}
		}
	}
	
</script>

<style lang="scss">
	
	
	
</style>