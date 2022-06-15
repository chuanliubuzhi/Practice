import request from '@/utils/request'

//出售中
export function goodsIndex(data) {
  return request({
    url: '/mall/goods/index',
    method: 'get',
    params:data
  })
}

//获取商品分类
export function firstCategory() {
  return request({
    url: '/mall/category/getindexbypid',
    method: 'get'
  })
}

export function secondCategory(pid) {
  return request({
    url: '/mall/category/getindexbypid',
    method: 'get',
    params: {pid}
  })
}

export function thirdCategory(pid) {
  return request({
    url: '/mall/category/getindexbypid',
    method: 'get',
    params: {pid}
  })
}

//发布商品
export function createGoods(data) {
  return request({
    url: '/mall/goods/create',
    method: 'post',
    data
  })
}

//删除商品
export function deleteGoods(data) {
  return request({
    url: '/mall/goods/delete',
    method: 'post',
    data
  })
}

//修改商品
export function editGoods(data) {
  return request({
    url: '/mall/goods/update',
    method: 'post',
    data
  })
}

//查询spec
export function getSpec() {
  return request({
    url: '/mall/spec/index',
    method: 'get'
  })
}

//上传图片
export function uploadimage(data) {
  return request({
    url: '/attachment/upload/uploadimage',
    method: 'post',
    data
  })
}

//商品分组     查
export function siteCategory() {
  return request({
    url: '/mall/sitecategory/treeall',
    method: 'post'
  })
}

//商品分组     增
export function addSiteCategory(data) {
  return request({
    url: '/mall/sitecategory/create',
    method: 'post',
    data
  })
}

//商品分组     改
/*export function updateSiteCategory() {
  return request({
    url: '/mall/sitecategory/index',
    method: 'get'
  })
}*/

//商品分组     删
export function deleteSiteCategory(data) {
  return request({
    url: '/mall/sitecategory/delete',
    method: 'post',
    data
  })
}