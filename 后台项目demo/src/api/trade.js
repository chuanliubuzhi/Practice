import request from '@/utils/request'

//订单

//订单查询
export function orderIndex(data) {
	return request({
		url: '/mall/order/search',
		method: 'post',
		data
	})
}

//评价
export function reviewIndex(page, perPage, deliverRank) {
	return request({
		url: '/mall/comment/index',
		method: 'get',
		params: {
			"page": page, //当前页
			"per-page": perPage, //每页显示多少条
			"deliver_rank": deliverRank //商品评分
		}
	})
}

//物流
//获取当前所有快递公司信息
export function shipping() {
	return request({
		url: '/mall/shipping/index',
		method: 'get',
	})
}
//创建快递公司信息
export function addShipping(form) {
	return request({
		url: '/mall/shipping/addshipping',
		method: 'post',
		data: {
			"shipping_code": form.code,
			"shipping_name": form.name,
			"shipping_desc": form.desc,
			"shipping_insure": form.insure
		}
	})
}

//获取省级地区
export function getProvince() {
	return request({
		url: '/mall/region/index',
		method: 'get'
	})
}

//获取全部物流模板
export function getTemplate() {
	return request({
		url: '/mall/shippingarea/listall',
		method: 'get'
	})
}


//创建物流模板
export function addTemplate(form) {
	return request({
		url: '/mall/shippingarea/create',
		method: 'post',
		data: {
			"shipping_area_name": "北京、天津、河北",
			"regions": [1, 338, 636],
			"shipping_code": "SF",
			"first_weight": "1000",
			"money": "8",
			"second_weight": "500",
			"add_money": "5"
		}
	})
}

// 客户管理
export function getcustom(form) {
    return request({
        url: '/mall/shippingarea/create',
        method: 'post',
        data: {
            "shipping_area_name": "北京、天津、河北",
            "regions": [1, 338, 636],
            "shipping_code": "SF",
            "first_weight": "1000",
            "money": "8",
            "second_weight": "500",
            "add_money": "5"
        }
    })
}