<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">

      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <split></split>

      <ratingselect :desc="desc"
                    :only-content="onlyContent"
                    :ratings="ratings"
                    :select-type="selectType"
                    @switchonlycontent="switchOnlyContent"
                    @setselecttype="setSelectType"></ratingselect>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating)">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | dateString}}
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  import BScroll from 'better-scroll'
  import split from '../split/Split'
  import ratingselect from '../ratingselect/RatingSelect.vue'

  const ALL = 2

  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        ratings: [],
        onlyContent: true,
        selectType: ALL
      }
    },

    created () {
      this.desc = {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }

      // ajax获取ratings数据
      axios.get('/api2/ratings')
        .then(response => {
          const result = response.data
          if(result.code===0) {
            this.ratings = result.data
            // 创建Scroll对象
            this.$nextTick(() => {
              console.log('xxxx', this.$refs.ratings)
              if(this.$refs.ratings) {
                this.scroll = new BScroll(this.$refs.ratings, {
                  click: true
                })
              }

            })
          }
        })
    },

    methods: {
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
      },

      needShow (rating) {
        console.log('needShow()')
        const {rateType, text} = rating
        const selectType = this.selectType
        const onlyContent = this.onlyContent
        if(selectType===2) {
          return !onlyContent || text.length>0
        } else {
          return selectType===rateType && (!onlyContent || text.length>0)
        }
      }
    },
    filters: {
      dateString (value) { // 1999-08-08 09:09:08
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },

    components: {
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
.ratings{
    position: absolute;
    top: px2rem(348);
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      display: flex;
      padding: px2rem(36) 0;
      .overview-left{
        flex: 0 0 px2rem(274);
        padding: px2rem(12) 0;
        width: px2rem(274);
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score{
          margin-bottom: px2rem(12);
          line-height: px2rem(56);
          font-size: px2rem(48);
          color: rgb(255, 153, 0);
        }
        .title{
          margin-bottom: px2rem(16);
          line-height: px2rem(24);
          font-size: px2rem(24);
          color: rgb(7, 17, 27);
        }
        .rank{
          line-height: px2rem(20);
          font-size: px2rem(20);
          color: rgb(147, 153, 159);
        }
      }
      .overview-right{
        flex: 1;
        padding: px2rem(12) 0 px2rem(12) px2rem(48);
        .score-wrapper{
          margin-bottom: px2rem(16);
          font-size: 0;
          .title{
            display: inline-block;
            line-height: px2rem(36);
            vertical-align: top;
            font-size: px2rem(24);
            color: rgb(7, 17, 27);
          }
          .star{
            display: inline-block;
            margin: 0 px2rem(24);
            vertical-align: top;
          }
          .score{
            margin-left:  px2rem(36);
            display: inline-block;
            line-height: px2rem(36);
            vertical-align: top;
            font-size: px2rem(24);
            color: rgb(255, 153, 0)
          }
        }
        .delivery-wrapper{
          font-size: 0;
          .title{
            line-height: px2rem(36);
            font-size: px2rem(24);
            color: rgb(7, 17, 27);
          }
          .delivery{
            margin-left: px2rem(24);
            font-size: px2rem(24);
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper{
      padding: 0 px2rem(36);
      .rating-item{
        font-size: px2rem(24);
        display: flex;
        padding: px2rem(36) 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .avatar{
          flex: 0 0 px2rem(56);
          width: px2rem(56);
          margin-right: px2rem(24);
          img{
            width: px2rem(56);
            height: px2rem(56);
            border-radius: 50%;
          }
        }
        .content{
          position: relative;
          flex: 1;
          .name{
            margin-bottom: px2rem(8);
            line-height: px2rem(24);
            font-size: px2rem(20);
            color: rgb(7, 17, 27);
          }
          .star-wrapper{
            margin-bottom: px2rem(12);
            font-size: 0;
            .star{
              display: inline-block;
              margin-right: px2rem(12);
              vertical-align: top;
            }
            .delivery{
              display: inline-block;
              vertical-align: top;
              line-height: px2rem(24);
              font-size: px2rem(24);
              color: rgb(147, 153, 159);
            }
          }
          .text{
            margin-bottom: px2rem(16);
            line-height: px2rem(36);
            color: rgb(7, 17, 27);
            font-size: px2rem(24);
          }
          .recommend{
            line-height: px2rem(32);
            font-size: 0;
            .icon-thumb_up,.icon-thumb_down, .item{
              display: inline-block;
              margin: 0 px2rem(16) px2rem(8) 0;
              font-size: px2rem(18);
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220)
            }
            .icon-thumb_down{
              color: rgb(147, 153, 159)
            }
            .item{
              padding: 0 px2rem(12);
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time{
            position: absolute;
            top: 0;
            right: 0;
            line-height: px2rem(24);
            font-size: px2rem(20);
            color: rgb(147, 153, 159)
          }
        }
      }
    }
}
</style>
