import request from '@/utils/request'

// response code
// 201
// Created
//
// 401
// Unauthorized
//
// 403
// Forbidden
//
// 404
// Not Found

export function addVersion(data){
    return request({
        url: "/version/add",
        method: "POST",
        data
    })
}
export function allVersion(){
    return request({
        url: "/version/getAll",
        method: "POST",
    })
}
export function delVersion(){
    return request({
        url: "/version/del",
        method: "POST",
    })
}