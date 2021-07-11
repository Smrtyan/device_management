import request from '@/utils/request'
/**
 * 获取版本
 * @returns 
 */
 export function getAllRecord(data) {

    return request({
        url: "/record/all",
        method: "POST",
        data
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}
