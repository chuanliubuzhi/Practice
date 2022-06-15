import request from '@/utils/request'

//食品 增
export function addFoods(data) {
  return request({
    url: '/restaurant/food/createfood',
    method: 'post',
    data
  })
}

//食品 删
export function delFoods(data) {
  return request({
    url: '/restaurant/food/delete',
    method: 'post',
    data
  })
}

//食品 改
export function editFoods(data) {
  return request({
    url: '/restaurant/food/update',
    method: 'post',
    data
  })
}

//食品 查
export function foods(cat_id) {
  return request({
    url: '/restaurant/food/indexbycatid',
    method: 'get',
    params:{cat_id}
  })
}

//食品 根据food_id可查sku和pro
export function foodView(food_id) {
  return request({
    url: '/restaurant/food/view',
    method: 'get',
    params:{food_id}
  })
}

//食品 删除sku
export function foodSku(data) {
  return request({
    url: '/restaurant/foodsku/delete',
    method: 'post',
    data
  })
}

//食品 删除pro
export function foodPro(data) {
  return request({
    url: '/restaurant/property/delete',
    method: 'post',
    data
  })
}

//食品 上下架
export function foodSale(data) {
  return request({
    url: '/restaurant/food/sale',
    method: 'post',
    data
  })
}


//食品分类 增
export function addFoodCategory(data) {
  return request({
    url: '/restaurant/category/create',
    method: 'post',
    data
  })
}

//食品分类 删
export function delFoodCategory(data) {
  return request({
    url: '/restaurant/category/delete',
    method: 'get',
    params:data
  })
}

//食品分类 改
export function updateFoodCategory(data) {
  return request({
    url: '/restaurant/category/update',
    method: 'post',
    data
  })
}

//食品分类 查
export function foodCategory() {
  return request({
    url: '/restaurant/category/index',
    method: 'get'
  })
}

//查询桌位
export function getTable() {
  return request({
    url: '/restaurant/tables/index',
    method: 'get'
  })
}

//增加桌位
export function addTable(data) {
  return request({
    url: '/restaurant/tables/create',
    method: 'post',
    data
  })
}

//修改桌位
export function updataTable(data) {
  return request({
    url: '/restaurant/tables/update',
    method: 'post',
    data
  })
}

//删除桌位
export function deleteTable(id) {
  return request({
    url: '/restaurant/tables/delete',
    method: 'get',
    params: {
    	table_id: id
    }
  })
}

//下载点餐码
export function creattableqr(id) {
    return request({
        url: '/restaurant/tables/createqr',
        method: 'get',
        responseType: 'arraybuffer',
        params: {
            tables: id
        }
    })
}
