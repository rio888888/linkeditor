import request from '../utils/request'

const getWebs = () => {
  return request({
    url: `/classes/Web`,
    method: 'get'
  })
}

const addWeb = (data) => {
  return request({
    url: `/classes/Web`,
    method: 'post',
    data
  })
}

const deleteWeb = (objectId) => {
  return request({
    url: `/classes/Web/${objectId}`,
    method: 'delete'
  })
}

const updateWeb = (objectId, data) => {
  return request({
    url: `/classes/Web/${objectId}`,
    method: 'put',
    data
  })
}

export default {
  getWebs,
  addWeb,
  deleteWeb,
  updateWeb
}