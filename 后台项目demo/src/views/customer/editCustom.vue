<template>
	<div class="container" style="background: #fff;">
		
		<h3 v-if="this.form.id == ''">添加用户</h3>
		<h3 v-else>编辑用户信息</h3>
		
		<el-form ref="form" :model="form" :inline="true" :rules="rules" style="margin-top:20px;">
		  
			<el-form-item label="姓名：" style="margin-left:30px;" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			
			<el-form-item label="手机号：" prop="mobile">
				<el-input v-model="form.mobile"></el-input>
			</el-form-item>
		  
			<el-form-item label="密码" prop="password">
				<el-input v-model="form.password"></el-input>
			</el-form-item>

			<el-form-item style="margin-left:80px;">
				<el-button type="primary" @click="create('form')" v-if="this.form.id == ''">保 存</el-button>
				<el-button type="primary" @click="edit" v-else>修 改</el-button>
				<el-button @click="$router.push('/customer/customIndex')">取 消</el-button>
			</el-form-item>
		</el-form>
		
		
	</div>
</template>

<script>
	
	import { customView, customIndex, createCustom, editCustom }from '@/api/customer'
	
	export default {
		name:'editCustom',
		data (){
			return {
				form: {
					id:'',
					username:'',
					mobile:'',
					password:'',
				},
				rules: {
					username:[
						{ required: true, message: '请输入姓名', trigger: 'blur'},
						{ min: 2, max: 6, message: '长度在2到6个字符', trigger: 'blur'},
						{ pattern: /^[\u4e00-\u9fa5]+$/, message:'请填写正确的姓名', trigger: 'blur'}
					],
					mobile:[
						{ required: true, message: '请输入手机号码', trigger: 'blur'},
						{ pattern: /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/, message: '手机号格式错误', trigger: 'blur'}
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur'}
					],
				},
			}
		},
		created (){
			if ( this.$route.params.id !== undefined ) {
				this.form.id = this.$route.params.id;
				customView( this.$route.params.id ).then( res => {
					this.form.id = res.data.data.id;
					this.form.username = res.data.data.username;
					this.form.mobile = res.data.data.mobile;
					this.form.password = res.data.data.password_hash;
					console.log(this.form.id);
				})
			}
		},
		methods:{
			create (form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						// if (this.form.id == '') {
						// 	delete this.form.id;
						// }
						createCustom ( this.form ).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.message);
								this.$router.push('/customer/customIndex');
							} else {
								this.$message.error(res.data.message);
							}
						})						
					} else {
						return false;
					}
				});
			},
			edit () {
				console.log(this.form);
				editCustom (this.form).then(res => {
					if ( res.data.code == 0) {
						this.$router.push('/customer/customIndex');
						this.$message.success(res.data.message);
					} else {
						this.$message.error(res.data.message);
					}
				});
			},
			
			
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