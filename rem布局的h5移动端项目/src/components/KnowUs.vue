<template>
<div class="container"> 
    <div class="headline">
        <h1 >高效、智能的餐饮管理</h1>
    </div>
    <div class="content">
        <h2>小牛</h2>
        <p class="p11">智能餐饮管理服务提供商</p>
        <h3>我们服务</h3>
        <p class="p12">我们除了提供标准化的服务<br />之外，还提供各式各样的定制化服务。<br />我们乐于聆听您的想法，<br />从点子到产品到运营，提供一站式的服务。 </p>
    </div>
    <div class="abstract">
        <span class="title">产品设计</span>
        <p>根据用户需求，设计产品，<br />输出详细的产品分析、 <br />设计文档，以及提供高保真的UI、UX效果图及动效。</p>
        <span class="title title2">应用开发</span>
        <p>各种类型的网站、Android、ios 原生 App、<br />微信小程序、公众号开发，<br />以及基于 cocos2dx、unity3d </p>
        <span class="title title2">产品设计</span>
        <p>产品上线后在初期推广运营<br />常常是面临的一大问题，<br />借助我们的多年运营的经验，运营推广将会变得很轻松</p>
    </div>
    <div class="detail">
        <h3>伟大来自尝试</h3>
        <p>未来五年，网智将坚持以用户体验为中心，<br />结合在互联网行业的经验，<br />将设计创意和互联网技术结合，<br />开发一些有利于社会发展和进步的优秀产品，<br />在幼教产业、企业管理SAAS平台、大数据应用、<br />智能机器人等领域开发系列产品及应用，<br />构建一个生态型的互联网平台。</p>
    </div>

</div>
</template>

<script type="text/javascript">
export default {
    name: 'aboutIndex',

}
</script>

<style scoped>
.header-index{
    display: flex;
    width: 100%;
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

.headline{
    height: 4.0rem;
    background: url(../assets/images/header03.png) no-repeat top center;
    background-size: 7.5rem 5.0rem;
}
.headline h1{
    padding-top: 1.6rem;
    font-size: 0.6rem;
    color: white;
    text-align: center;
}
.content{
    height: 6.3rem;
    border-bottom: 0.4rem solid #f9f9f9;
}
.content h2{
    font-size: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: black;
    text-align: center;
    margin-top: 0.6rem;
}
.content .p11{
    font-size: 0.48rem;
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    margin: 0.25rem 0 0.3rem;
}
.content h3{
    border-top: 2px solid #9d9d9d;
    width: 6.9rem;
    margin: 0 auto;
    font-size: 0.48rem;
    height: 0.48rem;
    line-height: 0.48rem;
    font-family: "微软雅黑";
    color: #000000;
    text-align: center;
    padding-top: 1.0rem;
}
.content .p12{
    font-family: "微软雅黑";    
    font-size: 0.26rem;
    height: 0.26rem;
    color: black;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.98rem;
}

.detail{
    height: 5.08rem;
    background: url(../assets/images/detail03.png) no-repeat;
    background-size: 7.5rem 5.08rem;
}
.detail h3{
    font-size: 0.48rem;
    font-family: "微软雅黑";
    color: white;
    text-align: center;
    padding: 0.5rem 0 0.35rem 0;
}
.detail p{
    font-family: "微软雅黑";
    font-size: 0.26rem;
    color: white;
    text-align: center;
    line-height: 0.4rem;
}

.abstract{
    width: 7.5rem;
    height: 9.26rem;
    margin: 0.5rem auto;
}
.abstract span {
    text-align: center;
    margin-top: 0.5rem;
    display: block;     /*设置为块级元素会独占一行形成上下居中的效果*/
    font-size: 0.42rem;
    color: #3c3c3c;
    position: relative;   /*定位横线（当横线的父元素）*/
}
.abstract span:before, .abstract span:after {
    content: '';                 /*CSS伪类用法*/
    position: absolute;         /*定位背景横线的位置*/
    top: 52%;
    background: #1e00ff;       /*宽和高做出来的背景横线*/
    width: 0.84rem;
    height: 0.06rem;
}
.abstract span:before{
    left: 1.75rem;        /*调整背景横线的左右距离*/
}
.abstract span:after {
    right: 1.75rem;   
}
.abstract p{
    font-size: 0.26rem;
    text-align: center;
    margin-top: 0.36rem;
    line-height: 0.4rem;
}
.abstract .title2{
    margin-top: 1.1rem;
}
</style>