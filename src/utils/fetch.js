// 公共 http 请求
import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import { deleteEmptyProperty } from '@/utils/index'
import storeCommon from '@/store'
const qs = require('qs')
let globaleLoading = false
const baseURL = '/api'
let CancelToken = axios.CancelToken

let cancelTime

const service = axios.create({
  baseURL: baseURL,
  timeout: 0, // 请求超时时间
  withCredentials: true
})

// 添加一个请求拦截器
service.interceptors.request.use(config => {
  if (config.headers && config.headers.loading) {
    let tips = config.headers.loading
    delete config.headers.loading
    storeCommon.dispatch('updateLoading', Vue.prototype.$loading({
      text: tips || 'loading',
      background: 'rgba(0, 0, 0, 0.5)'
    }))
    globaleLoading = true
  }
  config.cancelToken = new CancelToken(function executor (c) {
    // cancel = c
  })
  // 添加参数是表单类型的格式
  if (config.contentType === 'form') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  }

  if (config.method === 'get') {
    config.params && deleteEmptyProperty(config.params)
  }
  return config
}, error => {
  if (axios.isCancel(error)) {
    console.log('请求取消', error.message)
  }
  console.log(error) // for debug
  Promise.reject(error)
})

// 添加一个响应拦截器
service.interceptors.response.use(
  response => {
    // 关闭并重置notification
    if (response.config.loading || globaleLoading) {
      setTimeout(() => {
        storeCommon.dispatch('updateLoading', null)
      }, 200)
      globaleLoading = false
    }
    // 响应结束设置API接口状态
    removeMapKey(response.config)
    if (response.data.status !== 0) {
      // 406 登陆失败  401要重新登陆
      if (response.data.status === 401) {
        if (cancelTime) return
        window.top.postMessage({ type: 'url', data: '/login' }, '*')
      } else if (response.data.status === 406 || response.data.status === 10063) {
        // 返回请求， 登录验证失败逻辑将在login接口进行处理
        return response
      } else if (response.data.status === 20500) {
        Message({
          message: response.data.message ? response.data.message : '系统错误',
          type: 'error',
          duration: 3 * 1000
        })
        return response
      } else if (response.data.status === 20409 || response.data.status === 600) {
        // 600 是处理不显示打码合同提示报错
        return response
      } else {
        const msg = response.data.message
        if (msg) {
          Message({
            message: msg,
            type: 'error',
            duration: 3 * 1000
          })
        }
        return response
      }
    } else {
      return response
    }
  },
  error => {
    // 关闭并重置notification
    storeCommon.dispatch('updateLoading', null)
    if (error.response) {
    } else {
      console.log('当前接口正在请求中，请稍等')
    }
    console.log('err: ' + error)
    return Promise.reject(error)
  }
)

export default service
