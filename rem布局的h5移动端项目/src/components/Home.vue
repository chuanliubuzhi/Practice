<template>
  <div class="images">
    <div class="banner">
        <h1>智能餐饮管理解决方案</h1>
        <h4>软硬件一体，全面提升门店运营效率、降低成本、增加利润</h4>
        <a href="" class="register"> 立即注册</a>
    </div>
    <section class="artifact">
        <h1 class="sec_title">提高餐厅营收八大神器</h1>
        <h5>国内领先餐厅O2O解决方案</h5>
        <div>
            <a href="">
                <img src="../assets/images/line-up.png" alt="">
                <h6>微信预定排队</h6>
            </a>
            <a href="">
                <img src="../assets/images/wx-order.png" alt="">
                <h6>微信扫码点餐</h6>
            </a>
            <a href="">
                <img src="../assets/images/plug-in.png" alt="">
                <h6>营销插件</h6>
            </a>
        </div>
        <div>
            <a href="">
                <img src="../assets/images/membership.png" alt="">
                <h6>会员系统</h6>
            </a>
            <a href="">
                <img src="../assets/images/report.png" alt="">
                <h6>精细化报表</h6>
            </a>
            <a href="">
                <img src="../assets/images/cloud-print.png" alt="">
                <h6>厨房云打印</h6>
            </a>
        </div>
        <div>
            <a href="">
                <img src="../assets/images/hardware-butt.png" alt="">
                <h6>智能硬件对接</h6>
            </a>
            <a href="">
                <img src="../assets/images/platform-butt.png" alt="">
                <h6>平台对接</h6>
            </a>
        </div>
    </section>
    <section class="professional">
        <h1 class="sec_title">更专业的智能餐饮解决方案</h1>
        <div class="unity">
            <h2 class="son_tittle">打通外卖各个环节 实现外卖一体化</h2>
            <p>于商家的零佣金外卖系统。从点餐到配送，</p>
            <p>我们提供完整的解决方案、一体化的营销管理</p>
        </div>
        <div class="to-the-store">
            <h2 class="son_tittle">线上引流吸引新客到店</h2>
            <p>以社会关系为载体的营销手段</p>
            <p>有效地降低营销成本，通关社会关系传播裂变，</p>
            <p>提高营销转化率</p>
        </div>
        <div class="card">
            <h2 class="son_tittle">以会员卡优势积累客户</h2>
            <p>解决传统营销方式单一，难以沉淀粉丝，会员留存困难</p>
            <p>的问题</p>
        </div>
        <div class="report">
            <h2 class="son_tittle">精细报表助力店家边界管理</h2>
            <p>提供详细的报表全程助力店家的每一天管理，</p>
            <p>用最精确的数据为您的分析保驾护航</p>
        </div>
    </section>
    <section class="efficiency">
        <h1 class="sec_title">提高效率 掌控成本</h1>
        <!-- <div>
            <div class="first left">翻台速度</div>
            <div class="first-down right"></div>
        </div>
        <div>
            <div class="second left">人力成本</div>
            <div class="second-down right"></div>
        </div>
        <div>
            <div class=" third left">设备成本</div>
            <div class="third-down right"></div>
        </div>
        <div>
            <div class="fourth left">推广成本</div>
            <div class="fourth-down right"></div>
        </div> -->
    </section>
        <showfengqin></showfengqin>
  </div>

</template>

