import request from '../utils/request'

const login = (username, password) => {
  return request({
    url: `/login`,
    method: 'get',
    params: { username, password }
  })
}

const getLogin = (objectId) => {
  return request({
    url: `/users/${ objectId }`,
    method: 'get',
  })
}

export default {
  login,
  getLogin
}