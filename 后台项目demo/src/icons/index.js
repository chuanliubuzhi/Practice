import Vue from 'vue'

//引入svg组件
import SvgIcon from '@/components/SvgIcon'

//全局注册
Vue.component('svg-icon', SvgIcon)

//通过正则匹配引入相应文件模块
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)