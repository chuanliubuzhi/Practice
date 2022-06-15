<template>
  <div id="app">
    <div class="header clearfix">
      <a href="###" class="logo" alt="logo"></a>
      <ul>
        <li v-for="(menu, index) in menus" :key="index" >
          <router-link :to="menu.path">
            {{menu.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <footbar></footbar>
    <!-- <div class="gotop"></div> -->
  </div>
</template>

<script>
import Footbar from './components/Footbar'
export default {
  name: 'App',
  components: {
    Footbar
  },
  data () {
    return {
      menus: [
        {
          title: '首页',
          path: '/home'
        },
        {
          title: '产品',
          path: '/product'
        },
        {
          title: '了解小牛',
          path: '/knowus'
        },
        {
          title: '加入我们',
          path: '/joinus'
        }
      ]
    }
  },
  }
</script>

<style>
/* .clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  zoom : 1;
} */
.router-link-active{
  color: #b3c7ff;
}
</style>
