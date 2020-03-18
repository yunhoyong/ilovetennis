import axios from 'axios'
import Cookies from 'js-cookie'
import store from './store'
import qs from 'qs'
/**
 * Error Message setting
 */
const getBaseUrl = () => {
  // 환경설정 파일 분리 적용
  const exclusive = process.env.VUE_APP_BASEURL_EXCLUSIVE
  const gateway = process.env.VUE_APP_BASEURL_GATEWAY
  console.log(process.env)
  return { exclusive, gateway }
}

// Https Module
class Https {
  constructor () {
    this.baseUrls = getBaseUrl()

    const defaultHeaders = {
      'api-Key': '32afb4e2-231d-33c2-a23r-77fb7dbdb747'
    }

    this.defaultHeaders = defaultHeaders

    const ax = (customOption = {}, customHeaders = {}) => axios.create({
      ...customOption,
      headers: { ...this.defaultHeaders, ...customHeaders }
    })
    this._axios = ax
  }

  // GET
  async get (url = '', params = {}, customErr, service, customOption = {}, customHeaders = {}) {
    const baseUrl = service ? this.baseUrls[service] : this.baseUrls.exclusive

    this.onError = customErr || this.onError
    const res = await this._axios(customOption, customHeaders)
      .get(`${baseUrl}${url}`, {
        params: { ...params },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      .then(res => this.onResult(res))
      .catch(err => {
        this.onError(err.response)
        return [null, err]
      })
    return res
  }

  // GET
  async getb (url = '', params = {}, customErr, service, customOption = {}, customHeaders = {}) {
    const baseUrl = service ? this.baseUrls[service] : this.baseUrls.exclusive
    customOption.responseType = 'blob'

    this.onError = customErr || this.onError
    const res = await this._axios(customOption, customHeaders)
      .get(`${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`, {
        params: { ...params },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      .then(res => this.onResult(res))
      .catch(err => {
        this.onError(err.response)
        return [null, err]
      })
    return res
  }

  // POST
  async post (url = '', data = {}, customErr, service, customOption = {}, customHeaders = {}) {
    const baseUrl = service ? this.baseUrls[service] : this.baseUrls.exclusive
    this.onError = customErr || this.onError
    const res = await this._axios(customOption, customHeaders)
      .post(`${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`, data)
      .then(res => this.onResult(res))
      .catch(err => {
        this.onError(err.response)
        return [null, err]
      })
    return res
  }

  // POST
  async postMultiPart (url = '', data = {}, customErr, service, customOption = {}, customHeaders = {}) {
    const baseUrl = service ? this.baseUrls[service] : this.baseUrls.exclusive
    customHeaders['Content-Type'] = 'multipart/form-data'

    this.onError = customErr || this.onError
    const res = await this._axios(customOption, customHeaders)
      .post(`${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`, data)
      .then(res => this.onResult(res))
      .catch(err => {
        this.onError(err.response)
        return [null, err]
      })
    return res
  }

  // PUT (post에 _method=put)
  async put (url = '', data = {}, customErr, service, customOption = {}, customHeaders = {}) {
    const baseUrl = service ? this.baseUrls[service] : this.baseUrls.exclusive

    this.onError = customErr || this.onError
    const res = await this._axios(customOption, customHeaders)
      .post(`${baseUrl}${url.startsWith('/') ? '' : '/'}${url}${url.indexOf('?') > -1 ? '&' : '?'}_method=put`, data)
      .then(res => this.onResult(res))
      .catch(err => {
        this.onError(err.response)
        return [null, err]
      })
    return res
  }

  // DELETE (post에 method=delete)
  async delete (url = '', data = {}, params = {}, customErr, service, customOption = {}, customHeaders = {}) {
    const baseUrl = service ? this.baseUrls[service] : this.baseUrls.exclusive

    this.onError = customErr || this.onError
    const res = await this._axios(customOption, customHeaders)
      .post(`${baseUrl}${url.startsWith('/') ? '' : '/'}${url}${url.indexOf('?') > -1 ? '&' : '?'}_method=delete`, data, {
        params: { ...params }
      })
      .then(res => this.onResult(res))
      .catch(err => {
        this.onError(err.response)
        return [null, err]
      })
    return res
  }

  onResult (response) {
    const res = response.data
    const rspStatus = res.rspStatus
    const resConfig = response.config

    // 외부 API
    if (rspStatus === undefined) {
      if (response.status !== 200) {
        this.onError(res)
      }
      return response.status === 200 ? [res, null] : [null, null]
    } else {
      const { rspCode } = res.rspStatus
      if (rspCode !== '0000') {
        this.onError(res, resConfig)
      }
      return rspCode === '0000' ? [res, null] : [res, res.rspStatus]
    }
  }

  // Client에서 API 호출 시 에러인 경우 message box
  onError (res, resConfig) {
    if (process.server) return
    if (resConfig && resConfig.url.indexOf('logout') > -1) { // 로그아웃일 경우
      return
    }
    if (res && res.rspStatus && (res.rspStatus.rspCode === 'EXP.1000' || res.rspStatus.rspCode === '1000')) { // api호출시 데이터가 없을경우, alert 메시지창 띄우지 않음.
      return
    }
    if (res && res.rspStatus && ['EXP.1401', 'EXP.1402', 'EXP.3201', '1401', '1402', '3201'].includes(res.rspStatus.rspCode)) { // 세션이 없을 경우
      Cookies.remove('sessionId')
      location.hash = '/login'
      store.state.isAuthenticated = false
    }
  }
}

export default Https
