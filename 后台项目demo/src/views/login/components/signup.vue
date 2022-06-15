<template>
	<div class="signup-container">
		<h2>用户注册</h2>
		<el-form :model="form" :rules="rules" ref="form" status-icon>

			<el-form-item prop="mobile">
				<el-input v-model.number.trim="form.mobile" placeholder="请输入手机号">
					<template slot="prepend">+86</template>
				</el-input>
			</el-form-item>

			<el-form-item prop="code">
				<el-input v-model="form.code" placeholder="请输入验证码">
					<el-button slot="append" style="color: #409EFF;" @click="sendMessage" :disabled="disabled" ref="diji">{{ text }}</el-button>
				</el-input>
			</el-form-item>

			<el-form-item prop="password">
				<el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
			</el-form-item>

			<el-form-item class="agreement" prop="agreement">
				<el-checkbox v-model="form.agreement">我已阅读并同意</el-checkbox>
				<a>《用户协议》</a>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="register" style="width: 100%;border-radius: 2em;" :disabled="!form.agreement" class="btn">注 册</el-button>
			</el-form-item>
		</el-form>

		<div class="footer">
			<a @click="toSignin">点击登录</a>
			<span>已有账号？</span>
		</div>
	</div>
</template>

<script>
	import { getCode, signup } from '@/api/login'
	import { setToken, setSite } from '@/utils/auth'

	export default {
		name: 'signup',
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
			return {
				form: {
					mobile: '',
					password: '',
					code: '',
					agreement: true
				},
				time: '',
				timer:null,
				disabled:false,
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
				}
			}
		},
		methods: {
	 	 run: function(){
			let me = this;
			me.time = 60;
			let timer = setInterval(function(){
				me.disabled = true;
				if(me.time-- == 0){
				clearInterval(timer);
				me.time = 60;
				me.disabled = false;
				return me.time;
				}
			},1000)

        },
			//发送短信验证码
			sendMessage: function () {
				if ( !/^1[0-9]{10}$/.test(this.form.mobile) ) {
					this.$message.error('手机号格式不正确');
					return;
				}
				this.run();
				getCode(this.form.mobile).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
					}else {
						this.$message.error(res.data.message);
					}
				})
			},
			//提交注册
			register: function () {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let data = {
							'mobile': this.form.mobile.toString(),
							'password': this.form.password,
							'code': this.form.code
						}
						signup(data).then(res => {
							if(res.data.code == 0) {
								setToken(res.data.data.access_token);
								setSite(res.data.data.site[0].site_id);
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
			//切换状态
			toSignin: function () {
				this.$router.push('/login/signin');
			}
		},
		computed: {
        text: function () {
			if(this.time==60){
				return '获取验证码';
			}
			return this.time > 0 ? this.time+'s后重新获取':'获取验证码';
        }
    }
	}
</script>

<style lang="scss">
	.signup-container {
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
		.agreement {
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
		.btn span {
			font-size: 20px;
		}
	}
</style>
