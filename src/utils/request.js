import axios from 'axios'

const applicationId = '8006c2aae8ff706ea7705bcb97124b94'
const restApiKey = '2b839d99ec27c24c42b63cfb7a453530'

const request = axios.create({
  timeout: 10000,
  baseURL: 'https://api2.bmob.cn/1'
})

request.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['X-Bmob-Application-Id'] = applicationId
    config.headers['X-Bmob-REST-API-Key'] = restApiKey

    return config
  },
  error => {
    // return Promise.reject(error)
    return error
  }
)

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // return Promise.reject(error)
    return error
  }
)

export default request