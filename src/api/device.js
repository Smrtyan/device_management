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

// get all devices in a group: /dev/all
// gid string
export function getDevicesFromGroup(data) {
    // console.log({
    //     url: "/dev/all",
    //     method: "POST",
    //     data,
    //     // headers: {
    //     //     'Content-Type': 'application/json'
    //     // }
    // })
    return request({
        url: "/dev/all",
        method: "POST",
        data,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
export function getAllDevice() {
    // console.log({
    //     url: "/dev/all",
    //     method: "POST",
    //     data,
    //     // headers: {
    //     //     'Content-Type': 'application/json'
    //     // }
    // })
    return request({
        url: "/dev/getAll",
        method: "POST"
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}


// rename a device
// id string  (device id)
// name string (new name)
export function renameDevice(data){
    return request({
        url: "/dev/rename",
        method: "POST",
        data
    })

}
export function getDeviceByGroup(data){
    return request({
        url: "/dev/getDeviceByGroup",
        method: "POST",
        data
    })
}
// 根据id查找设备
export function getDeviceById(data){
    return request({
        url: "/dev/getDeviceById",
        method: "POST",
        data
    })

}