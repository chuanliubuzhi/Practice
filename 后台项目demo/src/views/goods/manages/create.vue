<template>

	<div class="container newcon">

		<div class="ui-box">
			<!--<el-steps :active="activeStep" simple>
			  <el-step title="选择商品种类" icon="el-icon-edit"></el-step>
			  <el-step title="编辑商品信息" icon="el-icon-upload"></el-step>
			</el-steps>-->
			<div class="xn-steps">
				<div class="xn-steps-item goods-ct" style="width: 50%;">
					<div class="xn-steps-step step1" :class="{'cate-active':1 == activeStep}">
						1.选择商品种类
					</div>
				</div>

				<div class="xn-steps-item base-info" style="width: 50%;">
					<div class="xn-steps-step step2" :class="{'info-active':2 == activeStep}">
						2.编辑商品信息
					</div>
				</div>
			</div>
		</div>

		<div v-if="1 == activeStep">
			<ul class="cate-list clearfix ui-box">

				<!--一级分类-->
				<li class="cate-list-li">
					<ul class="cate-tree calSor">
						<li v-for="(list,index) in lists" @click="showSecond(list.catid,list.mobile_name,index)" :key="index">
							<a class="child" :class="{cative:index == fnum}">{{list.mobile_name}}<i class="el-icon-arrow-right"></i></a>
						</li>
					</ul>
				</li>

				<!--二级分类-->
				<li class="cate-list-li" v-show="slists !=''">
					<ul class="cate-tree calSor">
						<li v-for="(list,index) in slists" @click="showThird(list.catid,list.mobile_name,index)" :key="index">
							<a class="child" :class="{cative:index == snum}">{{list.mobile_name}}<i class="el-icon-arrow-right"></i></a>
						</li>
					</ul>
				</li>

				<!--三级分类-->
				<li class="cate-list-li" v-show="tlists !=''">
					<ul class="cate-tree calSor">
						<li v-for="(list,index) in tlists" @click="showTname(list.catid,list.mobile_name,index)" :key="index">
							<a class="child" :class="{cative:index == tnum}">{{list.mobile_name}}</a>
						</li>
					</ul>
				</li>

			</ul>

			<div class="cutChoose ui-bg">
				<span>您当前选择的是：</span>
				<span class="curChoose" v-if=" fname !=='' ">{{fname}}<i class="el-icon-arrow-right"></i></span>
				<span class="curChoose" v-if=" sname !=='' ">{{sname}}<i class="el-icon-arrow-right"></i></span>
				<span class="curChoose" v-if=" tname !=='' ">{{tname}}</span>
			</div>

			<div class="ui-box tobasic">
				<el-button type="primary" @click="toBasic()">下一步</el-button>
			</div>

		</div>

		<div class="eidtorInfo" v-if="2 == activeStep">
			<el-form :model="ruleForm" :rules="rules" label-position="left" label-width="80px">

			<!--商品名称-->
				<div class="ui-box">
			  	  <p class="create-main">基本信息</p>
				  <el-form-item label="商品名称" prop="goodsName">
				  	<el-col :span="11">
				    	<el-input v-model="ruleForm.goodsName"></el-input>
				    </el-col>
				  </el-form-item>

				<!--商品图片-->
				  <el-form-item label="商品主图" prop="goodsImg">
					<el-col :span="11">
				    	<el-button type="primary" icon="el-icon-plus" @click="showUploadImg">上传图片</el-button>
				    </el-col>
				  </el-form-item>

				  <div class="thumbnail" v-if="ruleForm.goodsImg !=='' ">
				  		<div class="img-wrap">
				  			<img :src=" 'http://upload.ixn123.com/' +ruleForm.goodsImg  " />
				  		</div>
				  </div>

				<!--商品描述-->
				  <el-form-item label="商品描述" prop="goodsDetail">
				    <el-col :span="11">
				    	<el-input type="textarea" v-model="ruleForm.goodsDetail"></el-input>
				    </el-col>
				  </el-form-item>
			  </div>
			  <div class="ui-box">
			  	<p class="create-main">库存/规格</p>

			  	<el-form-item label="商品规格">
				    <el-radio-group v-model="ruleForm.standard">
				      <el-radio :label="0">统一规格</el-radio>
				      <el-radio :label="1">多规格</el-radio>
				    </el-radio-group>
				</el-form-item>

			  	<div v-if="ruleForm.standard == 0">
			  		<!--市场价-->
				  	<el-form-item label="市场价" prop="market">
				   	 	<el-col :span="5">
					    	<el-input v-model.number="ruleForm.market"></el-input>
					    </el-col>
				  	</el-form-item>

				  	<!--本店价-->
				  	<el-form-item label="本店价" prop="localShop">
				   	 	<el-col :span="5">
					    	<el-input v-model.number="ruleForm.localShop"></el-input>
					    </el-col>
				  	</el-form-item>

				  	<!--商品库存-->
				  	<el-form-item label="库存" prop="stock">
				   	 	<el-col :span="5">
					    	<el-input v-model.number="ruleForm.stock"></el-input>
					    </el-col>
				  	</el-form-item>

				  	<!--商品编号-->
				  	<el-form-item label="商品编码" prop="goodsCode">
				   	 	<el-col :span="5">
					    	<el-input v-model="ruleForm.goodsCode"></el-input>
					    </el-col>
				  	</el-form-item>
			  	</div>

			  	<div class="setSpec" v-if="ruleForm.standard == 1">

			  		<div class="specGroups" v-for="(group,index) in groups" :key="index">

			  			<!--规格名-->
					  	<el-form-item label="规格名">
					  		<el-col :span="3">
						   	 	<el-autocomplete v-model="group.value" :fetch-suggestions="querySearchAsync"
						   	 	  placeholder="添加项目规格"
								  @select="handleSelect"
								></el-autocomplete>
							</el-col>
					  	</el-form-item>

					  	<!--规格值-->
					  	<el-form-item label="规格值" v-if=" group.value !== '' ">
					  		<div class="specValue" v-for="(specValueList,specKey) in group.specValueLists" :key="specKey">
							    <el-input v-model="specValueList.sValue"></el-input>
							    <i class="del-specValue el-icon-circle-close" @click="delSpecValue(index,specKey)"></i>
					  		</div>
					  		<span class="add-specValue" @click="addSpecValue(index)">添加规格值</span>
					  	</el-form-item>

					  	<span class="delSpec" @click="delGroups(index)"><i class="el-icon-circle-close"></i></span>

			  		</div>

				  	<p class="ui-bg newSpec"><el-button size="medium" @click="addGroups">添加项目规格</el-button></p>

				  	<!--规格明细-->
				  	<div class="specDetail clearfix" v-if="showT">
				  		<span class="pull-left specDetail-title">规格明细</span>
						<table border="1" cellspacing="0" class="specTable">
							<thead>
								<tr>
									<th v-for="(group,index) in groups" :key="index">
										{{group.value}}
									</th>
									<th>价格</th>
									<th>库存</th>
									<th>商品编码</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in countSum(0)" :key="index">
									<td v-for="(n, tIndex) in groups.length"
										v-if="showTd(tIndex, index)"
										:rowspan="countSum(n)"
										>
										{{getSpecAttr(tIndex, index)}}
									</td>
									<td><el-input ></el-input></td>
									<td><el-input ></el-input></td>
									<td><el-input ></el-input></td>
								</tr>
							</tbody>
						</table>
				  	</div>

			  	</div>


			  </div>

			</el-form>

			<div class="ui-box tobasic">
				<el-button type="primary" @click="toSub()">立即发布</el-button>
			</div>

			<el-dialog title="选择图片" :visible.sync="hideUploadImg">
	            <el-upload
					action="http://api.xn.demo-xn.itdongli.com/attachment/upload/uploadimage"
					ref="newupload"
					:before-remove="beforeRemove"
					list-type="picture-card"
					multiple
					accept=".jpg,.gif,.png"
					:limit="1"
					:data="upLoadData"
					:onSuccess="uploadSuccess"
					:on-exceed="handleExceed">
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">只能上传jpg/gif/png文件，且不超过500kb</div>
				</el-upload>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="hideUploadImg = false">取 消</el-button>
		            <el-button type="primary" @click="hideUploadImg = false">确 定</el-button>
		        </div>
	        </el-dialog>

		</div>

		<!--<div class="" v-if="2 == activeStep">
			rtntrnhtrrjthy

			<div class="ui-box tobasic">
				<el-button type="primary" @click="toBasic()">完成</el-button>
			</div>

		</div>-->

	</div>

