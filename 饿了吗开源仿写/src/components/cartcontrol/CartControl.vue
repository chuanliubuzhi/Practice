<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count"
           @click.stop="updateFoodCount(food, false, $event)">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="updateFoodCount(food, true, $event)"></div>
  </div>
</template>
<script>
  export default {
    props: {
      food: Object,
      updateFoodCount: Function
    }
  }
</script>
<style lang="scss" scoped>
@charset "utf-8";
@import "../../common/scss/mixins.scss";
@import "../../lib/hotcss/src/px2rem.scss";

$designWidth: 750;
.cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: px2rem(12);
      line-height: px2rem(48);
      font-size: px2rem(48);
      color: rgb(0, 160, 220);
      &.move-enter-active, &.move-leave-active{
        transition: all .4s linear;
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0) rotate(180deg);
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: px2rem(24);
      padding-top: px2rem(12);
      line-height: px2rem(48);
      text-align: center;
      font-size: px2rem(20);
      color: rgb(147, 153, 159);
    }
    .cart-add{
      display: inline-block;
      padding: px2rem(12);
      line-height: px2rem(48);
      font-size: px2rem(48);
      color: rgb(0, 160, 220);
    }
}
</style>
