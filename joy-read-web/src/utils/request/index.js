import { customRef } from 'vue'
import axios from 'axios'

const { CancelToken } = axios

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 1000 * 5000,
  withCredentials: true,
})

export const loading = customRef((track, trigger) => {
  let count = 0
  return {
    get() {
      track()
      return count > 0
    },
    set(value) {
      count += value ? 1 : -1
      trigger()
    },
  }
})

const beforeRequest = (config) => {
  const token = localStorage.getItem('token')
  token && (config.headers['token'] = token)

  config.headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  }
  loading.value = true
  return config
}

service.interceptors.request.use(beforeRequest, (error) => {
  loading.value = false
  return Promise.reject(error)
})

const responseSuccess = (response) => {
  loading.value = false
  return Promise.reject(response.data)
}

const responseFailed = (error) => {
  loading.value = false
  if (axios.isCancel(error)) {
    console.log('请求取消', error.message)
  }
  const { response } = error
  if (response.status === 401) {
  }
  return Promise.reject(error)
}

service.interceptors.response.use(responseSuccess, responseFailed)

const request = {
  get(url, params = {}) {
    return service.get(url, { params })
  },
  post(url, data) {
    return service.post(url, data)
  },
  put(url, data) {
    return service.put(url, data)
  },
  delete(url) {
    return service.delete(url)
  },
}

export function withCancelToken(fetcher) {
  let abort
  const cancle = (message = 'abort') => {
    if (abort) {
      abort(message)
      abort = null
    }
  }

  const send = (data, config) => {
    cancle()
    const cancleToken = new CancelToken((cancel) => (abort = cancel))
    return fetcher(data, { ...config, cancleToken })
  }

  return [send, cancle]
}

/**
 * 
function getUser(id: string, config) {
  return request(`api/user/${id}`, config)
}

// 包装请求函数
const [fetchUser, abortRequest] = withCancelToken(getUser)

// 发送请求
// 如果上一次请求还没回来，会被自动取消
fetchUser('1000')

// 通常不需要主动调用
// 但可以在组件销毁的生命周期中调用
abortRequest()

 */

export default request
