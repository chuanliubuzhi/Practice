import request from '@/utils/request'

//登录
export function loginBy(data) {
  return request({
    url: '/cms/admin/loginbypassword',
    method: 'post',
    data
  })
}

//注册发送手机验证码
export function getCode(mobile) {
  return request({
    url: '/admin/admin/registerstep1',
    method: 'post',
    data: {
    	'mobile': mobile
    }
  })
}

//注册
export function signup(data) {
  return request({
    url: '/admin/admin/registerstep2',
    method: 'post',
    data
  })
}

//修改密码发送手机验证码
export function getCodeForPassword(mobile) {
  return request({
    url: '/admin/admin/findpassword1',
    method: 'post',
    data: {
    	'mobile': mobile
    }
  })
}

//修改密码
export function findPassword(data) {
  return request({
    url: '/admin/admin/findpassword2',
    method: 'post',
    data
  })
}

// cms修改密码
export function changePassword(data) {
    return request({
      url: '/cms/admin/password',
      method: 'post',
      data
    })
  }