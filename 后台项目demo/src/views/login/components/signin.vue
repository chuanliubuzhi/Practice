<template>
	<div class="signin-container">
		
		<h2>用户登录</h2>
		
		<el-form :model="form" :rules="rules" ref="form" status-icon>
			
			<el-form-item prop="mobile">
				<el-input v-model.number.trim="form.mobile" placeholder="请输入手机号"></el-input>
			</el-form-item>
			
			<el-form-item prop="password">
				<el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
			</el-form-item>
			
			<el-form-item class="remember" prop="remember">
				<el-checkbox>记住我</el-checkbox>
				<a @click="toReset" style="float: right;">找回密码</a>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="login" style="width: 100%;border-radius: 2em;margin-top: 10px;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
			</el-form-item>
			
		</el-form>
		
		<div class="footer">
			<a @click="toRegister" style="float: right;">点击注册</a>
			<span>没有账号？</span>
		</div>
		
	</div>
</template>

<script>
	import { loginBy } from '@/api/login'
	import { setToken, setSite, setExpires } from '@/utils/auth'

	export default {
		name: 'signin',
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
				} else if ( value.length < 3 ) {
					callback(new Error('密码不能少于 6 位'));
				} else {
					callback();
				}
			};
			return {
				form: {
					mobile: '',
					password: ''
				},
				rules: {
					mobile: [
						{ validator: checkMobile, trigger: 'blur' }
					],
					password: [
						{ validator: checkPassword, trigger: 'blur' }
					],
				},
			}
		},
		methods: {
			login: function () {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let data = {
							'mobile': this.form.mobile.toString(),
							'password': this.form.password
						}
						loginBy(data).then(res => {
							if(res.data.code == 0) {
								setToken(res.data.data.access_token);
								// setSite(res.data.data.site[0].site_id);
								// setExpires(res.data.data.site[0].expires);
								this.$router.push('/');
							} else {
								this.$message.error(res.data.message);
							}
						})
					} else {
						return false;
					}
				});
			},
			toReset: function() {
				this.$router.push('/login/reset');
			},
			toRegister: function() {
				this.$router.push('/login/signup');
			}
		}
	}
</script>

<style lang="scss">
	.signin-container {
		position: absolute;
		left: calc(50% - 215px);
		top: calc(50% - 215px);
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
		.remember {
			font-size: 14px;
			a {
				margin-left: 5px;
				color: #409EFF;
			}
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
		.el-button--medium span {
			font-size: 20px;
		}
	}
</style>