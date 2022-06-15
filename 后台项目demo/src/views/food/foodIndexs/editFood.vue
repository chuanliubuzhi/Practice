<template>
	
	<div class="container" style="background: #fff;">
		<el-form ref="form" label-width="80px" style="min-width: 800px;">
			
		  <el-form-item label="图片">
		  	<div class="picture-list" v-for="(foodImage,index) in foods.food.image" :key="index">
		  		<div class="picture-list_pic" :style="{background: 'url('+ foodImage +')'}">
		  			<i class="el-icon-circle-close remove-list" @click="removeImage(index)"></i>
		  		</div>
		  	</div>
		    <push-image @selected="showImage"></push-image>
			<p class="ui-color">图片大小不超过3M，最多5张，建议使用方形图片</p>
		  </el-form-item>
		  
		  <el-form-item label="标题">
		  	<div class="setTitle">
		  		<el-input v-model="foods.food.name" placeholder="最多60个字"></el-input>
		  	</div>
		  </el-form-item>
		  
		  <el-form-item label="描述">
		  	<div class="setTitle">
		  		<el-input type="textarea" v-model="foods.food.content" placeholder="可以不写，最多300个字">
				</el-input>
		  	</div>
		  </el-form-item>
		  
		  <el-form-item label="规格">
		  	<el-button v-show="showSku == false" @click="addSku">添加商品规格</el-button>
		  	<div class="sku-group clearfix" v-show="showSku == true">
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
						<tr v-for="(spec,index) in foods.sku" :key="index">
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
							<td class="del-th"><el-button type="text" @click="delSku(spec,index)">删除</el-button></td>
						</tr>
					</tbody>
				</table>
				<el-button @click="addSku">添加商品规格</el-button>
			</div>
		  </el-form-item>
		  
		  <el-form-item label="价格" v-show="showSku == false">
		  	<el-col :span="3">
		  		<el-input v-model="foods.food.price"></el-input>
		  	</el-col>
		  </el-form-item>
		  
		  <el-form-item label="库存" v-show="showSku == false">
		  	<div class="setStock">
		  		<el-radio-group v-model="foods.food.infinite_count">
					<el-radio :label="1">无限库存</el-radio>
					<el-radio :label="0">自定义库存</el-radio>
				</el-radio-group>
			</div>
			<div class="setStore" v-if="foods.food.infinite_count == 0">
				<el-input v-model="foods.food.store_count"></el-input>
			</div>
		  </el-form-item>
		  
		  <el-form-item label="属性">
		    <el-button v-show="showPro == false" @click="addPro">增加商品属性</el-button>
		    <div class="sku-group clearfix" v-show="showPro == true">
			    <table cellspacing="0" class="add-value-table">
					<thead>
						<tr>
							<th class="name-value">属性名称</th>
							<th class="sub-value">属性细分(至少填写两个)</th>
							<th class="del-value"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(value,index) in foods.pro" :key="index">
							<td class="name-value">
								<el-input v-model="value.property.name" placeholder="如:辣度">
								</el-input>
							</td>
							<td class="sub-value">
								<el-input v-for="(subdiv,eIndex) in value.property_child" v-model="subdiv.name" :key="eIndex">
								</el-input>
							</td>
							<td class="del-value"><el-button type="text" @click="delPro(value.property,index)">删除</el-button></td>
						</tr>
					</tbody>
				</table>
				<el-button @click="addPro">增加商品属性</el-button>
			</div>
		  </el-form-item>
		  
		  <el-form-item label="分组">
		    <el-button icon="el-icon-plus" @click="showGroup = true">新建分组</el-button>
		    <el-radio v-model="foods.food.cat_id"  v-for="(list,index) in foodGroup" :label="list.cat_id" border :key="index">
		    	{{list.name}}
		    </el-radio>
		    <p class="ui-color">商品需要放入分组后，才能展示给顾客</p>
		  </el-form-item>
		  
		  <el-form-item label="">
		    <el-button type="primary" @click="subFood">保存</el-button>
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
	import { addFoodCategory,editFoods,foodCategory,foodSku,foodPro } from '@/api/food'
	
	export default {
		name:'editFood',
		components:{
			pushImage
		},
		computed:{
			//判断是否有sku
			showSku (){
				if ( this.foods.sku.length < 1 ){
					return false
				}else{
					return true
				}
			},
			
			//判断是否有pro
			showPro (){
				if (this.foods.pro.length < 1 ){
					return false
				}else{
					return true
				}
			}
		},
		data (){
			return {
				showGroup:false,
				foods:{},
				foodGroup:[],
				//新建分组
        		addGroupInfo:{
		        	name:'',
		        	order_num:50
		        }
			}
		},
		created (){
			this.getParams ()
			this.fetchData()
		},
		methods:{
			
			//获取路由跳转参数
			getParams (){
		   		this.foods = this.$route.params.pFood ;
			},
		   
		   //删除图片
			removeImage (i){
				this.foods.food.image.splice(i,1) ;
			},
			
			//获取上传图片
			showImage (is){
				var newIs = is.splice(0,5) ;
				for (let i =0;i<newIs.length;i++){
					this.foods.food.image.push(newIs[i].img)
				}
			},
			
			//查商品分组
			fetchData (){
				foodCategory ().then(res => {
			        this.foodGroup=res.data.data ;
		      	})
		   	},
		   	
		   	//新建商品分组
		   	addGroup (){
		   		var th = this ;
		   		addFoodCategory (th.addGroupInfo).then(res => {
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
		   	
		   	//删除食品sku
		   	delSku (row,i){
		   		if (row.id){
		   			let sid = {
			   			'id':row.id
			   		}
			   		foodSku (sid).then(res => {
				        if (res.data.code == 0){
				        	this.foods.sku.splice(i,1)
				        }
			      	})
		   		}else {
		   			this.foods.sku.splice(i,1)
		   		}
		   	},
		   	
		   	//删除食品pro
		   	delPro (row,i){
		   		if (row.property_id){
		   			let pid = {
			   			'property_id':row.property_id
			   		}
			   		foodPro (pid).then(res => {
				        if (res.data.code == 0){
				        	this.foods.pro.splice(i,1)
				        }
			      	})
		   		}else {
		   			this.foods.pro.splice(i,1)
		   		}
		   	},
		   	
		   	//增加食品sku
		   	addSku (){
		   		if (this.foods.sku.length > 3){
					this.$message({
			          	message: '最多只能添加四种商品规格',
			          	type: 'warning',
			          	center: true
			        });
			        return
				}
				this.foods.sku.push(
					{
    					name:'',
    					price:null,
    					infinite_count:1,
    					store_count:null
    				}
				)
		   	},
		   	
		   	//增加食品属性
		   	addPro (){
		   		this.foods.pro.push({
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
				})
		   	},
		   	
		   	//保存修改
		   	subFood (){
		   		let total = {
		   			'food':{
		   				"cat_id":this.foods.food.cat_id,
						"name":this.foods.food.name,
						"price":this.foods.food.price,
						"store_count":this.foods.food.store_count,
						"infinite_count":this.foods.food.infinite_count,
						"content":this.foods.food.content,
						"the_image":this.foods.food.image,
						"today_sale":this.foods.food.today_sale,
						"is_on_sale":this.foods.food.is_on_sale,
						"food_id":this.foods.food.food_id,
						"order_num":this.foods.food.order_num
						
		   			},	
		   			'sku':this.foods.sku,
		   			'pro':this.foods.pro
		   		}
		   		editFoods(total).then(res => {
			        if ( res.data.code == 0 ){
						this.$message({
			            	type: 'success',
			            	message: '编辑成功!'
			        	});
			        	this.$router.push('/food');
					}else {
						this.$message({
			            	type: 'info',
			            	message: '发布失败!'
			      		});
			        	return ;
					}
		      	})
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
			width: 10%;
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
	.setTitle{
		width: 75%;
		min-width: 650px;
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