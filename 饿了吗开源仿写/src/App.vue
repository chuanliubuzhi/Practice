<template>
  <div>
    <AppHeader :seller="seller"></AppHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" class="tab-item-a">点菜</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="tab-item-a">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="tab-item-a">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/header/Header'
const OK = 0
export default {
  components: {
    AppHeader: Header,
  },
  data(){
    return {
      seller:{}
    }
  },
  created(){
        axios.get('/api2/seller')
            .then(response => {
            const result = response.data
            if (result.code===OK) {
            this.seller = result.data
            this.seller.score = 3.6
            console.log('axios3', this.seller)
          }
        })
  }
}


</script>
<style lang="scss">
  @charset "utf-8";
// 引入hotcss的px2rem的文件
@import "./lib/hotcss/src/px2rem.scss";
$designWidth: 750;
  .tab{
    display: flex;
    width: 100%;
    height: px2rem(80);
    line-height: px2rem(80);
    .tab-item{
      flex: 1;
      text-align: center;
      .tab-item-a{
        display: block;
        font-size: px2rem(28);
        color: rgb(77, 85, 93)
      }
      .active{
        color: rgb(240, 20, 20);
        border-bottom: 1px red solid;
      }

    }
  }
</style>
