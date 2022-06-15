import request from '@/utils/request'

//查看所有店铺信息
export function getAllStore() {
	return request({
		url: '/mall/site/mysite',
		method: 'get',
	})
}

//查看指定店铺信息
export function getStore() {
	return request({
		// url: '/mall/site/mysiteone',
		url: '/cms/site/showsite?',
		method: 'get',
	})
}

//修改指定店铺信息
export function setStore(data) {
	return request({
		// url: '/mall/site/updatesite',
		url: '/cms/site/updatesite',
		method: 'post',
		data
	})
}

//查看所有图片
export function getImage(size,page) {
	return request({
		url: '/attachment/showimg/showmypic',
		method: 'get',
		params: {
			'per-page': size,
			'page': page
		}
	})
}

//按分类、名称查询图片
export function getImageByGroup(catid,size,page,name) {
	return request({
		url: '/attachment/showimg/showmycatpic',
		method: 'get',
		params: {
			'catid': catid,
			'per-page': size,
			'page': page,
			'name': name
		}
	})
}

//删除图片
export function deleteImage(aid) {
	return request({
		url: '/attachment/showimg/delete',
		method: 'post',
		data: {
			'aid': aid,
		}
	})
}

//修改图片
export function updateImage(data) {
	return request({
		url: '/attachment/showimg/update',
		method: 'post',
		data
	})
}

//查看图片分类
export function getGroup() {
	return request({
		url: '/attachment/category/index',
		method: 'get',
		params: {
		}
	})
}

//创建图片分类
export function createGroup(name) {
	return request({
		url: '/attachment/category/create',
		method: 'post',
		data: {
			'name': name,
		}
	})
}

//修改图片分类
export function changeGroup(name,catid) {
	return request({
		url: '/attachment/category/update',
		method: 'post',
		data: {
			'name': name,
			'catid': catid
		}
	})
}

//删除图片分类
export function deleteGroup(catid) {
	return request({
		url: '/attachment/category/delete',
		method: 'get',
		params: {
			'catid': catid
		}
	})
}

//打印机 增
export function createPrinter(data) {
	return request({
		url: '/restaurant/prints/create',
		method: 'post',
		data
	})
}
//打印机 删
export function deletePrinter(id) {
	return request({
		url: '/restaurant/prints/delete',
		method: 'post',
		data: {
			'id': id
		}
	})
}
//打印机 改
export function updatePrinter(data) {
	return request({
		url: '/restaurant/prints/update',
		method: 'post',
		data
	})
}
//打印机 查
export function fetchPrinter() {
	return request({
		url: '/restaurant/prints/index',
		method: 'get'
	})
}