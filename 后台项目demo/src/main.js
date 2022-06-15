import Vue from 'vue'
import App from './App'
import router from './router'
//import store from './store'

//全局样式
import '@/styles/index.scss'
import '@/assets/fonts/iconfont.css'

//引入ElemenUI并设置组件默认尺寸
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


//使用vue-quill-editor  4/10 ---------------------------------------------jx
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具

Vue.use(vueQuillEditor)

// --------------------------------------------------------------------------//

Vue.use(ElementUI,{
	size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}
)
