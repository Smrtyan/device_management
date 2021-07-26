import request from '@/utils/request'
/**
 * 获取版本
 * @returns 
 */
 export function getIndexRecord(data) {

    return request({
        url: "/record/all",
        method: "POST",
        data
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
export function getAllRecord(data) {

    return request({
        url: "/record/getAll",
        method: "POST",
        data
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
export function getAllImageRecord(data) {

    return request({
        url: "/record/getAllImage",
        method: "POST",
        data
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
export function getAllVideoRecord(data) {

    return request({
        url: "/record/getAllVideo",
        method: "POST",
        data
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
export function getOneRecord(data) {

    return request({
        url: "/record/getOne",
        method: "POST",
        data
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
