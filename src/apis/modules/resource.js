import http from '@/utils/http'

function valid(id) {
  return http.post(`/resource/valid/${id}`)
}
function update(data) {
  return http.post(`/resource/updateResource`, data)
}
function invalid(id) {
  return http.post(`/resource/invalid/${id}`)
}
function list(data) {
  return http.post(`/resource/findByPage`, data)
}
function create(data) {
  return http.post(`/resource/createResource`, data)
}
function treeOfPlatform(platformId) {
  return http.get(`/resource/getResourceTreeByPlatformId/${platformId}`)
}
function info(id) {
  return http.get(`/resource/findById/${id}`)
}

export default {
  valid,
  invalid,
  info,
  create,
  update,
  list,
  treeOfPlatform
}
