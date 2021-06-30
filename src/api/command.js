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

// CMD
// cmd
export function command(data){
    return request({
        url: '/mq/cmd',
        method: 'post',
        data
    })
}