import http from '@/utils/http'

function valid(id) {
  return http.post(`/department/valid/${id}`)
}
function update() {
  return http.post(`/department/updateDepartment`)
}
function invalid(id) {
  return http.post(`/department/invalid/${id}`)
}
function list() {
  return http.post(`/department/findByPage`)
}
function create() {
  return http.post(`/department/createDepartment`)
}
function tree() {
  return http.get(`/department/getDepartmentTree`)
}
function info(id) {
  return http.get(`/department/findById/${id}`)
}

export default {
  valid,
  invalid,
  info,
  create,
  update,
  list,
  tree
}
