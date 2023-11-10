import axios from 'axios'
// import store from '../store'
// import router from '../router'

const axiosInstance = axios.create({
  // baseURL: 'http://10.11.58.67:8003/api/v1.0.0'
  baseURL: 'http://10.11.61.29:8001/api/v1.0.0'
})
//
// axiosInstance.interceptors.request.use(
//   function (config) {
//     const token = store.getters['auth/accessToken']
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => Promise.reject(error)
// )
//
// axiosInstance.interceptors.response.use(
// response => response,
//   async function (error) {
//     const originalRequest = error.config
//
//     if (
//       error.response.status === 401 &&
//       originalRequest.url.includes('/token/refresh')
//     ) {
//       store.commit('auth/clearUserData')
//       router.push('/')
//       return Promise.reject(error)
//     } else if (
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true
//       await store.dispatch('auth/refreshToken')
//
//       const newAccessToken = store.getters['auth/accessToken']
//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//       return axios(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstance
