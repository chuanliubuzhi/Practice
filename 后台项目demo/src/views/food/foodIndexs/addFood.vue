<template>
	<div class="container" style="background: #fff;">
		<el-form ref="form" :model="createFood" label-width="80px" style="min-width: 800px;">
			
		  <el-form-item label="图片">
		  	<div class="picture-list"  v-for="(foodImage,index) in createFood.the_image" :key="index">
		  		<div class="picture-list_pic" :style="{background: 'url('+ foodImage.img +')'}">
		  			<i class="el-icon-circle-close remove-list" @click="removeImage(index)"></i>
		  		</div>
		  	</div>
		    <push-image ref="childImg" @selected="showImage" :imageList="createFood.the_image" imageNumber="5"></push-image>
			<p class="ui-color">图片大小不超过3M，最多5张，建议使用方形图片</p>
		  </el-form-item>
		  
		  <el-form-item label="标题">
		  	<div class="setTitle">
		  		<el-input v-model="createFood.name" placeholder="最多60个字"></el-input>
		  	</div>
		  </el-form-item>
		  
		  <el-form-item label="描述">
		  	<div class="setTitle">
		  		<el-input type="textarea" v-model="createFood.describe" placeholder="可以不写，最多300个字">
				</el-input>
		  	</div>
		  </el-form-item>
		  
		  <el-form-item label="规格">
		  	<el-button v-if="checkSpec" @click="checkSpec = false">添加商品规格</el-button>
		  	<div class="sku-group clearfix" v-if="!checkSpec">
			    <table cellspacing="0" class="add-food-table">
					<thead>
						<tr>
							<th class="group-value">规格名称</th>
							<th class="group-price">价格(元)</th>
							<th class="food-stock">库存(份)</th>
							<th class="del-th"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(spec,index) in createFood.specs" :key="index">
							<td class="group-value"><el-input v-model="spec.name" placeholder="请填写规格名称"></el-input></td>
							<td class="group-price"><el-input v-model="spec.price"></el-input></td>
							<td class="food-stock">
								<div class="infi">
									<el-radio-group v-model="spec.infinite_count">
		  								<el-radio :label="1">无限库存</el-radio>
		  								<el-radio :label="0">自定义库存</el-radio>
	  								</el-radio-group>
								</div>
	  							<div class="infinput" v-if="spec.infinite_count == 0">
	  								<el-input v-model="spec.store_count"></el-input>
								</div>
							</td>
							<td class="del-th"><el-button type="text" @click="delSpecTable(index)">删除</el-button></td>
						</tr>
					</tbody>
				</table>
				<el-button @click="addSpecTable">添加商品规格</el-button>
			</div>
		  </el-form-item>
		  
		  <el-form-item label="价格" v-if="checkSpec">
		  	<el-col :span="3">
		  		<el-input v-model="createFood.price"></el-input>
		  	</el-col>
		  </el-form-item>
		  
		  <!--<el-form-item label="餐盒费" v-if="checkSpec">
		  	<el-col :span="3">
		  		<el-input></el-input>
		  	</el-col>
		  </el-form-item>-->
		  
		  <el-form-item label="库存" v-if="checkSpec">
		  	<div class="setStock">
		  		<el-radio-group v-model="createFood.infinite_count">
					<el-radio :label="1">无限库存</el-radio>
					<el-radio :label="0">自定义库存</el-radio>
				</el-radio-group>
			</div>
			<div class="setStore" v-if="createFood.infinite_count == 0">
				<el-input v-model="createFood.store_count"></el-input>
			</div>
		  </el-form-item>
		  
		  <el-form-item label="属性">
		    <el-button v-if="checkValue" @click="checkValue = false">增加商品属性</el-button>
		    <div class="sku-group clearfix" v-if="!checkValue">
			    <table cellspacing="0" class="add-value-table">
					<thead>
						<tr>
							<th class="name-value">属性名称</th>
							<th class="sub-value">属性细分(至少填写两个)</th>
							<th class="del-value"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(value,index) in createFood.values" :key="index">
							<td class="name-value"><el-input v-model="value.property.name" placeholder="如:辣度"></el-input></td>
							<td class="sub-value">
								<el-input v-for="(subdiv,eIndex) in value.property_child" v-model="subdiv.name" :key="eIndex"></el-input>
							</td>
							<td class="del-value"><el-button type="text" @click="delValue(index)">删除</el-button></td>
						</tr>
					</tbody>
				</table>
				<el-button @click="addValue">增加商品属性</el-button>
			</div>
		  </el-form-item>
		  
		  <el-form-item label="分组">
		    <el-button icon="el-icon-plus" @click="showGroup = true">新建分组</el-button>
		    <el-radio v-model="createFood.ctgName" v-for="(list,index) in foodGroup" :label="list.cat_id" border :key="index">
		    	{{list.name}}
		    </el-radio>
		    <p class="ui-color">商品需要放入分组后，才能展示给顾客</p>
		  </el-form-item>
		  
		  <el-form-item label="">
		    <el-button type="primary" @click="addFood">完成</el-button>
		    <!--<el-button>完成，继续添加下一个</el-button>-->
		  </el-form-item>
		</el-form>
		
		<el-dialog title="新建分组" width="40%" :visible.sync="showGroup">
		  <el-input v-model="addGroupInfo.name" placeholder="分组名称,最多10个字" @keyup.enter.native="addGroup"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showGroup = false">取 消</el-button>
		    <el-button type="primary" @click="addGroup">保存</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	
	import pushImage from '@/components/imageUpload/pushImage'
	import { addFoods,addFoodCategory,foodCategory } from '@/api/food'
	
	export default {
		name:'addFood',
		components:{
			pushImage
		},
		data (){
			return {
				showGroup:false,
        		dialogVisible: false,
        		checkSpec:true,
        		checkValue:true,
        		foodGroup:[],
        		createFood:{
        			cat_id:1,
        			the_image:[],
        			name:'',
        			describe:'',
        			price:null,
        			infinite_count:1,
        			store_count:null,
        			specs:[
        				{
        					name:'',
        					price:null,
        					infinite_count:1,
        					store_count:null
        				},
        				{
        					name:'',
        					price:null,
        					infinite_count:1,
        					store_count:null
        				}
        			],
        			values:[
        				{
        					property:{
        						name:''
        					},
        					property_child:[
        						{
        							name:''
        						},
        						{
        							name:''
        						},
        						{
        							name:''
        						},
        						{
        							name:''
        						}
        					]
        				}
        			],
        			ctgName:null
        		},
        		//新建分组
        		addGroupInfo:{
		        	name:'',
		        	order_num:50
		        }
			}
		},
		created (){
			this.fetchData();
		},
		methods:{
			//查商品分组
			fetchData (){
				foodCategory ().then(res => {
			        this.foodGroup=res.data.data ;
			        this.createFood.ctgName = Number(this.$route.params.active);
		      	})
		   	},
			
			//删除图片
			removeImage (i){
				this.createFood.the_image.splice(i,1) ;
			},
			
			//添加商品规格
			addSpecTable (){
				if (this.createFood.specs.length > 3){
					this.$message({
			          	message: '最多只能添加四种商品规格',
			          	type: 'warning',
			          	center: true
			        });
			        return
				}
				this.createFood.specs.push(
					{
    					name:'',
    					price:null,
    					infinite_count:1,
    					store_count:null
    				}
				)
			},
			
			//删除商品规格
			delSpecTable (i){
				this.createFood.specs.splice(i,1) ;
				if (this.createFood.specs.length < 1){
					this.checkSpec = true ;
					this.createFood.specs = [
        				{
        					name:'',
        					price:null,
        					infinite_count:1,
        					store_count:null
        				},
        				{
        					name:'',
        					price:null,
        					infinite_count:1,
        					store_count:null
        				}
        			]
				}
			},
			
			//添加商品属性
			addValue (){
				this.createFood.values.push(
					{
    					property:{
    						name:''
    					},
    					property_child:[
    						{
    							name:''
    						},
    						{
    							name:''
    						},
    						{
    							name:''
    						},
    						{
    							name:''
    						}
    					]
    				}
				)
			},
			
			//删除商品属性
			delValue (i){
				this.createFood.values.splice(i,1) ;
				if (this.createFood.values.length < 1){
					this.checkValue = true ;
					this.createFood.values = [
        				{
        					property:{
        						name:''
        					},
        					property_child:[
        						{
        							name:''
        						},
        						{
        							name:''
        						},
        						{
        							name:''
        						},
        						{
        							name:''
        						}
        					]
        				}
        			]
				}
			},
			
			//新建商品分组
			addGroup (){
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
			
			//新建商品
			addFood (){
				var th = this ;
				let imgUrl = [] ;
				if ( th.createFood.the_image.length == 0 ) {
					this.$message.error('需要选择图片');
					return;
				}
				for (let i=0;i<th.createFood.the_image.length;i++){
					imgUrl.push(th.createFood.the_image[i].img) ;
				}
				if ( th.checkSpec == true ){
					let fData = {
						'food':{
							"cat_id":th.createFood.ctgName,
							"name":th.createFood.name,
							"price":th.createFood.price,
							"infinite_count":th.createFood.infinite_count,
							"store_count":th.createFood.store_count,
							"content":th.createFood.describe,
							"the_image":imgUrl
						},
						'pro':th.createFood.values
					}
					addFoods (fData).then(res => {
						if ( res.data.code == 0 ){
							th.$message({
				            	type: 'success',
				            	message: '发布成功!'
				        	});
				        	th.$router.push('/food');
						}else {
							th.$message({
				            	type: 'info',
				            	message: '发布失败!'
				      		});
				      		//console.log(res);
				        	return ;
						}
				        //console.log(res) ;
				        
			      	})
				}else if ( th.checkSpec == false ){
					let fData = {
						'food':{
							"cat_id":th.createFood.ctgName,
							"name":th.createFood.name,
							"price":0,
							"infinite_count":th.createFood.infinite_count,
							"store_count":th.createFood.store_count,
							"content":th.createFood.describe,
							"the_image":imgUrl
						},
						'sku':th.createFood.specs,
						'pro':th.createFood.values
					}
					addFoods (fData).then(res => {
				        //console.log(res) ;
				        if ( res.data.code == 0 ){
							th.$message({
				            	type: 'success',
				            	message: '发布成功!'
				        	});
				        	th.$router.push('/food');
						}else {
							th.$message({
				            	type: 'info',
				            	message: '发布失败!'
				      		});
				      		//console.log(res);
				        	return ;
						}
				        
			      	})
				}
			},
			
			//获取上传图片
			showImage (i){
				this.createFood.the_image = i.splice(0,5) ;
				//console.log(this.createFood.the_image)
			}
			
		}
	}
	
</script>

<style lang="scss" scoped>
	
	/*上传图片样式*/
	.picture-list{
		display: inline-block;
		.picture-list_pic{
			position: relative;
		    display: inline-block;
		    background: no-repeat;
		    background-size: cover;
		    background-position: 50%;
		    width: 60px;
		    height: 60px;
		    margin: 0 10px 10px 0;
		    box-sizing: border-box;
		    font-size: 16px;
		}
		.remove-list{
			position: absolute;
			cursor: pointer;
			right: -9px;
			top: -9px;
		}
	}
	.setTitle{
		width: 75%;
		min-width: 650px;
	}
	.sku-group{
		padding: 14px 20px;
		background: #F2F2F2;
		width: 75%;
		color: #606266;
		box-sizing: border-box;
		min-width: 650px;
	}
	
	/*规格表*/
	.add-food-table{
		padding: 5px;
		th{
			text-align: left;
		}
		td{
			padding-bottom: 15px;
		}
		.group-value{
			width: 150px;
			padding-right: 15px;
		}
		.group-price{
			width: 100px;
			padding-right: 25px;
		}
		.food-stock{
			
		}
		.del-th{
			width: 50px;
			text-align: right;
		}
	}
	
	/*属性表*/
	.add-value-table{
		padding: 5px;
		th{
			text-align: left;
		}
		td{
			padding-bottom: 15px;
		}
		.name-value{
			width: 100px;
			padding-right: 15px;
		}
		.sub-value{
			width: 480px;
			display: flex;
			.el-input{
				padding-right: 10px;
			}
		}
		.del-value{
			text-align: right;
		}
	}
	.infi{
		width: 229px;
		display: inline-block;
	}
	.infinput{
		width: 65px;
		display: inline-block;
	}
	.setStock{
		display: inline-block;
		min-width: 270px;
	}
	.setStore{
		display: inline-block;
		width: 100px;
	}
	
</style>