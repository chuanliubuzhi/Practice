<template>
<div class="container newcon">
	<div class="goods-list container">
		<div class="clearfix ui-box" style="position: relative;">
			<div class="pull-left">
				<router-link :to="{name:'addGroup'}">
					新建商品分组
				</router-link>
			</div>
			<div class="pull-right">
				<el-input
				    placeholder="请输入内容"
				    >
				    <i slot="prefix" class="el-input__icon el-icon-search"></i>
			  	</el-input>
			</div>
			
		</div>
		<div class="ui-box">
			<el-table border ref="" :data="shopCategory" tooltip-effect="dark" style="width: 100%">
				
			    <el-table-column label="分组名称" prop="category_name" width="120">
			    </el-table-column>
			    
			    <el-table-column label="排序" prop="sort_order" width="120">
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.sort_order" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    
			    <el-table-column label="商品数" prop="is_show" width="120">
			    </el-table-column>
			    
			    <el-table-column label="创建时间">
			    </el-table-column>
			    
			    <el-table-column label="操作" show-overflow-tooltip>
			    	<template slot-scope="scope">
			    		<router-link  :to="{ name:'addGroup', params: {pid: scope.row.id} }">
			    			添加子栏目
			    		</router-link>
				        <el-button size="mini" @click="">修改</el-button>
				        <el-button size="mini" type="danger" @click="deleteSite(scope.$index,scope.row)">删除</el-button>
				    </template>
			    </el-table-column>
			    
			</el-table>
		</div>
		
		<div class="ui-box clearfix">
			<div class="pull-right">
				<el-pagination
			      :page-sizes="[100, 200, 300, 400]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="400">
			    </el-pagination>
			</div>
		</div>
		
	</div>
</div>
</template>

<script>
	
	import { siteCategory,deleteSiteCategory } from '@/api/goods'
	
	export default {
		name:'groupIndex',
		created() {
		    this.fetchData()
		},
		data (){
			return {
				shop:{
					category_name:'',
					parentid:null ,
					sort_order:null ,
					is_show:null
				},
				shopCategory:[]
				
			}
		},
		methods :{
			fetchData() {
				siteCategory().then(res => {
					this.shopCategory = res.data.data ;
		      	})
			},
			deleteSite (index,row){
				let siteId = {
					'id':row.id
				}
				var th = this ;
		        th.$confirm('将永久删除该商品分组, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	deleteSiteCategory(siteId).then(res => {
		        		if ( res.data.code == 0 ){
		        			th.$message({
				            	type: 'success',
				            	message: '删除成功!'
				        	});
		        		}else {
		        			th.$message({
				            	type: 'info',
			            		message: '删除失败!'
				        	});
		        		}
			      	})
		          	
		        }).catch(() => {
		          	th.$message({
		           	 	type: 'info',
		           	 	message: '已取消删除'
		          	});          
		        });
			}
		}
	}
	
</script>

<style>
</style>