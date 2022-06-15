import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/Goods.vue'
import ratings from '../components/ratings/Ratings.vue'
import seller from '../components/seller/Seller.vue'

Vue.use(VueRouter)

// const router = new VueRouter()

// export default router

export default new VueRouter({
  linkActiveClass:'active',
  routes:[
    {path:'/',redirect:'goods'},
    {path:'/goods',component:goods},
    {path:'/ratings',component:ratings},
    {path:'/seller',component:seller}
  ]
})
