<template>
  <transition name="move">
    <div class="food" v-show="isShow" ref="food">
      <div class="food-content">

        <div class="image-header">
          <img :src="food.icon">
          <div class="back" @click="showOrHide(false)">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>

        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" :update-food-count="updateFoodCount"></cartcontrol>
          </div>
          <div class="buy" v-if="!food.count" @click="updateFoodCount(food, true, $event)">加入购物车</div>
        </div>

        <split></split>

        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>

        <split></split>

        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :desc="desc" :only-content="onlyContent" :ratings="food.ratings" :select-type="selectType" @switchonlycontent="switchOnlyContent" @setselecttype="setSelectType" v-if="food.ratings"></ratingselect>

          <div class="rating-wrapper">
            <ul>
              <li class="rating-item border-1px" v-for="rating in filterRatings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType==0, 'icon-thumb_down': rating.rateType==1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length===0">暂无评价</div>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/CartControl.vue'
  import split from '../split/Split.vue'
  import ratingselect from '../ratingselect/RatingSelect.vue'

  const ALL = 2 // 全部

  export default {
    props: {
      food: Object,
      updateFoodCount: Function
    },

    data () {
      return {
        isShow: false,
        onlyContent: false,
        selectType: ALL
      }
    },

    created () {
      this.desc = {
        all: '全部',
        positive: '推荐',
        negative: '吐糟'
      }
    },

    methods: {
      showOrHide(isShow) { // 显示/隐藏当前food
        this.isShow = isShow

        if(this.isShow) { // 只有显示时才需要做
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {
                click:true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      },

      // 切换onlyContent
      switchOnlyContent () {
        this.onlyContent = !this.onlyContent
        // 刷新列表
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      // 更新selectType
      setSelectType (selectType) {
        this.selectType = selectType
        // 刷新列表
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },

    computed: {
      filterRatings () {
        // 如果还没有数据, 结束
        if(!this.food.ratings) {
          return []
        }

        const ratings = this.food.ratings
        const selectType = this.selectType
        const onlyContent = this.onlyContent
        return ratings.filter(rating => {
          var {rateType, text} = rating // 解构赋值
          if(selectType===2) {
            /*if(!onlyContent) {
              return true
            } else {
              return text.length>0
            }*/
            return !onlyContent || text.length>0
          } else {
            return selectType===rateType && (!onlyContent || text.length>0)
          }
        })
      }
    },

    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>
<style lang="scss" scoped>
@charset "utf-8";
@import "../../common/scss/mixins.scss";
@import "../../lib/hotcss/src/px2rem.scss";

$designWidth: 750;

.food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: px2rem(96);
    z-index: 30;
    width: 100%;
    background: #fff;
    &.move-enter-active, &.move-leave-active{
      transition: transform .2s linear
    }
    &.move-enter, &.move-leave-active{
      transform: translate3d(100%, 0, 0)
    }

    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back{
        position: absolute;
        top: px2rem(20);
        left: 0;
        .icon-arrow_lift{
          display: block;
          padding: px2rem(20);
          font-size: px2rem(40);
          color: #fff;
        }
      }
    }

    .content{
      position: relative;
      padding: px2rem(36);
      .title{
        line-height: px2rem(28);
        margin-bottom:px2rem(16);
        font-size: px2rem(28);
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail{
        margin-bottom: px2rem(36);
        line-height: px2rem(20);
        height: px2rem(20);
        font-size: 0;
        .sell-count, .rating{
          font-size: px2rem(20);
          color: rgb(147, 153, 159);
        }
        .sell-count{
          margin-right: px2rem(24)
        }
      }
      .price{
        font-weight: 700;
        line-height: px2rem(48);
        .now{
          margin-right: px2rem(16);
          font-size: px2rem(28);
          color: rgb(240, 20, 20);
        }
        .old{
          text-decoration: line-through;
          font-size: px2rem(20);
          color: rgb(147, 153, 159);
        }
      }
      .cartcontrol-wrapper{
        position: absolute;
        right: px2rem(24);
        bottom: px2rem(24);
      }
      .buy{
        position: absolute;
        right: px2rem(36);
        bottom: px2rem(36);
        z-index: 10;
        height: px2rem(48);
        line-height: px2rem(48);
        padding: 0 px2rem(24);
        box-sizing: border-box;
        border-radius: px2rem(24);
        font-size: px2rem(20);
        color: #fff;
        background: rgb(0, 160, 220);
        &.fade-transition{
          transition: all 0.2s;
          opacity: 1;
        }
        &.fade-enter, &.fade-leave{
          opacity: 0
        }
      }
    }
    .info{
      padding: px2rem(36);
      .title{
        line-height: px2rem(28);
        margin-bottom:px2rem(12);
        font-size: px2rem(28);
        color: rgb(7, 17, 27)
      }
      .text{
        line-height: px2rem(48);
        padding: 0 px2rem(16);
        font-size: px2rem(24);
        color: rgb(77, 85, 93)
      }
    }
    .rating{
      padding-top: px2rem(36);
      .title{
        line-height: px2rem(28);
        margin-left: px2rem(36);
        font-size: px2rem(28);
        color: rgb(7, 17, 27);
      }
      .rating-wrapper{
        padding: 0 px2rem(36);
        .rating-item{
          position: relative;
          padding: px2rem(32) 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .user{
            position: absolute;
            right: 0;
            top: px2rem(32);
            line-height: px2rem(24);
            font-size: 0;
            .name{
              display: inline-block;
              margin-right: px2rem(12);
              vertical-align: top;
              font-size: px2rem(20);
              color: rgb(147, 153, 159);
            }
            .avatar{
              border-radius: 50%
            }
          }
          .time{
            margin-bottom: px2rem(12);
            line-height:px2rem(24);
            font-size: px2rem(20);
            color: rgb(147, 153, 159);
          }
          .text{
            line-height: px2rem(32);
            font-size: px2rem(24);
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down{
              margin-right: 4px;
              line-height: px2rem(32);
              font-size: px2rem(24);
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down{
              color: rgb(147, 153, 159)
            }
          }
        }

        .no-rating{
          padding: px2rem(32) 0;
          font-size: px2rem(24);
          color: rgb(147, 153, 159);
        }
      }
    }
}
</style>
