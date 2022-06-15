import { loginBy } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  	state: {
	    token: getToken()
  	},
  
	mutations: {
	    SET_CODE: (state, code) => {
	      state.code = code
	    },
	    SET_TOKEN: (state, token) => {
	      state.token = token
	    }
	},
	
	actions: {
		
		// 用户名登录
	    /*LoginByUsername({ commit }, userInfo) {
		    const username = userInfo.username.trim()
		    return new Promise((resolve, reject) => {
		        loginBy(username, userInfo.password).then(response => {
		          	const data = response.data
		          	commit('SET_TOKEN', data.token)
		          	setToken(response.data.token)
		          	resolve()
		        }).catch(error => {
		          	reject(error)
		        })
		    })
	    }*/
	         
	}

}

export default user