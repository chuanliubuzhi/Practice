<template>
	<div class="container">
		<div class="reset-container">
			<h2>修改密码</h2>
			<el-form :model="form" :rules="rules" ref="form" status-icon>
				<el-form-item prop="password_old">
					<el-input type="password" v-model="form.password_old" placeholder="请输入原密码"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="form.password" placeholder="请输入新密码"></el-input>
				</el-form-item>
				
				<el-form-item prop="password_two">
					<el-input type="password" v-model="form.password_two" placeholder="请确认新密码"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="resetPassword" style="width: 100%;border-radius: 2em;" class="btn">修 改</el-button>
				</el-form-item>
				
			</el-form>
		</div>
	</div>
</template>

<script>
	import { getCodeForPassword, changePassword } from '@/api/login'
	import { removeToken } from '@/utils/auth'
	
	export default {
		name: 'reset',
		data() {
			var checkPassword = (rule, value, callback) => {
                console.log(value)
				if ( value === '' ) {
					callback(new Error('密码不能为空'));
				} else if ( value.length < 6 ) {
					// callback(new Error('密码不能少于 6 位'));
				} else {
					callback();
				}
			};
			var checkPassword2 = (rule, value, callback) => {
				if ( value === '' ) {
					callback(new Error('密码不能为空'));
				} else {
					callback();
				}
            };
            var checkPassword3 = (rule, value, callback) => {
				if ( value === '' ) {
					callback(new Error('密码不能为空'));
				} else if ( value !== this.form.password ) {
					callback(new Error('两次输入的新密码不一致'));
				} else {
					callback();
				}
			};
			return {
				form: {
                    password: '',
                    password_two: '',
                    password_old: '',
				},
				rules: {
					password_old: [
						{ validator: checkPassword, trigger: 'blur' }
					],
					password: [
						{ validator: checkPassword2, trigger: 'blur' }
                    ],
                    password_two: [
                        { validator: checkPassword3, trigger: 'blur' }
                    ]
				}
			}
		},
		methods: {
			//修改密码
			resetPassword: function () {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let data = {
							
							password_old: this.form.password_old,
							password: this.form.password,
						}
						changePassword(data).then(res => {
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
		margin: 0 auto;
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