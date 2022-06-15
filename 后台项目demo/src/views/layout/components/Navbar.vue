<template>
	<div class="navbar clearfix">
		<div class="right-menu">
			<ul class="clearfix">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="el-icon-bell"></i>
					</a>
				</li>
				<li class="dropdown user user-menu">
					<a href="javascript:;">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">
								<img src="../../../assets/images/logo.png" class="user-image" alt="User Image">
	       						<i class="el-icon-arrow-down el-icon--right"></i>
	    					</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
								<el-dropdown-item command="logout">退出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { removeToken } from '@/utils/auth'

	export default {
		name: 'Navbar',
		methods: {
			logout() {
				removeToken();
				this.$router.push('/login/signin');
			},
			handleCommand(command) {
				this[command]();
			},
			resetPassword: function () {
				this.$router.push('/setting/reset');
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		position: fixed;
		right: 0;
		top: 0;
		left: 201px;
		height: 50px;
		border-bottom: solid 1px #e6e6e6;
		background: #fff;
		z-index: 1500;
		.breadcrumb-container {
			float: left;
			height: 100%;
			line-height: 50px;
			padding: 0 10px;
			.el-breadcrumb {
				display: inline-block;
				font-size: 16px;
			}
		}
		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;
			ul {
				li {
					float: left;
					margin: 0 20px;
					a {
						display: inline-block;
						font-size: 22px;
						
					}
					.user-image {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						vertical-align: middle
					}
				}
			}
		}
	}
</style>