</template>

<script>

	import { firstCategory,secondCategory,thirdCategory,createGoods,uploadimage,getSpec } from '@/api/goods'
	import { getToken } from '@/utils/auth'

	export default {
		name:'createGoods',
		computed:{
	       	/*combine (){
	       		var r = [];
	       		var newSpecLists = [];
	       		for (var i=0;i<this.groups.length;i++){
					newSpecLists.push(this.groups[i].specValueLists);
				}

	            (function f(t, a, n) {
	                if (n == 0) return r.push(t);
	                for (var i = 0; i < a[n-1].length; i++) {
	                    f(t.concat(a[n-1][i]), a, n - 1);
	                }
	            })([], newSpecLists, newSpecLists.length);
	            return r;
	       	},

	       	tdRow (){
	       		var row = [];
		        var rowspan = this.combine.length;
		        for(var n=this.groups.length-1; n>-1; n--) {
		            row[n] = parseInt(rowspan/this.groups[n].specValueLists.length);
		            rowspan = row[n];
		        }
		        row.reverse();
		        return row ;
	       	}*/
	       	showT (){
	       		for (let m=0;m<this.groups.length;m++){
		    		for (let n=0;n<this.groups[m].specValueLists.length;n++){
		    			if ( this.groups[m].specValueLists[n].sValue =='' ){
		    				return false ;
		    			}else {
		    				return true ;
		    			}
		    		}

		    	}
	       	}
		},
		data (){
			return {
				groups:[
					{
						value:'',
						specValueLists:[
							{
								sValue:'',
								price:null,
								store:null,
								code:''
							}
						]
					}
				],
				hideUploadImg:false,
				activeStep:	1,
				fnum:999,
				snum:999,
				tnum:999,
				lists:[],
				slists:[],
				tlists:[],
				fileList2:[],
				fname:'',
				sname:'',
				tname:'',
				ruleForm: {
					catid:null,
			        goodsName: '',
			        goodsImg: '',
			        goodsDetail: '',
			        market: null,
			        localShop: null,
			        stock: null,
			        goodsCode: null,
			        standard:0
		       	},
		       	rules: {
			        goodsName: [
			            { required: true, message: '请输入商品名称', trigger: 'blur' },
			            { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
			        ],
			        goodsImg: [
			            { required: true, message: '请选择商品图片', trigger: 'blur' }
			        ],
			        goodsDetail:[
			            { required: true, message: '请描述商品详情', trigger: 'blur' }
			        ],
			        market: [
			            { required: true, message: '请输入市场价', trigger: 'blur' },
			            { type: 'number', message: '价格只能是数字', trigger: 'blur' }
			        ],
			        localShop: [
			            { required: true, message: '请输入本店价', trigger: 'blur' },
			            { type: 'number', message: '价格只能是数字', trigger: 'blur' }
			        ],
			        stock: [
			            { required: true, message: '请输入库存', trigger: 'blur' },
			            { type: 'number', message: '库存只能是数字', trigger: 'blur' }
			        ],
			        goodsCode: [
			            { required: true, message: '请输入商品编码', trigger: 'blur' }
			        ]
		       	},
		       	upLoadData:{
		       		access_token:'',
		       		siteid:1,
		       		catid:null
		       	},
		       	options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }],
		        value: '',
		        spec:'',
		        testValue:{},
		        specValue:'',
		        styleList:[],
			}
		},
		created (){
			this.fetchData()
		},
		methods: {
			fetchData (){
				firstCategory ().then(response => {
			        this.lists=response.data.data ;
			        console.log(response) ;
		      	})
		   	},
		   	showSecond (catid,name,k){
		   		secondCategory (catid).then(response => {
			        this.slists=response.data.data ;
			        this.fname=name ;
			        //console.log(response) ;
		      	});
		      	this.fnum = k ;
		   	},
		   	showThird (catid,name,k){
		   		thirdCategory (catid).then(response => {
			        this.tlists=response.data.data ;
			        this.sname=name ;
		      	});
		      	this.snum = k ;
		   	},
		   	showTname (catid,name,k){
			    this.tname=name ;
			    this.ruleForm.catid = catid ;
			    this.upLoadData.catid = catid ;
			    this.upLoadData.access_token = getToken() ;
			    this.tnum = k ;
		   	},
		   	toBasic (){
		   		this.activeStep = 2 ;
		   	},
		   	toSub (){
		   		let goods = {
		   			'cat_id':this.ruleForm.catid,
		   			'goods_name':this.ruleForm.goodsName,
		   			'goods_sn':this.ruleForm.goodsCode,
		   			'goods_content':this.ruleForm.goodsDetail,
		   			'original_img':this.ruleForm.goodsImg,
		   			'market_price':this.ruleForm.market,
		   			'store_count':this.ruleForm.stock,
		   			'shop_price':this.ruleForm.localShop
		   		}
		   		createGoods (goods).then(res => {
		   			if ( res.data.code == 0 ){
						this.$message({
			            	type: 'success',
			            	message: '发布成功!'
			        	});
			        	this.$router.push('/goods');
					}else {
						this.$message({
			            	type: 'info',
			            	message: '发布失败!'
			      		});
			      		console.log(res);
			        	return ;
					}
		      	});

		   	},
		   	showUploadImg (){
		   		this.hideUploadImg = true ;
		   	},
		    handleExceed(files, fileList) {
		        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		    },
		    beforeRemove(file, fileList) {
		        return this.$confirm(`确定移除 ${ file.name }？`);
		    },
		    uploadSuccess (response, file, fileList) {
		    	this.ruleForm.goodsImg = response.data.filepath ;
		    },
		    querySearchAsync (queryS,cb){
		    	var list = [];
		    	getSpec().then(res => {
		    		//console.log(res) ;
		        	for(let i of res.data.data){
			            i.value = i.name;
			        }
		        	list = res.data.data;
        			cb(list);
				}).catch((error)=>{
			    	//console.log(error);
			    });
		    },
		    handleSelect (item){
		    	//console.log(item) ;
		    	this.testValue = item ;
		    },

		    //添加规格项目
		    addGroups (){
		    	var obj={
		    		value:'',
		    		specValueLists:[
			    		{
			    			sValue:''
			    		}
		    		]
		    	}
		    	console.log(this.groups) ;
		    	if ( this.groups.length >2 ){
		    		this.$confirm(`最多选择三种规格!`);
		    		return
		    	}
		    	this.groups.push(obj) ;

		    },

		    //删除规格项目
		    delGroups (k){
		    	this.groups.splice(k,1) ;
		    },

		    //添加规格属性
		    addSpecValue (k){
		    	let obj={
		    			sValue:''
		    	}
		    	this.groups[k].specValueLists.push(obj);

		    	/*let arr = this.addValues[k].trim().split(' ')
			    let newArr = this.groups[k].specValueLists.concat(arr)
			    newArr = Array.from(new Set(newArr))
			    this.$set(this.groups[k], 'specValueLists', newArr)*/
		    	//this.groups[k].specValueLists.push(this.asdd);
		    },

		    //删除规格属性
		    delSpecValue (i,k){
		    	this.groups[i].specValueLists.splice(k,1) ;
		    },

		    /*
		      计算属性的乘积
		      @params
		        specIndex 规格项目在 advancedSpecification 中的序号
		    */
		    countSum (specIndex) {
			    let num = 1
			    this.groups.forEach((item, index) => {
			        if (index >= specIndex && item.specValueLists.length) {
			          	num *= item.specValueLists.length
			        }
			    })
			    return num
		    },

		    // 根据传入的条件，来判断是否显示该td
		    showTd (specIndex, index) {
			      // 如果当前项目下没有属性，则不显示
			      if (!this.groups[specIndex]) {
			        return false
			      } else if (index % this.countSum(specIndex + 1) === 0) {
			        return true
			      } else {
			        return false
			      }
		    },

		    getSpecAttr (specIndex, index) {
		      // 获取当前规格项目下的属性值
		      const currentValues = this.groups[specIndex].specValueLists
		      let indexCopy

		      // 判断是否是最后一个规格项目
		      if (this.groups[specIndex + 1] && this.groups[specIndex + 1].specValueLists.length) {
		        indexCopy = index / this.countSum(specIndex + 1)
		      } else {
		        indexCopy = index
		      }

		      const i = indexCopy % currentValues.length
		      if (i.toString() !== 'NaN' && i % 1 === 0) {
		        return currentValues[i].sValue
		      } else {
		        return ''
		      }
		    }

		}
	}

