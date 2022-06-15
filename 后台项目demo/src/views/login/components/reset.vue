<template>
	<div class="reset-container">
		<h2>修改密码</h2>
		<el-form :model="form" :rules="rules" ref="form" status-icon>
			
			<el-form-item prop="mobile">
				<el-input v-model.number.trim="form.mobile" placeholder="请输入手机号">
					<template slot="prepend">+86</template>
				</el-input>
			</el-form-item>
			
			<el-form-item prop="code">
				<el-input v-model="form.code" placeholder="请输入验证码">
					<el-button slot="append" style="color: #409EFF;" @click="sendMessage">获取验证码</el-button>
				</el-input>
			</el-form-item>
			
			<el-form-item prop="password">
				<el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
			</el-form-item>
			
			<el-form-item prop="password2">
				<el-input type="password" v-model="form.password2" placeholder="请确认密码"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="resetPassword" style="width: 100%;border-radius: 2em;" class="btn">修 改</el-button>
			</el-form-item>
			
		</el-form>
		
		<div class="footer">
			<a @click="back">返回登录</a>
		</div>
	</div>
</template>

<script>
	import { getCodeForPassword, findPassword } from '@/api/login'
	import { removeToken } from '@/utils/auth'
	
	export default {
		name: 'reset',
		data() {
			var checkMobile = (rule, value, callback) => {
				if ( value === '' ) {
					callback(new Error('手机号不能为空'));
				} else if ( !/^1[0-9]{10}$/.test(this.form.mobile) ) {
					callback(new Error('手机号格式不正确'));
				} else {
					callback();
				}
			};
			var checkPassword = (rule, value, callback) => {
				if ( value === '' ) {
					callback(new Error('密码不能为空'));
				} else if ( value.length < 6 ) {
					callback(new Error('密码不能少于 6 位'));
				} else {
					callback();
				}
			};
			var checkPassword2 = (rule, value, callback) => {
				if ( value === '' ) {
					callback(new Error('密码不能为空'));
				} else if ( value.length < 6 ) {
					callback(new Error('密码不能少于 6 位'));
				} else if ( value !== this.form.password ) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};
			return {
				form: {
					mobile: '',
					password: '',
					password2: '',
					code: '',
				},
				rules: {
					mobile: [
						{ validator: checkMobile, trigger: 'blur' }
					],
					code: [
						{ required: true, message: '验证码不能为空', trigger: 'blur' }
					],
					password: [
						{ validator: checkPassword, trigger: 'blur' }
					],
					password2: [
						{ validator: checkPassword2, trigger: 'blur' }
					],
				}
			}
		},
		methods: {
			//发送短信验证码
			sendMessage: function () {
				if ( !/^1[0-9]{10}$/.test(this.form.mobile) ) {
					this.$message.error('手机号格式不正确');
					return;
				}
				getCodeForPassword(this.form.mobile).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
					}else {
						this.$message.error(res.data.message);
					}
				})
			},
			//修改密码
			resetPassword: function () {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let data = {
							mobile: this.form.mobile.toString(),
							password: this.form.password,
							code: this.form.code,
						}
						findPassword(data).then(res => {
							if ( res.data.code == 0 ) {
								this.$message.success(res.data.message);
								removeToken();
								this.back();
							}else {
								this.$message.error(res.data.message);
							}
						})
					} else {
						return false;
					}
				});
				
			},
			//返回登录
			back: function () {
				this.$router.push('/login/signin');
			}
		}
	}
</script>

<style lang="scss">
	.reset-container {
		position: absolute;
		left: calc(50% - 215px);
		top: calc(50% - 275px);
		z-index: 1001;
		width: 350px;
		padding: 40px;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, .7);
		h2 {
			margin: 0 0 25px;
			font-size: 25px;
			font-weight: 400;
			text-align: center;
			color: #323a45;
		}
		.footer {
			border-top: 1px solid #999;
			padding-top: 10px;
			font-size: 14px;
			span {
				float: right;
				display: inline-block;
				vertical-align: middle;
				padding: 5px 10px;
			}
			a {
				display: inline-block;
				float: right;
				padding: 5px 10px;
				vertical-align: middle;
				color: #409EFF;
			}
		}
		.el-input--medium .el-input__inner {
			height: 40px;
		}
		.btn span {
			font-size: 20px;
		}
	}
</style>