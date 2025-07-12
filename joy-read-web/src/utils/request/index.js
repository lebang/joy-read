import axios from 'axios'
import { emiter } from '@utils/emiter'
import { loading } from '@utils/request/loading'

const { CancelToken } = axios

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000 * 5000,
  withCredentials: true,
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
const requestError = (error) => {
  loading.value = false
  return Promise.reject(error)
}
service.interceptors.request.use(beforeRequest, requestError)

const responseSuccess = (response) => {
  loading.value = false
  const { data } = response
  if (data?.code === 201 && data?.data?.token) {
    localStorage.setItem('token', data?.data?.token)
  }
  return Promise.resolve(data.data)
}
const responseFailed = (error) => {
  loading.value = false
  console.log('res err:', error)
  if (axios.isCancel(error)) {
    console.log('请求取消', error.message)
  }
  if (!error?.response) {
    emiter.emit('tips:error', error.message)
  }
  const { status, data } = error?.response || {}
  if (status === 401) {
    emiter.emit('router:login')
  }
  if (status === 400) {
    const msg = Array.isArray(data.errors) ? data.errors.join('') : data?.message
    emiter.emit('tips:error', msg || 'error')
  }
  return Promise.reject(error)
}
service.interceptors.response.use(responseSuccess, responseFailed)

function withCancelToken(fetcher) {
  let abort
  const cancle = (message = 'abort') => {
    if (abort) {
      abort(message)
      abort = null
    }
  }

  const promise = (data, config) => {
    cancle()
    const cancleToken = new CancelToken((cancel) => (abort = cancel))
    return fetcher(data, { ...config, cancleToken })
  }

  return [promise, cancle]
}

async function requestWrapper(method, url, data = {}) {
  const fetcher = () => service[method](url, data)

  const [promise, cancel] = withCancelToken(fetcher)
  try {
    loading.value = true
    const response = await promise()
    return { error: null, response, loading, cancel }
  } catch (error) {
    return { error, response: null, loading, cancel }
  } finally {
    loading.value = false
  }
}

const request = {
  get(url, data) {
    return requestWrapper('get', url, data)
  },
  post(url, data) {
    return requestWrapper('post', url, data)
  },
  put(url, data) {
    return requestWrapper('put', url, data)
  },
  delete(url) {
    return requestWrapper('delete', url)
  },
}

export default request
