import request from '../utils/request'

const getLinks = () => {
  return request({
    url: `/classes/Service_Link`,
    method: 'get'
  })
}

const addLink = (data) => {
  return request({
    url: `/classes/Service_Link`,
    method: 'post',
    data
  })
}

const deleteLink = (objectId) => {
  return request({
    url: `/classes/Service_Link/${objectId}`,
    method: 'delete'
  })
}

const updateLink = (objectId, data) => {
  return request({
    url: `/classes/Service_Link/${objectId}`,
    method: 'put',
    data
  })
}

export default {
  getLinks,
  addLink,
  deleteLink,
  updateLink
}