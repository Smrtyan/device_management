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
        methods: "POST",
        data
    })
}
export function allVersion(){
    return request({
        url: "/version/all",
        methods: "POST"
    })
}
export function delVersion(){
    return request({
        url: "/version/del",
        methods: "POST",
    })
}