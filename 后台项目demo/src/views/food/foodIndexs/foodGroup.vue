<template>
	<div class="container newcon">
		<div class="ui-bg ui-box clearfix">
			<div class="pull-left">
				<el-button type="primary" @click="showGroup = true">新建分组</el-button>
				<!--<el-button>分组排序</el-button>-->
			</div>
		</div>
		<div class="ui-box">
			<el-table :data="tableData" style="width: 100%">
				
			    <el-table-column  prop="name" label="分组">
			    </el-table-column>
			      
			    <el-table-column prop="category_count" label="包含商品">
			    </el-table-column>
			      
			    <el-table-column label="操作">
			    	<template slot-scope="scope">
			       	 	<el-button size="mini" @click="editInfo(scope.row)">编辑</el-button>
			       		<el-button size="mini" type="danger" @click="delInfo(scope.row)">删除</el-button>
			      	</template>
			    </el-table-column>
		      
		    </el-table>
		</div>
		
		<el-dialog title="新建分组" width="40%" :visible.sync="showGroup">
		  <el-input v-model="addGroupInfo.name" placeholder="分组名称,最多10个字" @keyup.enter.native="addFood"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showGroup = false">取 消</el-button>
		    <el-button type="primary" @click="addFood">保存</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog title="编辑分组" width="40%" :visible.sync="editGroup">
		  <el-input v-model="editGroupInfo.name" @keyup.enter.native="editFood"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editGroup = false">取 消</el-button>
		    <el-button type="primary" @click="editFood">保存</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	
	import { addFoodCategory,delFoodCategory,updateFoodCategory,foodCategory } from '@/api/food'
	
	export default {
		name:'foodGroup',
		data (){
			return {
				tableData:[],
		        showGroup:false,
		        editGroup:false,
		        addGroupInfo:{
		        	name:'',
		        	order_num:50
		        },
		        editGroupInfo:{
		        	cat_id:null,
					name:'',
					order_num:50
		        }
			}
		},
		created (){
			this.fetchData()
		},
		methods:{
			fetchData (){
				foodCategory ().then(res => {
			        this.tableData=res.data.data ;
			        //console.log(res) ;
		      	})
		   	},
		   	
		   	//创建商品分组
		   	addFood (){
		   		var th = this ;
		   		addFoodCategory (th.addGroupInfo).then(res => {
			        //console.log(res) ;
			        if ( res.data.code == 0 ){
			        	th.showGroup = false ;
			        	th.fetchData() ;
			        	th.$message({
				          	message: '创建成功！',
				          	type: 'success'
				        });
			        }else {
			        	th.$message('创建失败');
				        return
			        }
		      	})
		   	},
		   	
		   	editInfo (row){
		   		this.editGroup = true ;
		   		this.editGroupInfo.name = row.name ;
		   		this.editGroupInfo.cat_id = row.cat_id ;
		   	},
		   	
		   	//修改商品分组
		   	editFood (){
		   		var th = this ;
		   		updateFoodCategory (th.editGroupInfo).then(res => {
			        //console.log(res) ;
			        if ( res.data.code == 0 ){
			        	th.editGroup = false ;
			        	th.fetchData() ;
			        	th.$message({
				          	message: '编辑成功！',
				          	type: 'success'
				        });
			        }else {
			        	th.$message('编辑失败');
				        return
			        }
		      	})
		   	},
		   	
		   	//删除商品分组
		   	delInfo (row){
		   		var th = this ;
		   		let fData = {
		   			'catid':row.cat_id
		   		}
		   		
		   		th.$confirm('将永久删除该分组, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	delFoodCategory(fData).then(res => {
		        		//console.log(res) ;
		        		if ( res.data.code == 0 ){
		        			th.fetchData() ;
		        			th.$message({
				            	type: 'success',
				            	message: '删除成功!'
				        	});
		        		}else{
		        			th.$message({
				           	 	type: 'info',
				           	 	message: '删除失败!'
				          	});
				          	//console.log(response) ;
				          	return ;
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