<script>
import showfengqin from "./showfengqin";
export default {
  name: "home",
  components: {
    showfengqin
  },
  data() {
    return {
      activeName: "",
      show1: true,
      show2: false,
      show3: true,
      show4: false,
      show5: true,
      show6: false,
      show7: true,
      show8: false,
      show: true
      //   value: -1
    };
  },
  methods: {
    shownum(value) {
      switch (value) {
        case "1":
          this.show1 = !this.show1;
          this.show2 = !this.show2;
          break;
        case "2":
          this.show3 = !this.show3;
          this.show4 = !this.show4;
          break;
        case "3":
          this.show5 = !this.show5;
          this.show6 = !this.show6;
          break;
        case "4":
          this.show7 = !this.show7;
          this.show8 = !this.show8;
          break;
        default:
          this.show1 = true;
          this.show2 = false;
          this.show3 = true;
          this.show4 = false;
          this.show5 = true;
          this.show6 = false;
          this.show7 = true;
          this.show8 = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
  float: left;
}
.right {
  float: right;
}
.header-index {
  display: flex;
  width: 100%;
  background: rgb(75, 125, 239);
  height: 1.2rem;
}
.header-index > a {
  margin-left: 4%;
  height: 100%;
  flex: 2;
}
.header-index a > img {
  width: 100%;
  position: relative;
  top: -0.15rem;
}
.nav {
  flex: 8;
  height: 100%;
}
.nav .likea {
  font-size: 0.3rem;
  color: #fff;
  position: relative;
  top: -0.3rem;
}

.nav > .default_class {
  margin-left: 0.5rem;
}
/* banner */
.banner {
  height: 4rem;
  background: url(../assets/images/banner.png);
  padding-top: 0.3rem;
  text-align: center;
}
.banner h1 {
  color: #fff;
  font-size: 0.6rem;
  height: 0.8rem;
  margin-top: 1.3rem;
}
.banner h4 {
  color: #eee;
  font-size: 0.24rem;
}
.register {
  display: block;
  font-size: 0.24rem;
  margin: 0.4rem auto;
  color: #fff;
}
.artifact {
  padding-top: 0.6rem;
  text-align: center;
  background: #fff;
}
.sec_title {
  font-size: 0.4rem;
}
.artifact h5 {
  font-size: 0.28rem;
  color: #666;
  margin-top: 0.25rem;
  text-align: center;
}
.artifact > div > a {
  display: inline-block;
  width: 1.8rem;
  height: 1.5rem;
  /* border: 1px solid green; */
  margin: 0.46rem 0.1rem;
}
.artifact > div > a > img {
  width: 1.08rem;
  height: 1.08rem;
}
.artifact > div > a > h6 {
  font-size: 0.2rem;
  line-height: 1px;
  color: #000;
}

.professional {
  /* height: 14.6rem; */
  background: rgba(230, 230, 230, 0.3);
  padding-top: 0.5rem;
  text-align: center;
}
.professional h1 {
  margin-bottom: 0.5rem;
}
.professional div {
  height: 3.5rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-bottom: 0.3rem;
  color: #fff;
  padding-top: 0.7rem;
}
.professional .unity {
  background-image: url(../assets/images/one.png);
}
.to-the-store {
  background-image: url(../assets/images/two.png);
}
.card {
  background-image: url(../assets/images/three.png);
}
.report {
  background-image: url(../assets/images/four.png);
}
.professional .son_tittle {
  font-size: 0.35rem;
  margin-bottom: 0.6rem;
}
.professional > div > p {
  font-size: 0.25rem;
}

.efficiency {
  /* height: 7.68rem; */
  padding: 0.3rem 0;
  text-align: center;
}
.efficiency h1 {
  margin-bottom: 0.45rem;
}
.efficiency > div {
  border: 0.01rem solid #d1d1d1;
  width: 5.5rem;
  height: 1rem;
  margin: 0 auto 0.2rem;
}
.efficiency .left {
  width: 2.2rem;
  height: 100%;
  font-size: 0.27rem;
  line-height: 1rem;
  text-align: right;
  background-repeat: no-repeat;
  background-position: 0.2rem center;
  background-size: 0.8rem;
}
.efficiency .first {
  background-image: url(../assets/images/1.png);
}
.efficiency .second {
  background-image: url(../assets/images/2.png);
}
.efficiency .third {
  background-image: url(../assets/images/3.png);
}
.efficiency .fourth {
  background-image: url(../assets/images/4.png);
}
.efficiency .right {
  width: 1.38rem;
  height: 100%;
  background: url(../assets/images/jt_down.png) no-repeat center center;
}
</style>
