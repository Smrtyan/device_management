import axios from 'axios'
import router from "@/router";
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_SERVER,
    timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 401 -> need to login again
    if(response.data.code.toString() === '401' || response.data.code.toString() === '40001') {
        alert("会话超时或者身份无效，请重新登录！")
        router.push('login');
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    alert("会话超时或者身份无效，请重新登录！")
    router.push('login');
    return Promise.reject(error);
});


export default service