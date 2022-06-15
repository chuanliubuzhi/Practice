<template>

	<div class="login-container">

		<div class="top-menu">
			<a class="logo" href="javascript:;">
				<img src="../../assets/images/logo-name.png"/>
			</a>
		</div>

		<div class="wrapper">

			<div class="account-flex-container">

				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>

			</div>

			<div class="account-about">
				<span>Copyright&nbsp;&nbsp;@&nbsp;2018&nbsp;ixn100.com&nbsp;&nbsp;</span>
				<a href="http://www.ixn123.com">首页</a>
			</div>

		</div>

	</div>

</template>

<script>
	export default {
		name: 'login',
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.top-menu {
		position: fixed;
		width: 100%;
		height: 60px;
		line-height: 60px;
		z-index: 1000;
		left: 0;
		right: 0;
		top: 0;
		background: rgba(255, 255, 255, .7);
		.logo {
			display: inline-block;
			img {
				margin-top: 7.5px;
				max-width: 100%;
				height: 45px;
			}
		}
		.header {
			font-size: 20px;
			line-height: 40px;
			text-align: center;
			height: 40px;
			margin: auto;
			padding: 10px 0;
			position: relative;
			display: inline-block;
		}
	}

	.wrapper {
		margin-top: 60px;
		.account-flex-container {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			height: 100%;
			width: 100%;
			background: url(../../assets/images/login.jpg);
			background-size: cover;
		}
	}

	.account-about {
		position: fixed;
		left: 30px;
		bottom: 25px;
		color: #ccc;
	}
</style>