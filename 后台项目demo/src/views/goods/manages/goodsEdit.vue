<template>

	<div class="container newcon">

		<div class="ui-box">
			<el-steps :active="activeStep" simple>
			  <el-step title="选择商品种类" icon="el-icon-edit"></el-step>
			  <el-step title="编辑商品信息" icon="el-icon-upload"></el-step>
			</el-steps>
		</div>

		<div class="ui-box" v-if="0 == activeStep">
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
				<li class="cate-list-li">
					<ul class="cate-tree calSor">
						<li v-for="(list,index) in slists" @click="showThird(list.catid,list.mobile_name,index)" :key="index">
							<a class="child" :class="{cative:index == snum}">{{list.mobile_name}}<i class="el-icon-arrow-right"></i></a>
						</li>
					</ul>
				</li>

				<!--三级分类-->
				<li class="cate-list-li">
					<ul class="cate-tree calSor">
						<li v-for="(list,index) in tlists" @click="showTname(list.catid,list.mobile_name,index)" :key="index">
							<a class="child" :class="{cative:index == tnum}">{{list.mobile_name}}</a>
						</li>
					</ul>
				</li>

			</ul>

			<div class="ui-box">
				<span>您当前选择的是：</span>
				<span class="curChoose" v-if=" fname !=='' ">{{fname}}<i class="el-icon-arrow-right"></i></span>
				<span class="curChoose" v-if=" sname !=='' ">{{sname}}<i class="el-icon-arrow-right"></i></span>
				<span class="curChoose" v-if=" tname !=='' ">{{tname}}</span>
			</div>

			<div class="ui-box tobasic">
				<el-button type="primary" @click="">下一步</el-button>
			</div>

		</div>

		<div class="eidtorInfo" v-if="1 == activeStep">
			<el-form :model="ruleForm" :rules="rules" label-width="80px" label-position="left">

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

			</el-form>

			<div class="ui-box tobasic">
				<el-button type="primary" @click="Edit()">保存修改</el-button>
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

	import { editGoods } from '@/api/goods'
	import { getToken } from '@/utils/auth'

	export default {
		name:'goodsEdit',
		data (){
			return {
				hideUploadImg:false,
				radio: '1',
				radio1: '1',
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
			        goodsId:null
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
		       		catid:null
		       	},
		       	options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }],
		        value: ''
			}
		},
		created (){
			this.fetchData() ;
			this.getParams () ;
		},
		methods: {
			fetchData (){
				/*firstCategory ().then(response => {
			        this.lists=response.data.data ;
		      	})*/
		   	},
		   	/*showSecond (catid,name,k){
		   		secondCategory (catid).then(response => {
			        this.slists=response.data.data ;
			        this.fname=name ;
			        console.log(response) ;
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
		   	},*/
		   	Edit (){
		   		let goods = {
		   			'cat_id':this.ruleForm.catid,
		   			'goods_name':this.ruleForm.goodsName,
		   			'goods_sn':this.ruleForm.goodsCode,
		   			'goods_content':this.ruleForm.goodsDetail,
		   			'original_img':this.ruleForm.goodsImg,
		   			'market_price':this.ruleForm.market,
		   			'shop_price':this.ruleForm.localShop,
		   			'store_count':this.ruleForm.stock,
		   			'goods_id':this.ruleForm.goodsId
		   		}
		   		editGoods (goods).then(res => {
		   			if ( res.data.code == 0 ){
						this.$message({
			            	type: 'success',
			            	message: '编辑成功!'
			        	});
			        	this.$router.push('/goods');
					}else {
						this.$message({
			            	type: 'info',
			            	message: '编辑失败!'
			      		});
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
		    getParams (){
		    	this.ruleForm.catid = this.$route.params.catid ;
		    	this.ruleForm.goodsName = this.$route.params.goodsName ;
		    	this.ruleForm.goodsCode = this.$route.params.goodsSn ;
		    	this.ruleForm.goodsDetail = this.$route.params.goodsContent ;
		    	this.ruleForm.goodsImg = this.$route.params.originalImg ;
		    	this.ruleForm.market = this.$route.params.marketPrice ;
		    	this.ruleForm.localShop = this.$route.params.shopPrice ;
		    	this.ruleForm.goodsId = this.$route.params.goodsId ;
		    	this.ruleForm.stock = this.$route.params.storeCount ;

		    	this.upLoadData.catid = this.$route.params.catid ;
		    	this.upLoadData.access_token = getToken() ;
		    }
		}
	}

</script>

<style lang="scss" scoped>

	.cate-list-li{
		width: 30%;
		font-size: 14px;
		float: left;
	}
	.cate-tree{
		height: 306px;
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
	    border-bottom:1px solid #f0f2f5 ;
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
	.eidtorInfo{
		margin: 0 auto;
		background: #fff;
	}
	.tobasic{
		text-align: center;
	}
	.curChoose{
		color: #67C23A;
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

</style>
