<template>
	<div class="container">

		<el-alert
			v-if="expires"
			title="店铺试用已结束"
			type="error"
			:description="expires"
			show-icon>
		</el-alert>

		<div class="box">
			<el-row>
				<el-col :span="6">
					<p>今日交易额（元）</p>
					<p>0</p>
				</el-col>
				<el-col :span="6">
					<p>今日付款单数</p>
					<p>0</p>
				</el-col>
				<el-col :span="6">
					<p>今日浏览量</p>
					<p>0</p>
				</el-col>
				<el-col :span="6">
					<a>
						<p>可提现余额（元）</p>
						<p style="color: #409EFF;">0.00</p>
					</a>
				</el-col>
			</el-row>
		</div>
		
		<h4 style="margin-top: 30px;">待办事项</h4>
		<div class="box">
			<el-row style="padding: 20px;">
				<el-col :span="12">
					<div>
						<span v-if="takeOut">外卖（已开启）</span>
						<span v-else>外卖（已关闭）</span>
						<el-switch
							v-model="takeOut"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</div>
					<div>
						<a class="order">
							<span>外卖订单 - 待接单</span>
							<span>0 个订单</span>
						</a>
						<a class="order">
							<span>外卖订单 - 待发货</span>
							<span>0 个订单</span>
						</a>
					</div>
					
				</el-col>
				<el-col :span="12">
					<div>
						<span v-if="forHere">堂食点餐（已开启）</span>
						<span v-else>堂食点餐（已关闭）</span>
						<el-switch
							v-model="forHere"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</div>
					<div>
						<a class="order">
							<span>堂食订单 - 待付款</span>
							<span>0 个订单</span>
						</a>
					</div>
				</el-col>
			</el-row>
		</div>
		
		<h4 style="margin-top: 30px;">常用功能</h4>
		<div class="box">
			<el-row style="padding: 20px;">
				<el-col :span="6">
					<a class="function">
						<i>菜</i>
						<span>新建商品</span>
					</a>
				</el-col>
				<el-col :span="6">
					<a class="function">
						<i style="background-color: #FC0;">券</i>
						<span>新建优惠券</span>
					</a>
				</el-col>
				<el-col :span="6">
					<a class="function">
						<i style="background-color: #F44;">减</i>
						<span>设置满减</span>
					</a>
				</el-col>
				<el-col :span="6">
					<a class="function">
						<i style="background-color: #38F;">餐</i>
						<span>堂食点餐</span>
					</a>
				</el-col>
			</el-row>
		</div>

	</div>
</template>

<script>
	import { getExpires } from '@/utils/auth'
	import { toDate } from '@/utils/toDate'
	
	export default {
		name: 'worktable',
		created() {
			let expires = getExpires();
			if ( Number(expires) < Date.parse(new Date())/1000 ) {
				this.expires = "店铺免费试用于 " + toDate(expires) + " 结束，已打烊。如需恢复正常营业，请订购。";
			}
		},
		data() {
			return {
				expires: '',
				takeOut: false,
				forHere: false,
				
			}
		},
	}
</script>

<style scoped>
	.box {
		background-color: #F2F2F2;
		margin-top: 20px;
	}
	.box p {
		font-size: 12px;
		line-height: 60px;
		text-indent: 30px;
	}
	.box p:last-child {
		font-size: 24px;
		margin-top: -20px;
	}
	.box .order {
		display: block;
		width: 50%;
		height: 50px;
		margin-top: 10px;
		background-color: #FFF;
		border: 1px solid #CCC;
		border-left: 3px solid orangered;
		line-height: 50px;
		font-size: 14px;
	}
	.box .order span:first-child {
		margin-left: 10px;
	}
	.box .order span:last-child {
		float: right;
		margin-right: 10px;
		color: #409EFF;
	}
	.box .function {
		display: inline-block;
		margin-left: 20px;
	}
	.box .function i {
		font-style: normal;
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 5px;
		background-color: #0C9;
		font-size: 14px;
		font-weight: 700;
		line-height: 30px;
		text-align: center;
		color: #FFF;
		margin-right: 10px;
	}
</style>