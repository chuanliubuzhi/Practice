<template>
	
	<div class="signup-container">
		
		<div class="top-menu">
			<a class="" href="#">
				<img style="max-width: 100%;height: 45px;" src="../../assets/images/logo-name.png">
			</a>
			<div class="header">
				<span class="top-menu-title ng-binding">用户注册</span>
			</div>
		</div>
		
		<div class="wrapper">
			
			<div class="account-flex-container">
				<div class="account-container">
					
					<h2>用户注册</h2>
	
					<form class=" ng-valid " name="myform" onsubmit = "" method="post">
						
						<div class="account-input" >
							<input type="text" placeholder="手机号" name="SignupForm[mobile]" class="ng-pristine">
							<span class="ng-binding"></span>
						</div>
						
						<div class="account-input" >
							<input type="password"  placeholder="密码" name="SignupForm[password]" class="ng-pristine ng-untouched">
							<span class="error ng-binding"></span>
						</div>
						
						<div class="account-input phone-code">
							<input type="text" placeholder="手机验证码" name="SignupForm[code]" class="ng-pristine">
							<span class=""></span>
							<input type="button" class="sendMg" name="phone" value="发送验证码">
						</div>
						
						<button type="submit" name="login-button">注册</button>
						
						<div class="bottom-link">
							<a href="#">已有账户？马上登录</a>
						</div>
	
					</form>
	
				</div>
			</div>
			
			<div class="account-about">
				<span>Copyright&nbsp;&nbsp;@&nbsp;2016&nbsp;ixn100.com&nbsp;&nbsp;</span>
	    		<a href="http://www.ixn100.com">首页</a>
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
	
	export default {
		name:'signup'
	}
	
</script>

<style lang="scss">
	
	.top-menu{
	    position: fixed;
	    width: 100%;
	    height: 60px;
	    z-index: 1000;
	    left: 0;
	    right: 0;
	    top: 0;
	    background: #fff;
	    a{
	    	display: inline-block;
	    	
	    }
	    .header{
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
	.signup-container{
		
		.wrapper{
			margin-top: 60px;
			.account-flex-container{
				display: flex;
			    align-items: center;
			    position: absolute;
			    top: 0;
			    height: 100%;
			    width: 100%;
				background: #444444;
				.account-container{
					position: relative;
				    z-index: 1001;
				    width: 350px;
				    margin-left: auto;
				    margin-right: auto;
				    padding: 40px;
				    border-radius: 10px;
				    background-color: #fff;
				    h2{
				    	margin: 0 0 25px;
					    font-size: 25px;
					    font-weight: 400;
					    text-align: center;
					    color: #323a45;
				    }
				    .account-input{
				    	position: relative;
    					height: 68px;
    					width: 100%;
    					input{
    						height: 48px;
						    width: 100%;
						    margin-bottom: 15px;
						    font-size: 16px;
						    border: 1px solid rgba(50,58,69,.2);
						    border-radius: 5px;
    					}
				    }
				    .phone-code input:first-child{
				    	position: absolute;
					    width: 60%!important;
					    left: 0;
					    top: 0;
				    }
				    .phone-code input:last-child{
				    	position: absolute;
				    	text-align: center;
					    width: 30%;
					    right: 0;
					    top: 0;
				    }
				   	button{
				    	    width: 100%;
						    height: 48px;
						    border: none;
						    padding: 0 5px;
						    background-color: #323a45;
						    color: #fff;
						    font-size: 24px;
						    border-radius: 24px;
						    cursor: pointer;
						    transition: opacity .2s ease;
				    }
				    .bottom-link{
				    	text-align: right;
				    	margin: 20px 0;
				    }
				}
			}
		}
		.account-about{
			position: fixed;
			left: 30px;
			bottom: 25px;
		}
	}
	
</style>