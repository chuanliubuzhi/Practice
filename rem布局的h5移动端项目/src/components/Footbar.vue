<template>
      <div class="footbar">
        <!-- <div class="register-now">
            <h1 class="fo_title">立即注册即可体验最火热的小程序</h1>
            <h1 class="fo_title"><a href="" class="reg-button">立即注册</a></h1>
        </div> -->
        <div class="copyright">
            <div class="search-box">立即咨询:025-66046489转00</div>
            <!-- <div class="offcial-website">公司官网:<a href="http://www.ixn123.com">www.ixn123.com</a></div> -->
            <div class="copy-right"><a href="http://www.miitbeian.gov.cn">&copy;2012-2018 ixn123.com苏ICP备17057568号-1</a></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Footbar',
}
</script>
<style>
/* footer */
.footbar{
    display: flex;
    flex-direction:column;
    /* height: 5.7rem; */
    text-align: center;
    width: 7.5rem;
  }
.register-now{
    flex: 1;
    padding: 0.2rem 0;
    background: rgb(240, 240, 240);
    color: rgb(47,135,255);
  }
.fo_title{
    font-size: 0.4rem;
}
.reg-button{
  color: #fff;
  font-size: 0.15rem;
  display: inline-block;
  width: 1.5rem;
  /* height: 0.4rem; */
  line-height: 0.4rem;
  border: 1px solid transparent;
  background: rgb(47,135,255);
  border-radius: 15px;
}
.copyright{
  flex: 0 0 auto;
  /* height: 3rem; */
  background: rgb(60,60,60);
}
.search-box{
  text-align: left;
  width: 5rem;
  height: 0.7rem;
  border: 1px solid #fff;
  margin: 0.5rem auto 0.5rem auto;
  font-size: 0.3rem;
  color: #fff;
  padding: 0.1rem 0.3rem;
}
.offcial-website{
  font-size: 0.15rem;
  color: #ddd;
}
.copy-right{
  font-size: 0.2rem;
  color: #ddd;
  margin-bottom: 0.2rem;
}
</style>
