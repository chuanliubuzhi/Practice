<template>
  <div class="seller" ref="seller">
    <div class="seller-content">

      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.saleCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggle">
          <span class="icon-favorite" :class="{active: favorite}"></span>
          <span class="text">{{favorite ? '已收藏' : '收藏'}}</span>
        </div>
      </div>

      <split></split>

      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="support in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>

      <split></split>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>

      <split></split>

      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import split from '../split/Split'

  export default {
    props: ['seller'],
    data () {
      console.log(this.seller)
      return {
        favorite: localStorage.getItem('favorite')==='true'
      }
    },

    created () {
      console.log('seller created()')
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      if(this.seller.name) { // 从其它路由切换过来
        this._initScroll()
      }
    },

    updated () {//在当前路由刷新 seller变化了
      console.log('update()')
      this._initScroll()
    },


    methods: {
      toggle ($event) {
        if(!$event._constructed) {
          return
        }
        this.favorite = !this.favorite
        //保存
        localStorage.setItem('favorite', this.favorite)
      },

      _initScroll () {
        this.$nextTick(() => {
          new BScroll(this.$refs.seller, {
            click: true
          })

          const liWidth = 120
          const space = 6

          // 动态给ul指定宽度
          const ul = this.$refs.picWrapper.children[0]
          const liCount = ul.children.length
          ul.style.width = liCount * (liWidth + space) - space + 'px'

          new BScroll(this.$refs.picWrapper, {
            click: true,
            scrollX: true
          })
        })
      }
    },

    components: {

      split
    }
  }
</script>

<style lang="scss">
@charset "utf-8";
@import "../../common/scss/mixins.scss";
@import "../../lib/hotcss/src/px2rem.scss";

$designWidth: 750;

  .seller{
    position: absolute;
    top: px2rem(348);
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding: px2rem(36);
      .title{
        margin-bottom: px2rem(16);
        line-height: px2rem(28);
        color: rgb(7, 17, 27);
        font-size: px2rem(28);
      }
      .desc{
        padding-bottom: px2rem(36);
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .text{
          display: inline-block;
          margin-right: px2rem(24);
          line-height: px2rem(36);
          vertical-align: top;
          font-size: px2rem(20);
          color: rgb(77, 85, 93);
        }
      }
      .remark{
        display: flex;
        padding-top: px2rem(36);
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child{
            border: none
          }
          h2{
            margin-bottom: px2rem(8);
            line-height: px2rem(20);
            font-size: px2rem(20);
            color: rgb(147, 153, 159);
          }
          .content{
            line-height: px2rem(48);
            font-size: px2rem(20);
            color: rgb(7, 17, 27);
            .stress{
              font-size: px2rem(48)
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width: px2rem(100);
        right: px2rem(22);
        top: px2rem(36);
        text-align: center;
        .icon-favorite{
          display: block;
          margin-bottom: px2rem(8);
          line-height: px2rem(48);
          font-size: px2rem(48);
          color: #d4d6d9;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
        .text{
          line-height: px2rem(20);
          font-size: px2rem(20);
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin{
      padding: px2rem(36) px2rem(36) 0 px2rem(36);
      .title{
        margin-bottom: px2rem(16);
        line-height: px2rem(28);
        color: rgb(7, 17, 27);
        font-size: px2rem(28);
      }
      .content-wrapper{
        padding: 0 px2rem(24) px2rem(32) px2rem(24);
        @include border-1px(rgba(7, 17, 27, 0.1));
        .content{
          line-height: px2rem(48);
          font-size: px2rem(24);
          color: rgb(240, 20, 20);
        }
      }
      .supports{
        .support-item{
          padding: px2rem(32) px2rem(24);
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          &:last-child{
            border: none;
          }
        }
        .icon{
          display: inline-block;
          width: px2rem(32);
          height: px2rem(32);
          vertical-align: top;
          margin-right: px2rem(12);
          background-size: px2rem(32) px2rem(32);
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image('decrease_4')
          }
          &.discount{
            @include bg-image('discount_4')
          }
          &.guarantee{
            @include bg-image('guarantee_4')
          }
          &.invoice{
            @include bg-image('invoice_4')
          }
          &.special{
            @include bg-image('special_4')
          }
        }
        .text{
          line-height: px2rem(32);
          font-size: px2rem(24);
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics{
      padding: px2rem(36);
      .title{
        margin-bottom: px2rem(24);
        line-height: px2rem(28);
        color: rgb(7, 17, 27);
        font-size: px2rem(28)
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right: px2rem(12);
            width: px2rem(240);
            height: px2rem(180);
            &:last-child{
              margin: 0
            }
            img{
              width: px2rem(240);
              height:px2rem(180) ;
            }
          }
        }
      }
    }
    .info{
      padding: px2rem(36) px2rem(36) 0 px2rem(36);
      color: rgb(7, 17, 27);
      .title{
        padding-bottom: px2rem(24);
        line-height: px2rem(28);
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: px2rem(28);
      }
      .info-item{
        padding: px2rem(32) px2rem(24);
        line-height: px2rem(32);
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: px2rem(24);
        &:last-child{
          border:none;
        }
      }
    }
  }
</style>
