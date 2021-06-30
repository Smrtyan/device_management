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

//Login: /auth/login
// username string
// password string
// remember bool
export function login(data){
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}

//Register
//send register message: /auth/register
// phone string
export function getRegisterMsg(data){
    return request({
        url: '/auth/register',
        method: 'post',
        data
    })
}
//register message: /auth/accessRegister
// phone string
// code string
// password string
// username string

export function register(data){
    return request({
        url: '/auth/accessRegister',
        method: 'post',
        data
    })
}

