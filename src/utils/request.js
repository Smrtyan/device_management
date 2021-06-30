import axios from 'axios'
// import router from "@/router";
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_SERVER,
    timeout: 10000 // request timeout
})
// service.defaults.headers.post['Content-Type'] = 'application/json'
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
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // 401 -> need to login again
    // if(error.response.status.toString() === '401')
    //     alert("会话超时，请重新登录！")
    //     router.push('login');
    return Promise.reject(error);
});


export default service