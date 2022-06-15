<template>
	<div class="container app-inner">

		<div class="ui-box trade-dashboard-page__overview">
			<div class="zent-row">
				<div class="trade-dashboard-page__num-data-style zent-col zent-col-5">
					<p class="item-desc">7天下单笔数</p>
					<p class="item-num">
						<a href="#">0</a>
					</p>
				</div>
				<div class="trade-dashboard-page__num-data-style zent-col zent-col-5">
					<p class="item-desc">待付款</p>
					<p class="item-num">
						<a href="#">0</a>
					</p>
				</div>
				<div class="trade-dashboard-page__num-data-style zent-col zent-col-5">
					<p class="item-desc">待发货</p>
					<p class="item-num">
						<a href="#">0</a>
					</p>
				</div>
				<div class="trade-dashboard-page__num-data-style zent-col zent-col-5">
					<p class="item-desc">积压维权</p>
					<p class="item-num">
						<a href="#">0</a>
					</p>
				</div>
				<div class="trade-dashboard-page__num-data-style zent-col zent-col-5">
					<p class="item-desc">7天收入 |
						<a href="">提现</a>
					</p>
					<p class="item-num">
						<a href="#">￥0.00</a>
					</p>
				</div>
				<div class="clear"></div>
			</div>
		</div>

		<div class="ui-box order-dashboard-block-header">
			<div class="zent-block-header__left">
				<h3>7天订单趋势</h3></div>
			<!--<div></div>-->
			<div class="zent-block-header__content">
				<div>
					<a href="">详情</a>
					<a href="">学习如何提高销量</a>
				</div>
			</div>
		</div>

		<div class="ui-box">
			<div class="zent-row">
				<div class="trade-dashboard-page__num-data-style zent-col-6">
					<p class="item-desc">昨日下单笔数</p>
					<p class="item-num">
						<a href="">0</a>
					</p>
				</div>
				<div class="trade-dashboard-page__num-data-style zent-col-6">
					<p class="item-desc">昨日付款订单</p>
					<p class="item-num">
						<a href="">0</a>
					</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'tradeIndex'
	}
</script>

<style type="scss">
	
	.trade-dashboard-page__overview {
		background-color: #f8f8f8;
	}
	
	.zent-row {
		zoom: 1;
		font: inherit;
		font-size: 100%;
		vertical-align: baseline;
	}
	
	.trade-dashboard-page__num-data-style {
		text-align: center;
		height: 100px;
		box-sizing: border-box;
		padding-top: 26px;
		background-color: #f8f8f8;
	}
	
	.zent-col-5 {
		width: 20%;
	}
	
	.zent-col-6 {
		width: 25%;
	}
	
	.zent-col-18 {
		width: 75%;
	}
	
	.zent-col {
		float: left;
	}
	
	.trade-dashboard-page__num-data-style .item-desc {
		font-size: 12px;
	}
	
	.trade-dashboard-page__num-data-style .item-num {
		font-size: 26px;
		margin-top: 10px;
	}
	
	.trade-dashboard-page__num-data-style .item-num a {
		color: #38f;
	}
	
	.order-dashboard-block-header {
		margin-top: 30px;
		padding: 15px;
		position: relative;
		margin-bottom: 20px;
		background-color: #f8f8f8;
		height: 50px;
		box-sizing: border-box;
	}
	
	.zent-block-header__left {
		display: inline-block;
	}
	
	.zent-block-header__left h3 {
		margin: 0;
		padding-left: 5px;
		border-left: 4px solid #f60;
		font-weight: 400;
		font-size: 14px;
	}
	
	.zent-block-header__content {
		display: inline-block;
		margin-left: 10px;
	}
	
	.position-right {
		position: absolute;
		top: 15px;
	}
</style>