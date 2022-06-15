<template>
    <div class="showfengqin">
        <ul>
            <!-- 循环数据在点击调用changeli方法时将当前索引和本条数据传进去,并使用当前数据show的bool值添加或移除样式 -->
            <li :class="[{active:item.show, noactive:!item.show}]" @click="changeli(index,item)" v-for="(item,index) in headerData" :key="index">
                <!-- 在这里打印出boll值方便查看 -->
                <img :src="item.src" alt="加载中..">
                <span>{{item.name}}</span>
                <!-- 判断当前这条数据的bool值如果是true就打开二级菜单,如果是false就关闭二级菜单 -->
                <div v-show="item.show" class="menu">
                    <!-- 循环二级菜单数据并使用.stop阻止冒泡 -->
                    <p v-on:click.stop="doThis(index)">{{item.list}}</p>
                </div>

            </li>
        </ul>
    </div>
</template>
<script>
import XXX from '../../static/img.json'
export default {
  name: "showfengqin",
  data() {
    return {
      headerData: [
        {
          name: "翻台速度",
          list:
            "微信推送营销，节省营销成本；微信群发消息，拒绝人工散发传单的低效、浪费甚至破坏环境",
          src: "111",
          show: false
        },
        {
          name: "人力成本",
          list:
            "微信推送营销，节省营销成本；微信群发消息，拒绝人工散发传单的低效、浪费甚至破坏环境",
          src: "",
          show: false
        },
        {
          name: "设备成本",
          list:
            "微信推送营销，节省营销成本；微信群发消息，拒绝人工散发传单的低效、浪费甚至破坏环境",
          src: "",
          show: false
        },
        {
          name: "推广成本",
          list:
            "微信推送营销，节省营销成本；微信群发消息，拒绝人工散发传单的低效、浪费甚至破坏环境",
          src: "",
          show: false
        }
      ]
    };
  },
  methods: {
    changeli: function(ind, item) {
      // 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
      this.headerData.forEach(i => {
        // 判断如果数据中的headerData[i]的show属性不等于当前数据的show属性那么headerData[i]等于false
        if (i.show !== this.headerData[ind].show) {
          i.show = false;
        }
      });
      // 取反(true或false)
      item.show = !item.show;
      //   console.log(item.name);
    },
    doThis: function(index) {
      //   alert(index);
    }

  },
  mounted: function() {
      var linkImg = XXX.linkImg
      var newHeaderData = new Array

      this.headerData.forEach(function(val , index){
        val.src = linkImg[index].src
      })
    }

};
</script>
<style>
.showfengqin {
  width: 5.5rem;
  color: #000000;
  margin: 0 auto 0.5rem ;
}
.showfengqin li {
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
  border: 1px solid #d1d1d1;
}
.showfengqin img {
  width: 0.8rem;
  height: 0.8rem;
  line-height: 1rem;
  position: relative;
  top: 0.04rem;
  left: -1.04rem;
}
.showfengqin span {
  float: left;
  text-align: center;
  position: relative;
  top: 0.26rem;
  left: 1rem;
}
.menu p {
  width: 5rem;
  margin: 0 auto;
  padding: 0.5rem 0.78rem 0.32rem;
  border-top: 1px solid #d1d1d1;
  color: #3c3c3c;
  font-size: 0.2rem;
}
.active {
  background-image: url(../assets/images/jt_up.png);
  background-repeat: no-repeat;
  background-position: 4.6rem 0.4rem;
  background-size: 0.21rem 0.13rem;
}
.noactive {
  background-image: url(../assets/images/jt_down.png);
  background-repeat: no-repeat;
  background-position: 4.6rem 0.4rem;
  background-size: 0.21rem 0.13rem;
}
</style>
