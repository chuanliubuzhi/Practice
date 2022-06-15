import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, getSite, removeSite } from '@/utils/auth'

// 实例化 axios
const service = axios.create({
	baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {'content-type': 'application/json'}
})

// 请求拦截器
service.interceptors.request.use(config => {
  var xtoken = getToken();
  var siteID = getSite();
	if(config.method == 'post'){  
	    config.data = {  
	    	access_token: xtoken,
	    	site_id: siteID,
	      ...config.data
	    }  
	}else if(config.method == 'get'){  
	    config.params = { 
	    	access_token: xtoken,
	    	site_id: siteID,
	      ...config.params  
	    }  
	}
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
	if ( response.data.code == 2 ){
		removeToken();
		removeSite();
		this.$router.push('/login');
	}else {
		return response
	}
},error => {
    console.log('err' + error)
    Message({
      message: '网络连接失败',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
})

export default service