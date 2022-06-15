<template>
	<div class="container">
		<div class="ui-bg food-manage-title clearfix">
			<div class="pull-left">
				<el-button type="primary" @click="createFood">新建商品</el-button>
				<el-button>上架</el-button>
				<el-button>下架</el-button>
			</div>
			<div class="pull-right">
				<el-input placeholder="搜索商品"></el-input>
			</div>
		</div>
		<div class="manage">
			<el-tabs tab-position="left" v-model="activeName" type="border-card" @tab-click="fetchFood" style="height: 420px;">
			    <el-tab-pane 
		    	v-for="(list,index) in catLists"  
		    	:label="list.name" 
		    	:name="list.cat_id + '' "
		    	:key="index">
			    	<div class="">
						<el-table
						    ref="foodTable"
						    tooltip-effect="dark"
						    style="width: 100%"
						    :data="foodLists"
						    >
						    <el-table-column type="selection" width="55">
						    </el-table-column>
						    
						    <el-table-column label="缩略图" width="120">
						    	<template slot-scope="scope">
						    		<div class="goods-img">
						    			<img :src=" scope.row.image[0]  " />
						    			<div class="off-sale" v-show="scope.row.is_on_sale == 0">
						    				已下架
						    			</div>
						    		</div>
						    	</template>
						    </el-table-column>
						    
						    <el-table-column prop="name" label="名称" width="120">
						    </el-table-column>
						    
						    <el-table-column prop="price" label="价格" width="120">
						    </el-table-column>
						    
						    <el-table-column prop="address" label="操作" show-overflow-tooltip>
						      	<template slot-scope="scope">
						      		<el-button 
						      			size="mini" 
						      			@click="forSale(scope.row,0)" 
						      			v-show="scope.row.is_on_sale == 1">
						      			下架
						      		</el-button>
						      		<el-button 
						      			size="mini" 
						      			type="primary" 
						      			@click="forSale(scope.row,1)" 
						      			v-show="scope.row.is_on_sale == 0">
						      			上架
						      		</el-button>
						       	 	<el-button size="mini" @click="editFood(scope.row)">编辑</el-button>
						       	 	
						       		<el-button size="mini" type="danger" @click="delFood(scope.row.food_id)">
							       		删除
							       	</el-button>
							       	<el-button size="mini" type="primary" @click="editInfo(scope.row)">
							      		改分组
							      	</el-button>
								    <!--<el-popover
								    	placement="left" 
								    	trigger="click">
								      <p>确定删除吗？</p>
								      <div style="text-align: right; margin: 0">
								        <el-button size="mini" type="text" @click="scope.row.showPro = false">取消</el-button>
								        <el-button type="primary" size="mini" @click="scope.row.showPro = false">确定</el-button>
								      </div>
								      
								    </el-popover>-->
								    
								    
						      	</template>
						    </el-table-column>
						    
						</el-table>
					</div>
			    </el-tab-pane>
			</el-tabs>
		</div>
		
		<el-dialog
		  title="修改商品分组"
		  :visible.sync="showGroup"
		  width="30%"
		  >
		  <div class="chooseList" v-for="(list,index) in catLists" :key="index">
		  	<el-radio :label="list.cat_id" border>
		    	{{list.name}}
		    </el-radio>
		  </div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showGroup = false">取 消</el-button>
		    <el-button type="primary" @click="editFoodGroup">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	
	import { foods,foodView,foodCategory,foodSale,delFoods } from '@/api/food'
	
	export default {
		name:'foodManage',
		data (){
			return {
				showGroup:false,
				activeName:null,
				catLists:[],
				foodLists:[],
				editGroupInfo:{
		        	cat_id:null,
					name:'',
					order_num:50
		        }
			}
		},
		created (){
			foodCategory ().then(res => {
		        this.catLists=res.data.data 
		        this.activeName=res.data.data[0].cat_id.toString() 
		        this.fetchFood ()
	      	})
		},
		methods:{
		   	fetchFood (){
		   		foods(this.activeName).then(res => {
			        this.foodLists=res.data.data ;
			        /*for ( let i=0;i<this.foodLists.length;i++ ){
						this.$set(this.foodLists[i], 'showPro', false)
			        }*/
			        //console.log(this.foodLists)
		      	})
		   	},
		   	
		   	//新建商品
		   	createFood (){
		   		this.$router.push({name:'addFood',params:{'active':this.activeName}});
		   	},
		   	
		   	//编辑食品
		   	editFood (row){
		    	var th = this ;
		    	let fid = row.food_id;
		    	foodView( fid ).then(res => {
		   			th.$router.push({
			    		name:'editFood',
			    		params:{pFood:res.data.data}
			    	})
		      	})
		   	},
		   	
		   	//食品上下架
		   	forSale (row,k){
		   		let fSale = {
		   			'food_id':row.food_id,
		   			'sale':k
		   		}
		   		foodSale( fSale ).then(res => {
		   			this.fetchFood ()
		      	})
		   	},
		   	
		   	//删除食品
		   	delFood (id){
		   		let fid = {
		   			'food_id':id
		   		}
		   		var th = this ;
		        th.$confirm('将永久删除该商品, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	delFoods(fid).then(res => {
		        		if ( res.data.code == 0 ){
							th.$message({
				            	type: 'success',
				            	message: '删除成功!'
				        	});
				        	th.fetchFood ()
						}else {
							th.$message({
				            	type: 'info',
				            	message: '删除失败!'
				      		});
				        	return ;
						}
			      	})
		        }).catch(() => {
		          	th.$message({
		           	 	type: 'info',
		           	 	message: '已取消删除'
		          	});          
		        });
		   		
		   	},
		   	
		   	editInfo (){
		   		this.showGroup = true ;
		   		this.editGroupInfo.name = row.name ;
		   		this.editGroupInfo.cat_id = row.cat_id ;
		   	},
		   	
		   	//改分组
		   	editFoodGroup (){
		   		/*var th = this ;
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
		      	})*/
		   	}
		   	
		}
	}
</script>

<style lang="scss" scoped>
	
	.food-manage-title{
		margin-bottom: 20px;
		padding: 15px;
	}
	.manage{
		min-height: 420px;
	}
	.goods-img{
		width: 50px;
		height: 50px;
		position: relative;
		img{
			width: 100%;
			height: 100%;
		}
		.off-sale{
			position: absolute;
		    top: 0;
		    left: 0;
		    width: 50px;
		    height: 50px;
		    line-height: 50px;
		    text-align: center;
		    font-size: 12px;
		    color: #fff;
		    background: rgba(0,0,0,.6);
		}
	}
	.chooseList{
		padding: 5px 0;
	}
</style>