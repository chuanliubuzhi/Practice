import request from '@/utils/request'

//用户查询（分页）
export function customIndex (data) {
    return request({
        url: '/cms/admin/indexbyum',
        method: 'post',
        data
    })
}

// 显示用户信息
export function customView (id) {
    return request({
        url: '/cms/admin/view',
        method: 'post',
        data: {
            'id': id
        }
    })
}
//增加客户
export function createCustom (data) {
    console.log(data);
    return request({
        url: '/cms/admin/create',
        method: 'post',
        data
    })
}

//删除客户
export function deleteCustom (id) {
    return request({
        url: '/cms/admin/delete',
        method: 'post',
        data: {
            'id': id
        }
    })
}

//修改用户信息
export function editCustom (data) {
    return request({
        url: '/cms/admin/update',
        method: 'post',
        data
    })
}
