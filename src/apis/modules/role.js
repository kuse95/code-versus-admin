import http from '@/utils/http'

function valid(id) {
  return http.post(`/role/valid/${id}`)
}
function update() {
  return http.post(`/role/updateRole`)
}
function invalid(id) {
  return http.post(`/role/invalid/${id}`)
}
function list() {
  return http.post(`/role/findByPage`)
}
function create() {
  return http.post(`/role/createRole`)
}
function assignRoleResources() {
  return http.post(`/role/assignRoleResources`)
}
function info(id) {
  return http.get(`/role/findById/${id}`)
}

export default {
  valid,
  invalid,
  info,
  create,
  update,
  list,
  assignRoleResources
}
