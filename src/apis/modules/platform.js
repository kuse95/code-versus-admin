import http from '@/utils/http'

function valid(id) {
  return http.post(`/platform/valid/${id}`)
}
function update() {
  return http.post(`/platform/updatePlatform`)
}
function invalid(id) {
  return http.post(`/platform/invalid/${id}`)
}
function list(query) {
  return http.post(`/platform/findByPage`, query)
}
function create() {
  return http.post(`/platform/createPlatform`)
}
function listOfUser(id) {
  return http.get(`/platform/getUserPlatforms/${id}`)
}
function listOfCurrent() {
  return http.get(`/platform/getCurrentUserPlatforms`)
}
function info(id) {
  return http.get(`/platform/findById/${id}`)
}

export default {
  valid,
  invalid,
  info,
  create,
  update,
  list,
  listOfUser,
  listOfCurrent
}
