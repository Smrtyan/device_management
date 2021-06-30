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

// get all groups: /group/all
export function getAllGroups(data){
    return request({
        url: '/group/all',
        method: 'post',
        data
    })
}

// add group: /group/add
export function addGroup(){
    return request({
        url: '/group/add',
        method: 'post',
    })
}

// delete group: /group/del
// gid string
export function delGroup(data){
    return request({
        url: '/group/del',
        method: 'post',
        data
    })
}

// rename a group
// gid
// name : new name
export function renameGroup(data){
    return request({
        url: '/group/rename',
        method: 'post',
        data
    })
}