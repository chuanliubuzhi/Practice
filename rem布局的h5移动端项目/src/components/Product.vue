<template>
	<div class="container">
	    <div class="head">
			<h1>智能餐饮</h1>
			<p>智能餐饮 管理软硬件一体解决方案<br />营销+会员+点餐+支付+外卖等应用打造餐饮一体化服务</p>
			<a href="###" class="header-footer">立即加入</a>
		</div>
		<div class="p-content">
			<h2>微信扫码点餐，提高翻台率</h2>
			<p class="p-content-sub">速度快、节约服务人员、提高收益</p>
			<p class="p-content-detail">无需服务员，顾客自助扫桌台码下单<br />率先行业支持快餐模式和中餐模式两种扫码点餐模式<br />付款可同时支持预付款和后付款<br />认证服务号可支</p>
		</div>
		<div class="p-detail">
			<h2>打通小程序和公众号双渠道业务</h2>
			<p class="p-content-sub">打通会员服务数据</p>
			<ul>
				<li class="minipro">
					<span class="sp1">买单</span>
					<span class="sp2">外卖</span>
					<span class="sp3">预定</span>
					<span class="sp4">点餐</span>
				</li>
				<li class="boult">
					<span class="right"></span>
					<span class="left"></span>
				</li>
				
				<li class="wechat">
					<span class="sp1">云端信息推送</span>
					<span class="sp2">报表查询</span>
					<span class="sp3">会员系统</span>
					<span class="sp4">营销插件</span>
				</li>
			</ul>
		</div>
		<div class="p-feature">
			<h2>智能硬件化繁为简</h2>
			<p class="p-content-sub">打印机、扫码枪、扬声器、读卡器集成一体</p>
			<ul>
				<li class="printer"><a href=""><span>打印机</span></a></li>
				<li class="code_scanner"><a href=""><span>扫码机</span></a></li>
				<li class="pos"><a href=""><span>刷卡机</span></a></li>
			</ul>
		</div>
		<div class="p-business">
			<h2>多样化服务确保原料精准对接</h2>
			<ul>
				<li class="icon-01"><a href="" class=""><span class="pb-title">源头直采</span><span class="pb-con">坚守源头 严格优选</span></a></li>
				<li class="icon-02"><a href="" class=""><span class="pb-title">品类丰富</span><span class="pb-con">万种商品 一站购买</span></a></li>
				<li class="icon-03"><a href="" class=""><span class="pb-title">源头直采</span><span class="pb-con">新鲜品质 每天节省</span></a></li>
				<li class="icon-04"><a href="" class=""><span class="pb-title">闪电下单</span><span class="pb-con">常用清单 快速购买</span></a></li>
				<li class="icon-05"><a href="" class=""><span class="pb-title">送货上门</span><span class="pb-con">专职配送 准时送达</span></a></li>
				<li class="icon-06"><a href="" class=""><span class="pb-title">每日咨询</span><span class="pb-con">餐饮生意 开店赚钱</span></a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default {
		name:'product',
		
	}
	
</script>

