<template>
  <div class="header">
    <div class="content-warpper">
      <div class="avatar">
        <img :src="seller.avatar" class="avatar-img">
      </div>
      <div class="content">
        <div class="title">
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="supports_count" v-if="seller.supports" @click="showDetail(true)">
          <span class="count">{{seller.supports.length}}项优惠</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail(true)">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" class="background-img">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="name"><img :src="seller.avatar" class="name-img"></div>
            <div class="star-wrapper">

            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li class="support" v-for="support in seller.supports">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDetail(false)">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>
<script>
export default {
  props: ["seller"],

  data() {
    return {
      detailShow: false
    };
  },

  methods: {
    showDetail (isShow) {
      this.detailShow = isShow
    }
  },

  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  }
};
</script>
<style lang="scss" scoped>
@charset "utf-8";
// 引入hotcss的px2rem的文件
@import "../../lib/hotcss/src/px2rem.scss";
$designWidth: 750;
@import "../../common/scss/mixins.scss";

.header {
  position: relative;
  color: rgb(255, 255, 255);
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
  .content-warpper {
    position: relative;
    padding: px2rem(48) px2rem(24) px2rem(36) px2rem(48);
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      .avatar-img {
        width: px2rem(128);
        height: px2rem(128);
      }
    }
    .content {
      display: inline-block;
      margin-left: px2rem(36);
      .title {
        margin: px2rem(4) 0 px2rem(16) 0;
        .name {
          margin-left: px2rem(12);
            font-size :px2rem(36);
            line-height :px2rem(36);
            font-weight :bold;
        }
      }
      .description {
        margin-left: px2rem(12);
        font-size: px2rem(28);
        font-weight: 200;
        line-height: px2rem(28);
      }
      .support {
        margin: px2rem(20) 0 2px px2rem(12);;
        .icon {
          margin-right: 4px;
          vertical-align: top;
          display: inline-block;
          width: px2rem(28);
          height: px2rem(28);
          background-repeat: no-repeat;
        }
        .decrease {
          @include bg-image(decrease_1);
        }
        .discount {
          @include bg-image(decrease_1);
        }
        .guarantee {
          @include bg-image(decrease_1);
        }
        .invoice {
          @include bg-image(decrease_1);
        }
        .special {
          @include bg-image(decrease_1);
        }
        .text {
          vertical-align: top;
          font-size: px2rem(24);
          font-weight: 200;
          line-height: px2rem(24);
        }
      }
      .supports_count {
        position: absolute;
        right: px2rem(24);
        bottom: px2rem(30);
        height: px2rem(48);
        padding: px2rem(14) px2rem(16);
        border-radius: px2rem(16);
        background-color: rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        .count {
          vertical-align: top;
          font-size: px2rem(20);
          line-height: px2rem(24);
          font-weight: 200;
          margin-right: px2rem(4);
        }
        .icon-keyboard_arrow_right {
          vertical-align: top;
          font-size: px2rem(20);
          line-height: px2rem(24);
          font-weight: 200;
        }
      }
    }
  }
  .bulletin-wrapper {
    background-color: rgba(7, 17, 27, 0.2);
    position: relative;
    padding: 0 px2rem(40) 0 px2rem(24);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    .bulletin-title {
      vertical-align: middle;
      display: inline-block;
      width: px2rem(44);
      height: px2rem(24);
      @include bg-image(bulletin);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: middle;
      font-size: px2rem(20);
      line-height: px2rem(56);
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    img {

      width: 100%;
      height: 100%;
      background-size: 100% 100%;
    }
  }
  .detail{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background :rgba(42, 48, 53, 0.8);
    z-index: 100;
    transition: 0.5s;
    &.fade-transition{
      opacity:1
    }
    &.fade-enter,&.fade-leave-to{
      opacity:0
    }
    .detail-wrapper{
      min-height: 100%;
      padding: px2rem(128) 0 px2rem(64);
      .detail-main{
        font-size: px2rem(24);
        .name{
          text-align: center;
          font-size: px2rem(32);
          line-height: px2rem(32);
          font-weight: 700;
          margin-bottom:px2rem(32);
        }
        .star-wrapper{
          height: px2rem(48);
          text-align: center;
        }
        .title{
          display: flex;
          padding: px2rem(56) px2rem(72) px2rem(48);
          .line{
            position: relative;
            top: 8px;
            -ms-flex: 1;
            flex: 1;
            width: px2rem(214);
            height: 2px;
            background: rgba(255,255,255,0.2);
          }
          .text{
            margin: 0 px2rem(24)
          }
        }
        .supports{
          padding: 0 px2rem(96);
          .support{
            margin-bottom :px2rem(24);
            .decrease{
              @include bg-image(decrease_2)
            }
            .discount{
              @include bg-image(discount_2)
            }
            .guarantee{
              @include bg-image(guarantee_2)
            }
            .invoice{
              @include bg-image(invoice_2)
            }
            .special{
              @include bg-image(special_2)
            }
            .icon{
              display :inline-block;
              width :px2rem(32);
              height: px2rem(32);
              background-size: px2rem(32) px2rem(32);
              background-repeat :no-repeat;
              vertical-align :middle;

            }
            .text{
              margin-left: px2rem(12);
              font-size :px2rem(24);
              font-weight :200;
              line-height: px2rem(24);
            }
          }
        }
        .content{
          padding: 0 px2rem(96);
          font-size: px2rem(24);
          font-weight: 200;
          line-height: px2rem(48);
        }
      }
    }
    .detail-close{
      text-align: center;
      line-height: px2rem(64);
      font-size: px2rem(64);
      height: px2rem(64);
      margin-top: px2rem(-320);
      color: rgba(255,255,255,0.5);

    }

  }
}
</style>
