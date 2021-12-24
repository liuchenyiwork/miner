/**
 * requests
 */
import axios from 'axios'


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: "http://10.227.90.229:15200/v1/",
  timeout: 10000,
  // crossDomain: true,
})

// request interceptor
service.interceptors.request.use(
  config => {
    // API access token


    return config
  },
  error => {
    // Process request error

    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // Process response.

    // process custom return code.

    // process token expire.

    return response
  },
  error => {
    // Process response error

    return Promise.reject(error)
  }
)

export default service;

