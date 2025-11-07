import axios from 'axios'
import{ getAccessToken,getRefreshToken, setTokens,clearTokens } from '../auth/auth.js'

const backendApi= import.meta.env.VITE_API + '/api'

const client= axios.create({
  baseURL: backendApi,
  headers: {
    'Content-Type': 'application/json',
  },

})

client.interceptors.request.use(config =>{
  const token= getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing= false
let failedQueue = []

const processQueue = (error, token= null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

client.interceptors.response.use(
  response => response,
  async err =>{
    const originalRequest = err.config
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        clearTokens()
        return Promise.reject(err)
      }
      if (isRefreshing){
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token
          return client(originalRequest)
        }).catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const resp = await axios.post(`${backendApi}/token/refresh/`, { refresh: refreshToken })
        const newAccess = resp.data.access
        setTokens({ access: newAccess, refresh: refreshToken }) 
        client.defaults.headers.common['Authorization'] = 'Bearer ' + newAccess
        processQueue(null, newAccess)
        return client(originalRequest)
      } catch (err) {
        processQueue(err, null)
        clearTokens()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(err)
  }
)

export default client