<style scoped>
ol,ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
a{
  text-decoration: none;
}
.header-index{
  display: flex;
    width: 100%;
    background: rgb(75, 125, 239);
    height: 1.2rem;
}
.header-index>a{
    margin-left: 4%;
    height: 100%;
    flex: 2;
}
.header-index a>img{
    width: 100%;
    position: relative;
    top: -0.15rem;
}
.nav{
    flex: 8;
    height: 100%;
}
.nav .likea{
    font-size: 0.3rem;
    color: #fff;
    position: relative;
    top: -0.3rem;
}
.nav>.default_class{
    margin-left: 0.5rem;
}
.head{
	margin-top: -0.5rem;
	height: 4.0rem;
	background: url(../assets/images/ban_canting.png) no-repeat;
	background-size: 2.6rem 1.63rem;
	background-position: 4.36rem 0.94rem;
	background-color: #4981ff;
	padding-bottom: 0.2rem;
}
.head h1{
	padding: 1rem 0 0 0.8rem;
	font-size: 0.35rem;
	color: white;
	margin-top: 0.5rem;
}
.head p{
	padding: 0.26rem 0 0 0.8rem;
	font-size: 0.15rem;
	line-height: 0.48rem;
	color: white;
}
.header-footer {
	display: block;
	margin-top: 0.3rem;
	text-align: center;
	font-size: .24rem;
	color: #ffffff;
}
.p-content{
	height: 4.0rem;
	background: url(../assets/images/section.png) no-repeat top center;
	background-size: 7.5rem 4.0rem;
}
h2{
	text-align: center;
	padding-top: 0.3rem;
	font-size: 0.4rem;
	color: #3c3c3c;
}
.p-content-sub{
	margin-top: 0.3rem;
	text-align: center;
	font-size: 0.2rem;
	color: #3c3c3c;
}
.p-content-detail{
	padding: 0.25rem 0 0 0.4rem;
	font-size: 0.18rem;
	line-height: 0.36rem;
	color: #3c3c3c;
}
/* p-detail */
.p-detail{
	height: 5.0rem;
	background-color: #f6f6f6;
}
.p-detail ul{
	width: 5.96rem;
	/* height: 3.3rem; */
	margin: 0.3rem auto;	
	display: flex;
	justify-content: space-around;
}
.p-detail span{
	font-size: 0.18rem;
}
/* minipro*/ 
.minipro{
	height: 2.3rem;
	width: 2.12rem;
	background: url(../assets/images/minipro.png) right center no-repeat;
	background-size: 1.36rem 1.36rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
}
.minipro span{
	color: #b26bf4;
	width: 0.9rem;
}
.minipro .sp1,.minipro .sp4{
	align-self: flex-end;
}
/* boult */
.boult{
	width: 1.42rem;
	height: 2.3rem;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}
.right{
	height: 0.5rem;
	width: 0.52rem;
	background: url(../assets/images/right.png)  no-repeat center center;
	background-size: 0.52rem 0.37rem;
}
.left{
	height: 0.5rem;
	width: 0.52rem;
	background: url(../assets/images/left.png)  no-repeat center center;
	background-size: 0.52rem 0.37rem;
}
/* wechat */
.wechat{
	height: 2.3rem;
	width: 2.42rem;
	background: url(../assets/images/wechat.png) left center no-repeat;
	background-size: 1.36rem 1.36rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	/* align-items: flex-end; */
}
.wechat span{
	color: #60c035;
}
.wechat .sp2,.wechat .sp3{
	text-align: right;
	align-self: flex-end;
}
.wechat .sp1{
	align-self: center;
}
.wechat .sp4 {
	align-self: flex-end;
	width: 1.8rem;
}
/* p-feature */
.p-feature{
	height: 5.0rem;
	border-bottom: 0.5rem solid #f6f6f6;
}

.p-feature ul{
	padding: 0.6rem 0 0 0.2rem;
	display: flex;
	justify-content: space-around;
}
.p-feature ul span {
	display: block;
	width: 1.13rem;
	text-align: center;
	padding-top: 1.3rem;
	font-size: 0.15rem;
	color: #3c3c3c;
}
.p-feature li{
	background-size: 1.13rem 1.13rem;
}
.printer{
	background: url(../assets/images/printer.png) no-repeat;
}
.code_scanner{
	background: url(../assets/images/code_scanner.png) no-repeat;
}
.pos{
	background: url(../assets/images/pos.png) no-repeat;
}
/* p-business */
.p-business{
	height: 7.5rem;
}
.p-business ul{
	width: 6.7rem;
	margin: 0 auto;
	padding-top: 0.75rem;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
}
.p-business li{
	float: left;
	width: 33%;
	background-size: 1.1rem 1.1rem;
}

.icon-04,.icon-05,.icon-06{
	margin-top: 0.65rem;
}
.p-business span{
	display: block;
	text-align: center;
}
.pb-title{
	color: #3c3c3c;
	padding-top: 1.2rem;
	font-size: 0.35rem;
	font-weight: 900;
}
.pb-con{
	padding-top: 0.2rem;
	font-size: 0.15rem;
	color: #999;
	}
.icon-01{
	background: url(../assets/images/icon_01.png) no-repeat top center;
	}
.icon-02{
	background: url(../assets/images/icon_02.png) no-repeat top center;
}
.icon-03{
	background: url(../assets/images/icon_03.png) no-repeat top center;
}
.icon-04{
	background: url(../assets/images/icon_04.png) no-repeat top center;
	}
.icon-05{
		background: url(../assets/images/icon_05.png) no-repeat top center;
}
.icon-06{
	background: url(../assets/images/icon_06.png) no-repeat top center;
}
</style>