</script>

<style lang="scss" scoped>

	.cate-list-li{
		box-sizing: border-box;
		width: 33.333333%;
		font-size: 14px;
		padding:0 5px;
		float: left;
		&:first-child {
			padding-left:0 ;
			padding-right: 10px;
		}
		&:last-child{
			padding-right: 0;
			padding-left: 10px;
		}
	}
	.cate-tree{
		height: 312px;
	    overflow-y: scroll;
	    border: 1px solid #eee;
	}
	.child{
		position: relative;
	    display: block;
	    padding: 3px 10px;
	    color: #333;
	    cursor: pointer;
	    line-height: 2.4;
	    margin-right: 5px;
	    background: #fff;
	    &:hover{
	    	color: #ff8000;
	    	background: #f0f2f5;
	    }
	    i{
	    	position: absolute;
	    	right: 10px;
	    	top: 50%;
			transform: translateY(-50%);
	    }
	}
	.cative{
		color: #ff8000;
	    background: #f0f2f5;
	}
	.cutChoose{
		margin: 15px;
	}
	.eidtorInfo{
		margin: 0 auto;
		background: #fff;
	}
	.tobasic{
		text-align: center;
	}
	.curChoose{
		color: #ff8000;
	}

	.thumbnail{
		overflow: auto;
    	margin-top: 10px;
    	margin-left: 80px;
    	.img-wrap{
    		float: left;
		    width: 80px;
		    height: 80px;
		    margin: 0 10px 10px 0;
		    border: 1px solid #ccc;
		    background-color: #fff;
		    position: relative;
		    img{
		    	max-width: 100%;
			    max-height: 100%;
			    margin: auto;
			    display: block;
			    position: absolute;
			    left: 0;
			    right: 0;
			    top: 0;
			    bottom: 0;
		    }
    	}
	}
	.create-main{
		margin-bottom: 10px;
		background: #F2F2F2;
		padding: 10px ;
	}
	.setSpec{
		border: 1px solid #e5e5e5;
		padding: 20px;
		.specGroups{
			margin-bottom: 20px;
			border-bottom: 1px solid #e5e5e5;
			position: relative;
			.delSpec{
				position: absolute;
				right: 10px;
				top: 5px;
				display: none;
				cursor: pointer;
				font-size: 20px;
			}
			&:hover{
				.delSpec{
					display: inline-block;
				}
			}
			.specValue{
				display: inline-block;
				position: relative;
				width: 150px;
				margin-right: 8px;
				.del-specValue{
					position: absolute;
					right: -5px;
					top: -5px;
					font-size: 20px;
					cursor: pointer;
					display: none;
				}
				&:hover{
					.del-specValue{
						display: inline-block;
					}
				}
			}
			.add-specValue{
				cursor: pointer;
				color: #409eff;
			}
		}
		.newSpec{
			padding: 10px;
			margin-bottom: 20px;
		}
		.specDetail-title{
			font-size: 14px;
			color: #606266;
		}
	}
	.specTable{
		text-align: center;
		font-size: 14px;
		border: 1px solid #e5e5e5;
		th{
			padding: 5px;
		}
		td{
			padding: 5px;
		}
	}

	/*自定义步骤条*/
	.xn-steps{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		line-height: 1.5;
		font-size: 0;
		overflow: hidden;
		margin-bottom: 20px;
	}
	.xn-steps-item{
		position: relative;
	    display: inline-block;
	    vertical-align: top;
	    overflow: visible;
	    flex: 1;
	}
	.goods-ct{
		padding-right: 8px;
		box-sizing: border-box;
	}
	.base-info{
		padding-left: 8px;
		flex: none;

	}
	.xn-steps-step{
		height: 44px;
	    line-height: 44px;
	    font-size: 14px;
	    background: #f8f8f8;
	    color: #666;
	    text-align: center;
	    padding: 0 10px;
	    position: relative;
	}
	.step1{
		&:after{
	    	content: " ";
		    display: block;
		    width: 0;
		    height: 0;
		    border-top: 22px solid transparent;
		    border-bottom: 22px solid transparent;
		    border-left: 12px solid #f8f8f8;
		    position: absolute;
		    top: 50%;
		    margin-top: -22px;
		    right: -12px;

	    }
	}
	.step2{
		&:before{
	    	content: " ";
		    display: block;
		    width: 0;
		    height: 0;
		    border-top: 22px solid #f8f8f8;
		    border-bottom: 22px solid #f8f8f8;
		    border-left: 12px solid transparent;
		    position: absolute;
		    top: 50%;
		    margin-top: -22px;
		    left: -12px;
	    }
	}
	.cate-active{
		background: #409eff;
    	color: #fff;
    	&:after{
    		border-left-color: #409eff;
    	}
	}
	.info-active{
		background: #409eff;
    	color: #fff;
    	&:before{
    		border-top: 22px solid #409eff;
		    border-bottom: 22px solid #409eff;
    	}
	}

</style>
