<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: foodList.length}">
              <i class="icon-shopping_cart highlight"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>

        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition name="drop" v-for="(ball, index) in balls" :key="index" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop" v-bind:css="false">
          <div class="ball" v-show="ball.isShow">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in foodList">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :update-food-count="updateFoodCount"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import vue from "vue";
import cartcontrol from "../cartcontrol/CartControl.vue";

export default {
  props: {
    foodList: Array,
    minPrice: Number,
    clearCart: Function,
    deliveryPrice: Number,
    updateFoodCount: Function
  },

  data() {
    return {
      isShow: false,
      balls: [
        { isShow: false },
        { isShow: false },
        { isShow: false },
        { isShow: false },
        { isShow: false }
      ],
      droppingBalls: [] // 保存多个执行动画的ball
    };
  },

  computed: {
    totalCount() {
      var count = 0;
      this.foodList.forEach(food => {
        count += food.count;
      });
      return count;
    },
    totalPrice() {
      var price = 0;
      this.foodList.forEach(food => {
        price += food.count * food.price;
      });
      return price;
    },
    payText() {
      if (this.totalCount === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      return this.totalPrice < this.minPrice ? "not-enough" : "enough";
    },

    listShow() {
      if (this.foodList.length === 0) {
        this.isShow = false;
        return false;
      }

      if (this.isShow) {
        this.$nextTick(() => {
          // 延迟到界面更新完成后调用
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh(); //刷新形成滚动
          }
        });
      }

      return this.isShow;
    }
  },

  methods: {
    toggleList () {
        this.isShow = !this.isShow
      },

      /*
      让一个隐藏的小球启动一个显示的动画
       */
      drop (startEl) {
        // 找到隐藏的小球
        const ball = this.balls.find(ball => !ball.isShow)
        // 显示它
        if(ball) {
          ball.isShow = true
          ball.startEl = startEl
          this.droppingBalls.push(ball)
        }
      },

      /*
      指定el的起始位置
       */
      beforeDrop (el) {
        console.log('before()', Date.now())
        // 找到对应的ball
        const ball = this.droppingBalls.shift() // 移除第一个

        var offsetY = 0
        var offsetX = 0
        // 计算
        const {left, top} = ball.startEl.getBoundingClientRect()
        const elLeft = 32
        const elBottom = 22
        offsetX = left - elLeft
        offsetY = -(window.innerHeight - top - elBottom)

        // 指定transform样式
        el.style.transform = `translate3d(0, ${offsetY}px, 0)`
        el.children[0].style.transform = `translate3d(${offsetX}px, 0, 0)`

        // 保存ball
        el.ball = ball
      },

      /*
      指定el的结束位置
       */
      dropping (el) {
        // 强制重排重绘
        var temp = el.clientHeight
        console.log('dropping()', Date.now())
        // 异步指定
        this.$nextTick(() => {
          // 指定transform样式
          el.style.transform = 'translate3d(0, 0, 0)'
          el.children[0].style.transform = 'translate3d(0, 0, 0)'
        })
      },
      /*
      隐藏el
       */
      afterDrop (el) {
        console.log('afterDrop()', Date.now())
        // 必须延迟更新状态
        setTimeout(() => {
          el.ball.isShow = false
        }, 400)
      },

      pay() {
        if(this.totalPrice>=this.minPrice) {
          alert(`支付${this.totalPrice+this.deliveryPrice}`)
        }
      }
    },

  components: {
    cartcontrol
  }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
@import "../../common/scss/mixins.scss";
@import "../../lib/hotcss/src/px2rem.scss";

$designWidth: 750;

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: px2rem(96);
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: px2rem(-20);
        margin: 0 px2rem(24);
        padding: px2rem(12);
        width: px2rem(102);
        height: px2rem(102);
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          .icon-shopping_cart {
            line-height: px2rem(88);
            font-size: px2rem(48);
            color: #80858a;

          }
          .highlight {
              color: #fff;
            }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: px2rem(48);
          height: px2rem(32);
          line-height: px2rem(32);
          text-align: center;
          border-radius: px2rem(32);
          font-size: px2rem(18);
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
          display: inline-block;
          vertical-align: top;
          margin-top: px2rem(24);
          line-height: px2rem(48);
          padding-right: px2rem(24);
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: px2rem(32);
          font-weight: 700;
          .highlight {
            color: #fff;
          }
        }

        .desc {
          display: inline-block;
          vertical-align: top;
          margin: px2rem(24) 0 0 px2rem(24);
          line-height: px2rem(48);
          font-size: px2rem(20);
        }

    }
    .content-right {
      flex: 0 0 px2rem(210);
      width: px2rem(210);
      .pay {
        height: px2rem(96);
        line-height: px2rem(96);
        text-align: center;
        font-size: px2rem(24);
        font-weight: 700;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }

    }
    .ball-container {
      .ball {
        position: fixed;
        left: px2rem(64);
        bottom: px2rem(44);
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: px2rem(32);
          height: px2rem(32);
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active,
      &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-enter,
      &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: px2rem(80);
        line-height: px2rem(80);
        padding: 0 px2rem(36);
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: px2rem(28);
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: px2rem(24);
          color: rgb(0, 160, 220);
        }
      }

      .list-content {
        padding: 0 px2rem(36);
        max-height: px2rem(434);
        overflow: hidden;
        background: #fff;
        .food {
          position: relative;
          padding: px2rem(24) 0;
          box-sizing: border-box;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: px2rem(48);
            font-size: px2rem(28);
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: px2rem(180);
            bottom: px2rem(24);
            line-height: px2rem(48);
            font-size: px2rem(28);
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: px2rem(12);
          }
        }
      }

      .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        opacity: 1;
        background: rgba(7, 17, 27, 0.6);
        &.fade-enter-active,
        &.fade-leave-active {
          transition: all 0.5s;
        }
        &.fade-enter,
        &.fade-leave-active {
          opacity: 0;
          background: rgba(7, 17, 27, 0);
        }
      }
    }
  }
}
</style>
